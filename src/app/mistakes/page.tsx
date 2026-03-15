"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { VocabularyWord, UserStats } from '@/lib/types';
import { calculateSpacedRepetition } from '@/lib/sr-logic';
import { VocabularyCard } from '@/components/VocaSwipe/VocabularyCard';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Trophy, ArrowRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface UndoState {
  previousWord: VocabularyWord | null;
  previousResults: { correct: number; incorrect: number };
}

export default function MistakesSessionPage() {
  const router = useRouter();
  const [sessionWords, setSessionWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState({ correct: 0, incorrect: 0 });
  const [mounted, setMounted] = useState(false);
  const undoRef = useRef<UndoState>({ previousWord: null, previousResults: { correct: 0, incorrect: 0 } });

  useEffect(() => {
    setMounted(true);
    async function loadData() {
      const vocab = await storage.getVocabulary();
      
      // Филтрирај само зборови со статус 'difficult' или тие што имаат грешки
      const difficultWords = vocab.filter(w => 
        w.status === 'difficult' || 
        (w.swipeCount && w.swipeCount.left > 0)
      );

      if (difficultWords.length === 0) {
        router.push('/');
        return;
      }
      
      // Мешај ги зборовите случајно
      const shuffled = difficultWords.sort(() => Math.random() - 0.5);
      // Ограничи на 20 зборови максимално
      setSessionWords(shuffled.slice(0, 20));
    }
    loadData();
  }, [router]);

  const handleSwipe = useCallback(async (known: boolean) => {
    const currentWord = sessionWords[currentIndex];
    undoRef.current = {
      previousWord: currentWord,
      previousResults: { ...results }
    };

    setResults(prev => ({
      ...prev,
      correct: known ? prev.correct + 1 : prev.correct,
      incorrect: !known ? prev.incorrect + 1 : prev.incorrect
    }));

    const updatedWord = calculateSpacedRepetition(currentWord, known);

    const fullVocab = await storage.getVocabulary();
    const newVocab = fullVocab.map(v => v.id === updatedWord.id ? updatedWord : v);
    await storage.saveVocabulary(newVocab);

    if (currentIndex < sessionWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      const stats = await storage.getStats();
      const today = new Date().setHours(0,0,0,0);
      
      const updatedStats: UserStats = {
        ...stats,
        difficultWordsCount: newVocab.filter(v => v.status === 'difficult').length,
      };
      await storage.saveStats(updatedStats);

      await storage.saveSession({
        id: Math.random().toString(36).substr(2, 9),
        date: Date.now(),
        wordCount: sessionWords.length,
        correctCount: results.correct + (known ? 1 : 0),
        incorrectCount: results.incorrect + (!known ? 1 : 0)
      });
    }
  }, [currentIndex, sessionWords, results]);

  const handleUndo = useCallback(async () => {
    const { previousWord, previousResults } = undoRef.current;
    if (!previousWord || currentIndex === 0) return;

    const fullVocab = await storage.getVocabulary();
    const restoredVocab = fullVocab.map(v => {
      if (v.id === previousWord.id) {
        return previousWord;
      }
      return v;
    });
    await storage.saveVocabulary(restoredVocab);

    setResults(previousResults);
    setCurrentIndex(prev => prev - 1);
    undoRef.current = { previousWord: null, previousResults: { correct: 0, incorrect: 0 } };
  }, [currentIndex]);

  const canUndo = currentIndex > 0 && undoRef.current.previousWord !== null;

  if (!mounted) return null;
  if (sessionWords.length === 0) return null;

  if (isFinished) {
    const accuracy = sessionWords.length > 0 
      ? Math.round((results.correct / sessionWords.length) * 100) 
      : 0;
    
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center">
        <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mb-8 shadow-xl animate-bounce">
          {accuracy >= 70 ? (
            <Trophy className="w-12 h-12 text-amber-600" />
          ) : (
            <AlertTriangle className="w-12 h-12 text-amber-600" />
          )}
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">
          {accuracy >= 70 ? 'Одлично!' : 'Продолжи да вежбаш!'}
        </h1>
        <p className="text-muted-foreground mb-8">
          Прегледа {sessionWords.length} зборови. Точност: {accuracy}%
        </p>
        
        <div className="w-full grid grid-cols-2 gap-4 mb-8">
          <div className="bg-card p-4 rounded-2xl border border-accent/20">
            <div className="text-2xl font-bold text-primary">{results.correct}</div>
            <div className="text-xs uppercase text-muted-foreground">Знаев</div>
          </div>
          <div className="bg-card p-4 rounded-2xl border border-accent/20">
            <div className="text-2xl font-bold text-destructive">{results.incorrect}</div>
            <div className="text-xs uppercase text-muted-foreground">Повтори</div>
          </div>
        </div>

        <Link href="/" className="w-full">
          <Button size="lg" className="w-full py-6 font-bold rounded-xl shadow-lg">
            Врати се на Почеток
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    );
  }

  const progress = ((currentIndex) / sessionWords.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 max-w-md mx-auto overflow-hidden">
      <header className="flex items-center justify-between mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex-1 px-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-amber-600">Мои Грешки</span>
          </div>
          <Progress value={progress} className="h-2 bg-secondary" />
        </div>
        <div className="text-sm font-bold text-primary">
          {currentIndex + 1}/{sessionWords.length}
        </div>
      </header>

      <main className="flex-1 relative mt-4">
        {sessionWords.slice(currentIndex, currentIndex + 2).map((word, idx) => (
          <VocabularyCard 
            key={word.id} 
            word={word} 
            isTop={idx === 0} 
            onSwipe={handleSwipe}
            onUndo={handleUndo}
            canUndo={canUndo}
          />
        )).reverse()}
      </main>

      <footer className="h-24 flex items-center justify-center">
        <p className="text-xs text-muted-foreground italic">
          Овие зборови претходно ги знаеше погрешно. Сега е шанса да ги научиш!
        </p>
      </footer>
    </div>
  );
}
