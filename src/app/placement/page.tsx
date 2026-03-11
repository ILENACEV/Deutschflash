
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { storage } from '@/lib/storage';
import { ArrowLeft, CheckCircle2, XCircle, GraduationCap, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlacementQuestion {
  id: number;
  level: 'A1' | 'A2' | 'B1';
  question_mk: string;
  de_context?: string;
  options: string[];
  correct: number;
  explanation: string;
}

const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // A1 Questions (1-8)
  {
    id: 1, level: 'A1',
    question_mk: 'Кој е точниот превод на „Добар ден"?',
    options: ['Guten Abend', 'Guten Morgen', 'Guten Tag', 'Tschüss'],
    correct: 2,
    explanation: '„Guten Tag" = Добар ден (10–18h). Guten Morgen = утро, Guten Abend = вечер.',
  },
  {
    id: 2, level: 'A1',
    question_mk: 'Кој е правилниот член за „Hund" (куче)?',
    options: ['die Hund', 'das Hund', 'der Hund', 'den Hund'],
    correct: 2,
    explanation: '„der Hund" — машки род. Секогаш учи именки со нивниот член!',
  },
  {
    id: 3, level: 'A1',
    question_mk: 'Пополни: „Ich ___ Student."',
    options: ['bin', 'bist', 'ist', 'sind'],
    correct: 0,
    explanation: '„sein" во сегашно: ich bin, du bist, er/sie/es ist, wir sind.',
  },
  {
    id: 4, level: 'A1',
    question_mk: 'Која реченица е точна?',
    options: ['Ich heiße Max und 25 Jahre alt bin ich.', 'Ich bin 25 Jahre alt und heiße Max.', 'Heiße ich Max und alt bin 25.', 'Max heine ich und 25 bin.'],
    correct: 1,
    explanation: 'Глаголот е секогаш на второ место (V2 правило).',
  },
  {
    id: 5, level: 'A1',
    question_mk: 'Кој збор значи „Куќа"?',
    options: ['die Schule', 'das Haus', 'der Bahnhof', 'die Stadt'],
    correct: 1,
    explanation: '„das Haus" = куќата. Schule = училиште, Bahnhof = станица.',
  },
  {
    id: 6, level: 'A1',
    question_mk: '„Der Hund ___ groß." — Кој глагол недостасува?',
    options: ['habe', 'bin', 'ist', 'sind'],
    correct: 2,
    explanation: 'За „er/sie/es" (der Hund = er), „sein" → „ist".',
  },
  {
    id: 7, level: 'A1',
    question_mk: 'Кој број е „siebenundzwanzig"?',
    options: ['17', '27', '37', '72'],
    correct: 1,
    explanation: 'sieben = 7, und = и, zwanzig = 20. Единицата прва: 7+20 = 27.',
  },
  {
    id: 8, level: 'A1',
    question_mk: 'Пополни: „Ich ___ keinen Hunger." — Немам глад.',
    options: ['bin', 'habe', 'ist', 'hat'],
    correct: 1,
    explanation: 'Hunger haben = имам глад. За „ich" → habe.',
  },

  // A2 Questions (9-15)
  {
    id: 9, level: 'A2',
    question_mk: 'Каде оди глаголот во оваа реченица? „Ich esse gern Pizza, ___ sie lecker ist."',
    de_context: 'Употреби: weil',
    options: ['weil sie lecker ist', 'weil ist sie lecker', 'weil lecker sie ist', 'weil sie ist lecker'],
    correct: 0,
    explanation: 'По „weil" (затоа што), глаголот оди на КРАЈ: „weil sie lecker IST".',
  },
  {
    id: 10, level: 'A2',
    question_mk: 'Пополни: „Ich ___ gestern Pizza gegessen." — Јадов пица вчера.',
    options: ['bin', 'war', 'habe', 'hatte'],
    correct: 2,
    explanation: 'Perfekt со „have" (haben): „essen" бара haben → Ich HABE gegessen.',
  },
  {
    id: 11, level: 'A2',
    question_mk: 'Пополни: „Er ___ nach Berlin gefahren." — Тој отишол во Берлин.',
    options: ['hat', 'ist', 'war', 'habe'],
    correct: 1,
    explanation: 'Perfekt со „sein": „fahren" = движење → Ich BIN gefahren.',
  },
  {
    id: 12, level: 'A2',
    question_mk: 'Кој е точниот Akkusativ? „Ich sehe ___ Mann."',
    options: ['der', 'die', 'das', 'den'],
    correct: 3,
    explanation: 'Akkusativ машки: „der" → „den". Само машкиот род се менува во Akk!',
  },
  {
    id: 13, level: 'A2',
    question_mk: 'Пополни: „Sie ___ Deutsch lernen." — Таа мора да учи германски.',
    options: ['muss', 'kann', 'will', 'darf'],
    correct: 0,
    explanation: '„müssen" = мора (обврска). „muss" е за er/sie/es.',
  },
  {
    id: 14, level: 'A2',
    question_mk: 'Правилна реченица со „aufstehen" (станува)?',
    options: ['Ich aufstehe um 7.', 'Ich stehe auf um 7.', 'Ich stehe um 7 auf.', 'Um 7 ich stehe auf.'],
    correct: 2,
    explanation: 'Разделен глагол: „stehe" = поз. 2, „auf" = на крај. „Ich stehe um 7 AUF."',
  },
  {
    id: 15, level: 'A2',
    question_mk: 'Кој е точниот Dativ? „Ich helfe ___ Frau."',
    options: ['die', 'der', 'das', 'den'],
    correct: 1,
    explanation: 'Dativ женски: „die" → „der". Ich helfe DER Frau = Помагам на жената.',
  },

  // B1 Questions (16-20)
  {
    id: 16, level: 'B1',
    question_mk: 'Пополни со Konjunktiv II: „Wenn ich Zeit ___, ___ ich mit dir kommen."',
    options: ['hätte / würde', 'habe / werde', 'hatte / wird', 'hat / würde'],
    correct: 0,
    explanation: 'Konjunktiv II: haben → hätte, werden → würde. Нереална/замислена ситуација.',
  },
  {
    id: 17, level: 'B1',
    question_mk: 'Пасивна конструкција: „Das Haus ___ gebaut." — Куќата е изградена.',
    options: ['hat', 'ist', 'wird', 'hat'],
    correct: 1,
    explanation: 'Zustandspassiv (состојба): werden → „ist gebaut" (е изградена).',
  },
  {
    id: 18, level: 'B1',
    question_mk: 'Пополни релативна клауза: „Das ist der Mann, ___ ich kenne."',
    options: ['der', 'den', 'dem', 'dess'],
    correct: 1,
    explanation: '„kennen" = знае (Akkusativ) → „der Mann" во Akk = DEN → „den ich kenne".',
  },
  {
    id: 19, level: 'B1',
    question_mk: 'Правилна реченица со „nachdem" (откако)?',
    options: [
      'Nachdem ich gegessen habe, ich schlafe.',
      'Nachdem ich habe gegessen, schlafe ich.',
      'Nachdem ich gegessen habe, schlafe ich.',
      'Ich schlafe, nachdem gegessen ich habe.',
    ],
    correct: 2,
    explanation: '„nachdem" = subordinating conjunction → Perf. на крај во зависна клауза, потоа инверзија во главна.',
  },
  {
    id: 20, level: 'B1',
    question_mk: 'Пополни: „Ich versuche, mehr Deutsch ___ lernen."',
    options: ['zu', 'um zu', 'dass', 'weil'],
    correct: 0,
    explanation: '„versuchen + zu + Infinitiv" = се обидува да. „Ich versuche ZU lernen."',
  },
];

