
"use client";

import React, { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { VocabularyWord, WordCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Search, 
  Trash2, 
  Volume2, 
  Filter,
  BookOpen,
  X
} from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const CATEGORY_COLORS: Record<WordCategory, string> = {
  noun: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  verb: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  adjective: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  adverb: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  preposition: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  pronoun: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  conjunction: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  article: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  phrase: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  other: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
};

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Сите',
  noun: 'Именки',
  verb: 'Глаголи',
  adjective: 'Придавки',
  phrase: 'Фрази',
  other: 'Друго'
};

export default function WordsListPage() {
  const [vocab, setVocab] = useState<VocabularyWord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    storage.getVocabulary().then(setVocab);
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Дали сте сигурни дека сакате да го избришете овој збор?')) {
      await storage.removeWord(id);
      setVocab(prev => prev.filter(w => w.id !== id));
    }
  };

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredVocab = vocab.filter(w => {
    const matchesSearch = w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.translation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || w.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body pb-10">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <BookOpen className="w-5 h-5 text-primary" />
          Твој Вокабулар
        </h1>
      </header>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Пребарај..." 
            className="pl-10 h-12 rounded-2xl bg-card border-none shadow-sm text-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
              onClick={() => setSearchTerm('')}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className={cn("h-12 w-12 rounded-2xl border-none shadow-sm bg-card", filterCategory !== 'all' && "text-primary")}>
              <Filter className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-2xl">
            <DropdownMenuLabel>Филтрирај по тип</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={filterCategory} onValueChange={setFilterCategory}>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <DropdownMenuRadioItem key={key} value={key}>{label}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3">
        {filteredVocab.length > 0 ? (
          filteredVocab.map(word => (
            <Card key={word.id} className="p-4 border-none shadow-sm bg-card flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary/30 rounded-full flex items-center justify-center text-xl">
                  {word.image && word.image.length < 5 ? word.image : "📖"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "font-bold text-foreground",
                      word.category === 'noun' && word.gender === 'der' && "text-blue-600 dark:text-blue-400",
                      word.category === 'noun' && word.gender === 'die' && "text-red-600 dark:text-red-400",
                      word.category === 'noun' && word.gender === 'das' && "text-green-600 dark:text-green-400"
                    )}>{word.word}</span>
                    <Badge variant="outline" className={`text-[10px] px-1 py-0 h-4 border-none ${CATEGORY_COLORS[word.category] || 'bg-slate-100 text-slate-700'}`}>
                      {word.category}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{word.translation}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => handleSpeak(word.word)}>
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(word.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 text-muted-foreground bg-card/50 rounded-[2rem] border-2 border-dashed border-muted/50">
            <BookOpen className="w-10 h-10 mx-auto mb-4 opacity-20" />
            <p className="font-bold">{searchTerm || filterCategory !== 'all' ? "Нема пронајдено зборови." : "Листата е празна."}</p>
            {(searchTerm || filterCategory !== 'all') && (
              <Button variant="link" className="text-primary mt-2" onClick={() => { setSearchTerm(''); setFilterCategory('all'); }}>
                Исчисти филтри
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
