"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { VocabularyWord } from '@/lib/types';
import { Bell, BellOff, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ReviewReminder {
  enabled: boolean;
  time: string; // HH:MM format
  lastNotified?: number;
  streakFreeze?: number; // days remaining
}

const DEFAULT_REMINDER: ReviewReminder = {
  enabled: false,
  time: '09:00',
};

export function useDailyReviewReminder() {
  const [reminder, setReminder] = useState<ReviewReminder>(DEFAULT_REMINDER);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [dueWords, setDueWords] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
    loadReminder();
    checkDueWords();
  }, []);

  const loadReminder = async () => {
    try {
      const settings = await storage.getSettings();
      if (settings.reminder) {
        setReminder(settings.reminder);
      }
    } catch (e) {
      console.error('Failed to load reminder:', e);
    }
  };

  const checkDueWords = async () => {
    try {
      const vocab = await storage.getVocabulary();
      const now = Date.now();
      const due = vocab.filter(w => 
        w.status === 'new' || 
        (w.nextReview && w.nextReview <= now)
      ).length;
      setDueWords(due);
    } catch (e) {
      console.error('Failed to check due words:', e);
    }
  };

  const requestPermission = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'denied';
    }
    
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const updateReminder = useCallback(async (updates: Partial<ReviewReminder>) => {
    const newReminder = { ...reminder, ...updates };
    setReminder(newReminder);
    
    try {
      const settings = await storage.getSettings();
      await storage.saveSettings({
        ...settings,
        reminder: newReminder,
      });
    } catch (e) {
      console.error('Failed to save reminder:', e);
    }
  }, [reminder]);

  const scheduleNotification = useCallback(() => {
    if (permission !== 'granted' || !reminder.enabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const now = new Date();
    const [hours, minutes] = reminder.time.split(':').map(Number);
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const delay = scheduledTime.getTime() - now.getTime();

    timeoutRef.current = setTimeout(() => {
      if (dueWords > 0) {
        new Notification('DeutschFlash 🔔', {
          body: `Имаш ${dueWords} зборови за преглед! Време е за учење.`,
          icon: '/icon-192.png',
          tag: 'daily-review',
          requireInteraction: true,
        });
      }
      scheduleNotification();
    }, delay);
  }, [permission, reminder.enabled, reminder.time, dueWords]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (mounted && permission === 'granted' && reminder.enabled) {
      scheduleNotification();
    }
  }, [mounted, permission, reminder.enabled, scheduleNotification]);

  const testNotification = useCallback(async () => {
    if (permission !== 'granted') {
      const result = await requestPermission();
      if (result !== 'granted') return;
    }

    new Notification('DeutschFlash 🧪', {
      body: 'Тест нотификација! Твојот систем работи.',
      icon: '/icon-192.png',
    });
  }, [permission, requestPermission]);

  return {
    reminder,
    permission,
    dueWords,
    requestPermission,
    updateReminder,
    testNotification,
    checkDueWords,
  };
}

export function DailyReviewReminderCard() {
  const { toast } = useToast();
  const router = useRouter();
  const { 
    reminder, 
    permission, 
    dueWords, 
    requestPermission, 
    updateReminder,
    testNotification 
  } = useDailyReviewReminder();
  const [timeInput, setTimeInput] = useState(reminder.time);

  const handleToggle = async () => {
    if (!reminder.enabled) {
      if (permission === 'default') {
        const result = await requestPermission();
        if (result !== 'granted') {
          toast({
            variant: 'destructive',
            title: 'Нема дозвола',
            description: 'Дозволи нотификации за да го користиш овој напоменат.',
          });
          return;
        }
      }
    }
    updateReminder({ enabled: !reminder.enabled });
  };

  const handleTimeChange = (newTime: string) => {
    setTimeInput(newTime);
    updateReminder({ time: newTime });
  };

  const handleTest = () => {
    testNotification();
    toast({
      title: 'Тест испратен',
      description: 'Провери ги нотификациите.',
    });
  };

  return (
    <Card className="p-6 bg-card rounded-[2rem] border-none shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            {reminder.enabled ? (
              <Bell className="w-6 h-6 text-primary" />
            ) : (
              <BellOff className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">Дневен Потсетник</h3>
            <p className="text-xs text-muted-foreground">
              {dueWords > 0 ? `${dueWords} зборови за преглед` : 'Сите зборови се прегледани'}
            </p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className={`w-14 h-8 rounded-full transition-all ${
            reminder.enabled ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
              reminder.enabled ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {reminder.enabled && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <label className="text-sm font-medium">Време за потсетник:</label>
            <input
              type="time"
              value={timeInput}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-background text-sm font-bold"
            />
          </div>

          {permission !== 'granted' && (
            <div className="flex items-center gap-2 text-amber-600 text-sm bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span>Дозволи нотификации во прелистувачот</span>
            </div>
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={handleTest}
            disabled={permission !== 'granted'}
          >
            Тест Нотификација
          </Button>
        </div>
      )}

      {dueWords > 0 && (
        <Button
          className="w-full mt-4 bg-primary"
          onClick={() => router.push('/session')}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Започни Преглед
        </Button>
      )}
    </Card>
  );
}
