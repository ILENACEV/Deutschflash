"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { storage } from '@/lib/storage';
import { VocabularyWord } from '@/lib/types';
import { 
  ArrowLeft, 
  RefreshCw, 
  Trophy, 
  HelpCircle,
  Share2,
  Volume2,
  X,
  Check,
  ChevronDown,
  Star,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WORDLE_THEMES, MY_VOCAB, getThemeById, WordleTheme } from '@/lib/wordle-themes';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

type LetterState = 'correct' | 'present' | 'absent' | 'unused';

interface GameStats {
  streak: number;
  bestStreak: number;
  totalScore: number;
  gamesPlayed: number;
  gamesWon: number;
}

const calculateScore = (guesses: string[], won: boolean, theme: WordleTheme): number => {
  if (!won) return 0;
  
  const baseScore = 100;
  const bonusPerGuess = 20;
  const streakBonus = 10;
  
  const guessBonus = (MAX_GUESSES - guesses.length) * bonusPerGuess;
  
  return baseScore + guessBonus;
};

export default function WordlePage() {
  const { toast } = useToast();
  const [targetWordData, setTargetWordData] = useState<{word: string; translation: string; description: string} | null>(null);
  const [vocab, setVocab] = useState<VocabularyWord[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [mounted, setMounted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<WordleTheme | null>(null);
  const [stats, setStats] = useState<GameStats>({
    streak: 0,
    bestStreak: 0,
    totalScore: 0,
    gamesPlayed: 0,
    gamesWon: 0
  });
  const [currentScore, setCurrentScore] = useState(0);

  const gameStateRef = useRef(gameState);
  const currentGuessRef = useRef(currentGuess);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    currentGuessRef.current = currentGuess;
  }, [currentGuess]);

  useEffect(() => {
    setMounted(true);
    loadStats();
  }, []);

  const loadStats = async () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wordleStats');
      if (saved) {
        setStats(JSON.parse(saved));
      }
      const savedTheme = localStorage.getItem('wordleTheme');
      if (savedTheme) {
        const theme = getThemeById(savedTheme);
        if (theme) {
          setSelectedTheme(theme);
        } else {
          setSelectedTheme(WORDLE_THEMES[0]);
        }
      } else {
        setSelectedTheme(WORDLE_THEMES[0]);
      }
    }
  };

  useEffect(() => {
    if (mounted && selectedTheme) {
      initGame();
    }
  }, [selectedTheme, mounted]);

  const saveStats = (newStats: GameStats) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wordleStats', JSON.stringify(newStats));
    }
    setStats(newStats);
  };

  const initGame = async () => {
    if (!selectedTheme) return;

    const loadedVocab = await storage.getVocabulary();
    setVocab(loadedVocab);

    let wordList: {word: string; translation: string; description: string}[] = [];

    if (selectedTheme.id === 'vocab') {
      const fiveLetterWords = loadedVocab
        .filter(w => w.word.length === WORD_LENGTH && /^[a-zA-Zäöüß]+$/.test(w.word.toLowerCase()))
        .map(w => ({ word: w.word.toLowerCase(), translation: w.translation, description: '' }));
      
      if (fiveLetterWords.length > 0) {
        wordList = fiveLetterWords;
      } else {
        toast({
          title: "Нема доволно зборови",
          description: "Додади зборови со 5 букви во вокабуларот",
        });
        wordList = WORDLE_THEMES[0].words;
      }
    } else {
      wordList = selectedTheme.words;
    }

    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWordData(randomWord);
    
    setGuesses([]);
    setCurrentGuess('');
    setGameState('playing');
    setShowAnswer(false);
    setCurrentScore(0);
  };

  const handleThemeSelect = (theme: WordleTheme) => {
    setSelectedTheme(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wordleTheme', theme.id);
    }
    setShowThemes(false);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameStateRef.current !== 'playing') return;

    const key = e.key.toLowerCase();
    const guess = currentGuessRef.current;

    if (key === 'enter') {
      if (guess.length === WORD_LENGTH) {
        submitGuess();
      }
    } else if (key === 'backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[a-zäöüß]$/.test(key) && guess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const submitGuess = () => {
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    const won = currentGuess.toLowerCase() === targetWordData?.word.toLowerCase();
    
    if (won) {
      const score = calculateScore(newGuesses, true, selectedTheme!);
      setCurrentScore(score);
      setGameState('won');
      
      const newStats = {
        ...stats,
        streak: stats.streak + 1,
        bestStreak: Math.max(stats.bestStreak, stats.streak + 1),
        totalScore: stats.totalScore + score,
        gamesPlayed: stats.gamesPlayed + 1,
        gamesWon: stats.gamesWon + 1
      };
      saveStats(newStats);
      
      toast({
        title: "Честитки! 🎉",
        description: `+${score} XP - ${targetWordData?.translation}`,
      });
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameState('lost');
      setShowAnswer(true);
      
      const newStats = {
        ...stats,
        streak: 0,
        gamesPlayed: stats.gamesPlayed + 1
      };
      saveStats(newStats);
    }
  };

  const getLetterStates = (guess: string): LetterState[] => {
    if (!targetWordData) return [];
    
    const states: LetterState[] = [];
    const target = targetWordData.word.toLowerCase();
    const guessLower = guess.toLowerCase();
    const targetLetters = target.split('');
    const guessLetters = guessLower.split('');
    const usedIndices = new Set<number>();

    for (let i = 0; i < guessLetters.length; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        states[i] = 'correct';
        usedIndices.add(i);
      }
    }

    for (let i = 0; i < guessLetters.length; i++) {
      if (states[i]) continue;

      const letterIdx = targetLetters.findIndex((l, idx) => 
        l === guessLetters[i] && !usedIndices.has(idx)
      );

      if (letterIdx !== -1) {
        states[i] = 'present';
        usedIndices.add(letterIdx);
      } else {
        states[i] = 'absent';
      }
    }

    return states;
  };

  const speakWord = (word: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  };

  const shareResult = () => {
    const emojiGrid = guesses.map(guess => {
      const states = getLetterStates(guess);
      return states.map(s => {
        if (s === 'correct') return '🟩';
        if (s === 'present') return '🟨';
        return '⬛';
      }).join('');
    }).join('\n');

    const text = `DeutschWordle ${selectedTheme?.emoji} ${guesses.filter((g, i) => 
      getLetterStates(g).every(s => s === 'correct')
    ).length > 0 ? 'X' : MAX_GUESSES}/${MAX_GUESSES}\n\n${emojiGrid}`;
    
    navigator.clipboard.writeText(text);
    toast({
      title: "Копирано!",
      description: "Резултатот е копиран во clipboard.",
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-4 max-w-md mx-auto font-body flex flex-col">
      <header className="flex items-center justify-between mb-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">{stats.totalScore}</span>
          </div>
          {stats.streak > 0 && (
            <div className="flex items-center gap-1 text-orange-500">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold">{stats.streak}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setShowHelp(true)} aria-label="Помош">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowThemes(true)} aria-label="Теми">
            <ChevronDown className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={initGame} aria-label="Нова игра">
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Theme Selector */}
      {showThemes && (
        <div className="mb-4">
          <Card className="p-3">
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {[MY_VOCAB, ...WORDLE_THEMES].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme)}
                  className={`p-2 rounded-lg text-left text-sm transition-all ${
                    selectedTheme?.id === theme.id
                      ? 'bg-primary text-white'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <span className="mr-1">{theme.emoji}</span>
                  {theme.name}
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Current Theme */}
      {selectedTheme && (
        <div className={`bg-gradient-to-r ${selectedTheme.color} text-white px-4 py-2 rounded-xl mb-4 text-center`}>
          <span className="mr-2">{selectedTheme.emoji}</span>
          <span className="font-semibold">{selectedTheme.name}</span>
        </div>
      )}

      {/* Word Display / Hint */}
      {targetWordData && (
        <Card className={`p-4 mb-4 text-center ${gameState !== 'playing' ? '' : 'border-primary/30 bg-primary/5'}`}>
          {gameState === 'playing' ? (
            <>
              <p className="text-sm text-muted-foreground mb-1">Погоди го зборот:</p>
              <p className="text-lg font-semibold text-primary">{targetWordData.translation}</p>
              {targetWordData.description && (
                <p className="text-xs text-muted-foreground mt-1 italic">{targetWordData.description}</p>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl font-black">{targetWordData.word.toUpperCase()}</span>
                <Button variant="ghost" size="icon" onClick={() => speakWord(targetWordData.word)}>
                  <Volume2 className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-lg font-semibold text-primary">{targetWordData.translation}</p>
              {targetWordData.description && (
                <p className="text-sm text-muted-foreground mt-1">{targetWordData.description}</p>
              )}
            </>
          )}
        </Card>
      )}

      {/* Game Board */}
      <div className="flex-1 flex flex-col justify-center mb-4">
        <div className="grid grid-rows-6 gap-2 mb-4">
          {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
            const guess = guesses[rowIndex];
            const isCurrentRow = rowIndex === guesses.length;
            const states = guess ? getLetterStates(guess) : [];
            
            return (
              <div key={rowIndex} className="grid grid-cols-5 gap-2">
                {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                  const letter = isCurrentRow ? currentGuess[colIndex] : guess?.[colIndex];
                  const state = states[colIndex];
                  
                  return (
                    <div
                      key={colIndex}
                      className={`w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-lg transition-all ${
                        state === 'correct' 
                          ? 'bg-green-500 text-white'
                          : state === 'present'
                            ? 'bg-yellow-500 text-white'
                            : state === 'absent'
                              ? 'bg-muted text-muted-foreground'
                              : isCurrentRow
                                ? 'bg-muted/50 border-2 border-primary/30'
                                : 'bg-muted/20'
                      }`}
                    >
                      {letter?.toUpperCase() || ''}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Current Score */}
        {currentScore > 0 && (
          <div className="text-center mb-4">
            <span className="text-2xl font-black text-green-500">+{currentScore} XP</span>
          </div>
        )}
      </div>

      {/* Keyboard */}
      <div className="grid grid-cols-10 gap-1 mb-4" role="group" aria-label="Тастатура">
        {['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'].map((letter) => {
          const letterState = guesses
            .map(g => getLetterStates(g))
            .find(states => states.some(s => s !== 'unused'));
          const state = letterState ? letterState[letterState.findIndex((_, i) => guesses.some(g => g[i] === letter))] : undefined;
          
          return (
            <button
              key={letter}
              onClick={() => {
                if (currentGuess.length < WORD_LENGTH) {
                  setCurrentGuess(prev => prev + letter);
                }
              }}
              aria-label={`Буква ${letter.toUpperCase()}`}
              className={`h-12 rounded text-sm font-bold transition-all ${
                state === 'correct'
                  ? 'bg-green-500 text-white'
                  : state === 'present'
                    ? 'bg-yellow-500 text-white'
                    : state === 'absent'
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
        <button
          onClick={() => setCurrentGuess(prev => prev.slice(0, -1))}
          aria-label="Избриши ја последната буква"
          className="h-12 rounded bg-muted hover:bg-muted/80 text-xs font-bold col-span-2"
        >
          ⌫
        </button>
        <button
          onClick={submitGuess}
          disabled={currentGuess.length !== WORD_LENGTH || gameState !== 'playing'}
          aria-label="Потврди зборот"
          className="h-12 rounded bg-primary hover:bg-primary/90 text-white text-xs font-bold col-span-3 disabled:opacity-50"
        >
          ENTER
        </button>
      </div>

      {/* Results Modal */}
      {(gameState === 'won' || gameState === 'lost') && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="p-6 w-full max-w-sm">
            <div className="mb-4">
              {gameState === 'won' ? (
                <Trophy className="w-16 h-16 mx-auto text-amber-500" />
              ) : (
                <X className="w-16 h-16 mx-auto text-destructive" />
              )}
            </div>
            <h2 className="text-2xl font-black mb-2 text-center">
              {gameState === 'won' ? 'Честитки!' : 'Следни пат!'}
            </h2>
            <p className="text-muted-foreground text-center mb-4">
              {gameState === 'won' ? (
                <span className="text-green-500 font-bold">+{currentScore} XP</span>
              ) : (
                <>
                  Зборот беше: <span className="font-bold text-foreground">{targetWordData?.word.toUpperCase()}</span>
                  <span className="block text-sm">({targetWordData?.translation})</span>
                </>
              )}
            </p>
            <div className="flex gap-2">
              <Button onClick={shareResult} variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Сподели
              </Button>
              <Button onClick={initGame} className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Нова игра
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="p-6 w-full max-w-sm">
            <h2 className="text-lg font-black mb-4">Како се игра</h2>
            <div className="space-y-4 text-sm">
              <p>Погоди го германскиот збор за 6 обиди.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold">H</div>
                  <span>Буквата H е на точното место</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-white font-bold">U</div>
                  <span>Буквата U е во зборот, но на друго место</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-muted-foreground font-bold">X</div>
                  <span>Буквата X не е во зборот</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="font-semibold mb-1">Теми:</p>
                <p className="text-muted-foreground">Избери тема за да играш со зборови од таа категорија.</p>
              </div>
              <div className="pt-2 border-t">
                <p className="font-semibold mb-1">Поени:</p>
                <p className="text-muted-foreground">Повеќе поени ако побрзо го погодиш зборот!</p>
              </div>
            </div>
            <Button onClick={() => setShowHelp(false)} className="w-full mt-4">
              Разбирам
            </Button>
          </Card>
        </div>
      )}

      {/* Stats Footer */}
      <div className="mt-auto pt-4 border-t">
        <div className="flex justify-around text-sm text-muted-foreground">
          <div className="text-center">
            <div className="font-bold text-foreground">{stats.gamesWon}/{stats.gamesPlayed}</div>
            <div>Победи</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-foreground">{stats.bestStreak}</div>
            <div>Рекорд</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-foreground">{stats.totalScore}</div>
            <div>XP Вкупни</div>
          </div>
        </div>
      </div>
    </div>
  );
}
