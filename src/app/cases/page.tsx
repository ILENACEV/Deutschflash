"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { storage } from '@/lib/storage';
import { CaseQuestion } from '@/lib/types';
import { 
  ArrowLeft, 
  Trophy, 
  RefreshCw, 
  Scale, 
  Zap, 
  Info,
  CheckCircle2,
  XCircle,
  Lightbulb
} from 'lucide-react';

export default function CasesGamePage() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'feedback' | 'finished'>('idle');
  const [questions, setQuestions] = useState<CaseQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    storage.getStats().then(stats => {
      setHighScore(stats.highScoreCases || 0);
    });
  }, []);

  const startGame = () => {
    storage.getCases().then(data => {
      const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 10);
      setQuestions(shuffled);
      setGameState('playing');
      setCurrentIdx(0);
      setScore(0);
      setSelectedAnswer(null);
    });
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentIdx].correct;
    if (correct) setScore(prev => prev + 20);
    setGameState('feedback');
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setGameState('playing');
    } else {
      setGameState('finished');
      if (score > highScore) {
        setHighScore(score);
        storage.getStats().then(stats => {
          storage.saveStats({ ...stats, highScoreCases: score });
        });
      }
    }
  };

  if (!mounted) return null;

  const q = questions[currentIdx];

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          Падежен Мајстор
        </h1>
      </header>

      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <Scale className="w-16 h-16 text-primary" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter">Nominativ, Akkusativ, Dativ?</h2>
            <p className="text-muted-foreground text-sm px-4">
              Вежбај ја промената на членовите во реални реченици. Секој точен одговор носи 20 поени и кратко граматичко објаснување!
            </p>
          </div>
          <Card className="p-4 bg-accent/5 border-none rounded-2xl flex items-start gap-3 text-left">
            <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-1" />
            <p className="text-xs font-medium text-muted-foreground italic">
              Совет: Гледај го глаголот и предлогот пред празнината. Тие се клучот за точниот падеж.
            </p>
          </Card>
          <Button size="lg" className="w-full py-8 text-xl font-bold rounded-2xl shadow-xl bg-primary text-white" onClick={startGame}>
            ЗАПОЧНИ
          </Button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'feedback') && q && (
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-bold text-muted-foreground">Прашање {currentIdx + 1} / {questions.length}</div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border border-accent/20">
              <Zap className="w-5 h-5 text-primary fill-current" />
              <span className="font-black text-lg text-foreground">{score}</span>
            </div>
          </div>

          <Progress value={((currentIdx + 1) / questions.length) * 100} className="mb-10 h-3 bg-secondary" />

          <Card className="p-8 rounded-3xl border-none shadow-xl mb-10 min-h-[180px] flex flex-col items-center justify-center text-center bg-card relative overflow-hidden">
            <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-4">Пополни го членот</div>
            <h3 className="text-2xl font-bold text-foreground leading-tight">
              {q.sentence.split('___').map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i === 0 && (
                    <span className={selectedAnswer ? (selectedAnswer === q.correct ? "text-green-600 underline" : "text-red-600 underline") : "text-primary underline"}>
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
                className={`h-16 rounded-2xl border-2 text-xl font-black transition-all transform active:scale-95 ${
                  selectedAnswer === opt && opt === q.correct ? "bg-green-500 border-green-500 text-white" : ""
                } ${
                  selectedAnswer === opt && opt !== q.correct ? "bg-red-500 border-red-500 text-white" : ""
                } ${
                  selectedAnswer !== null && opt === q.correct ? "border-green-500 border-dashed" : ""
                }`}
                onClick={() => handleAnswer(opt)}
                disabled={gameState === 'feedback'}
              >
                {opt}
              </Button>
            ))}
          </div>

          {gameState === 'feedback' && (
            <div className="mt-8 animate-in slide-in-from-bottom duration-300">
               <Card className={`p-6 rounded-3xl border-none shadow-lg ${selectedAnswer === q.correct ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30"}`}>
                 <div className="flex items-center gap-3 mb-2">
                   {selectedAnswer === q.correct ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <XCircle className="w-6 h-6 text-red-600" />}
                   <span className="font-black text-lg">{selectedAnswer === q.correct ? "Точно!" : "Неточно!"}</span>
                 </div>
                 <div className="space-y-3">
                   <p className="text-xs font-bold text-muted-foreground italic">
                     {q.explanation}
                   </p>
                   <div className="bg-card/50 p-3 rounded-xl text-xs font-medium border border-accent/10 flex items-start gap-2">
                     <Info className="w-4 h-4 text-primary shrink-0" />
                     <span>Правило: {q.hint}</span>
                   </div>
                 </div>
                 <Button className="w-full mt-6 rounded-xl py-6 font-bold shadow-md bg-primary text-white" onClick={nextQuestion}>
                   СЛЕДНО ПРАШАЊЕ
                 </Button>
               </Card>
            </div>
          )}
        </div>
      )}

      {gameState === 'finished' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
          <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center animate-bounce shadow-inner">
            <Trophy className="w-16 h-16 text-accent" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-primary">Браво!</h2>
            <p className="text-muted-foreground">Твојот резултат е {score} поени во Падежен Мајстор.</p>
          </div>

          <div className="w-full space-y-3 pt-8">
            <Button size="lg" className="w-full py-8 text-xl font-bold rounded-2xl bg-primary text-white shadow-xl" onClick={startGame}>
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
