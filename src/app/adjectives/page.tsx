"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { storage } from '@/lib/storage';
import { AdjectiveQuestion } from '@/lib/types';
import { 
  ArrowLeft, 
  Trophy, 
  Sparkles, 
  Zap
} from 'lucide-react';

export default function AdjectivesGamePage() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'feedback' | 'finished'>('idle');
  const [questions, setQuestions] = useState<AdjectiveQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    storage.getStats().then(stats => {
      setHighScore(stats.highScoreAdjectives || 0);
    });
  }, []);

  const startGame = () => {
    storage.getAdjectives().then(data => {
      const shuffled = [...data];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setQuestions(shuffled);
      setGameState('playing');
      setCurrentIdx(0);
      setScore(0);
      setSelectedAnswer(null);
    });
  };

  const handleAnswer = (answer: string) => {
    if (gameState !== 'playing') return;
    setSelectedAnswer(answer);
    const correct = answer === questions[currentIdx].correct;
    if (correct) setScore(prev => prev + 25);
    setGameState('feedback');
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setGameState('playing');
    } else {
      const finalScore = score;
      setGameState('finished');

      if (finalScore > highScore) {
        setHighScore(finalScore);
        storage.getStats().then(stats => {
          storage.saveStats({ ...stats, highScoreAdjectives: finalScore });
        });
      }
    }
  };

  if (!mounted) return null;

  const q = questions.length > 0 ? questions[currentIdx] : null;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Аџектив-Мастер
        </h1>
      </header>

      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-16 h-16 text-primary" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter">Наставки на придавки</h2>
            <p className="text-muted-foreground text-sm px-4">
              Погоди ја точната наставка на придавката врз основа на родот и падежот.
            </p>
          </div>
          <Button size="lg" className="w-full py-8 text-xl font-bold rounded-2xl shadow-xl bg-primary text-white" onClick={startGame}>
            ЗАПОЧНИ
          </Button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'feedback') && q && (
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-bold text-muted-foreground">Вежба {currentIdx + 1} / {questions.length}</div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border">
              <Zap className="w-5 h-5 text-primary fill-current" />
              <span className="font-black text-lg text-foreground">{score}</span>
            </div>
          </div>

          <Progress value={((currentIdx + 1) / questions.length) * 100} className="mb-10 h-3 bg-secondary" />

          <Card className="p-8 rounded-3xl border shadow-xl mb-10 min-h-[180px] flex flex-col items-center justify-center text-center bg-card">
            <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-4">Дополни ја придавката</div>
            <h3 className="text-2xl font-bold text-foreground leading-tight tracking-tight">
              {q?.sentence.split('__').map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i === 0 && (
                    <span className={selectedAnswer ? (selectedAnswer === q?.correct ? "text-green-600 underline" : "text-red-600 underline") : "text-primary underline"}>
                      {selectedAnswer || "___"}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </h3>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt, idx) => (
              <Button 
                key={idx}
                variant="outline"
                className={`h-16 rounded-2xl border-2 text-xl font-black transition-all bg-background ${
                  selectedAnswer === opt && opt === q.correct ? "bg-green-500 border-green-500 text-white" : ""
                } ${
                  selectedAnswer === opt && opt !== q.correct ? "bg-red-500 border-red-500 text-white" : ""
                } ${
                  selectedAnswer !== null && opt === q.correct ? "border-green-500" : ""
                }`}
                onClick={() => handleAnswer(opt)}
                disabled={gameState === 'feedback'}
              >
                -{opt}
              </Button>
            ))}
          </div>

          {gameState === 'feedback' && (
            <div className="mt-8 animate-in slide-in-from-bottom duration-300">
               <Card className={`p-6 rounded-3xl border-none shadow-lg ${selectedAnswer === q.correct ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30"}`}>
                 <p className="text-sm font-bold mb-2">{selectedAnswer === q.correct ? "Одлично!" : "Погрешно."}</p>
                 <p className="text-xs text-muted-foreground mb-4">{q.explanation}</p>
                 <Button className="w-full rounded-xl py-4 font-bold bg-primary text-white" onClick={nextQuestion}>
                   СЛЕДНО
                 </Button>
               </Card>
            </div>
          )}
        </div>
      )}

      {gameState === 'finished' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
          <Trophy className="w-20 h-20 text-accent mb-4" />
          <h2 className="text-4xl font-black text-primary">Браво!</h2>
          <p className="text-muted-foreground">Твојот резултат е {score} поени.</p>
          <Button size="lg" className="w-full py-6 text-xl font-bold rounded-2xl bg-primary text-white" onClick={startGame}>
            ИГРАЈ ПОВТОРНО
          </Button>
          <Link href="/" className="w-full block">
            <Button variant="ghost" className="w-full text-muted-foreground">Назад</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
