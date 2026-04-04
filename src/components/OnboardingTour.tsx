"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, Brain, Sparkles, Trophy, BookOpen, GraduationCap, X } from 'lucide-react';
import { trackEvent } from './GoogleAnalytics';

const ONBOARDING_KEY = 'deutschflash_onboarding_completed';

export function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Small delay to ensure everything is mounted
    setTimeout(() => {
      const isCompleted = localStorage.getItem(ONBOARDING_KEY);
      if (!isCompleted) {
        setOpen(true);
      }
    }, 1200);
  }, []);

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setOpen(false);
  };

  const steps = [
    {
      title: "Добредојде во DeutschFlash! 🚀",
      description: "Твојот македонски придружник во учењето германски. Научи брзо, ефикасно и целосно македонски.",
      icon: <Zap className="w-12 h-12 text-primary fill-primary" />,
      color: "from-primary/20 to-primary/5"
    },
    {
      title: "Научно докажан метод 🧠",
      description: "Користиме SM-2 алгоритам за повторување. Знаеме кога точно да ти го освежиме секој збор за да остане трајно запаметен.",
      icon: <Brain className="w-12 h-12 text-accent" />,
      color: "from-accent/20 to-accent/5"
    },
    {
      title: "VocaSwipe: Учи низ игра 🃏",
      description: "Повлечи десно ако го знаеш зборот, лево за повторно учење. Едноставно и зависно!",
      icon: <Sparkles className="w-12 h-12 text-orange-500 fill-orange-500" />,
      color: "from-orange-500/20 to-orange-500/5"
    },
    {
      title: "Моќен речник 📚",
      description: "Истражи 3000+ зборови по нивоа (A1, A2, B1), интерактивни приказни и граматички вежби.",
      icon: <BookOpen className="w-12 h-12 text-blue-500" />,
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      title: "Спремен си за почеток? 🎓",
      description: "Избери модул на почетната страна и започни ја твојата прва сесија. Viel Glück!",
      icon: <GraduationCap className="w-12 h-12 text-primary" />,
      color: "from-primary/30 to-primary/10"
    }
  ];

  const currentStep = steps[step];

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleComplete()}>
      <DialogContent className="max-w-[400px] rounded-[2.5rem] border-none p-0 overflow-hidden bg-background">
        <div className={`p-8 bg-gradient-to-br ${currentStep.color} flex flex-col items-center text-center transition-colors duration-500`}>
          <div className="w-20 h-20 rounded-3xl bg-card shadow-xl flex items-center justify-center mb-8 animate-in zoom-in spin-in-12 duration-500">
            {currentStep.icon}
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight mb-2 text-foreground">
            {currentStep.title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground leading-relaxed px-2">
            {currentStep.description}
          </DialogDescription>
        </div>

        <div className="p-8 pt-4">
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-10 bg-primary' : 'w-2 bg-muted'}`} 
              />
            ))}
          </div>

          <div className="flex justify-between gap-3">
             <Button 
                variant="ghost" 
                onClick={handleComplete}
                className="font-bold text-muted-foreground uppercase text-xs"
              >
                ПРЕСКОКНИ
              </Button>
              {step < steps.length - 1 ? (
                <Button 
                  onClick={() => setStep(prev => prev + 1)}
                  className="px-8 py-6 rounded-2xl font-black shadow-lg text-lg flex-1"
                >
                  СЛЕДНО
                </Button>
              ) : (
                <Button 
                  onClick={handleComplete}
                  className="px-8 py-6 rounded-2xl font-black shadow-xl text-lg flex-1 bg-primary hover:bg-primary/90"
                >
                  ОДИМЕ!
                </Button>
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
