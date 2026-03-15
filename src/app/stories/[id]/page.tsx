
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { STORIES_DATA } from '@/lib/stories-data';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Volume2, 
  Eye, 
  EyeOff,
  BookOpenCheck
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function StoryDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const story = STORIES_DATA.find(s => s.id === id);
  const [showTranslations, setShowTranslations] = useState<Record<number, boolean>>({});

  if (!story) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Приказната не е пронајдена</h1>
        <Link href="/stories">
          <Button>Назад до приказни</Button>
        </Link>
      </div>
    );
  }

  const toggleTranslation = (idx: number) => {
    setShowTranslations(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body pb-20">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-accent/10 px-6 py-4 flex items-center justify-between">
        <Link href="/stories">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад кон приказни">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Зачувај">
            <Bookmark className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Сподели">
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 bg-secondary/30 rounded-[2rem] flex items-center justify-center text-5xl mb-6 shadow-xl border-4 border-white">
            {story.icon}
          </div>
          <div className={cn(
            "inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4",
            story.level === 'A1' ? "bg-green-100 text-green-700" :
            story.level === 'A2' ? "bg-accent/10 text-primary" :
            "bg-blue-100 text-blue-700"
          )}>
            Приказна Ниво {story.level}
          </div>
          <h1 className="text-3xl font-black text-foreground leading-tight tracking-tighter">
            {story.title}
          </h1>
        </div>

        <div className="space-y-8">
          {story.paragraphs.map((p, idx) => (
            <div key={idx} className="space-y-3 group">
              <Card className="p-6 border-none shadow-sm bg-card rounded-[2rem] hover:shadow-md transition-all relative">
                <div className="flex justify-between items-start mb-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full bg-secondary/30 text-primary"
                    onClick={() => handleSpeak(p.de)}
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8 rounded-full transition-all",
                      showTranslations[idx] ? "bg-primary text-white" : "bg-accent/10 text-primary"
                    )}
                    onClick={() => toggleTranslation(idx)}
                  >
                    {showTranslations[idx] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                
                <p className="text-lg font-bold text-foreground leading-relaxed selection:bg-accent/30">
                  {p.de}
                </p>

                {showTranslations[idx] && (
                  <div className="mt-4 pt-4 border-t border-accent/10 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      {p.mk}
                    </p>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        <section className="mt-16 space-y-6">
          <h3 className="font-black text-lg flex items-center gap-2 px-2">
            <BookOpenCheck className="w-5 h-5 text-primary" />
            Клучни зборови
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {story.keyWords.map((kw, i) => (
              <Card key={i} className="p-4 border-none shadow-sm bg-accent/5 rounded-2xl flex flex-col items-center text-center group hover:bg-accent/10 transition-colors">
                <span className="font-bold text-primary group-hover:scale-110 transition-transform">{kw.word}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">{kw.translation}</span>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-16 pt-10 border-t border-accent/10">
          <Link href="/stories">
            <Button variant="outline" className="w-full py-8 text-lg font-bold rounded-2xl border-2">
              Назад до листата
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
