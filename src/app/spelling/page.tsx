
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { storage } from '@/lib/storage';
import { VocabularyWord } from '@/lib/types';
import { 
  ArrowLeft, 
  Volume2, 
  RotateCcw,
  Trophy,
  CheckCircle2,
  XCircle,
  Type,
  Lightbulb,
  Eraser
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Round {
  word: VocabularyWord;
  scrambledLetters: { id: string, char: string, used: boolean }[];
  targetWord: string;
}

export default function SpellingPage() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<{ id: string, char: string }[]>([]);
  const [gameState, setGameState] = useState<'loading' | 'playing' | 'feedback' | 'finished'>('loading');
  const [score, setScore] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [shake, setShake] = useState(false);

  const initGame = useCallback(async () => {
    const vocab = (await storage.getVocabulary()).filter(w => w.word.length > 2);
    if (vocab.length < 5) {
      setGameState('finished');
      return;
    }

    const selected = vocab.sort(() => 0.5 - Math.random()).slice(0, 10);
    const newRounds: Round[] = selected.map(word => {
      const letters = word.word.split('').map(char => ({
        id: Math.random().toString(36).substr(2, 9),
        char,
        used: false
      }));
      
      return {
        word,
        targetWord: word.word,
        scrambledLetters: [...letters].sort(() => 0.5 - Math.random())
      };
    });

    setRounds(newRounds);
    setCurrentRoundIdx(0);
    setSelectedLetters([]);
    setGameState('playing');
    setScore(0);
  }, []);

  useEffect(() => {
    setMounted(true);
    initGame().then(() => {});
  }, [initGame]);

  const handleLetterClick = (letterObj: { id: string, char: string }) => {
    if (gameState !== 'playing') return;
    
    // Add to selected
    const newSelected = [...selectedLetters, letterObj];
    setSelectedLetters(newSelected);

    // Update scrambled list to mark as used
    const updatedScrambled = rounds[currentRoundIdx].scrambledLetters.map(l => 
      l.id === letterObj.id ? { ...l, used: true } : l
    );
    
    const newRounds = [...rounds];
    newRounds[currentRoundIdx].scrambledLetters = updatedScrambled;
    setRounds(newRounds);

    // Auto-check if length matches
    if (newSelected.length === rounds[currentRoundIdx].targetWord.length) {
      checkSpelling(newSelected.map(l => l.char).join(''));
    }
  };

  const handleRemoveLetter = (index: number) => {
    if (gameState !== 'playing') return;
    
    const removed = selectedLetters[index];
    const newSelected = selectedLetters.filter((_, i) => i !== index);
    setSelectedLetters(newSelected);

    // Mark as available again
    const updatedScrambled = rounds[currentRoundIdx].scrambledLetters.map(l => 
      l.id === removed.id ? { ...l, used: false } : l
    );
    
    const newRounds = [...rounds];
    newRounds[currentRoundIdx].scrambledLetters = updatedScrambled;
    setRounds(newRounds);
  };

  const checkSpelling = (guess: string) => {
    const current = rounds[currentRoundIdx];
    if (guess.toLowerCase() === current.targetWord.toLowerCase()) {
      setScore(prev => prev + 10);
      setGameState('feedback');
      handleSpeak(current.targetWord);
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        // Clear selected on error to try again
        resetRound();
      }, 500);
    }
  };

  const resetRound = () => {
    setSelectedLetters([]);
    const current = rounds[currentRoundIdx];
    const resetScrambled = current.scrambledLetters.map(l => ({ ...l, used: false }));
    const newRounds = [...rounds];
    newRounds[currentRoundIdx].scrambledLetters = resetScrambled;
    setRounds(newRounds);
  };

  const nextRound = async () => {
    if (currentRoundIdx < rounds.length - 1) {
      setCurrentRoundIdx(prev => prev + 1);
      setSelectedLetters([]);
      setGameState('playing');
    } else {
      setGameState('finished');
      const stats = await storage.getStats();
      await storage.saveStats({
        ...stats,
        highScoreSpelling: Math.max(stats.highScoreSpelling || 0, score)
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
        <Type className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Нема доволно зборови</h2>
        <p className="text-muted-foreground mb-8">Мора да имате барем 5 збора во вокабуларот за да ја играте оваа игра.</p>
        <Link href="/">
          <Button className="rounded-2xl px-8 bg-primary text-white">Назад до почетна</Button>
        </Link>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Trophy className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-black text-primary mb-2">Одлично!</h2>
        <p className="text-muted-foreground mb-8">Погоди {score / 10} зборови и освои {score} поени.</p>
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

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto flex flex-col font-body overflow-hidden">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold">Германски Спелувач</h1>
          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            Збор {currentRoundIdx + 1} од {rounds.length}
          </div>
        </div>
        <div className="bg-primary/10 px-3 py-1 rounded-full text-primary font-black text-sm border border-primary/20">
          {score}
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Card className="p-8 rounded-3xl border-none shadow-xl mb-10 bg-card flex flex-col items-center text-center">
          <div className="text-xs font-bold text-muted-foreground uppercase mb-4 tracking-widest">Погоди го зборот за:</div>
          <p className="text-3xl font-black text-primary mb-4">{current.word.translation}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full px-4 h-8 bg-primary/5 border-primary/10 text-primary font-bold"
            onClick={() => handleSpeak(current.targetWord)}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            СЛУШАЈ
          </Button>
        </Card>

        {/* Selected Letters Area */}
        <div className={cn(
          "min-h-[80px] mb-8 p-4 bg-secondary/10 rounded-2xl border-2 border-dashed border-secondary flex flex-wrap gap-2 justify-center content-center transition-all duration-300",
          shake && "animate-shake bg-red-50 border-destructive/20"
        )}>
          {selectedLetters.map((letter, idx) => (
            <Button
              key={`selected-${idx}`}
              variant="secondary"
                className="w-10 h-12 text-xl font-black rounded-xl bg-card shadow-sm hover:bg-destructive/10 hover:text-destructive group"
              onClick={() => handleRemoveLetter(idx)}
              disabled={gameState !== 'playing'}
            >
              <span className="group-hover:hidden">{letter.char}</span>
              <XCircle className="w-5 h-5 hidden group-hover:block" />
            </Button>
          ))}
          {selectedLetters.length === 0 && (
            <div className="text-muted-foreground/30 text-[10px] font-black uppercase tracking-widest">
              Кликни на буквите
            </div>
          )}
        </div>

        {/* Scrambled Letters Area */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {current.scrambledLetters.map((letterObj) => (
              <Button
                key={letterObj.id}
                variant="outline"
                className={cn(
                  "w-12 h-14 text-2xl font-black rounded-xl border-2 shadow-md transition-all active:scale-90",
                  letterObj.used && "opacity-0 pointer-events-none"
                )}
                onClick={() => handleLetterClick(letterObj)}
                disabled={gameState !== 'playing'}
              >
                {letterObj.char}
              </Button>
            ))}
          </div>
        </div>

        {gameState === 'feedback' && (
          <Card className="p-6 bg-green-50 dark:bg-green-900/30 rounded-3xl border-none shadow-lg animate-in slide-in-from-bottom duration-300 mb-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-xl text-green-700">Точно!</h3>
                  <p className="text-green-600 font-bold text-2xl tracking-tight">"{current.targetWord}"</p>
                </div>
                <Button className="rounded-xl py-6 px-6 font-bold shadow-md bg-green-600 hover:bg-green-700" onClick={nextRound}>
                  СЛЕДНО
                </Button>
             </div>
          </Card>
        )}

        <div className="pb-10">
          <Button 
            variant="ghost" 
            className="w-full text-muted-foreground hover:bg-transparent"
            onClick={resetRound}
            disabled={gameState !== 'playing' || selectedLetters.length === 0}
          >
            <Eraser className="w-4 h-4 mr-2" />
            ИСЧИСТИ И ПОЧНИ ПАК
          </Button>
        </div>
      </main>
    </div>
  );
}
