"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Share2, RefreshCw, ArrowRight, BookOpen, Zap, Brain } from 'lucide-react';

type TestLevel = 'a1' | 'a2' | 'b1';

interface Question {
  question: string;
  context: string;
  options: string[];
  correct: number;
}

interface Test {
  title: string;
  subtitle: string;
  emoji: string;
  questions: Question[];
}

const TESTS: Record<TestLevel, Test> = {
  a1: {
    title: 'A1 Тест',
    subtitle: 'Тест за почетноци',
    emoji: '📘',
    questions: [
      {
        question: 'Како е "јаболко" на германски?',
        context: 'Вокабулар',
        options: ['Apfel', 'Orange', 'Birne'],
        correct: 0,
      },
      {
        question: 'Избери го точниот член: die ___ (книга)',
        context: 'Членови',
        options: ['Buch', 'Der Buch', 'Ein Buch'],
        correct: 0,
      },
      {
        question: 'Како е "јас сум" на германски?',
        context: 'Лични заменки',
        options: ['Ich bin', 'Ich habe', 'Ich bin'],
        correct: 1,
      },
      {
        question: 'Што значи "Guten Morgen"?',
        context: 'Поздрави',
        options: ['Добар ден', 'Добро утро', 'Добро вечер'],
        correct: 1,
      },
      {
        question: 'Како е "куќа" на германски?',
        context: 'Вокабулар',
        options: ['Haus', 'Wohnung', 'Zimmer'],
        correct: 0,
      },
      {
        question: 'Избери го правилниот ред: (јас/сум/од/Германија)',
        context: 'Редослед',
        options: ['Ich bin aus Deutschland', 'Ich aus bin Deutschland', 'Aus bin ich Deutschland'],
        correct: 0,
      },
      {
        question: 'Што значи "bitte"?',
        context: 'Зборови',
        options: ['Ве молам', 'Фала', 'Да'],
        correct: 1,
      },
      {
        question: 'Како е "работа" на германски?',
        context: 'Вокабулар',
        options: ['Arbeit', 'Wohnung', 'Zeit'],
        correct: 0,
      },
      {
        question: 'Избери го точниот облик: Ich ___ ein Buch (читам)',
        context: 'Глаголи',
        options: ['lest', 'lesen', 'lese'],
        correct: 2,
      },
      {
        question: 'Што значи "Danke"?',
        context: 'Поздрави',
        options: ['Ве молам', 'Фала', 'Збогом'],
        correct: 1,
      },
    ],
  },
  a2: {
    title: 'A2 Тест',
    subtitle: 'Тест за средено ниво',
    emoji: '📙',
    questions: [
      {
        question: 'Како е "тргнувам" на германски?',
        context: 'Глаголи',
        options: ['ich gehe', 'ich laufe', 'ich fahre'],
        correct: 2,
      },
      {
        question: 'Што значи "kann"?',
        context: 'Модални глаголи',
        options: ['Мора', 'Може', 'Треба'],
        correct: 1,
      },
      {
        question: 'Избери го точниот падеж: der Tisch (DAT)',
        context: 'Падежи',
        options: ['dem Tisch', 'den Tisch', 'des Tisches'],
        correct: 0,
      },
      {
        question: 'Како е "пред" на германски?',
        context: 'Предлози',
        options: ['vor', 'nach', 'bei'],
        correct: 0,
      },
      {
        question: 'Што значи "Ich möchte"?',
        context: 'Модалност',
        options: ['Јас можам', 'Би сакал', 'Јас мора'],
        correct: 1,
      },
      {
        question: 'Како е "секој ден" на германски?',
        context: 'Време',
        options: ['jeden Tag', 'jeder Tag', 'täglich'],
        correct: 0,
      },
      {
        question: 'Избери го точниот облик: Wir ___ gestern (отидовме)',
        context: 'Минато време',
        options: ['sind gegangen', 'gingen', 'sind gegangen'],
        correct: 0,
      },
      {
        question: 'Што значи "weil"?',
        context: 'Сврзници',
        options: ['Дека', 'Затоа што', 'Ама'],
        correct: 1,
      },
      {
        question: 'Како е "после" на германски?',
        context: 'Време',
        options: ['nachher', 'dann', 'später'],
        correct: 2,
      },
      {
        question: 'Што значи "obwohl"?',
        context: 'Сврзници',
        options: ['Иако', 'Затоа што', 'Но'],
        correct: 0,
      },
    ],
  },
  b1: {
    title: 'B1 Тест',
    subtitle: 'Тест за напредно ниво',
    emoji: '📕',
    questions: [
      {
        question: 'Избери го точниот Konjunktiv II облик: "Ако бев богат..."',
        context: 'Конјунктив',
        options: ['wäre', 'wird', 'war'],
        correct: 0,
      },
      {
        question: 'Што значи "obwohl" во комбинација со Indikativ?',
        context: 'Сврзници',
        options: ['Иако (контраст)', 'Затоа што', 'Додека'],
        correct: 0,
      },
      {
        question: 'Како е "кој бил, бил" на германски?',
        context: 'Релативни реченици',
        options: ['wer auch immer', 'wer auch', 'wer auch nur'],
        correct: 0,
      },
      {
        question: 'Избери го точниот инфинитив со zu: "Er hilft mir ___ die Aufgabe"',
        context: 'Инфинитив',
        options: ['zu erledigen', 'erledigen', 'zu machen'],
        correct: 0,
      },
      {
        question: 'Што значи "Falls" во реченица?',
        context: 'Услов',
        options: ['Доколку', 'Тогаш', 'Инаку'],
        correct: 0,
      },
      {
        question: 'Како е "и покрај тоа" на германски?',
        context: 'Прилози',
        options: ['außerdem', 'trotzdem', 'obwohl'],
        correct: 0,
      },
      {
        question: 'Избери го точниот Passiv облик: "Книгата е пишувана"',
        context: 'Пасив',
        options: ['Das Buch wird geschrieben', 'Das Buch ist geschrieben', 'Das Buch wurde geschrieben'],
        correct: 1,
      },
      {
        question: 'Што значи "weshalb" во прашање?',
        context: 'Прашања',
        options: ['Зошто', 'Како', 'Кога'],
        correct: 0,
      },
      {
        question: 'Како е "додека не" на германски (време)?',
        context: 'Сврзници',
        options: ['bis', 'während', 'bevor'],
        correct: 0,
      },
      {
        question: 'Избери го точниот облик за хипотеза: "Ако ___ (тие би)..."',
        context: 'Хипотетички облици',
        options: ['wäre', 'ist', 'war'],
        correct: 0,
      },
    ],
  },
};

