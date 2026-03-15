"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Share2, RefreshCw, ArrowRight, CheckCircle2, XCircle, GraduationCap, Zap, Trophy, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type Level = 'survival' | 'A1' | 'A2' | 'B1';

interface Question {
  question: string;
  context: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface TestData {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  questions: Question[];
}

const ALL_TESTS: Record<Level, TestData> = {
  survival: {
    title: 'Германски за Преживување',
    subtitle: 'Основни фрази за секојдневие во Германија',
    emoji: '🥨',
    color: 'from-orange-500 to-red-600',
    questions: [
      {
        question: 'Шеф: "Haben Sie Erfahrung?"',
        context: 'На интервју за работа',
        options: ['Дали имате деца?', 'Дали имате искуство?', 'Дали сте во брак?'],
        correct: 1,
        explanation: 'Erfahrung значи искуство. Важно прашање при секое вработување.'
      },
      {
        question: 'Конобар прашува: "Möchten Sie noch etwas?"',
        context: 'Во ресторан',
        options: ['Сметката, ве молам', 'Уште нешто за пиење?', 'Менито, ве молам'],
        correct: 1,
        explanation: 'Noch etwas значи "уште нешто".'
      },
      {
        question: 'Комшија: "Kann ich mal kurz durch?"',
        context: 'Во зграда',
        options: ['Можам ли да изнесам ѓубре?', 'Можам ли брзо да поминам?', 'Можам ли да позајмам шеќер?'],
        correct: 1,
        explanation: 'Durch значи "низ" или "да поминам". Честа фраза во гужва.'
      },
      {
        question: 'Доктор: "Nehmen Sie Medikamente?"',
        context: 'Кај доктор',
        options: ['Пиете ли лекови?', 'Имате ли алергија?', 'Боли ли ве нешто?'],
        correct: 0,
        explanation: 'Medikamente се лекови.'
      },
      {
        question: 'HR: "Wann können Sie anfangen?"',
        context: 'Понудена работа',
        options: ['Кога можете да почнете?', 'Колку сакате да ви платат?', 'Каде е канцеларијата?'],
        correct: 0,
        explanation: 'Anfangen значи "да започнете".'
      }
    ]
  },
  A1: {
    title: 'А1 Сертификат',
    subtitle: 'Почетно ниво - Основи на јазикот',
    emoji: '🌱',
    color: 'from-green-500 to-emerald-700',
    questions: [
      {
        question: 'Кој е правилниот член за "Hund" (куче)?',
        context: 'Именки и родови',
        options: ['die Hund', 'das Hund', 'der Hund'],
        correct: 2,
        explanation: 'Hund е од машки род (der).'
      },
      {
        question: 'Пополни: "Ich ___ Student."',
        context: 'Глаголот "sein"',
        options: ['bin', 'bist', 'ist'],
        correct: 0,
        explanation: 'За прво лице еднина "ich" се користи "bin".'
      },
      {
        question: 'Како се вели "Ви велам фала" (формално)?',
        context: 'Учтивост',
        options: ['Danke dir', 'Vielen Dank', 'Ich danke Ihnen'],
        correct: 2,
        explanation: 'Ihnen е форма за персирање во Датив.'
      },
      {
        question: 'Која реченица е граматички точна?',
        context: 'Ред на зборови',
        options: ['Ich esse Pizza gern.', 'Ich Pizza esse gern.', 'Esse јас Pizza gern.'],
        correct: 0,
        explanation: 'Глаголот е секогаш на втора позиција во изјавна реченица.'
      },
      {
        question: 'Што значи "Tschüss"?',
        context: 'Поздрав',
        options: ['Добар ден', 'Чао / Пријатно', 'Добро утро'],
        correct: 1,
        explanation: 'Tschüss е неформален поздрав за заминување.'
      }
    ]
  },
  A2: {
    title: 'А2 Сертификат',
    subtitle: 'Основно ниво - Секојдневна комуникација',
    emoji: '📘',
    color: 'from-blue-500 to-indigo-700',
    questions: [
      {
        question: 'Пополни: "Ich ___ gestern Pizza gegessen."',
        context: 'Perfekt (Минато време)',
        options: ['bin', 'war', 'habe'],
        correct: 2,
        explanation: 'Глаголот "essen" користи "haben" како помошен глагол во Perfekt.'
      },
      {
        question: 'Пополни: "Er ___ nach Berlin gefahren."',
        context: 'Perfekt (Движење)',
        options: ['hat', 'ist', 'wird'],
        correct: 1,
        explanation: 'За глаголи што означуваат движење од точка А до точка Б се користи "sein".'
      },
      {
        question: 'Кој е точниот Akkusativ: "Ich sehe ___ Mann."',
        context: 'Падежи',
        options: ['der', 'den', 'dem'],
        correct: 1,
        explanation: 'Во Akkusativ машкиот член "der" станува "den".'
      },
      {
        question: 'Која реченица користи "weil" точно?',
        context: 'Зависни реченици',
        options: ['Ich lerne, weil Deutsch е тежок.', 'Ich lerne, weil Deutsch schwer ist.', 'Ich lerne, weil ist Deutsch schwer.'],
        correct: 1,
        explanation: 'По "weil", глаголот секогаш оди на крајот од реченицата.'
      },
      {
        question: 'Што значи модалниот глагол "müssen"?',
        context: 'Модални глаголи',
        options: ['сака', 'смее', 'мора'],
        correct: 2,
        explanation: 'Müssen изразува обврска или неопходност.'
      }
    ]
  },
  B1: {
    title: 'Б1 Сертификат',
    subtitle: 'Средно ниво - Самостојно користење',
    emoji: '🏆',
    color: 'from-purple-600 to-pink-700',
    questions: [
      {
        question: 'Пополни со Konjunktiv II: "Wenn ich Zeit ___, ___ ich kommen."',
        context: 'Конјунктив (Желби)',
        options: ['habe / werde', 'hätte / würde', 'hatte / wäre'],
        correct: 1,
        explanation: 'Konjunktiv II се користи за хипотетички ситуации.'
      },
      {
        question: 'Кој е релативниот член: "Das е der Mann, ___ ich kenne."',
        context: 'Релативни реченици',
        options: ['der', 'den', 'dem'],
        correct: 1,
        explanation: 'Бидејќи "kennen" бара Akkusativ, релативната заменка е "den".'
      },
      {
        question: 'Пасив: "Das Haus ___ gebaut."',
        context: 'Passiv (Состојба)',
        options: ['wird', 'ist', 'hat'],
        correct: 1,
        explanation: 'Zustandspassiv се гради со "sein" + Partizip II.'
      },
      {
        question: 'Што значи "obwohl"?',
        context: 'Везници',
        options: ['затоа што', 'иако', 'бидејќи'],
        correct: 1,
        explanation: 'Obwohl воведува спротивност (иако).'
      },
      {
        question: 'Пополни: "Ich versuche, Deutsch ___ lernen."',
        context: 'Инфинитив со "zu"',
        options: ['zu', 'um zu', 'за'],
        correct: 0,
        explanation: 'По глаголот "versuchen" често следува инфинитивна конструкција со "zu".'
      }
    ]
  }
};

export default function TestPage() {
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Shuffle and pick questions when level selected
  const startTest = (level: Level) => {
    const pool = ALL_TESTS[level].questions;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentLevel(level);
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelectedAnswer(idx);
    setShowFeedback(true);

    if (idx === questions[currentQ].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentLevel(null);
    setShowResult(false);
  };

  // 1. Level Selection Screen
  if (!currentLevel) {
    return (
      <div className="min-h-screen bg-background p-6 max-w-2xl mx-auto flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-2">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground uppercase">Избери свој тест</h1>
          <p className="text-muted-foreground text-lg">Провери го твоето знаење и добиј дигитален сертификат</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {(Object.keys(ALL_TESTS) as Level[]).map((lvl) => {
            const data = ALL_TESTS[lvl];
            return (
              <button
                key={lvl}
                onClick={() => startTest(lvl)}
                className={cn(
                  "p-6 rounded-3xl text-left border-2 transition-all hover:scale-[1.02] active:scale-95 group",
                  "border-border bg-card hover:border-primary shadow-sm"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{data.emoji}</span>
                  <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase bg-gradient-to-r", data.color)}>
                    {lvl}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{data.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{data.subtitle}</p>
              </button>
            );
          })}
        </div>

        <Link href="/">
          <Button variant="ghost" className="rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" /> Назад
          </Button>
        </Link>
      </div>
    );
  }

  const currentTestData = ALL_TESTS[currentLevel];
  const q = questions[currentQ];

  // 2. Result Screen
  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const isPassed = percentage >= 70;

    return (
      <div className="min-h-screen bg-background p-6 max-w-md mx-auto flex flex-col items-center justify-center">
        <Card className="w-full relative overflow-hidden p-8 border-none shadow-2xl bg-card rounded-[2.5rem] text-center">
          <div className={cn("absolute top-0 left-0 w-full h-2 bg-gradient-to-r", currentTestData.color)} />
          
          <div className="mb-6 inline-block p-4 bg-primary/5 rounded-full">
            {isPassed ? <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" /> : <RefreshCw className="w-16 h-16 text-muted-foreground" />}
          </div>

          <h1 className="text-3xl font-black mb-2">{isPassed ? 'Честитки!' : 'Пробај повторно'}</h1>
          <p className="text-muted-foreground mb-8">
            Го заврши тестот за <span className="font-bold text-foreground">{currentTestData.title}</span>
          </p>

          <div className="flex justify-center items-end gap-1 mb-8">
            <span className="text-6xl font-black leading-none">{score}</span>
            <span className="text-2xl text-muted-foreground font-bold italic">/ {questions.length}</span>
          </div>

          {isPassed && (
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl mb-8 flex items-center gap-3 text-left">
              <ShieldCheck className="text-green-600 w-10 h-10 shrink-0" />
              <div>
                <p className="font-bold text-green-800 dark:text-green-300">Сертификат освоен!</p>
                <p className="text-xs text-green-700 dark:text-green-400 opacity-80">Покажавте одлични резултати на ниво {currentLevel}.</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button onClick={() => startTest(currentLevel)} className="w-full py-6 font-bold rounded-2xl bg-primary text-white">
              ПОВТОРИ ТЕСТ
            </Button>
            <Button variant="outline" onClick={reset} className="w-full py-6 font-bold rounded-2xl">
              ДРУГО НИВО
            </Button>
            <Link href="/" className="block">
              <Button variant="ghost" className="w-full">Круни кон почетна</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // 3. Quiz Interface
  return (
    <div className="min-h-screen bg-background p-6 max-w-lg mx-auto flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={reset} className="rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
              Прашање {currentQ + 1} / {questions.length}
            </span>
            <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-black text-white uppercase bg-gradient-to-r", currentTestData.color)}>
              {currentLevel}
            </div>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-500 bg-gradient-to-r", currentTestData.color)} 
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-6">
        <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-card">
          <span className="text-[10px] font-black uppercase text-primary mb-3 block tracking-widest">
            {q.context}
          </span>
          <h2 className="text-2xl font-bold leading-tight">{q.question}</h2>
        </Card>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = i === q.correct;
            
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={showFeedback}
                className={cn(
                  "w-full text-left px-6 py-5 rounded-2xl border-2 font-bold text-base transition-all",
                  !showFeedback && "border-border bg-card hover:border-primary hover:translate-x-1",
                  showFeedback && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300",
                  showFeedback && isSelected && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300",
                  showFeedback && !isSelected && !isCorrect && "opacity-40 grayscale-[0.5]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {showFeedback && (
                    isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : isSelected ? <XCircle className="w-6 h-6 text-red-600" /> : null
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <Card className={cn(
            "p-6 rounded-[2rem] border-none shadow-lg animate-in fade-in slide-in-from-bottom-2",
            selectedAnswer === q.correct ? "bg-green-100/50" : "bg-red-100/50"
          )}>
            <p className="text-xs leading-relaxed opacity-80">{q.explanation}</p>
          </Card>
        )}
      </div>

      <footer className="pt-8 bg-background/80 backdrop-blur-sm sticky bottom-0 -mx-6 px-6 pb-6">
        {showFeedback ? (
          <Button 
            className="w-full py-8 text-xl font-black rounded-3xl bg-primary text-white shadow-xl hover:scale-[1.01] transition-transform"
            onClick={handleNext}
          >
            {currentQ < questions.length - 1 ? 'СЛЕДНО ПРАШАЊЕ' : 'ФИНАЛИЗИРАЈ'}
          </Button>
        ) : (
          <p className="text-center text-xs text-muted-foreground font-medium uppercase tracking-widest opacity-40">
            Избери точен одговор за да продолжиш
          </p>
        )}
      </footer>
    </div>
  );
}
