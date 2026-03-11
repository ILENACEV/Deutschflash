
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { storage } from '@/lib/storage';
import { VocabularyWord, Idiom } from '@/lib/types';
import { 
  ArrowLeft, 
  Sparkles, 
  RefreshCw, 
  Volume2, 
  Compass, 
  Lightbulb,
  Search,
  Zap,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DiscoveryLabPage() {
  const [randomWord, setRandomWord] = useState<VocabularyWord | null>(null);
  const [randomIdiom, setRandomIdiom] = useState<Idiom | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const discoverNew = useCallback(async () => {
    setIsSpinning(true);
    const vocab = await storage.getVocabulary();
    const idioms = await storage.getIdioms();

    if (vocab.length > 0) {
      const word = vocab[Math.floor(Math.random() * vocab.length)];
      setRandomWord(word);
    }

    if (idioms.length > 0) {
      const idiom = idioms[Math.floor(Math.random() * idioms.length)];
      setRandomIdiom(idiom);
    }

    setTimeout(() => setIsSpinning(false), 600);
  }, []);

  useEffect(() => {
    setMounted(true);
    discoverNew();
  }, [discoverNew]);

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col pb-20">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" />
            Discovery Lab
          </h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Спонтано истражување</p>
        </div>
      </header>

      <div className="flex-1 space-y-8 overflow-y-auto no-scrollbar">
        {/* Surprise Card Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Збор на моментот</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary font-bold gap-2 hover:bg-primary/5"
              onClick={discoverNew}
              disabled={isSpinning}
            >
              <RefreshCw className={cn("w-4 h-4", isSpinning && "animate-spin")} />
              СЛЕДЕН
            </Button>
          </div>

          {randomWord ? (
            <Card className={cn(
              "p-8 rounded-[2.5rem] border-none shadow-2xl bg-card flex flex-col items-center text-center transition-all duration-500 transform",
              isSpinning ? "scale-95 opacity-50" : "scale-100 opacity-100"
            )}>
              <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center text-6xl mb-6 shadow-inner border-4 border-card">
                {randomWord.image && randomWord.image.length < 5 ? randomWord.image : "💡"}
              </div>
              <h3 className="text-4xl font-black text-foreground mb-2 tracking-tighter">
                {randomWord.word}
              </h3>
              <p className="text-lg font-bold text-primary mb-6">{randomWord.translation}</p>
              
              <div className="w-full p-4 bg-muted/30 rounded-2xl text-left relative group">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full text-primary"
                  onClick={() => handleSpeak(randomWord.sentence_de)}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
                <p className="text-xs font-bold text-foreground mb-1 italic leading-tight pr-8">"{randomWord.sentence_de}"</p>
                <p className="text-[10px] text-muted-foreground">{randomWord.sentence_mk}</p>
              </div>

              <div className="mt-6 flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="rounded-full font-bold px-6 border-2"
                  onClick={() => handleSpeak(randomWord.word)}
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  СЛУШАЈ
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center bg-muted/20 border-dashed border-2 rounded-[2.5rem]">
              <p className="text-muted-foreground text-sm font-bold">Немате додадено зборови.</p>
            </Card>
          )}
        </section>

        {/* Idiom of the Moment */}
        <section className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground px-2">Мудрост на денот (Идиом)</h2>
          {randomIdiom ? (
            <Card className="p-6 bg-accent text-accent-foreground rounded-[2rem] border-none shadow-xl relative overflow-hidden group">
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🥨</div>
                  <h4 className="text-xl font-black leading-tight mb-3">"{randomIdiom.de}"</h4>
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <p className="text-sm font-bold mb-1">Значење: {randomIdiom.mk}</p>
                    <p className="text-[10px] opacity-70 italic">Буквално: {randomIdiom.literal}</p>
                  </div>
               </div>
               <Sparkles className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 rotate-12" />
            </Card>
          ) : null}
        </section>

        {/* Context Prompt */}
        <section className="bg-primary p-6 rounded-[2rem] text-primary-foreground shadow-xl">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-accent fill-accent" />
              </div>
              <h4 className="font-black text-lg">Брз Предизвик</h4>
           </div>
           <p className="text-sm font-medium mb-6 leading-tight opacity-90">
             Погледни околу себе токму сега. Како се вика на германски предметот што го гледаш пред тебе?
           </p>
           <Link href="/words" className="block">
              <Button className="w-full bg-card text-primary font-bold rounded-xl py-6 hover:bg-card/90">
               ПРОВЕРИ ВО ВОКАБУЛАРОТ
             </Button>
           </Link>
        </section>

        {/* Discovery Footer */}
        <div className="text-center py-6">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">
            Спонтаното учење го намалува стресот и ја зголемува меморијата за 40%.
          </p>
        </div>
      </div>
    </div>
  );
}

