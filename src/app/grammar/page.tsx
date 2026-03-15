"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Wand2,
  Volume2,
  BookOpen
} from 'lucide-react';
import { checkGrammar, getGrammarSuggestions, GrammarIssue } from '@/lib/grammar-checker';
import { useToast } from '@/hooks/use-toast';

export default function GrammarCheckerPage() {
  const { toast } = useToast();
  const [sentence, setSentence] = useState('');
  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [showDetailed, setShowDetailed] = useState(false);
  const [autoCheck, setAutoCheck] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (autoCheck && sentence.length > 3) {
      const foundIssues = checkGrammar(sentence);
      setIssues(foundIssues);
    }
  }, [sentence, autoCheck]);

  const speakSentence = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis && sentence) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheck = () => {
    const foundIssues = checkGrammar(sentence);
    setIssues(foundIssues);
    
    if (foundIssues.length === 0) {
      toast({
        title: 'Честитки! ✅',
        description: 'Реченицата е граматички точна!',
      });
    }
  };

  const clearInput = () => {
    setSentence('');
    setIssues([]);
  };

  if (!mounted) return null;

  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col pb-20">
      <header className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            Граматички Провер
          </h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            Rule-based, 100% Офлајн
          </p>
        </div>
      </header>

      {/* Input Area */}
      <Card className="p-6 bg-card rounded-[2rem] border-none shadow-lg mb-6">
        <Label className="text-sm font-bold mb-2 block">Внеси германска реченица:</Label>
        <Textarea
          placeholder="пр. Ich gehe morgen ins Kino weil ich Zeit habe."
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          className="min-h-[120px] text-lg p-4 rounded-xl"
        />
        
        <div className="flex items-center gap-4 mt-4">
          <Button onClick={handleCheck} className="flex-1">
            <Wand2 className="w-4 h-4 mr-2" />
            Провери
          </Button>
          <Button variant="outline" onClick={speakSentence} disabled={!sentence}>
            <Volume2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" onClick={clearInput}>
            <XCircle className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Checkbox 
            id="autoCheck" 
            checked={autoCheck} 
            onCheckedChange={(checked) => setAutoCheck(checked as boolean)}
          />
          <Label htmlFor="autoCheck" className="text-sm cursor-pointer">
            Автоматска провер
          </Label>
        </div>
      </Card>

      {/* Results */}
      {issues.length > 0 && (
        <Card className={`p-6 rounded-[2rem] border-none shadow-lg mb-6 ${
          errorCount > 0 ? 'bg-red-50 dark:bg-red-950/20' : 
          warningCount > 0 ? 'bg-amber-50 dark:bg-amber-950/20' : 
          'bg-green-50 dark:bg-green-950/20'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {errorCount > 0 ? (
              <XCircle className="w-6 h-6 text-red-500" />
            ) : warningCount > 0 ? (
              <AlertCircle className="w-6 h-6 text-amber-500" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            )}
            <div>
              <h3 className="font-bold">
                {errorCount > 0 ? `${errorCount} Грешка` : 
                 warningCount > 0 ? `${warningCount} Предупредување` : 
                 'Сè е точно!'}
              </h3>
              <p className="text-xs text-muted-foreground">
                {sentence.split(' ').length} зборови
              </p>
            </div>
          </div>

          {showDetailed ? (
            <div className="space-y-3">
              {issues.map((issue, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl ${
                    issue.type === 'error' 
                      ? 'bg-red-100 dark:bg-red-900/30' 
                      : 'bg-amber-100 dark:bg-amber-900/30'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {issue.type === 'error' ? (
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{issue.message}</p>
                      {issue.suggestion && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Предлог: <span className="font-bold text-primary">{issue.suggestion}</span>
                        </p>
                      )}
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Правило: {issue.rule}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {getGrammarSuggestions(sentence)}
            </p>
          )}

          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => setShowDetailed(!showDetailed)}
          >
            {showDetailed ? 'Покажи кусо' : 'Покажи детално'}
          </Button>
        </Card>
      )}

      {sentence && issues.length === 0 && (
        <Card className="p-6 bg-green-50 dark:bg-green-950/20 rounded-[2rem] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="font-bold">Реченицата изгледа добро!</h3>
              <p className="text-xs text-muted-foreground">
                Нема откриено гриматкички грeшки.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Rules */}
      <Card className="p-6 bg-card rounded-[2rem] border-none shadow-lg">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          Брзи Правила
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold">V2 Правило</p>
              <p className="text-xs text-muted-foreground">Глаголот е секогаш на второ место</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold">Nebensatz</p>
              <p className="text-xs text-muted-foreground">Глаголот на крајот</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold">Akkusativ</p>
              <p className="text-xs text-muted-foreground">durch, für, gegen, ohne, um</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold">Dativ</p>
              <p className="text-xs text-muted-foreground">aus, bei, mit, nach, von, zu</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
