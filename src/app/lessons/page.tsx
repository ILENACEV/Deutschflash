
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LESSONS_DATA, Lesson } from '@/lib/lessons-data';
import { 
  ArrowLeft, 
  BookOpen, 
  ChevronRight, 
  GraduationCap, 
  Lightbulb, 
  Scale,
  BrainCircuit
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LessonsListPage() {
  const [filter, setFilter] = useState<Lesson['category'] | 'all'>('all');

  const filteredLessons = filter === 'all' 
    ? LESSONS_DATA 
    : LESSONS_DATA.filter(l => l.category === filter);

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body pb-20">
      <header className="flex items-center gap-4 mb-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">Граматичка Ризница</h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Основи и граматички правила</p>
        </div>
      </header>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          className="rounded-full px-6 text-xs h-9"
          onClick={() => setFilter('all')}
        >
          Сите
        </Button>
        <Button 
          variant={filter === 'basics' ? 'default' : 'outline'} 
          className="rounded-full px-6 text-xs h-9"
          onClick={() => setFilter('basics')}
        >
          Основи
        </Button>
        <Button 
          variant={filter === 'grammar' ? 'default' : 'outline'} 
          className="rounded-full px-6 text-xs h-9"
          onClick={() => setFilter('grammar')}
        >
          Граматика
        </Button>
      </div>

      <div className="space-y-4">
        {filteredLessons.map((lesson) => (
          <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
            <Card className="p-5 border-none shadow-sm bg-card rounded-[2rem] hover:shadow-md transition-all group mb-4">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-secondary/30 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  {lesson.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-foreground mb-1 leading-tight">{lesson.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {lesson.excerpt}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground self-center" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <Card className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center shadow-sm">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-sm">Совет за учење</h4>
          </div>
          <p className="text-xs text-muted-foreground italic leading-relaxed">
            "Граматиката е мапата, но зборовите се патот. Прво научи ги зборовите преку картичките, а потоа дојди овде за да видиш како да ги склопиш во реченица."
          </p>
        </Card>
      </section>
    </div>
  );
}
