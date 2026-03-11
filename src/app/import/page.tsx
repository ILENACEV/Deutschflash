"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { storage } from '@/lib/storage';
import { VocabularyWord, ImportData, WordCategory } from '@/lib/types';
import { ArrowLeft, Download, Plus, Check, ListPlus, FileJson, Database } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ImportType = 'vocabulary' | 'verbs' | 'adjectives' | 'idioms' | 'cases';

export default function ImportPage() {
  const router = useRouter();
  const [jsonText, setJsonText] = useState('');
  const [importType, setImportType] = useState<ImportType>('vocabulary');
  const [error, setError] = useState('');
  
  // Manual Entry State
  const [manualWord, setManualWord] = useState('');
  const [manualTranslation, setManualTranslation] = useState('');
  const [manualCategory, setManualCategory] = useState<WordCategory>('other');
  const [manualSentenceDe, setManualSentenceDe] = useState('');
  const [manualSentenceMk, setManualSentenceMk] = useState('');

  const handleManualAdd = async () => {
    if (!manualWord || !manualTranslation) {
      setError('Зборот и преводот се задолжителни.');
      return;
    }

    const existingVocab = await storage.getVocabulary();
    const newWord: VocabularyWord = {
      id: Math.random().toString(36).substr(2, 9),
      word: manualWord,
      translation: manualTranslation,
      category: manualCategory,
      sentence_de: manualSentenceDe,
      sentence_mk: manualSentenceMk,
      status: 'new',
      interval: 0,
      easeFactor: 2.5,
      swipeCount: { left: 0, right: 0 }
    };

    await storage.saveVocabulary([...existingVocab, newWord]);
    router.push('/words');
  };

  const handleImportJson = async () => {
    try {
      setError('');
      const data = JSON.parse(jsonText);
      
      if (!Array.isArray(data)) {
        throw new Error('JSON мора да биде листа [ ... ].');
      }

      if (importType === 'vocabulary') {
        const existing = await storage.getVocabulary();
        const newWords = storage.initFromImportData(data);
        await storage.saveVocabulary([...existing, ...newWords]);
        router.push('/words');
      } else if (importType === 'verbs') {
        await storage.saveVerbs(data);
        router.push('/verbs');
      } else if (importType === 'adjectives') {
        await storage.saveAdjectives(data);
        router.push('/adjectives');
      } else if (importType === 'idioms') {
        await storage.saveIdioms(data);
        router.push('/idioms');
      } else if (importType === 'cases') {
        await storage.saveCases(data);
        router.push('/cases');
      }
      
    } catch (err: any) {
      setError(err.message || 'Грешка при увоз. Проверете го форматот.');
    }
  };

  const getPlaceholder = () => {
    switch(importType) {
      case 'vocabulary': return '[ { "word": "Haus", "translation": "куќа", "category": "noun", "sentence_de": "...", "sentence_mk": "..." } ]';
      case 'verbs': return '[ { "infinitiv": "gehen", "translation": "оди", "praesens": "geht", "praeteritum": "ging", "perfekt": "ist gegangen", "type": "irregular" } ]';
      case 'adjectives': return '[ { "sentence": "Das ist ein klein__ Kind.", "options": ["es", "er", "e", "en"], "correct": "es", "explanation": "..." } ]';
      case 'idioms': return '[ { "de": "Blau machen", "mk": "Забушава", "literal": "Прави сино" } ]';
      case 'cases': return '[ { "sentence": "Ich gehe in ___ Schule.", "options": ["die", "der", "das", "den"], "correct": "die", "hint": "...", "explanation": "..." } ]';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body pb-20">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Управување со база</h1>
      </header>

      <Tabs defaultValue="json" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 rounded-2xl p-1">
          <TabsTrigger value="manual" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Plus className="w-4 h-4 mr-2 text-primary" />
            Рачно
          </TabsTrigger>
          <TabsTrigger value="json" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Database className="w-4 h-4 mr-2 text-primary" />
            Масовен Увоз
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card className="p-6 border-none shadow-sm bg-card rounded-3xl space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Германски збор</label>
              <Input 
                placeholder="Пр: Haus" 
                value={manualWord}
                onChange={(e) => setManualWord(e.target.value)}
                className="rounded-xl bg-muted/30 border-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Македонски превод</label>
              <Input 
                placeholder="Пр: Куќа" 
                value={manualTranslation}
                onChange={(e) => setManualTranslation(e.target.value)}
                className="rounded-xl bg-muted/30 border-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Категорија</label>
              <Select value={manualCategory} onValueChange={(val: any) => setManualCategory(val)}>
                <SelectTrigger className="rounded-xl bg-muted/30 border-none">
                  <SelectValue placeholder="Избери категорија" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noun">Именка</SelectItem>
                  <SelectItem value="verb">Глагол</SelectItem>
                  <SelectItem value="adjective">Придавка</SelectItem>
                  <SelectItem value="phrase">Фраза</SelectItem>
                  <SelectItem value="other">Друго</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Пример (Германски)</label>
              <Input 
                placeholder="Das Haus ist schön." 
                value={manualSentenceDe}
                onChange={(e) => setManualSentenceDe(e.target.value)}
                className="rounded-xl bg-muted/30 border-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Превод на пример</label>
              <Input 
                placeholder="Куќата е убава." 
                value={manualSentenceMk}
                onChange={(e) => setManualSentenceMk(e.target.value)}
                className="rounded-xl bg-muted/30 border-none"
              />
            </div>
            <Button className="w-full py-6 rounded-2xl font-bold mt-4 shadow-lg" onClick={handleManualAdd}>
              <Check className="w-5 h-5 mr-2" />
              ДОДАЈ ВО ВОКАБУЛАР
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="json" className="space-y-6">
          <Card className="p-6 rounded-3xl border-none shadow-sm bg-card space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Тип на податоци</label>
              <Select value={importType} onValueChange={(val: ImportType) => setImportType(val)}>
                <SelectTrigger className="rounded-xl bg-muted/30 border-none h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vocabulary">Вокабулар (SM-2)</SelectItem>
                  <SelectItem value="verbs">Глаголи (Глаголски Мајстор)</SelectItem>
                  <SelectItem value="adjectives">Придавки (Аџектив-Мастер)</SelectItem>
                  <SelectItem value="idioms">Идиоми (Идиом Блиц)</SelectItem>
                  <SelectItem value="cases">Падежи (Падежен Мајстор)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">JSON Листа</label>
              <Textarea 
                placeholder={getPlaceholder()}
                className="min-h-[250px] font-mono text-xs bg-muted/30 border-none rounded-2xl p-4 leading-relaxed"
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
              />
            </div>

            <Button 
              className="w-full py-7 font-bold rounded-2xl text-lg shadow-xl" 
              onClick={handleImportJson}
              disabled={!jsonText}
            >
              <Download className="mr-2 w-5 h-5" />
              УВЕЗИ ПОДАТОЦИ
            </Button>
            
            <p className="text-[10px] text-muted-foreground text-center italic">
              *Внимание: Оваа акција ќе ги пребрише или дополни моменталните податоци за избраната категорија.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
      
      {error && (
        <Card className="mt-4 p-4 bg-destructive/10 border-none rounded-2xl">
          <p className="text-destructive text-center text-xs font-bold">{error}</p>
        </Card>
      )}
    </div>
  );
}
