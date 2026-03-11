
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LESSONS_DATA } from '@/lib/lessons-data';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';

export default function LessonDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const lesson = LESSONS_DATA.find(l => l.id === id);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Лекцијата не е пронајдена</h1>
        <Link href="/lessons">
          <Button>Назад до лекции</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-accent/10 px-6 py-4 flex items-center justify-between">
        <Link href="/lessons">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bookmark className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 pb-20">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-secondary/30 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-sm">
            {lesson.icon}
          </div>
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest mb-4">
            {lesson.category === 'basics' ? 'Основи' : 'Граматика'}
          </div>
          <h1 className="text-3xl font-black text-foreground leading-tight tracking-tighter">
            {lesson.title}
          </h1>
        </div>

        <article 
          className="prose prose-slate max-w-none 
          prose-headings:text-foreground prose-headings:font-black prose-headings:tracking-tight
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base
          prose-strong:text-foreground prose-strong:font-bold
          prose-ul:list-disc prose-ul:pl-5
          prose-li:text-muted-foreground prose-li:mb-2"
          dangerouslySetInnerHTML={{ __html: lesson.content }} 
        />

        <div className="mt-16 pt-10 border-t border-accent/10">
          <h4 className="text-sm font-bold mb-4">Следен чекор:</h4>
          <Link href="/session">
            <Button className="w-full py-8 text-lg font-bold rounded-2xl shadow-xl">
              Вежбај вокабулар сега
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
