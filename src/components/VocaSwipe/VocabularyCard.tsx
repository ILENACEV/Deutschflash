
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { VocabularyWord, WordCategory, Gender } from '@/lib/types';
import { RotateCcw, Info, Volume2, Undo2 } from 'lucide-react';

interface VocabularyCardProps {
  word: VocabularyWord;
  isTop: boolean;
  onSwipe: (known: boolean) => void;
  onUndo?: () => void;
  canUndo?: boolean;
  className?: string;
}

const CATEGORY_LABELS: Record<WordCategory, string> = {
  noun: 'Именка',
  verb: 'Глагол',
  adjective: 'Придавка',
  adverb: 'Прилог',
  preposition: 'Предлог',
  pronoun: 'Заменка',
  conjunction: 'Сврзник',
  article: 'Член',
  phrase: 'Фраза',
  other: 'Друго'
};

const GENDER_COLORS: Record<string, string> = {
  der: 'bg-blue-500 text-white',
  die: 'bg-red-500 text-white',
  das: 'bg-green-500 text-white',
  plural: 'bg-yellow-500 text-yellow-950 dark:text-yellow-900'
};

export function VocabularyCard({ word, isTop, onSwipe, onUndo, canUndo, className }: VocabularyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);

  // Haptic feedback function
  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' | 'success' | 'error') => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      const patterns: Record<string, number | number[]> = {
        light: 10,
        medium: 25,
        heavy: 50,
        success: [0, 30, 50, 30],
        error: [0, 50, 50, 50],
      };
      navigator.vibrate(patterns[type] as number);
    }
  }, []);

  const handleSpeak = (text: string, lang: string = 'de-DE') => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Автоматско пуштање на звукот кога картичката ќе дојде најгоре
  useEffect(() => {
    if (isTop) {
      handleSpeak(word.word);
    }
  }, [isTop, word.word]);

  const handleFlip = () => {
    if (!isTop) return;
    triggerHaptic('light');
    setIsFlipped(!isFlipped);
  };

  const handleSwipe = (dir: 'left' | 'right') => {
    if (!isTop) return;
    triggerHaptic(dir === 'right' ? 'success' : 'error');
    setSwipeDir(dir);
    setTimeout(() => onSwipe(dir === 'right'), 300);
  };

  const handleUndo = () => {
    if (canUndo && onUndo) {
      triggerHaptic('medium');
      onUndo();
    }
  };

  const isEmoji = word.image && word.image.length < 5;

  return (
    <div 
      className={cn(
        "absolute inset-0 w-full h-[500px] perspective-1000 transition-all duration-300",
        !isTop && "scale-95 translate-y-4 opacity-50 pointer-events-none",
        swipeDir === 'right' && "animate-swipe-right",
        swipeDir === 'left' && "animate-swipe-left",
        className
      )}
    >
      <div 
        onClick={handleFlip}
        className={cn(
          "relative w-full h-full cursor-pointer transition-transform duration-500 preserve-3d shadow-xl rounded-2xl",
          isFlipped && "rotate-y-180"
        )}
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <Card className={cn(
          "absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-8 border-none rounded-2xl transition-colors duration-500 bg-card"
        )}>
          {word.category === 'noun' && word.gender && (
            <div className={cn(
              "absolute top-0 left-0 right-0 h-2 rounded-t-2xl",
              GENDER_COLORS[word.gender]
            )} />
          )}

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="font-bold">
              {CATEGORY_LABELS[word.category]}
            </Badge>
            {word.gender && (
              <Badge className={cn("font-black", GENDER_COLORS[word.gender])}>
                {word.gender.toUpperCase()}
              </Badge>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 rounded-full text-primary hover:bg-secondary/50"
            onClick={(e) => {
              e.stopPropagation();
              handleSpeak(word.word);
            }}
          >
            <Volume2 className="w-6 h-6" />
          </Button>
          
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Deutsch</div>
          
          <div className="w-32 h-32 mb-8 flex items-center justify-center bg-secondary/30 rounded-full overflow-hidden border-4 border-white/20 shadow-inner">
            {isEmoji ? (
              <span className="text-6xl">{word.image}</span>
            ) : word.image ? (
              <img src={word.image} alt={word.word} className="w-full h-full object-cover" />
            ) : (
              <Info className="w-12 h-12 text-primary/40" />
            )}
          </div>

          <h2 className={cn(
            "text-5xl font-black mb-4 text-center tracking-tighter",
            word.category === 'noun' && word.gender === 'der' && "text-blue-600 dark:text-blue-400",
            word.category === 'noun' && word.gender === 'die' && "text-red-600 dark:text-red-400",
            word.category === 'noun' && word.gender === 'das' && "text-green-600 dark:text-green-400"
          )}>
            {word.word}
          </h2>

          <div className="mt-auto flex items-center gap-2 text-muted-foreground animate-pulse">
            <RotateCcw className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Кликни за превод</span>
          </div>
        </Card>

        {/* Back */}
        <Card 
          className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-8 bg-card border-none rounded-2xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2">Македонски</div>
          <h3 className="text-3xl font-black text-primary mb-8 text-center">{word.translation}</h3>
          
          <div className="w-full space-y-4 text-center relative">
            <div className="p-5 bg-secondary/20 rounded-3xl relative group border border-accent/10">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-card shadow-md text-primary hover:bg-primary hover:text-white transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeak(word.sentence_de);
                }}
              >
                <Volume2 className="w-5 h-5" />
              </Button>
              <p className="text-lg font-bold text-foreground mb-2 pr-4 italic leading-tight">"{word.sentence_de}"</p>
              <p className="text-sm text-muted-foreground font-medium">{word.sentence_mk}</p>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-2 text-muted-foreground">
            <RotateCcw className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Назад до зборот</span>
          </div>
        </Card>
      </div>

      {/* Swipe Overlay Indicators */}
      {isTop && (
        <div className="absolute -bottom-28 left-0 right-0 flex justify-center items-center gap-8" role="group" aria-label="Акции за картичката">
           {/* Undo Button */}
           {canUndo && (
             <button 
              onClick={(e) => { e.stopPropagation(); handleUndo(); }}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 shadow-2xl border-2 border-amber-400 text-amber-600 hover:bg-amber-200 dark:hover:bg-amber-800 transition-all active:scale-90"
              title="Врати назад"
              aria-label="Врати се на претходниот збор"
              role="button"
            >
              <Undo2 className="w-6 h-6" />
            </button>
           )}
           <button 
            onClick={(e) => { e.stopPropagation(); handleSwipe('left'); }}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-card shadow-2xl border-4 border-destructive text-destructive hover:bg-destructive hover:text-white transition-all active:scale-90"
            title="Не го знам"
            aria-label="Не го знам зборот"
            role="button"
            tabIndex={0}
           >
             <span className="text-3xl font-black">✕</span>
           </button>
           <button 
            onClick={(e) => { e.stopPropagation(); handleSwipe('right'); }}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-card shadow-2xl border-4 border-primary text-primary hover:bg-primary hover:text-white transition-all active:scale-90"
            title="Знаем"
            aria-label="Знаем го зборот"
            role="button"
            tabIndex={0}
           >
             <span className="text-3xl font-black">✓</span>
           </button>
        </div>
      )}
    </div>
  );
}
