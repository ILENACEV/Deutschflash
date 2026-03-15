
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
  Trophy, 
  RefreshCw, 
  Ear, 
  Zap, 
  CheckCircle2,
  XCircle,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ListeningGamePage() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'feedback' | 'finished'>('idle');
  const [rounds, setRounds] = useState<{ word: VocabularyWord, options: string[] }[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const DEMO_WORDS: VocabularyWord[] = [
    { id: '1', word: 'Apfel', translation: 'јаболко', category: 'noun', sentence_de: 'Ich esse einen Apfel', sentence_mk: 'Јас јадам јаболко', status: 'new', interval: 0, easeFactor: 2.5, swipeCount: { left: 0, right: 0 } },
    { id: '2', word: 'Haus', translation: 'куќа', category: 'noun', sentence_de: 'Das Haus ist groß', sentence_mk: 'Куќата е голема', status: 'new', interval: 0, easeFactor: 2.5, swipeCount: { left: 0, right: 0 } },
    { id: '3', word: 'Auto', translation: 'автомобил', category: 'noun', sentence_de: 'Das Auto ist rot', sentence_mk: 'Автомобилот е црвен', status: 'new', interval: 0, easeFactor: 2.5, swipeCount: { left: 0, right: 0 } },
    { id: '4', word: 'Wasser', translation: 'вода', category: 'noun', sentence_de: 'Ich trinke Wasser', sentence_mk: 'Јас пијам вода', status: 'new', interval: 0, easeFactor: 2.5, swipeCount: { left: 0, right: 0 } },
    { id: '5', word: 'Brot', translation: 'леб', category: 'noun', sentence_de: 'Ich kaufe Brot', sentence_mk: 'Јас купувам леб', status: 'new', interval: 0, easeFactor: 2.5, swipeCount: { left: 0, right: 0 } },
    { id: '6', word: 'Milch', translation: 'млеко', category: 'noun', sentence_de: 'Die Milch ist kalt', sentence_mk: 'Млекото е ладно', status: 'new', interval: 0, easeFactor: 2.5, swipeCount: { left: 0, right: 0 } },
    { id: '7', word: 'Katze', translation: 'мачка', category: 'noun', sentence_de: 'Die Katze schläft', sentence_mk: 'Мачката спие', status: 'new', interval: 0, easeFactor: 2.5, swipeCount: { left: 0, right: 0 } },
    { id: '8', word: 'Hund', translation: 'куче', category: 'noun', sentence_de: 'Der Hund läuft', sentence_mk: 'Кучето трча', status: 'new', interval: 0, easeFactor: 2.5, swipeCount: { left: 0, right: 0 } },
  ];

  useEffect(() => {
    setMounted(true);
    storage.getStats().then(stats => {
      setHighScore(stats.highScoreListening || 0);
    });
  }, []);

  const generateRounds = useCallback(async () => {
    setError(null);
    let vocab = await storage.getVocabulary();
    
    if (vocab.length < 4) {
      vocab = DEMO_WORDS;
    }

    const shuffledVocab = [...vocab].sort(() => 0.5 - Math.random()).slice(0, 10);
    const newRounds = shuffledVocab.map(word => {
      const wrong = vocab
        .filter(v => v.id !== word.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(v => v.translation);
      
      const options = [...wrong, word.translation].sort(() => 0.5 - Math.random());
      return { word, options };
    });

    setRounds(newRounds);
  }, []);

  const startGame = () => {
    generateRounds().then(() => {
      setGameState('playing');
      setCurrentIdx(0);
      setScore(0);
      setSelectedAnswer(null);
    });
  };

  const playAudio = () => {
    if (rounds[currentIdx]) {
      if (!('speechSynthesis' in window)) {
        alert('Твојот прелистувач не поддржува глас. Пробај со Chrome или Safari.');
        return;
      }
      
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(rounds[currentIdx].word.word);
      utterance.lang = 'de-DE';
      utterance.rate = 0.8;
      utterance.onerror = () => {
        alert('Грешка при читање. Провери дали прелистувачот има пристап до микрофон.');
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (gameState === 'playing') {
      setTimeout(playAudio, 500);
    }
  }, [currentIdx, gameState]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === rounds[currentIdx].word.translation;
    if (correct) setScore(prev => prev + 20);
    setGameState('feedback');
  };

  const nextQuestion = () => {
    if (currentIdx < rounds.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setGameState('playing');
    } else {
      setGameState('finished');
      if (score > highScore) {
        setHighScore(score);
        storage.getStats().then(stats => {
          storage.saveStats({ ...stats, highScoreListening: score });
        });
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад кон почетна">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Ear className="w-5 h-5 text-primary" />
          Слухо-Профи
        </h1>
      </header>

      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          {error && (
            <Card className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 w-full">
              <p className="text-red-600 dark:text-red-400 font-medium text-sm">{error}</p>
              <Link href="/words">
                <Button variant="outline" className="mt-3 w-full border-red-300 text-red-600 hover:bg-red-100">
                  Додај зборови
                </Button>
              </Link>
            </Card>
          )}
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <Ear className="w-16 h-16 text-primary" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter">Слушај и препознај</h2>
            <p className="text-muted-foreground text-sm px-4">
              Тренирај го увото! Слушни го германскиот збор и одбери го точниот македонски превод.
            </p>
          </div>
          <Button size="lg" className="w-full py-8 text-xl font-bold rounded-2xl shadow-xl bg-primary text-white" onClick={startGame}>
            ЗАПОЧНИ
          </Button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'feedback') && rounds[currentIdx] && (
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-bold text-muted-foreground">Прашање {currentIdx + 1} / {rounds.length}</div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
              <Zap className="w-5 h-5 text-primary fill-current" />
              <span className="font-black text-lg text-foreground">{score}</span>
            </div>
          </div>

          <Card className="p-10 rounded-[3rem] border-none shadow-2xl mb-10 flex flex-col items-center justify-center text-center bg-card relative overflow-hidden group">
            <Button 
              size="lg" 
              className="w-24 h-24 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all transform active:scale-90"
              onClick={playAudio}
              aria-label="Слушни го зборот"
            >
              <Volume2 className="w-10 h-10" aria-hidden="true" />
            </Button>
            <div className="mt-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest animate-pulse">Кликни за повторно слушање</div>
          </Card>

          <div className="grid grid-cols-1 gap-3">
            {rounds[currentIdx].options.map((opt, idx) => (
              <Button 
                key={idx}
                variant="outline"
                className={cn(
                  "h-16 rounded-2xl border-2 text-lg font-bold transition-all",
                  selectedAnswer === opt && opt === rounds[currentIdx].word.translation && "bg-green-500 border-green-500 text-white",
                  selectedAnswer === opt && opt !== rounds[currentIdx].word.translation && "bg-red-500 border-red-500 text-white",
                  selectedAnswer !== null && opt === rounds[currentIdx].word.translation && "border-green-500 border-dashed"
                )}
                onClick={() => handleAnswer(opt)}
                disabled={gameState === 'feedback'}
              >
                {opt}
              </Button>
            ))}
          </div>

          {gameState === 'feedback' && (
            <div className="mt-8 animate-in slide-in-from-bottom duration-300">
               <Card className={cn(
                 "p-6 rounded-3xl border-none shadow-lg text-center",
                 selectedAnswer === rounds[currentIdx].word.translation ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30"
               )}>
                 <div className="flex flex-col items-center gap-2">
                    <span className="font-black text-2xl text-foreground">"{rounds[currentIdx].word.word}"</span>
                    <span className="text-xs text-muted-foreground font-bold uppercase">{rounds[currentIdx].word.translation}</span>
                 </div>
                 <Button className="w-full mt-6 rounded-xl py-4 font-bold bg-primary text-white" onClick={nextQuestion}>
                   СЛЕДНО
                 </Button>
               </Card>
            </div>
          )}
        </div>
      )}

      {gameState === 'finished' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <Trophy className="w-20 h-20 text-accent" />
          <h2 className="text-4xl font-black text-primary">Крај!</h2>
          <p className="text-muted-foreground">Твојот резултат: {score} поени.</p>
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