type ResultLevel = 'fail' | 'pass' | 'good' | 'excellent';

interface Result {
  level: ResultLevel;
  title: string;
  emoji: string;
  description: string;
  color: string;
}

const RESULTS: Record<ResultLevel, Result> = {
  fail: {
    level: 'fail',
    title: 'Не положен',
    emoji: '😔',
    description: 'Треба да вежбуваш повеќе! Обиди се повторно.',
    color: 'bg-red-100 border-red-300',
  },
  pass: {
    level: 'pass',
    title: 'Положен',
    emoji: '👍',
    description: 'Добро! Продолжи да вежбуваш.',
    color: 'bg-yellow-100 border-yellow-300',
  },
  good: {
    level: 'good',
    title: 'Добар',
    emoji: '😊',
    description: 'Браво! Имаш добро разбирање.',
    color: 'bg-green-100 border-green-300',
  },
  excellent: {
    level: 'excellent',
    title: 'Одличен',
    emoji: '🎉',
    description: 'Феноменално! Сите одговори точни.',
    color: 'bg-blue-100 border-blue-300',
  },
};

export default function LevelTestPage() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<TestLevel | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const test = selectedLevel ? TESTS[selectedLevel] : null;
  const totalQuestions = test?.questions.length || 0;

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback || !test) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    if (answerIndex === test.questions[currentQ].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQ < totalQuestions - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const getResult = (): Result => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) return RESULTS.excellent;
    if (percentage >= 70) return RESULTS.good;
    if (percentage >= 50) return RESULTS.pass;
    return RESULTS.fail;
  };

  const restart = () => {
    setSelectedLevel(null);
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (!selectedLevel) {
    return (
      <div className="min-h-screen bg-background p-6 max-w-md mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-foreground mb-4">Германски Тест</h1>
          <p className="text-muted-foreground">Избери го твојот ниво</p>
        </div>

        <div className="space-y-4">
          <button onClick={() => setSelectedLevel('a1')} className="w-full">
            <Card className="p-6 rounded-2xl border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📘</div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">A1 Тест</h3>
                  <p className="text-sm text-muted-foreground">За почетници</p>
                </div>
              </div>
            </Card>
          </button>

          <button onClick={() => setSelectedLevel('a2')} className="w-full">
            <Card className="p-6 rounded-2xl border-2 border-orange-200 hover:border-orange-500 hover:bg-orange-50 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📙</div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">A2 Тест</h3>
                  <p className="text-sm text-muted-foreground">Средено ниво</p>
                </div>
              </div>
            </Card>
          </button>

          <button onClick={() => setSelectedLevel('b1')} className="w-full">
            <Card className="p-6 rounded-2xl border-2 border-red-200 hover:border-red-500 hover:bg-red-50 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📕</div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">B1 Тест</h3>
                  <p className="text-sm text-muted-foreground">Напредно ниво</p>
                </div>
              </div>
            </Card>
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const result = getResult();
    
    return (
      <div className="min-h-screen bg-background p-6 max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
          </Link>
          <div className="text-6xl mb-4">{result.emoji}</div>
          <h1 className="text-3xl font-black text-foreground mb-2">{result.title}</h1>
          <p className="text-2xl font-bold text-primary">{score} / {totalQuestions}</p>
        </div>

        <Card className={`p-6 rounded-2xl border-2 ${result.color} mb-6`}>
          <p className="text-center text-lg">{result.description}</p>
        </Card>

        <div className="space-y-4">
          <Button onClick={restart} className="w-full py-6 text-lg font-bold bg-primary text-white">
            <RefreshCw className="w-5 h-5 mr-2" />
            Други тест
          </Button>

          <Button 
            onClick={() => {
              const text = `${test?.emoji} ${test?.title}\n\nРезултат: ${score}/${totalQuestions}\nНиво: ${result.title}\n\nТестирај се ти!\ndeutschflash.mk/test-level`;
              if (navigator.share) {
                navigator.share({ text });
              } else {
                navigator.clipboard.writeText(text);
                alert('Резултатот е копиран во clipboard!');
              }
            }}
            variant="outline"
            className="w-full py-6 text-lg font-bold"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Сподели
          </Button>

          <Link href="/dashboard" className="block">
            <Button className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 text-white">
              Учи германски бесплатно
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto">
      <Link href="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
      </Link>

      <div className="text-center mb-8">
        <div className="text-4xl mb-2">{test?.emoji}</div>
        <h1 className="text-2xl font-black text-foreground">{test?.title}</h1>
        <p className="text-muted-foreground">{test?.subtitle}</p>
      </div>

      <div className="mb-4 flex justify-between text-sm text-muted-foreground">
        <span>Прашање {currentQ + 1} / {totalQuestions}</span>
        <span>Поени: {score}</span>
      </div>

      <div className="w-full bg-muted h-2 rounded-full mb-8">
        <div 
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      <Card className="p-6 rounded-2xl mb-6">
        <div className="text-sm text-primary font-medium mb-2">
          {test?.questions[currentQ].context}
        </div>
        <h2 className="text-xl font-bold text-foreground mb-6">
          {test?.questions[currentQ].question}
        </h2>

        <div className="space-y-3">
          {test?.questions[currentQ].options.map((option, idx) => (
            <Button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={showFeedback}
              variant="outline"
              className={`w-full py-4 text-left justify-start h-auto whitespace-normal ${
                showFeedback
                  ? idx === test?.questions[currentQ].correct
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : selectedAnswer === idx
                      ? 'bg-red-100 border-red-500 text-red-700'
                      : ''
                  : ''
              }`}
            >
              <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span>
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
