
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EVERYDAY_PHRASES } from '@/lib/phrases-data';
import { storage } from '@/lib/storage';
import { 
  ArrowLeft, 
  Plane, 
  MapPin, 
  Briefcase, 
  Volume2, 
  Check, 
  Sparkles,
  Info,
  Stethoscope,
  ShoppingBag,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const THEMES = [
  { id: 'all', label: 'Сите', icon: Sparkles },
  { id: 'travel', label: 'Патување', icon: Plane },
  { id: 'tourism', label: 'Туризам', icon: MapPin },
  { id: 'work', label: 'Работа', icon: Briefcase },
  { id: 'health', label: 'Здравје', icon: Stethoscope },
  { id: 'shopping', label: 'Купување', icon: ShoppingBag },
  { id: 'social', label: 'Социјално', icon: Users },
];

export default function PhrasesPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  const [mounted, setMounted] = useState(false);
  const [addedWords, setAddedWords] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
    storage.getVocabulary().then(existing => {
      setAddedWords(new Set(existing.map(v => v.word.toLowerCase())));
    });
  }, []);

  const handleAddAll = async () => {
    const existing = await storage.getVocabulary();
    const existingWords = new Set(existing.map(v => v.word.toLowerCase()));
    
    const targetPhrases = filter === 'all' 
      ? EVERYDAY_PHRASES 
      : EVERYDAY_PHRASES.filter(p => p.theme === filter);

    const filteredNew = targetPhrases.filter(d => !existingWords.has(d.word.toLowerCase()));
    
    if (filteredNew.length === 0) {
      toast({
        title: "Веќе се додадени",
        description: "Сите фрази од овој филтер веќе се во вашиот вокабулар.",
      });
      return;
    }

    const newVocab = await storage.initFromImportData(filteredNew);
    await storage.saveVocabulary([...existing, ...newVocab]);
    
    setAddedWords(new Set([...existingWords, ...filteredNew.map(f => f.word.toLowerCase())]));
    
    toast({
      title: "Успешно додадено",
      description: `Додадовте ${filteredNew.length} нови фрази во вашиот вокабулар.`,
    });
  };

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredPhrases = filter === 'all' 
    ? EVERYDAY_PHRASES 
    : EVERYDAY_PHRASES.filter(p => p.theme === filter);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body pb-20">
      <header className="flex items-center gap-4 mb-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">Фрази за преживување</h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Патување • Работа • Здравје • Социјално</p>
        </div>
      </header>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-4 no-scrollbar">
        {THEMES.map((t) => {
          const Icon = t.icon;
          return (
            <Button 
              key={t.id}
              variant={filter === t.id ? 'default' : 'outline'} 
              className={cn(
                "rounded-full px-6 text-xs h-10 gap-2 shrink-0 shadow-sm transition-all",
                filter === t.id ? "bg-primary text-white" : "bg-card hover:bg-primary/5"
              )}
              onClick={() => setFilter(t.id)}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </Button>
          );
        })}
      </div>

      <div className="mb-8">
        <Button 
          className="w-full py-7 rounded-[2rem] font-bold text-lg shadow-xl gap-2 transition-transform active:scale-95"
          onClick={handleAddAll}
        >
          <Check className="w-6 h-6" />
          ДОДАЈ ФИЛТРИРАНИ ВО ВОКАБУЛАР
        </Button>
      </div>

      <div className="space-y-4">
        {filteredPhrases.map((phrase, idx) => {
          const isAdded = addedWords.has(phrase.word.toLowerCase());
          return (
            <Card key={idx} className="p-6 border-none shadow-sm bg-card rounded-[2rem] hover:shadow-md transition-all group border border-accent/5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-secondary/30 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                  {phrase.image}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-full bg-primary/5 text-primary"
                    onClick={() => handleSpeak(phrase.word)}
                  >
                    <Volume2 className="w-5 h-5" />
                  </Button>
                  {isAdded && (
                    <div className="h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm animate-in zoom-in">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-foreground mb-1 leading-tight group-hover:text-primary transition-colors">
                {phrase.word}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 font-medium italic">
                {phrase.translation}
              </p>

              <div className="p-4 bg-muted/30 rounded-2xl border border-accent/5">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-foreground leading-tight mb-1">"{phrase.sentence_de}"</p>
                    <p className="text-[10px] text-muted-foreground italic">{phrase.sentence_mk}</p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
        <p className="text-xs text-muted-foreground text-center italic leading-relaxed">
          "Колку поспецифична е ситуацијата, толку побрзо мозокот го поврзува зборот со потребата. Учи ги овие фрази пред да излезеш од дома!"
        </p>
      </div>
    </div>
  );
}
