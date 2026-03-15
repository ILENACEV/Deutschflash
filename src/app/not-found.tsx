"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="relative">
          <div className="text-[12rem] font-black opacity-5 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary/10 p-6 rounded-full">
              <Search className="w-16 h-16 text-primary animate-pulse" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-black tracking-tight text-foreground">Страницата не е пронајдена</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Изгледа дека зборот што го барате не постои во овој речник... или можеби линкот е застарен.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
            <Button size="lg" className="rounded-2xl px-8 font-bold gap-2">
              <Home className="w-5 h-5" />
              Почетна
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="rounded-2xl px-8 font-bold gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
}
