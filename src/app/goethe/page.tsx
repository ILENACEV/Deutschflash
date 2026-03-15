"use client";

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ArrowRight, BookOpen, Clock, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';

const LEVELS = [
  {
    level: 'a1',
    title: 'Goethe-Zertifikat A1',
    subtitle: 'Start Deutsch 1',
    description: 'Најосновно ниво. Докажува дека можете да се претставите и да комуницирате на едноставен начин.',
    questions: 30,
    time: 20,
    passing: 18,
    emoji: '📗',
    color: 'from-green-500 to-emerald-700',
    borderColor: 'border-green-200 dark:border-green-800',
    features: ['Основни фрази', 'Секојдневна комуникација', 'Едноставни текстови']
  },
  {
    level: 'a2',
    title: 'Goethe-Zertifikat A2',
    subtitle: 'Start Deutsch 2',
    description: 'Основно ниво. Докажува дека можете да комуницирате во едноставни и рутински ситуации.',
    questions: 30,
    time: 20,
    passing: 18,
    emoji: '📙',
    color: 'from-blue-500 to-indigo-700',
    borderColor: 'border-blue-200 dark:border-blue-800',
    features: ['Секојдневни теми', 'Едноставна кореспонденција', 'Описи и барања']
  },
  {
    level: 'b1',
    title: 'Goethe-Zertifikat B1',
    subtitle: 'Zertifikat Deutsch',
    description: 'Средно ниво. Докажува дека можете да се изразувате јасно и да се снаоѓате во повечето ситуации.',
    questions: 30,
    time: 20,
    passing: 18,
    emoji: '📕',
    color: 'from-purple-500 to-pink-700',
    borderColor: 'border-purple-200 dark:border-purple-800',
    features: ['Комплексни текстови', 'Дискусии и аргументи', 'Слободно изразување']
  }
];

export default function GoethePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-2">
            Goethe-Zertifikat
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Симулација на официјален германски сертификат. 
            Тестирајте го вашето знаење според меѓународните стандарди.
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800 dark:text-yellow-300">Како функционира тестот?</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                Тестот содржи 30 прашања (Reading + Listening). 
                За положување потребни се 60% (18/30 точна одговори). 
                Времето е ограничено на 20 минути.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {LEVELS.map((level) => (
            <Card 
              key={level.level}
              className={`p-6 ${level.borderColor} hover:shadow-lg transition-all`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${level.color} flex items-center justify-center text-2xl`}>
                    {level.emoji}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{level.title}</h2>
                    <p className="text-sm text-muted-foreground">{level.subtitle}</p>
                    <p className="mt-2 text-sm">{level.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {level.questions} прашања
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {level.time} мин
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {level.passing}/{level.questions} за положување
                    </span>
                  </div>
                  
                  <Link href={`/goethe/${level.level}`}>
                    <button
                      className={`w-full md:w-auto px-6 py-2 bg-gradient-to-r ${level.color} text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
                    >
                      Започни тест
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {level.features.map((feature, i) => (
                  <span 
                    key={i}
                    className="text-xs bg-muted px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/test" className="text-sm text-muted-foreground hover:text-primary">
            ← Назад на сите тестови
          </Link>
        </div>
      </div>
    </div>
  );
}
