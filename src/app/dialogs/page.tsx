
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DIALOGS_DATA } from '@/lib/dialogs-data';
import { ArrowLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DialogsListPage() {
  const [filter, setFilter] = useState<'all' | 'A1' | 'A2'>('all');

  const filtered = filter === 'all'
    ? DIALOGS_DATA
    : DIALOGS_DATA.filter(d => d.level === filter);

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body pb-20">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Дијалози
          </h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Реални ситуации на германски</p>
        </div>
      </header>

      {/* Level Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {(['all', 'A1', 'A2'] as const).map(lvl => (
          <Button
            key={lvl}
            variant={filter === lvl ? 'default' : 'outline'}
            className="rounded-full px-6 text-xs h-9 shrink-0"
            onClick={() => setFilter(lvl)}
          >
            {lvl === 'all' ? 'Сите' : `Ниво ${lvl}`}
          </Button>
        ))}
      </div>

      {/* Dialog Cards */}
      <div className="space-y-4 mb-10">
        {filtered.map(dialog => (
          <Link key={dialog.id} href={`/dialogs/${dialog.id}`}>
            <Card className="p-5 border-none shadow-sm bg-card rounded-[2rem] hover:shadow-md transition-all group mb-4 relative overflow-hidden">
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-16 h-16 bg-secondary/30 rounded-2xl flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                  {dialog.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={cn(
                      "text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border-none",
                      dialog.level === 'A1' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" : "bg-accent/10 text-primary"
                    )}>
                      Ниво {dialog.level}
                    </Badge>
                    <span className="text-[9px] text-muted-foreground font-bold">
                      {dialog.vocabulary.length} зборови
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-1 leading-tight">{dialog.title}</h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                    {dialog.situation}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground self-center shrink-0" />
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl" />
            </Card>
          </Link>
        ))}
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-primary text-primary-foreground rounded-[2rem] border-none shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="font-black text-lg mb-2 flex items-center gap-2">
            💬 Зошто дијалози?
          </h4>
          <p className="text-xs opacity-90 leading-relaxed font-medium">
            Научи германски онака како го зборуваат Германците — во реални ситуации. Секој дијалог ти дава практика за говор и те подготвува за секојдневниот живот.
          </p>
        </div>
        <MessageCircle className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 rotate-12" />
      </Card>
    </div>
  );
}
