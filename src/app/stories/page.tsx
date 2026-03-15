
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { STORIES_DATA } from '@/lib/stories-data';
import { 
  ArrowLeft, 
  BookOpen, 
  ChevronRight, 
  Sparkles,
  Gamepad2,
  Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StoriesListPage() {
  const [filter, setFilter] = useState<'all' | 'A1' | 'A2' | 'B1'>('all');

  const filteredStories = filter === 'all' 
    ? STORIES_DATA 
    : STORIES_DATA.filter(s => s.level === filter);

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body pb-20">
      <header className="flex items-center gap-4 mb-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">Story Mode</h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Учење низ контекст</p>
        </div>
      </header>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {['all', 'A1', 'A2', 'B1'].map((lvl) => (
          <Button 
            key={lvl}
            variant={filter === lvl ? 'default' : 'outline'} 
            className="rounded-full px-6 text-xs h-9"
            onClick={() => setFilter(lvl as any)}
          >
            {lvl === 'all' ? 'Сите' : lvl}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredStories.map((story) => (
          <Link key={story.id} href={`/stories/${story.id}`}>
            <Card className="p-5 border-none shadow-sm bg-card rounded-[2rem] hover:shadow-md transition-all group mb-4 relative overflow-hidden">
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-16 h-16 bg-secondary/30 rounded-2xl flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                  {story.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                      story.level === 'A1' ? "bg-green-100 text-green-700" :
                      story.level === 'A2' ? "bg-accent/10 text-primary" :
                      "bg-blue-100 text-blue-700"
                    )}>
                      Ниво {story.level}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-1 leading-tight">{story.title}</h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                    {story.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground self-center" />
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl"></div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-12 p-6 bg-primary text-primary-foreground rounded-[2rem] border-none shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="font-black text-lg mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Зошто приказни?
          </h4>
          <p className="text-xs opacity-90 leading-relaxed font-medium">
            Кога читаш приказна, твојот мозок природно ги поврзува зборовите со слики и настани. Тоа е најбрзиот начин да престанеш да преведуваш во себе и да почнеш да го чувствуваш јазикот.
          </p>
        </div>
        <Gamepad2 className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 rotate-12" />
      </Card>
    </div>
  );
}
