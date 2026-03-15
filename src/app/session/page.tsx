"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { VocabularyWord, UserStats } from '@/lib/types';
import { sortWordsForSession, calculateSpacedRepetition } from '@/lib/sr-logic';
import { VocabularyCard } from '@/components/VocaSwipe/VocabularyCard';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface UndoState {
  previousWord: VocabularyWord | null;
  previousResults: { correct: number; incorrect: number };
}

export default function SessionPage() {
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
      const settings = await storage.getSettings();
      const words = sortWordsForSession(vocab, settings.sessionSize);
      
      if (words.length === 0) {
        router.push('/import');
        return;
      }
      
      setSessionWords(words);
    }
    loadData();
  }, [router]);

  const handleSwipe = useCallback(async (known: boolean) => {
    if (currentIndex >= sessionWords.length || currentIndex < 0) {
      console.error('Invalid current index:', currentIndex);
      return;
    }
    
    const currentWord = sessionWords[currentIndex];
    if (!currentWord) {
      console.error('Current word is undefined');
      return;
    }
    
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
      let newStreak = stats.streak;
      
      if (!stats.lastSessionDate || (today - stats.lastSessionDate) === 86400000) {
        newStreak += 1;
      } else if ((today - stats.lastSessionDate) > 86400000) {
        newStreak = 1;
      }

      const updatedStats: UserStats = {
        totalLearned: stats.totalLearned + (known ? 1 : 0),
        streak: newStreak,
        lastSessionDate: today,
        difficultWordsCount: newVocab.filter(v => v.status === 'difficult').length,
        dailyGoal: stats.dailyGoal,
        experience: stats.experience
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

    // Restore previous word from IndexedDB
    const fullVocab = await storage.getVocabulary();
    // Reset the word status to what it was before
    const restoredVocab = fullVocab.map(v => {
      if (v.id === previousWord.id) {
        return previousWord;
      }
      return v;
    });
    await storage.saveVocabulary(restoredVocab);

    // Restore results
    setResults(previousResults);
    
    // Go back to previous card
    setCurrentIndex(prev => prev - 1);
    
    // Clear undo state
    undoRef.current = { previousWord: null, previousResults: { correct: 0, incorrect: 0 } };
  }, [currentIndex]);

  const canUndo = currentIndex > 0 && undoRef.current.previousWord !== null;

  const safeCurrentIndex = Math.max(0, Math.min(currentIndex, sessionWords.length - 1));

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background p-6 max-w-md mx-auto flex flex-col">
        <header className="flex items-center justify-between mb-12">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-2 w-32" />
          <Skeleton className="h-6 w-10" />
        </header>
        <main className="flex-1 flex flex-col items-center justify-center">
          <Skeleton className="h-64 w-full rounded-3xl mb-8" />
          <div className="flex gap-4 w-full">
            <Skeleton className="h-16 flex-1 rounded-2xl" />
            <Skeleton className="h-16 flex-1 rounded-2xl" />
          </div>
        </main>
      </div>
    );
  }
  if (sessionWords.length === 0) return null;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center">
        <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mb-8 shadow-xl animate-bounce">
          <Trophy className="w-12 h-12 text-accent-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">Session Complete!</h1>
        <p className="text-muted-foreground mb-8">You've reviewed {sessionWords.length} words today.</p>
        
        <div className="w-full grid grid-cols-2 gap-4 mb-8">
          <div className="bg-card p-4 rounded-2xl border border-accent/20">
            <div className="text-2xl font-bold text-primary">{results.correct}</div>
            <div className="text-xs uppercase text-muted-foreground">Known</div>
          </div>
          <div className="bg-card p-4 rounded-2xl border border-accent/20">
            <div className="text-2xl font-bold text-destructive">{results.incorrect}</div>
            <div className="text-xs uppercase text-muted-foreground">Review</div>
          </div>
        </div>

        <Link href="/" className="w-full">
          <Button size="lg" className="w-full py-6 font-bold rounded-xl shadow-lg">
            Back to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    );
  }

  const progress = ((safeCurrentIndex) / sessionWords.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 max-w-md mx-auto overflow-hidden">
      <header className="flex items-center justify-between mb-12">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex-1 px-8">
          <Progress value={progress} className="h-2 bg-secondary" />
        </div>
        <div className="text-sm font-bold text-primary">
          {safeCurrentIndex + 1}/{sessionWords.length}
        </div>
      </header>

      <main className="flex-1 relative mt-4">
        {/* Render stack - only top 2 cards for performance */}
        {sessionWords.slice(safeCurrentIndex, safeCurrentIndex + 2).map((word, idx) => (
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
        <p className="text-xs text-muted-foreground italic">Swipe right if known, left to review</p>
      </footer>
    </div>
  );
}