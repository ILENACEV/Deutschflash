"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Clock, BookOpen, Volume2, RotateCcw, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GOETHE_A1, GOETHE_A2, GOETHE_B1, LEVEL_INFO, GoetheQuestion } from '@/lib/goethe-data';

type Level = 'a1' | 'a2' | 'b1';

function getQuestions(level: Level): GoetheQuestion[] {
  switch (level) {
    case 'a1': return GOETHE_A1;
    case 'a2': return GOETHE_A2;
    case 'b1': return GOETHE_B1;
    default: return GOETHE_A1;
  }
}

export default function GoetheTestPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = use(params);
  const level = resolvedParams.level as Level;
  const router = useRouter();
  
  const questions = getQuestions(level);
  const info = LEVEL_INFO[level];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    if (started && timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [started, showResults]);
  
  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleFinish = () => {
    setShowResults(true);
  };
  
  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
    setTimeLeft(20 * 60);
    setStarted(false);
  };
  
  const calculateScore = () => {
    return questions.reduce((score, q, i) => {
      return score + (answers[i] === q.correct ? 1 : 0);
    }, 0);
  };
  
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const passed = score >= info.passingScore;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Link href="/goethe" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Link>
          
          <Card className="p-8 text-center">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center text-4xl mx-auto mb-6`}>
              {info.emoji}
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{info.title}</h1>
            <p className="text-muted-foreground mb-6">{info.subtitle}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-muted rounded-lg">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="font-semibold">{questions.length}</p>
                <p className="text-xs text-muted-foreground">Прашања</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="font-semibold">20:00</p>
                <p className="text-xs text-muted-foreground">Минути</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="font-semibold">{info.passingScore}/{questions.length}</p>
                <p className="text-xs text-muted-foreground">За положување</p>
              </div>
            </div>
            
            <div className="text-left bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Упатство:</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Тестот содржи {questions.length} прашања (Reading + Listening)</li>
                <li>• Имате {Math.floor(20 * 60 / 60)} минути за да го завршите</li>
                <li>• Потребни се {info.passingScore}/{questions.length} точни одговори (60%) за да го положувате</li>
                <li>• Можете да се вратите на претходни прашања</li>
              </ul>
            </div>
            
            <Button 
              onClick={() => setStarted(true)}
              className={`w-full py-6 bg-gradient-to-r ${info.color} text-white text-lg`}
            >
              Започни тест
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    );
  }
  
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="p-8 text-center">
            <div className={`w-24 h-24 rounded-full ${passed ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'} flex items-center justify-center mx-auto mb-6`}>
              {passed ? (
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
              )}
            </div>
            
            <h1 className="text-2xl font-bold mb-2">
              {passed ? 'Честитки! го положивте!' : 'Нажалност, не го положивте'}
            </h1>
            <p className="text-muted-foreground mb-6">{info.title}</p>
            
            <div className={`text-5xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score}/{questions.length}
            </div>
            <p className="text-muted-foreground mb-6">{percentage}% - Потребно: {info.passingScore}/{questions.length} (60%)</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {answers.filter((a, i) => a === questions[i].correct).length}
                </p>
                <p className="text-sm text-muted-foreground">Точни одговори</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-2xl font-bold text-red-600">
                  {answers.filter((a, i) => a !== questions[i].correct && a !== -1).length}
                </p>
                <p className="text-sm text-muted-foreground">Неточни одговори</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-8">
              <Button 
                onClick={handleRestart}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Пробај повторно
              </Button>
              <Link href="/goethe" className="block">
                <Button variant="ghost" className="w-full">
                  Избери друго ниво
                </Button>
              </Link>
            </div>
            
            <div className="text-left space-y-4">
              <h3 className="font-semibold">Преглед на одговори:</h3>
              {questions.map((q, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "p-3 rounded-lg border",
                    answers[i] === q.correct 
                      ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20" 
                      : answers[i] !== -1
                        ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
                        : "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-sm mt-0.5">{i + 1}.</span>
                    <div className="flex-1">
                      <p className="text-sm">{q.question}</p>
                      {q.text && <p className="text-xs text-muted-foreground mt-1 italic">{q.text}</p>}
                      <p className="text-xs mt-1">
                        {answers[i] === -1 ? (
                          <span className="text-yellow-600">Нема одговор</span>
                        ) : answers[i] === q.correct ? (
                          <span className="text-green-600">✓ Точно</span>
                        ) : (
                          <span className="text-red-600">✗ Неточно</span>
                        )}
                      </p>
                      {answers[i] !== q.correct && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Точен одговор: {q.options[q.correct]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }
  
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Link href="/goethe" className="inline-flex items-center text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Излез
          </Link>
          <div className="flex items-center gap-2">
            <Clock className={cn("w-5 h-5", timeLeft < 300 ? "text-red-500 animate-pulse" : "text-muted-foreground")} />
            <span className={cn("font-mono font-semibold", timeLeft < 300 ? "text-red-500" : "")}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Прашање {currentQuestion + 1} од {questions.length}</span>
            <span>{answers.filter(a => a !== -1).length} одговорено</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${info.color} transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              question.type === 'reading' 
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
            )}>
              {question.type === 'reading' ? (
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  Reading
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  Listening
                </span>
              )}
            </span>
          </div>
          
          <h2 className="text-lg font-semibold mb-2">{question.question}</h2>
          
          {question.text && (
            <div className="bg-muted p-4 rounded-lg mb-4 italic">
              {question.text}
            </div>
          )}
          
          {question.context && (
            <p className="text-sm text-muted-foreground mb-4">{question.context}</p>
          )}
          
          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={cn(
                  "w-full p-4 text-left rounded-lg border-2 transition-all",
                  answers[currentQuestion] === i
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-muted hover:border-green-300 dark:hover:border-green-700"
                )}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                {option}
              </button>
            ))}
          </div>
        </Card>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Претходно
          </Button>
          
          {currentQuestion === questions.length - 1 ? (
            <Button 
              onClick={handleFinish}
              className={`bg-gradient-to-r ${info.color} text-white`}
            >
              Заврши тест
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
            >
              Следно
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
        
        <div className="mt-6 flex justify-center gap-1 flex-wrap">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuestion(i)}
              className={cn(
                "w-8 h-8 rounded text-xs font-medium transition-all",
                i === currentQuestion 
                  ? "bg-green-600 text-white"
                  : answers[i] !== -1
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
