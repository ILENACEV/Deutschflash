
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { storage } from '@/lib/storage';
import { UserStats, VocabularyWord, LearningSession, Achievement, WordCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Flame, 
  Trophy, 
  Zap,
  Gamepad2,
  MessageSquareQuote,
  CheckCircle2,
  PieChart as PieIcon,
  TrendingUp,
  Star,
  Lock,
  BookOpen,
  CalendarDays,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ActivityHeatmap } from '@/components/ActivityHeatmap';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const CATEGORY_LABELS: Record<WordCategory, string> = {
  noun: 'Именки',
  verb: 'Глаголи',
  adjective: 'Придавки',
  adverb: 'Прилози',
  preposition: 'Предлози',
  pronoun: 'Заменки',
  conjunction: 'Сврзници',
  article: 'Членови',
  phrase: 'Фрази',
  other: 'Друго'
};

export default function StatsPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [vocab, setVocab] = useState<VocabularyWord[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    Promise.all([
      storage.getStats(),
      storage.getVocabulary(),
      storage.getSessions()
    ]).then(([s, v, sessionsData]) => {
      setStats(s);
      setVocab(v);
      setSessions(sessionsData);
      const achievementsData = storage.getAchievements(s, v);
      setAchievements(achievementsData);
    });
  }, []);

  const statusData = useMemo(() => {
    const learned = vocab.filter(v => v.status === 'learned').length;
    const learning = vocab.filter(v => v.status === 'learning').length;
    const difficult = vocab.filter(v => v.status === 'difficult').length;
    const newWords = vocab.filter(v => v.status === 'new').length;

    return [
      { name: 'Научени', value: learned, color: 'hsl(var(--primary))' },
      { name: 'Во учење', value: learning, color: 'hsl(var(--accent))' },
      { name: 'Тешки', value: difficult, color: 'hsl(var(--destructive))' },
      { name: 'Нови', value: newWords, color: '#94a3b8' },
    ].filter(d => d.value > 0);
  }, [vocab]);

  const categoryMasteryData = useMemo(() => {
    const categories: Record<string, { total: number, learned: number }> = {};
    
    vocab.forEach(word => {
      if (!categories[word.category]) {
        categories[word.category] = { total: 0, learned: 0 };
      }
      categories[word.category].total += 1;
      if (word.status === 'learned') {
        categories[word.category].learned += 1;
      }
    });

    return Object.entries(categories)
      .map(([cat, counts]) => ({
        name: CATEGORY_LABELS[cat as WordCategory] || cat,
        percent: Math.round((counts.learned / counts.total) * 100),
        count: counts.learned
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 5);
  }, [vocab]);

  // Heatmap Logic for last 35 days (5 weeks)
  const heatmapData = useMemo(() => {
    const today = new Date();
    const days = [];
    const activeDates = new Set(sessions.map(s => new Date(s.date).toISOString().split('T')[0]));

    for (let i = 34; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        active: activeDates.has(dateStr)
      });
    }
    return days;
  }, [sessions]);

  if (!mounted || !stats) {
    return (
      <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body pb-20">
        <header className="flex items-center gap-4 mb-8">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-3 w-24 mt-1" />
          </div>
        </header>
        <section className="space-y-4">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </section>
      </div>
    );
  }

  const learnedCount = vocab.filter(v => v.status === 'learned').length;
  const totalCount = vocab.length || 1;
  const masteryPercent = Math.round((learnedCount / totalCount) * 100);
  const level = Math.floor(learnedCount / 20) + 1;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body pb-20">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">DeutschFlash Аналитика</h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Ниво {level} • {learnedCount} Научени</p>
        </div>
      </header>

      <section className="space-y-4 mb-8">
        <Card className="p-6 border-none shadow-md bg-primary text-primary-foreground rounded-3xl overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">Ниво на владеење</span>
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg text-xs font-black">
                <Star className="w-3 h-3 fill-accent text-accent" />
                LVL {level}
              </div>
            </div>
            <div className="text-4xl font-black mb-2">{masteryPercent}%</div>
            <Progress value={masteryPercent} className="h-2 bg-white/20 mb-4" />
            <div className="flex justify-between text-[10px] font-bold opacity-70">
              <span>{learnedCount} НАУЧЕНИ</span>
              <span>{totalCount} ВКУПНО</span>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
        </Card>

        {/* Activity Heatmap - GitHub Style */}
        <ActivityHeatmap />

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-none shadow-sm flex flex-col items-center bg-card rounded-2xl text-center">
            <Flame className="w-6 h-6 text-orange-500 mb-2 fill-orange-500" />
            <div className="text-xl font-black">{stats.streak}</div>
            <div className="text-[10px] text-muted-foreground uppercase font-bold">Дневен Streak</div>
          </Card>
          <Card className="p-4 border-none shadow-sm flex flex-col items-center bg-card rounded-2xl text-center">
            <TrendingUp className="w-6 h-6 text-primary mb-2" />
            <div className="text-xl font-black">{sessions.length}</div>
            <div className="text-[10px] text-muted-foreground uppercase font-bold">Сесии вкупно</div>
          </Card>
        </div>
      </section>

      {/* Category Mastery Breakdown */}
      <section className="bg-card rounded-3xl p-6 shadow-sm border border-accent/5 mb-8">
        <h2 className="text-sm font-bold mb-6 flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
          <BookOpen className="w-4 h-4 text-primary" />
          Владеење по категорија
        </h2>
        <div className="space-y-4">
          {categoryMasteryData.map((cat, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span>{cat.name}</span>
                <span className="text-primary">{cat.percent}%</span>
              </div>
              <Progress value={cat.percent} className="h-1.5" />
            </div>
          ))}
          {categoryMasteryData.length === 0 && (
            <p className="text-xs text-center text-muted-foreground py-4">Сè уште немате научени зборови.</p>
          )}
        </div>
      </section>

      <section className="bg-card rounded-3xl p-6 shadow-sm border border-accent/5 mb-8">
        <h2 className="text-sm font-bold mb-6 flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
          <PieIcon className="w-4 h-4 text-primary" />
          Статус на вокабуларот
        </h2>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
          {statusData.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">{d.name}: {d.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card rounded-3xl p-6 shadow-sm border border-accent/5 mb-8">
        <h2 className="text-sm font-bold mb-6 flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
          <Trophy className="w-4 h-4 text-primary" />
          Достигнувања (Badges)
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((ach) => (
            <div 
              key={ach.id} 
              className={cn(
                "p-3 rounded-2xl flex flex-col items-center text-center transition-all border-2",
                ach.unlocked ? "bg-accent/5 border-accent/20 opacity-100" : "bg-muted/10 border-transparent opacity-40 grayscale"
              )}
            >
              <div className="text-3xl mb-2">{ach.unlocked ? ach.icon : <Lock className="w-6 h-6 text-muted-foreground" />}</div>
              <div className="text-[10px] font-black leading-tight uppercase mb-1">{ach.title}</div>
              <div className="text-[8px] text-muted-foreground leading-tight">{ach.description}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