type AppState = 'intro' | 'quiz' | 'result';

export default function PlacementTestPage() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const question = PLACEMENT_QUESTIONS[current];

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    setShowFeedback(true);
    const isCorrect = optionIndex === question.correct;
    setAnswers(prev => [...prev, isCorrect]);
  };

  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    if (current + 1 >= PLACEMENT_QUESTIONS.length) {
      setAppState('result');
      // Save result
      const total = answers.length + 1;
      const correct = answers.filter(Boolean).length + (selected === question.correct ? 1 : 0);
      storage.addXP(correct * 10);
    } else {
      setCurrent(prev => prev + 1);
    }
  };

  // Calculate result
  const totalCorrect = answers.filter(Boolean).length;
  const a1Correct = PLACEMENT_QUESTIONS.slice(0, 8).filter((_, i) => answers[i]).length;
  const a2Correct = PLACEMENT_QUESTIONS.slice(8, 15).filter((_, i) => answers[8 + i]).length;
  const b1Correct = PLACEMENT_QUESTIONS.slice(15).filter((_, i) => answers[15 + i]).length;

  let detectedLevel: 'A1' | 'A2' | 'B1' = 'A1';
  if (b1Correct >= 3) detectedLevel = 'B1';
  else if (a2Correct >= 5) detectedLevel = 'A2';

  const levelColors = { A1: 'text-green-600', A2: 'text-primary', B1: 'text-blue-600' };
  const levelBgs = { A1: 'bg-green-500', A2: 'bg-primary', B1: 'bg-blue-500' };
  const levelDesc = {
    A1: 'Почетник. Одлично место за почеток! Учи основен вокабулар и граматика.',
    A2: 'Основно ниво. Ги знаеш основите — сега е време за Perfekt, модали и падежи.',
    B1: 'Средно ниво. Можеш да комуницираш — фокусирај се на Konjunktiv и сложени реченици.',
  };

  // ── INTRO ──────────────────────────────────────────────────
  if (appState === 'intro') {
    return (
      <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col">
        <header className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Placement Test</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <GraduationCap className="w-14 h-14 text-primary" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter">Провери го твоето ниво!</h2>
            <p className="text-muted-foreground text-sm px-4 leading-relaxed">
              20 прашања кои ќе го одредат твоето ниво на германски — A1, A2 или B1. Нема точни или погрешни. Само биди искрен!
            </p>
          </div>
          <div className="w-full space-y-3">
            {[
              { label: 'A1 — Почетни прашања', count: '8 прашања', color: 'bg-green-500' },
              { label: 'A2 — Средни прашања', count: '7 прашања', color: 'bg-primary' },
              { label: 'B1 — Напредни прашања', count: '5 прашања', color: 'bg-blue-500' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 bg-card p-3 rounded-2xl shadow-sm">
                <div className={cn('w-2 h-8 rounded-full', item.color)} />
                <span className="text-sm font-bold flex-1 text-left">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.count}</span>
              </div>
            ))}
          </div>
          <Button size="lg" className="w-full py-8 text-xl font-bold rounded-2xl shadow-xl bg-primary text-white" onClick={() => setAppState('quiz')}>
            ПОЧНИ ТЕСТОТ
          </Button>
        </div>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────
  if (appState === 'result') {
    return (
      <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col pb-10">
        <header className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Резултати</h1>
        </header>

        <div className="space-y-6">
          <Card className="p-8 border-none shadow-2xl bg-card rounded-[2.5rem] text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Твоето ниво е</p>
            <div className={cn('text-7xl font-black mb-3', levelColors[detectedLevel])}>
              {detectedLevel}
            </div>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed px-4">
              {levelDesc[detectedLevel]}
            </p>
          </Card>

          <div className="space-y-3">
            {[
              { title: 'A1 — Основи', correct: a1Correct, total: 8, color: 'bg-green-500' },
              { title: 'A2 — Основно ниво', correct: a2Correct, total: 7, color: 'bg-primary' },
              { title: 'B1 — Средно ниво', correct: b1Correct, total: 5, color: 'bg-blue-500' },
            ].map(row => (
              <div key={row.title} className="bg-card p-4 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold">{row.title}</span>
                  <span className="text-xs font-black text-muted-foreground">{row.correct}/{row.total}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', row.color)}
                    style={{ width: `${(row.correct / row.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Card className="p-6 bg-primary text-primary-foreground rounded-3xl border-none shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-accent fill-accent" />
              <h4 className="font-black">Препорака</h4>
            </div>
            <p className="text-xs opacity-90 leading-relaxed">
              {detectedLevel === 'A1' && 'Добредојде! Започни со A1 модулот — учи 10 нови зборови на ден и читај ги приказните.'}
              {detectedLevel === 'A2' && 'Го знаеш основното! Фокусирај се на Perfekt, модалните глаголи и разговорни дијалози.'}
              {detectedLevel === 'B1' && 'Одлично ниво! Вежбај Konjunktiv II, пасив и читај B1 приказните за напредна граматика.'}
            </p>
          </Card>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full py-6 font-bold rounded-2xl bg-primary text-white text-base">КОН ГЛАВНАТА СТРАНИЦА</Button>
            </Link>
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => {
              setAppState('intro');
              setCurrent(0);
              setAnswers([]);
              setSelected(null);
              setShowFeedback(false);
            }}>
              Повтори тест
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col">
      <header className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
              Прашање {current + 1} / {PLACEMENT_QUESTIONS.length}
            </span>
            <span className={cn(
              'text-[9px] font-black px-2 py-0.5 rounded-full uppercase',
              question.level === 'A1' ? 'bg-green-100 text-green-700' :
              question.level === 'A2' ? 'bg-primary/10 text-primary' :
              'bg-blue-100 text-blue-700'
            )}>
              ниво {question.level}
            </span>
          </div>
          <Progress value={((current) / PLACEMENT_QUESTIONS.length) * 100} className="h-2" />
        </div>
      </header>

      <div className="flex-1 flex flex-col">
        {/* Question */}
        <Card className="p-6 rounded-[2rem] border-none shadow-xl bg-card mb-6">
          {question.de_context && (
            <div className="text-xs font-medium text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-xl inline-block mb-4">
              {question.de_context}
            </div>
          )}
          <p className="text-xl font-bold text-foreground leading-snug">{question.question_mk}</p>
        </Card>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={cn(
                'w-full text-left px-5 py-4 rounded-2xl border-2 font-bold text-sm transition-all',
                selected === null && 'border-border bg-card hover:border-primary hover:bg-primary/5',
                selected === i && i === question.correct && 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800',
                selected === i && i !== question.correct && 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800',
                selected !== null && i !== selected && i === question.correct && 'border-green-400/60 bg-green-50/50',
                selected !== null && i !== selected && i !== question.correct && 'opacity-40 border-border bg-card'
              )}
            >
              <div className="flex items-center gap-2">
                {selected !== null && (
                  i === question.correct
                    ? <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    : selected === i
                    ? <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                    : <div className="w-4 h-4 shrink-0" />
                )}
                <span>{opt}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <Card className={cn(
            'p-5 rounded-3xl border-none shadow-lg mb-6 animate-in slide-in-from-bottom-3 duration-300',
            selected === question.correct ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'
          )}>
            <p className={cn('font-black text-base mb-1', selected === question.correct ? 'text-green-700' : 'text-red-700')}>
              {selected === question.correct ? '✅ Точно!' : '❌ Не точно'}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{question.explanation}</p>
          </Card>
        )}
      </div>

      {showFeedback && (
        <Button
          size="lg"
          className="w-full py-6 text-lg font-bold rounded-2xl bg-primary text-white"
          onClick={handleNext}
        >
          {current + 1 < PLACEMENT_QUESTIONS.length ? 'СЛЕДНО ПРАШАЊЕ' : 'ВИДИ РЕЗУЛТАТИ'}
        </Button>
      )}
    </div>
  );
}
