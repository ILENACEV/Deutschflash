"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { storage } from '@/lib/storage';
import { Idiom } from '@/lib/types';
import { 
  ArrowLeft, 
  Timer, 
  Trophy, 
  RefreshCw, 
  Gamepad2, 
  Zap, 
  Info,
  Volume2
} from 'lucide-react';

const GAME_DURATION = 30;

export default function IdiomsGamePage() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentIdiom, setCurrentIdiom] = useState<Idiom | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    storage.getStats().then(stats => {
      setHighScore(stats.highScoreIdioms || 0);
    });
  }, []);

  const generateRound = useCallback(async () => {
    const data = await storage.getIdioms();
    const randomIndex = Math.floor(Math.random() * data.length);
    const correctIdiom = data[randomIndex];
    setCurrentIdiom(correctIdiom);

    const wrongAnswers = data
      .filter(i => i.mk !== correctIdiom.mk)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(i => i.mk);

    const allOptions = [...wrongAnswers, correctIdiom.mk].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setLastAnswerCorrect(null);
  }, []);

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(GAME_DURATION);
    setScore(0);
    generateRound().then(() => {});
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished');
      if (score > highScore) {
        setHighScore(score);
        storage.getStats().then(stats => {
          storage.saveStats({ ...stats, highScoreIdioms: score });
        });
      }
    }
  }, [gameState, timeLeft, score, highScore]);

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (answer: string) => {
    if (answer === currentIdiom?.mk) {
      setScore(prev => prev + 10);
      setTimeLeft(prev => Math.min(prev + 3, GAME_DURATION + 10));
      setLastAnswerCorrect(true);
      setTimeout(generateRound, 500);
    } else {
      setLastAnswerCorrect(false);
      setTimeLeft(prev => Math.max(prev - 5, 0));
      setTimeout(generateRound, 500);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-primary" />
          Идиом Блиц
        </h1>
      </header>

      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <Timer className="w-16 h-16 text-primary" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-foreground">Колку ги познаваш идиомите?</h2>
            <p className="text-muted-foreground text-sm px-4">
              Погоди го значењето на германскиот идиом пред да истече времето. Секој точен одговор ти дава +3 секунди!
            </p>
          </div>
          <Button size="lg" className="w-full py-8 text-xl font-bold rounded-2xl shadow-xl" onClick={startGame}>
            ЗАПОЧНИ ИГРА
          </Button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className={`flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border ${timeLeft < 10 ? "border-destructive/20" : "border-accent/20"}`}>
              <Timer className={`w-5 h-5 ${timeLeft < 10 ? "text-destructive animate-bounce" : "text-primary"}`} />
              <span className={`font-black text-lg ${timeLeft < 10 ? "text-destructive" : "text-primary"}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border border-accent/20">
              <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-black text-lg text-foreground">{score}</span>
            </div>
          </div>

          <Progress value={(timeLeft / GAME_DURATION) * 100} className="mb-10 h-3 bg-secondary" />

          <Card className={`p-8 rounded-3xl border-none shadow-xl mb-10 min-h-[220px] flex flex-col items-center justify-center text-center transition-all duration-300 relative ${
            lastAnswerCorrect === true ? "bg-green-50 dark:bg-green-900/30 scale-105" : ""
          } ${
            lastAnswerCorrect === false ? "bg-red-50 dark:bg-red-900/30" : ""
          }`}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 rounded-full text-primary hover:bg-secondary/50"
              onClick={() => handleSpeak(currentIdiom?.de || '')}
            >
              <Volume2 className="w-6 h-6" />
            </Button>
            
            <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Германски Идиом</div>
            <h3 className="text-2xl font-bold text-foreground leading-tight">
              "{currentIdiom?.de}"
            </h3>
            <div className="mt-6 flex items-center gap-2 text-muted-foreground/50 text-xs italic">
              <Info className="w-3 h-3" />
              Буквално: {currentIdiom?.literal}
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-3">
            {options.map((opt, idx) => (
              <Button 
                key={idx}
                variant="outline"
                className="h-16 rounded-2xl border-2 text-sm font-bold bg-card hover:bg-primary/5 hover:border-primary transition-all active:scale-95"
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'finished' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center animate-bounce shadow-inner">
            <Trophy className="w-16 h-16 text-accent" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-primary">Крај на играта!</h2>
            <p className="text-muted-foreground">Твојот резултат е {score} поени.</p>
          </div>

          <div className="w-full space-y-3 pt-8">
            <Button size="lg" className="w-full py-8 text-xl font-bold rounded-2xl" onClick={startGame}>
              <RefreshCw className="w-6 h-6 mr-2" />
              ИГРАЈ ПОВТОРНО
            </Button>
            <Link href="/" className="w-full block">
              <Button variant="ghost" size="lg" className="w-full py-8 text-lg font-bold rounded-2xl text-muted-foreground">
                Назад до Контролна Табла
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
