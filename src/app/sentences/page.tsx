
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { storage } from '@/lib/storage';
import { VocabularyWord } from '@/lib/types';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Trophy,
  Lightbulb,
  ArrowRight,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Round {
  word: VocabularyWord;
  targetSentence: string;
  translation: string;
  shuffledWords: string[];
  correctWords: string[];
}

export default function SentenceBuilderPage() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'loading' | 'playing' | 'feedback' | 'finished'>('loading');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [shake, setShake] = useState(false);

  const initGame = useCallback(async () => {
    const vocab = (await storage.getVocabulary()).filter(w => w.sentence_de && w.sentence_mk);
    if (vocab.length < 3) {
      setGameState('finished');
      return;
    }

    const selected = vocab.sort(() => 0.5 - Math.random()).slice(0, 5);
    const newRounds: Round[] = selected.map(word => {
      const cleanSentence = word.sentence_de.replace(/[.!?]/g, '');
      const correctWords = cleanSentence.split(' ').filter(w => w.length > 0);
      const shuffledWords = [...correctWords].sort(() => 0.5 - Math.random());
      
      return {
        word,
        targetSentence: word.sentence_de,
        translation: word.sentence_mk,
        correctWords,
        shuffledWords
      };
    });

    setRounds(newRounds);
    setCurrentRoundIdx(0);
    setSelectedWords([]);
    setGameState('playing');
    setScore(0);
  }, []);

  useEffect(() => {
    setMounted(true);
    initGame().then(() => {});
  }, [initGame]);

  const handleWordClick = (word: string, index: number, isSelected: boolean) => {
    if (gameState !== 'playing') return;

    if (isSelected) {
      setSelectedWords(prev => prev.filter((_, i) => i !== index));
    } else {
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const checkSentence = () => {
    const current = rounds[currentRoundIdx];
    const isRight = selectedWords.join(' ').toLowerCase() === current.correctWords.join(' ').toLowerCase();
    
    setIsCorrect(isRight);
    setGameState('feedback');
    if (isRight) {
      setScore(prev => prev + 20);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const nextRound = async () => {
    if (currentRoundIdx < rounds.length - 1) {
      setCurrentRoundIdx(prev => prev + 1);
      setSelectedWords([]);
      setIsCorrect(null);
      setGameState('playing');
    } else {
      setGameState('finished');
      const stats = await storage.getStats();
      await storage.saveStats({
        ...stats,
        sentencesCompleted: (stats.sentencesCompleted || 0) + score/20
      });
    }
  };

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!mounted) return null;

  if (gameState === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (gameState === 'finished' && rounds.length === 0) {
    return (
      <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center text-center">
        <Lightbulb className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Нема доволно реченици</h2>
        <p className="text-muted-foreground mb-8">Мора да додадете барем 3 збора со реченици-примери во твојот вокабулар за да ја играте оваа вежба.</p>
        <Link href="/">
          <Button className="rounded-2xl px-8 bg-primary text-white">Назад до почетна</Button>
        </Link>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <Trophy className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-black text-primary mb-2 uppercase tracking-tighter">Браво!</h2>
        <p className="text-muted-foreground mb-8">Завршивте 5 реченици и освоивте {score} поени.</p>
        <div className="w-full space-y-3">
          <Button className="w-full py-8 text-xl font-bold rounded-2xl bg-primary text-white shadow-xl" onClick={initGame}>
            ИГРАЈ ПОВТОРНО
          </Button>
          <Link href="/" className="block w-full">
            <Button variant="ghost" className="w-full text-muted-foreground py-6">Назад до контролна табла</Button>
          </Link>
        </div>
      </div>
    );
  }

  const current = rounds[currentRoundIdx];
  const targetLower = current.targetSentence.toLowerCase();
  const isDependentClause = targetLower.includes('weil') || targetLower.includes('dass') || targetLower.includes('wenn') || targetLower.includes('ob');
  const isModalSentence = targetLower.includes('kann') || targetLower.includes('muss') || targetLower.includes('will') || targetLower.includes('soll') || targetLower.includes('darf') || targetLower.includes('mag');

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto flex flex-col font-body">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold">Градител на Реченици</h1>
          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            Реченица {currentRoundIdx + 1} од {rounds.length}
          </div>
        </div>
        <div className="bg-card px-3 py-1 rounded-full text-primary font-black text-sm border border-accent/20 shadow-sm">
          {score}
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Card className="p-6 rounded-[2rem] border-none shadow-xl mb-8 bg-card relative overflow-hidden">
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Превод на македонски</div>
          <p className="text-xl font-medium text-foreground italic leading-tight">"{current.translation}"</p>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
        </Card>

        <div className="flex-1 space-y-6">
          {/* Satzbau Reminder - Educational Context */}
          <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex items-start gap-3">
             <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
             <div className="space-y-1">
               <p className="text-[10px] font-black text-primary uppercase tracking-wider">Граматички Потсетник</p>
               <p className="text-xs font-medium text-muted-foreground leading-snug">
                 {isDependentClause 
                  ? "Зависна реченица: Глаголот оди на самиот КРАЈ (Nebensatz)." 
                  : isModalSentence 
                    ? "Модален глагол: Помошникот е ВТОР, главниот глагол е на КРАЈ во инфинитив."
                    : "Главна реченица: Глаголот е секогаш на ВТОРА позиција (V2 Rule)."}
               </p>
             </div>
          </div>

          {/* Selected Area */}
          <div className={cn(
            "min-h-[160px] p-5 bg-secondary/10 rounded-[2rem] border-2 border-dashed border-secondary/30 flex flex-wrap gap-2 content-start transition-all duration-300",
            shake && "animate-shake bg-red-50 border-destructive/20"
          )}>
            {selectedWords.map((word, idx) => (
              <Button
                key={`selected-${idx}`}
                variant="secondary"
                className="rounded-xl font-bold animate-in fade-in zoom-in h-11 px-5 bg-card text-foreground shadow-sm hover:bg-muted border border-accent/10"
                onClick={() => handleWordClick(word, idx, true)}
                disabled={gameState !== 'playing'}
              >
                {word}
              </Button>
            ))}
            {selectedWords.length === 0 && (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30 text-[10px] font-black uppercase tracking-[0.3em] text-center py-10">
                <span>Кликни на зборовите подолу</span>
                <span className="mt-1">за да ги подредиш</span>
              </div>
            )}
          </div>

          {/* Options Area */}
          <div className="flex flex-wrap gap-2 justify-center pb-6">
            {current.shuffledWords.map((word, idx) => {
              // Logic to handle multiple instances of the same word
              const instancesInSelected = selectedWords.filter(w => w === word).length;
              const instancesAvailable = current.shuffledWords.slice(0, idx + 1).filter(w => w === word).length;
              const isActuallyUsed = instancesInSelected >= instancesAvailable;

              return (
                <Button
                  key={`option-${idx}`}
                  variant="outline"
                  className={cn(
                    "rounded-xl font-bold bg-card h-12 border-2 transition-all hover:bg-primary/5 active:scale-95 shadow-sm px-5",
                    isActuallyUsed && "opacity-0 pointer-events-none"
                  )}
                  onClick={() => handleWordClick(word, idx, false)}
                  disabled={gameState !== 'playing'}
                >
                  {word}
                </Button>
              );
            })}
          </div>
        </div>

        {gameState === 'feedback' && (
          <div className="space-y-4 mb-6 mt-4 animate-in slide-in-from-bottom duration-300">
            <Card className={cn(
              "p-6 rounded-[2rem] shadow-2xl border-none",
              isCorrect ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30"
            )}>
              <div className="flex items-center gap-4 mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md",
                  isCorrect ? "bg-green-500" : "bg-red-500"
                )}>
                  {isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                </div>
                <div className="flex-1">
                  <h3 className={cn("font-black text-xl tracking-tight", isCorrect ? "text-green-700" : "text-red-700")}>
                    {isCorrect ? "Точен редослед!" : "Погрешен редослед!"}
                  </h3>
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">{isCorrect ? "Браво!" : "Точната реченица гласи:"}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full bg-card shadow-sm text-primary hover:bg-card active:scale-90"
                  onClick={() => handleSpeak(current.targetSentence)}
                >
                  <Volume2 className="w-6 h-6" />
                </Button>
              </div>
              {!isCorrect && <p className="font-bold text-xl text-foreground px-4 py-3 bg-card/60 rounded-2xl leading-tight border border-red-100">"{current.targetSentence}"</p>}
            </Card>

            <Card className="p-5 bg-card rounded-2xl border border-accent/10 flex items-start gap-3 shadow-sm">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-[11px] font-medium text-muted-foreground italic leading-relaxed">
                <strong>Satzbau Анализа:</strong> {isDependentClause 
                  ? "Кај зависни реченици (weil, dass, wenn...), конјугираниот глагол секогаш го зазема ПОСЛЕДНОТО место." 
                  : isModalSentence
                    ? "Кај модални глаголи (müssen, können...), помошникот е ВТОР, а главната акција е во инфинитив на КРАЈОТ."
                    : "Во главните реченици глаголот е Крал и неговата круна е секогаш на ВТОРАТА позиција."}
              </div>
            </Card>
          </div>
        )}

        <div className="pt-4 pb-12">
          {gameState === 'playing' ? (
            <Button 
              className="w-full py-8 text-xl font-black rounded-2xl shadow-xl bg-primary text-white tracking-tighter"
              disabled={selectedWords.length === 0}
              onClick={checkSentence}
            >
              ПРОВЕРИ
            </Button>
          ) : (
            <Button 
              className="w-full py-8 text-xl font-black rounded-2xl shadow-xl bg-primary text-white tracking-tighter"
              onClick={nextRound}
            >
              СЛЕДНА РЕЧЕНИЦА
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
