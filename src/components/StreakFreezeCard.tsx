"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { storage } from '@/lib/storage';
import { Settings } from '@/lib/types';
import { Snowflake, Gift, AlertCircle, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FREEZES_PER_MONTH = 2;

export function StreakFreezeCard() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    storage.getSettings().then(setSettings);
  }, []);

  const useStreakFreeze = async () => {
    const currentFreezes = settings?.streakFreeze?.available || 0;
    if (currentFreezes <= 0) {
      toast({
        variant: 'destructive',
        title: 'Немаш Freeze',
        description: 'Немаш достапен Streak Freeze. Купи го следниот пат!',
      });
      return;
    }

    const updatedSettings: Settings = {
      sessionSize: settings?.sessionSize || 10,
      reminder: settings?.reminder,
      streakFreeze: {
        available: currentFreezes - 1,
        usedDate: Date.now(),
      },
    };

    await storage.saveSettings(updatedSettings);
    setSettings(updatedSettings);

    toast({
      title: 'Streak Freeze активиран! ❄️',
      description: 'Твојот streak е заштитен за денес.',
    });
  };

  const claimFreeze = async () => {
    const now = Date.now();
    const lastClaim = settings?.streakFreeze?.usedDate || 0;
    const daysSinceLastClaim = Math.floor((now - lastClaim) / (24 * 60 * 60 * 1000));

    if (daysSinceLastClaim < 7) {
      toast({
        variant: 'destructive',
        title: 'Прерано',
        description: 'Можеш да побараш нов Freeze секоја недела.',
      });
      return;
    }

    const newAvailable = Math.min(
      (settings?.streakFreeze?.available || 0) + 1,
      FREEZES_PER_MONTH
    );

    const updatedSettings: Settings = {
      sessionSize: settings?.sessionSize || 10,
      reminder: settings?.reminder,
      streakFreeze: {
        available: newAvailable,
      },
    };

    await storage.saveSettings(updatedSettings);
    setSettings(updatedSettings);

    toast({
      title: 'Нов Streak Freeze! 🎁',
      description: 'Имаш нов Freeze на располагање.',
    });
  };

  if (!mounted || !settings) return null;

  const freezes = settings.streakFreeze?.available || 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-[2rem] border-none shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
          <Snowflake className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Streak Freeze</h3>
          <p className="text-xs text-muted-foreground">
            Заштити го својот streak
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-blue-600">{freezes}</span>
          <span className="text-sm text-muted-foreground">достапни</span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={claimFreeze}
          className="text-xs"
        >
          <Gift className="w-3 h-3 mr-1" />
          Побарај
        </Button>
      </div>

      <div className="space-y-2">
        <Button
          onClick={useStreakFreeze}
          disabled={freezes <= 0}
          className="w-full"
          variant={freezes > 0 ? 'default' : 'outline'}
        >
          {freezes > 0 ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Активирај Freeze
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 mr-2" />
              Немаш достапен Freeze
            </>
          )}
        </Button>
      </div>

      <p className="text-[10px] text-muted-foreground text-center mt-3">
        Освојувај по 1 Freeze секоја недела
      </p>
    </Card>
  );
}
