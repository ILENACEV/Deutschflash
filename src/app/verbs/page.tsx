"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { storage } from '@/lib/storage';
import { VerbData } from '@/lib/types';
import { 
  ArrowLeft, 
  Timer, 
  Trophy, 
  RefreshCw, 
  Sword, 
  Zap, 
  Volume2,
  BookCheck,
  BrainCircuit
} from 'lucide-react';

const GAME_DURATION = 45;

type QuestionType = 'praesens' | 'praeteritum' | 'perfekt' | 'rektion';

interface Round {
  verb: VerbData;
  type: QuestionType;
  correctAnswer: string;
  options: string[];
}

export default function VerbsGamePage() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    storage.getStats().then(stats => {
      setHighScore(stats.highScoreVerbs || 0);
    });
  }, []);

  const generateRound = useCallback(async () => {
    const data = await storage.getVerbs();
    const verb = data[Math.floor(Math.random() * data.length)];
    
    const types: QuestionType[] = ['praesens', 'praeteritum', 'perfekt'];
    if (verb.rektion) types.push('rektion');
    const type = types[Math.floor(Math.random() * types.length)];
    
    let correctAnswer = '';
    if (type === 'praesens') correctAnswer = verb.praesens;
    else if (type === 'praeteritum') correctAnswer = verb.praeteritum;
    else if (type === 'perfekt') correctAnswer = verb.perfekt;
    else if (type === 'rektion') correctAnswer = verb.rektion || '';

    const wrongAnswers = data
      .filter(v => v.infinitiv !== verb.infinitiv)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(v => {
        if (type === 'praesens') return v.praesens;
        if (type === 'praeteritum') return v.praeteritum;
        if (type === 'perfekt') return v.perfekt;
        return v.rektion || 'mit + Dat';
      });

    const options = Array.from(new Set([...wrongAnswers, correctAnswer])).sort(() => 0.5 - Math.random());
    
    setCurrentRound({ verb, type, correctAnswer, options });
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
    } else if (timeLeft <= 0 && gameState === 'playing') {
      setGameState('finished');
      if (score > highScore) {
        setHighScore(score);
        storage.getStats().then(stats => {
          storage.saveStats({ ...stats, highScoreVerbs: score });
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
    if (answer === currentRound?.correctAnswer) {
      setScore(prev => prev + 15);
      setTimeLeft(prev => Math.min(prev + 2, GAME_DURATION + 5));
      setLastAnswerCorrect(true);
      setTimeout(generateRound, 400);
    } else {
      setLastAnswerCorrect(false);
      setTimeLeft(prev => Math.max(prev - 4, 0));
      setTimeout(generateRound, 400);
    }
  };

  const getQuestionLabel = (type: QuestionType) => {
    switch(type) {
      case 'praesens': return 'Präsens (er/sie/es)';
      case 'praeteritum': return 'Präteritum (er/sie/es)';
      case 'perfekt': return 'Perfekt';
      case 'rektion': return 'Rektion (Препозиција + Падеж)';
      default: return '';
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
          <BookCheck className="w-5 h-5 text-primary" />
          Глаголски Мајстор
        </h1>
      </header>

      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <BrainCircuit className="w-16 h-16 text-primary" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-foreground">Времиња и Рекција</h2>
            <p className="text-muted-foreground text-sm px-4">
              Погоди ја точната форма на глаголот или неговата препозиција. Брзината е клучна за висок резултат!
            </p>
          </div>
          <Button size="lg" className="w-full py-8 text-xl font-bold rounded-2xl shadow-xl bg-primary" onClick={startGame}>
            ЗАПОЧНИ ПРЕДИЗВИК
          </Button>
        </div>
      )}

      {gameState === 'playing' && currentRound && (
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className={`flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border ${timeLeft < 10 ? "border-destructive/20" : "border-accent/20"}`}>
              <Timer className={`w-5 h-5 ${timeLeft < 10 ? "text-destructive animate-bounce" : "text-primary"}`} />
              <span className={`font-black text-lg ${timeLeft < 10 ? "text-destructive" : "text-primary"}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border border-accent/20">
              <Sword className="w-5 h-5 text-primary" />
              <span className="font-black text-lg text-foreground">{score}</span>
            </div>
          </div>

          <Progress value={(timeLeft / GAME_DURATION) * 100} className="mb-10 h-3 bg-secondary" />

          <Card className={`p-8 rounded-3xl border-none shadow-xl mb-10 min-h-[200px] flex flex-col items-center justify-center text-center transition-all duration-300 relative ${
            lastAnswerCorrect === true ? "bg-green-50 dark:bg-green-900/30 scale-105" : ""
          } ${
            lastAnswerCorrect === false ? "bg-red-50 dark:bg-red-900/30" : ""
          }`}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 rounded-full text-primary hover:bg-secondary/50"
              onClick={() => handleSpeak(currentRound.verb.infinitiv)}
            >
              <Volume2 className="w-6 h-6" />
            </Button>
            
            <div className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Глагол: {currentRound.verb.translation}</div>
            <h3 className="text-4xl font-black text-foreground mb-4">
              {currentRound.verb.infinitiv}
            </h3>
            <div className="px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-bold">
              {getQuestionLabel(currentRound.type)}
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {currentRound.options.map((opt, idx) => (
              <Button 
                key={idx}
                variant="outline"
                className="h-20 rounded-2xl border-2 text-base font-bold bg-card hover:bg-primary/5 hover:border-primary transition-all active:scale-95 text-center flex items-center justify-center leading-tight"
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
          <div className="w-32 h-32 bg-yellow-400/20 rounded-full flex items-center justify-center animate-bounce shadow-inner">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-primary">Одлично!</h2>
            <p className="text-muted-foreground">Освои {score} поени во Глаголски Мајстор.</p>
          </div>

          <div className="w-full space-y-3 pt-8">
            <Button size="lg" className="w-full py-8 text-xl font-bold rounded-2xl bg-primary" onClick={startGame}>
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
