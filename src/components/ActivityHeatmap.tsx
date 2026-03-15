"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { storage } from '@/lib/storage';
import { LearningSession } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const LEVEL_COLORS = [
  'bg-muted/20',
  'bg-green-200 dark:bg-green-900',
  'bg-green-400 dark:bg-green-700',
  'bg-green-500 dark:bg-green-500',
  'bg-green-600 dark:bg-green-400',
];

const DAYS = ['Нед', 'Пон', 'Вто', 'Сре', 'Чет', 'Пет', 'Саб'];
const MONTHS = ['Јан', 'Фев', 'Мар', 'Апр', 'Мај', 'Јун', 'Јул', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'];

export function ActivityHeatmap() {
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    storage.getSessions().then(setSessions);
  }, []);

  const activityData = useMemo(() => {
    const today = new Date();
    const days: ActivityDay[] = [];
    
    // Генерирај 365 дена (52 недели)
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      
      const count = sessions
        .filter(s => s.date >= dayStart.getTime() && s.date <= dayEnd.getTime())
        .reduce((sum, s) => sum + s.wordCount, 0);
      
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count > 0) level = 1;
      if (count >= 5) level = 2;
      if (count >= 15) level = 3;
      if (count >= 30) level = 4;
      
      days.push({ date: dateStr, count, level });
    }
    
    return days;
  }, [sessions]);

  const weeks = useMemo(() => {
    const result: ActivityDay[][] = [];
    let currentWeek: ActivityDay[] = [];
    
    activityData.forEach((day, idx) => {
      const dayOfWeek = new Date(day.date).getDay();
      
      if (idx === 0) {
        // Додади празни дена за првата недела ако треба
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: '', count: 0, level: 0 });
        }
      }
      
      currentWeek.push(day);
      
      if (dayOfWeek === 6 || idx === activityData.length - 1) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });
    
    return result;
  }, [activityData]);

  const totalWords = sessions.reduce((sum, s) => sum + s.wordCount, 0);
  const totalDays = new Set(sessions.map(s => new Date(s.date).toISOString().split('T')[0])).size;

  if (!mounted) return null;

  return (
    <Card className="p-6 bg-card rounded-[2rem] border-none shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-lg">Активност</h3>
          <p className="text-xs text-muted-foreground">{totalWords} зборови за {totalDays} дена</p>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-1">
            {DAYS.map((day, idx) => (
              idx % 2 === 1 && (
                <div key={day} className="h-3 text-[8px] text-muted-foreground leading-3">
                  {day}
                </div>
              )
            ))}
          </div>
          
          {/* Weeks */}
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day, dayIdx) => (
                <div
                  key={dayIdx}
                  className={`w-3 h-3 rounded-sm ${
                    day.date ? LEVEL_COLORS[day.level] : 'bg-transparent'
                  }`}
                  title={day.date ? `${day.date}: ${day.count} зборови` : ''}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <span className="text-[10px] text-muted-foreground">Помалку</span>
        <div className="flex gap-1">
          {LEVEL_COLORS.map((color, idx) => (
            <div key={idx} className={`w-3 h-3 rounded-sm ${color}`} />
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground">Повеќе</span>
      </div>
    </Card>
  );
}

export default function StatsPageWithHeatmap() {
  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body">
      <ActivityHeatmap />
    </div>
  );
}
