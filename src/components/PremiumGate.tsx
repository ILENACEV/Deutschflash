"use client";

import React from 'react';
import { useStorageContext } from './StorageProvider';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  featureName?: string;
  className?: string;
}

export function PremiumGate({ children, fallback, featureName, className }: PremiumGateProps) {
  const { stats } = useStorageContext();
  const isPremium = stats?.isPremium || false;

  if (isPremium) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-[2rem] border-2 border-dashed border-muted/50 p-8 text-center bg-card/50 backdrop-blur-sm",
      className
    )}>
      <div className="absolute top-2 right-2 bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1">
        <Sparkles className="w-3 h-3" />
        PREMIUM
      </div>
      
      <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock className="w-8 h-8 text-muted-foreground/30" />
      </div>
      
      <h3 className="font-black text-xl mb-2 tracking-tight">
        {featureName || "Оваа опција е заклучена"}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-6 max-w-[250px] mx-auto">
        DeutschFlash Premium нуди неограничен пристап до напредни содржини и детална статистика.
      </p>
      
      <Button className="w-full py-6 rounded-2xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 transition-all">
        ОТКЛУЧИ ПРЕМИУМ
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
}
