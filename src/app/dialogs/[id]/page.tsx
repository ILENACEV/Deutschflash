
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DIALOGS_DATA } from '@/lib/dialogs-data';
import { storage } from '@/lib/storage';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trophy,
  BookOpen,
  Volume2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type GameState = 'reading' | 'choice' | 'result' | 'finished';

export default function DialogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dialog = DIALOGS_DATA.find(d => d.id === id);

  const [gameState, setGameState] = useState<GameState>('reading');
  const [currentLine, setCurrentLine] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalChoices, setTotalChoices] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [choiceResult, setChoiceResult] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  if (!dialog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Дијалогот не е пронајден.</p>
          <Link href="/dialogs">
            <Button>Назад кон дијалозите</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Find if current line has a choice
  const currentChoice = dialog.choices.find(c => c.lineIndex === currentLine);
  const isChoiceLine = !!currentChoice && gameState !== 'result';

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleChoiceSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;
    const choice = dialog.choices.find(c => c.lineIndex === currentLine)!;
    const isCorrect = choice.options[optionIndex].isCorrect;
    setSelectedOption(optionIndex);
    setChoiceResult(isCorrect);
    setTotalChoices(prev => prev + 1);
    if (isCorrect) setCorrectAnswers(prev => prev + 1);
    setGameState('result');
  };

  const handleContinue = () => {
    setSelectedOption(null);
    setChoiceResult(null);
    const nextLine = currentLine + 1;
    if (nextLine >= dialog.lines.length) {
      setGameState('finished');
      // Award XP
      storage.addXP(correctAnswers * 15 + 10);
    } else {
      setCurrentLine(nextLine);
      setGameState('reading');
    }
  };

  const handleNext = () => {
    const nextLine = currentLine + 1;
    if (nextLine >= dialog.lines.length) {
      setGameState('finished');
      storage.addXP(correctAnswers * 15 + 10);
    } else {
      setCurrentLine(nextLine);
    }
  };

  const restartDialog = () => {
    setCurrentLine(0);
    setCorrectAnswers(0);
    setTotalChoices(0);
    setSelectedOption(null);
    setChoiceResult(null);
    setGameState('reading');
  };

  const line = dialog.lines[currentLine];

  // ── FINISHED SCREEN ──────────────────────────────────────
  if (gameState === 'finished') {
    const score = totalChoices > 0 ? Math.round((correctAnswers / totalChoices) * 100) : 100;
    return (
      <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col">
        <header className="flex items-center gap-4 mb-8">
          <Link href="/dialogs">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад кон дијалози">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">{dialog.title}</h1>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
            <Trophy className="w-14 h-14 text-primary" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-foreground mb-2">Браво!</h2>
            <p className="text-muted-foreground">Завршивте го дијалогот</p>
          </div>

          <Card className="w-full p-6 border-none shadow-xl bg-card rounded-3xl">
            <div className="text-5xl font-black text-primary mb-2">{score}%</div>
            <p className="text-sm text-muted-foreground">
              {correctAnswers} / {totalChoices} точни избори
            </p>
          </Card>

          {/* Vocabulary */}
          <div className="w-full text-left">
            <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Вокабулар од дијалогот
            </h3>
            <div className="space-y-2">
              {dialog.vocabulary.map((vocab, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-card rounded-2xl shadow-sm">
                  <span className="font-bold text-sm">{vocab.word}</span>
                  <span className="text-xs text-muted-foreground">{vocab.translation}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full space-y-3">
            <Button className="w-full py-6 font-bold rounded-2xl bg-primary text-white text-lg" onClick={restartDialog}>
              ПОВТОРИ
            </Button>
            <Link href="/dialogs" className="block w-full">
              <Button variant="ghost" className="w-full text-muted-foreground">
                Назад кон сите дијалози
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN DIALOG SCREEN ────────────────────────────────────
  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col pb-10">
      <header className="flex items-center gap-4 mb-6">
        <Link href="/dialogs">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold leading-tight">{dialog.icon} {dialog.title}</h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Ниво {dialog.level}</p>
        </div>
        <div className="text-[10px] font-black text-muted-foreground bg-card px-3 py-1.5 rounded-full shadow-sm">
          {currentLine + 1}/{dialog.lines.length}
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1.5 bg-muted rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${((currentLine) / dialog.lines.length) * 100}%` }}
        />
      </div>

      {/* Situation (only at start) */}
      {currentLine === 0 && (
        <Card className="p-4 mb-6 bg-primary/5 border border-primary/10 rounded-2xl">
          <p className="text-xs font-medium text-foreground leading-relaxed">
            <span className="font-black text-primary">📍 Ситуација: </span>
            {dialog.situation}
          </p>
        </Card>
      )}

      {/* Conversation thread — show all lines up to current */}
      <div className="flex-1 space-y-4 mb-6 overflow-y-auto no-scrollbar">
        {dialog.lines.slice(0, currentLine + 1).map((l, i) => {
          const isUser = l.speaker === 'B';
          const isCurrent = i === currentLine;
          return (
            <div
              key={i}
              className={cn(
                "flex gap-3 transition-all",
                isUser ? "flex-row-reverse" : "flex-row",
                isCurrent ? "animate-in slide-in-from-bottom-3 duration-300" : "opacity-70"
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 shadow-md",
                isUser ? "bg-primary text-primary-foreground" : "bg-card border-2 border-accent/20"
              )}>
                {isUser ? '🙋' : dialog.icon}
              </div>

              {/* Bubble */}
              <div className={cn(
                "max-w-[75%] rounded-3xl px-4 py-3 shadow-sm",
                isUser
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-card text-card-foreground rounded-tl-sm"
              )}>
                <div className={cn(
                  "text-[9px] font-black uppercase tracking-widest mb-1",
                  isUser ? "opacity-70" : "text-muted-foreground"
                )}>
                  {l.speakerName}
                </div>
                <p className="font-bold text-sm leading-snug">{l.de}</p>
                <p className={cn(
                  "text-[10px] mt-1 leading-snug",
                  isUser ? "opacity-70" : "text-muted-foreground"
                )}>
                  {l.mk}
                </p>
                {isCurrent && !isUser && (
                  <button
                    onClick={() => handleSpeak(l.de)}
                    className="mt-2 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Choice Zone */}
      {isChoiceLine && currentChoice && (
        <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-300">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground text-center mb-2">
            Твој одговор:
          </p>
          {currentChoice.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleChoiceSelect(i)}
              disabled={selectedOption !== null}
              className={cn(
                "w-full text-left p-4 rounded-2xl border-2 transition-all font-medium text-sm",
                selectedOption === null && "border-border bg-card hover:border-primary hover:bg-primary/5",
                selectedOption === i && opt.isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800",
                selectedOption === i && !opt.isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800",
                selectedOption !== null && selectedOption !== i && opt.isCorrect && "border-green-500/50 bg-green-50/50",
                selectedOption !== null && selectedOption !== i && !opt.isCorrect && "opacity-40 border-border bg-card"
              )}
            >
              <div className="flex items-start gap-2">
                {selectedOption !== null && (
                  opt.isCorrect
                    ? <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    : selectedOption === i
                    ? <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    : <div className="w-4 h-4 shrink-0" />
                )}
                <div>
                  <p className="font-bold">{opt.de}</p>
                  <p className="text-[10px] opacity-70">{opt.mk}</p>
                </div>
              </div>
            </button>
          ))}
          {selectedOption !== null && (
            <Card className={cn(
              "p-4 rounded-2xl border-none shadow-md mt-2",
              choiceResult ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30"
            )}>
              <p className={cn("font-bold text-sm", choiceResult ? "text-green-700" : "text-red-700")}>
                {choiceResult ? '✅ Точно!' : '❌ Не точно.'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {choiceResult ? 'Одличен избор за оваа ситуација.' : `Точниот одговор: ${currentChoice.options.find(o => o.isCorrect)?.de}`}
              </p>
              <Button className="w-full mt-3 rounded-xl py-4 font-bold bg-primary text-white" onClick={handleContinue}>
                СЛЕДНО
              </Button>
            </Card>
          )}
        </div>
      )}

      {/* Next button (non-choice lines) */}
      {!isChoiceLine && gameState !== 'result' && (
        <Button
          className="w-full py-6 font-bold rounded-2xl bg-primary text-white text-base"
          onClick={handleNext}
        >
          {currentLine < dialog.lines.length - 1 ? (
            <><ChevronRight className="w-5 h-5 mr-2" /> СЛЕДНА РЕПЛИКА</>
          ) : (
            <><Trophy className="w-5 h-5 mr-2" /> ЗАВРШИ ДИЈАЛОГ</>
          )}
        </Button>
      )}
    </div>
  );
}
