
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { UserStats, VocabularyWord, ImportData } from '@/lib/types';
import { useTheme } from '@/components/ThemeProvider';
import { 
  Settings, 
  Play, 
  Flame, 
  BarChart2, 
  Loader2,
  GraduationCap,
  ChevronRight,
  Zap,
  Clock,
  Gamepad2,
  BookCheck,
  Search,
  MessageSquareQuote,
  Facebook,
  Instagram,
  Twitter,
  Star,
  Trophy,
  Scale,
  BrainCircuit,
  X,
  Type,
  Ear,
  Sparkles,
  BookOpen,
  Compass,
  Briefcase,
  Layers,
  AlertTriangle,
  Grid3X3,
  Wand2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { DailyReviewReminderCard } from '@/components/DailyReviewReminder';
import { StreakFreezeCard } from '@/components/StreakFreezeCard';

export default function Dashboard() {
  const { theme } = useTheme();
  const [stats, setStats] = useState<UserStats>({ totalLearned: 0, streak: 0, difficultWordsCount: 0, dailyGoal: 10, experience: 0 });
  const [vocab, setVocab] = useState<VocabularyWord[]>([]);
  const [dueCount, setDueCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setMounted(true);
    refreshData();
  }, []);

  const refreshData = async () => {
    const v = await storage.getVocabulary();
    const currentStats = await storage.getStats();
    
    const now = Date.now();
    const due = v.filter(w => w.status === 'new' || (w.nextReview && w.nextReview <= now)).length;
    
    setVocab(v);
    setDueCount(due);
    setStats(currentStats);
  };

  const learnedCount = useMemo(() => vocab.filter(w => w.status === 'learned').length, [vocab]);
  const xp = stats.experience || 0;
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const xpForNextLevel = Math.pow(level, 2) * 100;
  const xpForCurrentLevel = Math.pow(level - 1, 2) * 100;
  const levelProgress = ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return vocab.filter(w => 
      w.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
      w.translation.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  }, [vocab, searchTerm]);

  const handleInitModule = async (module: 'A1' | 'A2' | 'B1' | 'Phrases') => {
    setActiveModule(module);
    setTimeout(async () => {
      let data;
      if (module === 'A1') {
        const mod = await import('@/lib/a1-module');
        data = mod.A1_VOCABULARY;
      }
      else if (module === 'A2') {
        const mod = await import('@/lib/a2-module');
        data = mod.A2_VOCABULARY;
      }
      else if (module === 'B1') {
        const mod = await import('@/lib/b1-module');
        data = mod.B1_VOCABULARY;
      }
      else {
        const mod = await import('@/lib/phrases-data');
        data = mod.EVERYDAY_PHRASES;
      }

      const existing = await storage.getVocabulary();
      const existingWords = new Set(existing.map((v: VocabularyWord) => v.word.toLowerCase()));
      const filteredNew = data.filter((d: ImportData) => !existingWords.has(d.word.toLowerCase()));
      
      const newVocab = storage.initFromImportData(filteredNew);
      await storage.saveVocabulary([...existing, ...newVocab]);
      
      refreshData();
      setActiveModule(null);
    }, 500);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col">
        <header className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-6 h-6 rounded-lg" />
              <Skeleton className="h-8 w-40" />
            </div>
            <Skeleton className="h-3 w-28 mt-1" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-16 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </header>
        <Skeleton className="h-12 w-full rounded-2xl mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-3xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col">
      <header className="flex justify-between items-center mb-10">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary fill-primary" />
            <h1 className="text-2xl font-black tracking-tighter text-foreground uppercase">DeutschFlash</h1>
          </div>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">SM-2 Spaced Repetition</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border border-accent/20">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="font-bold text-orange-600">{stats.streak}</span>
          </div>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Отвори поставки">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Quick Search */}
      <div className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <Input 
            placeholder="Пребарај збор или превод..." 
            className="pl-11 h-12 rounded-2xl bg-card border-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Пребарај зборови"
          />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
              onClick={() => setSearchTerm('')}
              aria-label="Избриши пребарување"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        {searchResults.length > 0 && (
          <Card className="absolute top-14 left-0 right-0 z-50 p-2 shadow-2xl rounded-2xl border-none bg-card animate-in fade-in slide-in-from-top-2 duration-200">
            {searchResults.map(w => (
              <div key={w.id} className="p-3 hover:bg-muted/50 rounded-xl transition-colors flex justify-between items-center group">
                <div>
                  <div className="font-bold text-sm text-foreground">{w.word}</div>
                  <div className="text-xs text-muted-foreground">{w.translation}</div>
                </div>
                <div className="text-[10px] font-bold uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {w.category}
                </div>
              </div>
            ))}
            <Link href="/words" className="block p-3 text-center text-xs font-bold text-primary hover:underline">
              Види ги сите зборови
            </Link>
          </Card>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pb-10 no-scrollbar">
        {/* Discovery Section - Spontaneous Learning */}
        <section className="mb-8">
          <Link href="/discovery">
            <Card className="p-6 border-none shadow-xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-[2rem] flex items-center justify-between group hover:scale-[1.02] transition-all">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                    <Compass className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg leading-tight">Discovery Lab</h3>
                    <p className="text-[10px] opacity-90 font-bold uppercase tracking-widest leading-tight">Спонтано учење</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                 <Badge className="bg-white/20 text-white border-none text-[8px] font-black">НОВО</Badge>
                 <ChevronRight className="w-6 h-6 opacity-50" />
               </div>
            </Card>
          </Link>
        </section>

        {/* Level Card - Visual Progression */}
        <Card className="p-6 border-none shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-[2rem] mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-accent fill-accent" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase opacity-80">Ниво на владеење</div>
                  <div className="text-xl font-black">Level {level}</div>
                </div>
              </div>
              <Trophy className="w-8 h-8 opacity-20" />
            </div>
            <Progress value={levelProgress} className="h-2 bg-white/20 mb-2" />
            <div className="flex justify-between text-[10px] font-bold opacity-70">
              <span>{xp} XP</span>
              <span>{xpForNextLevel} XP ЗА LVL {level + 1}</span>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </Card>

        {/* Library & Thematic Packages */}
        <section className="mb-8">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-primary" />
            Тематски Пакети
          </h2>
          <Link href="/phrases">
            <Card className="p-6 border-none shadow-md bg-card rounded-[2rem] hover:bg-primary/5 group relative overflow-hidden flex flex-col items-center justify-center border border-accent/5">
               <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-5 h-5 fill-current" />
                  <span className="text-xl font-black uppercase tracking-tighter">ФРАЗИ ЗА ПРЕЖИВУВАЊЕ</span>
               </div>
               <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Патување • Туризам • Работа</span>
               <Badge className="absolute top-2 right-2 bg-primary text-white border-none text-[8px] font-black">HOT</Badge>
            </Card>
          </Link>
        </section>

        {/* Stories Section */}
        <section className="mb-10">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            Story Mode
          </h2>
          <Link href="/stories">
            <Card className="p-6 border-none shadow-xl bg-card rounded-[2rem] border border-accent/5 flex items-center justify-between group hover:bg-primary/5 transition-all">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-secondary/30 rounded-2xl flex items-center justify-center text-4xl shadow-md group-hover:rotate-12 transition-transform">
                    📖
                  </div>
                  <div>
                    <h3 className="font-black text-xl leading-tight">Приказни и Авантури</h3>
                    <p className="text-xs text-muted-foreground leading-tight">Учи низ контекст со интерактивни приказни.</p>
                  </div>
               </div>
               <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <ChevronRight className="w-8 h-8" />
               </div>
            </Card>
          </Link>
        </section>

        {/* Daily Goal & Session */}
        {vocab.length > 0 && (
          <div className="bg-card p-8 rounded-[2rem] mb-6 relative overflow-hidden shadow-sm border border-accent/5">
              <div className="flex justify-between items-center mb-6">
                <div>
                   <h2 className="text-2xl font-black text-foreground">Денешна сесија</h2>
                   <p className="text-xs text-muted-foreground">{dueCount} зборови ве чекаат</p>
                </div>
                <div className="relative w-16 h-16 flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-secondary" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 28} 
                        strokeDashoffset={2 * Math.PI * 28 * (1 - Math.min(1, (learnedCount % stats.dailyGoal) / stats.dailyGoal))} 
                        className="text-primary" />
                   </svg>
                   <span className="absolute text-[10px] font-black">{Math.round((learnedCount % stats.dailyGoal) / stats.dailyGoal * 100)}%</span>
                </div>
              </div>
              <Link href="/session">
                <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-2xl py-6 shadow-xl text-lg mb-3">
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  ЗАПОЧНИ СЕГА
                </Button>
              </Link>
              {stats.difficultWordsCount > 0 && (
                <Link href="/mistakes">
                  <Button size="lg" variant="outline" className="w-full font-bold rounded-2xl py-4 text-amber-600 border-amber-300 hover:bg-amber-50">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Мои Грешки ({stats.difficultWordsCount})
                  </Button>
                </Link>
              )}
          </div>
        )}

        {/* Daily Review Reminder */}
        <section className="mb-6">
          <DailyReviewReminderCard />
        </section>

        {/* Streak Freeze */}
        <section className="mb-6">
          <StreakFreezeCard />
        </section>

        {/* Games Grid */}
        <section className="mb-10">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Gamepad2 className="w-5 h-5 text-accent" />
            Вежби и Игри
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <Link href="/adjectives">
              <Card className="p-4 border-none shadow-sm bg-card hover:bg-primary/5 transition-all flex items-center justify-between border-l-4 border-l-primary">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-bold">Аџектив-Мастер</span>
                    <span className="text-[10px] text-muted-foreground">Деклинација на придавки</span>
                  </div>
                </div>
                <Badge className="bg-primary/20 text-primary hover:bg-primary/20">НОВО</Badge>
              </Card>
            </Link>

            <Link href="/listening">
              <Card className="p-4 border-none shadow-sm bg-card hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex items-center justify-between border-l-4 border-l-blue-500">
                <div className="flex items-center gap-3">
                  <Ear className="w-5 h-5 text-blue-500" />
                  <div className="flex flex-col">
                    <span className="font-bold">Слухо-Профи</span>
                    <span className="text-[10px] text-muted-foreground">Тренинг за разбирање</span>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900/30">НОВО</Badge>
              </Card>
            </Link>

            <Link href="/spelling">
              <Card className="p-4 border-none shadow-sm bg-card hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5 text-orange-500" />
                  <span className="font-bold">Германски Спелувач</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Card>
            </Link>

            <Link href="/sentences">
              <Card className="p-4 border-none shadow-sm bg-card hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquareQuote className="w-5 h-5 text-indigo-500" />
                  <span className="font-bold">Градител на Реченици</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Card>
            </Link>

            <Link href="/verbs">
              <Card className="p-4 border-none shadow-sm bg-card hover:bg-primary/5 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookCheck className="w-5 h-5 text-primary" />
                  <span className="font-bold">Глаголски Мајстор</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Card>
            </Link>

            <Link href="/cases">
              <Card className="p-4 border-none shadow-sm bg-card hover:bg-green-50 dark:hover:bg-green-900/10 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-green-600" />
                  <span className="font-bold">Падежен Мајстор</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Card>
            </Link>

            <Link href="/wordle">
              <Card className="p-4 border-none shadow-sm bg-card hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all flex items-center justify-between border-l-4 border-l-amber-500">
                <div className="flex items-center gap-3">
                  <Grid3X3 className="w-5 h-5 text-amber-500" />
                  <div className="flex flex-col">
                    <span className="font-bold">DeutschWordle</span>
                    <span className="text-[10px] text-muted-foreground">Погоди го зборот</span>
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-600 dark:bg-amber-900/30">НОВО</Badge>
              </Card>
            </Link>
          </div>
        </section>

        {/* Library Modules */}
        <section className="mb-10">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-primary" />
            Библиотека по нивоа
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="h-20 flex-col rounded-2xl bg-card border-none shadow-sm group hover:bg-primary/5" onClick={() => handleInitModule('A1')} disabled={!!activeModule}>
              {activeModule === 'A1' ? <Loader2 className="animate-spin" /> : <span className="text-lg font-black text-primary">A1</span>}
              <span className="text-[8px] uppercase font-bold text-muted-foreground">Основи</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col rounded-2xl bg-card border-none shadow-sm group hover:bg-accent/5" onClick={() => handleInitModule('A2')} disabled={!!activeModule}>
              {activeModule === 'A2' ? <Loader2 className="animate-spin" /> : <span className="text-lg font-black text-accent">A2</span>}
              <span className="text-[8px] uppercase font-bold text-muted-foreground">Средно</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col rounded-2xl bg-card border-none shadow-sm group hover:bg-blue-500/5" onClick={() => handleInitModule('B1')} disabled={!!activeModule}>
              {activeModule === 'B1' ? <Loader2 className="animate-spin" /> : <span className="text-lg font-black text-blue-500">B1</span>}
              <span className="text-[8px] uppercase font-bold text-muted-foreground">Напредно</span>
            </Button>
          </div>
          
          {/* Custom Decks */}
          <Link href="/decks" className="block mt-4">
            <Card className="p-4 border-none shadow-sm bg-card hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all flex items-center justify-between border-l-4 border-l-purple-500">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-purple-500" />
                <div className="flex flex-col">
                  <span className="font-bold">Мои Шпилови</span>
                  <span className="text-[10px] text-muted-foreground">Прилагодени колекции</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Card>
          </Link>

          {/* Grammar Checker */}
          <Link href="/grammar" className="block mt-4">
            <Card className="p-4 border-none shadow-sm bg-card hover:bg-cyan-50 dark:hover:bg-cyan-900/10 transition-all flex items-center justify-between border-l-4 border-l-cyan-500">
              <div className="flex items-center gap-3">
                <Wand2 className="w-5 h-5 text-cyan-500" />
                <div className="flex flex-col">
                  <span className="font-bold">Граматички Провер</span>
                  <span className="text-[10px] text-muted-foreground">Rule-based, офлајн</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Card>
          </Link>
        </section>

        {vocab.length === 0 && (
          <div className="bg-muted/30 p-12 rounded-[2.5rem] border-2 border-dashed border-muted flex flex-col items-center text-center mb-10">
            <GraduationCap className="w-12 h-12 text-muted mb-4" />
            <h3 className="font-bold mb-2 text-foreground">Добредојде во DeutschFlash</h3>
            <p className="text-sm text-muted-foreground mb-6">Избери модул за да започнеш.</p>
          </div>
        )}
      </div>

      <footer className="mt-auto pt-6 border-t border-accent/10 space-y-4">
        <div className="flex justify-center gap-6">
          <Link href="/stats" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-bold text-[10px] uppercase">
             <BarChart2 className="w-4 h-4" /> Статистика
          </Link>
          <Link href="/words" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-bold text-[10px] uppercase">
             <BookOpen className="w-4 h-4" /> Вокабулар
          </Link>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
            DeutschFlash &copy; {new Date().getFullYear()} • Изработено од И.Н.
          </p>
        </div>
      </footer>
    </div>
  );
}
