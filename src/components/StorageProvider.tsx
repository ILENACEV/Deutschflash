'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { VocabularyWord, UserStats, LearningSession, Settings } from '@/lib/types';
import type { VerbData, AdjectiveQuestion, Idiom, CaseQuestion } from '@/lib/types';
import { VERBS_DATA } from '@/lib/verbs-data';
import { ADJECTIVES_DATA } from '@/lib/adjectives-data';
import { IDIOMS_DATA } from '@/lib/idioms-data';
import { CASES_DATA } from '@/lib/cases-data';
import {
  getDB,
  dbGetAllVocab,
  dbSaveAllVocab,
  dbGet,
  dbSet,
  dbGetArray,
  dbSaveArray,
} from '@/lib/db';

// ─── Context shape ──────────────────────────────────────────────────────────────
interface StorageContextType {
  isLoading: boolean;

  // Vocabulary
  vocabulary: VocabularyWord[];
  saveVocabulary: (words: VocabularyWord[]) => Promise<void>;

  // Stats
  stats: UserStats;
  saveStats: (stats: UserStats) => Promise<void>;
  addXP: (amount: number) => Promise<void>;

  // Sessions
  sessions: LearningSession[];
  saveSession: (session: LearningSession) => Promise<void>;

  // Settings
  settings: { sessionSize: number };
  saveSettings: (s: { sessionSize: number }) => Promise<void>;

  // Game data (read only from context — rarely changes)
  verbs: VerbData[];
  adjectives: AdjectiveQuestion[];
  idioms: Idiom[];
  cases: CaseQuestion[];
}

const DEFAULT_STATS: UserStats = {
  totalLearned: 0,
  streak: 0,
  difficultWordsCount: 0,
  dailyGoal: 10,
  experience: 0,
};

const StorageContext = createContext<StorageContextType | null>(null);

// ─── Provider ───────────────────────────────────────────────────────────────────
export function StorageProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>([]);
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [settings, setSettings] = useState<{ sessionSize: number }>({ sessionSize: 10 });
  const [verbs, setVerbs] = useState<VerbData[]>(VERBS_DATA);
  const [adjectives, setAdjectives] = useState<AdjectiveQuestion[]>(ADJECTIVES_DATA);
  const [idioms, setIdioms] = useState<Idiom[]>(IDIOMS_DATA);
  const [cases, setCases] = useState<CaseQuestion[]>(CASES_DATA);

  // ── Load all data once on mount ────────────────────────────────────────────
  useEffect(() => {
    async function loadAll() {
      try {
        await getDB(); // ensure DB is open

        const [
          vocabData,
          statsData,
          sessionsData,
          settingsData,
          verbsData,
          adjData,
          idiomsData,
          casesData,
        ] = await Promise.all([
          dbGetAllVocab(),
          dbGet('stats', 'userStats'),
          dbGet('stats', 'sessions'),
          dbGet('stats', 'settings'),
          dbGetArray<VerbData>('verbs'),
          dbGetArray<AdjectiveQuestion>('adjectives'),
          dbGetArray<Idiom>('idioms'),
          dbGetArray<CaseQuestion>('cases'),
        ]);

        const stats = statsData as UserStats | undefined;
        setVocabulary(vocabData ?? []);
        setStats(stats ? { ...DEFAULT_STATS, ...stats } : DEFAULT_STATS);
        setSessions((sessionsData as LearningSession[]) ?? []);
        setSettings((settingsData as Settings) ?? { sessionSize: 10 });
        setVerbs(verbsData.length > 0 ? verbsData : VERBS_DATA);
        setAdjectives(adjData.length > 0 ? adjData : ADJECTIVES_DATA);
        setIdioms(idiomsData.length > 0 ? idiomsData : IDIOMS_DATA);
        setCases(casesData.length > 0 ? casesData : CASES_DATA);
      } catch (err) {
        console.error('[StorageProvider] Failed to load from IndexedDB:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAll();
  }, []);

  // ── Write helpers (update state + write to IDB) ────────────────────────────
  const saveVocabulary = useCallback(async (words: VocabularyWord[]) => {
    setVocabulary(words);
    await dbSaveAllVocab(words);
  }, []);

  const saveStats = useCallback(async (newStats: UserStats) => {
    setStats(newStats);
    await dbSet('stats', 'userStats', newStats);
  }, []);

  const addXP = useCallback(async (amount: number) => {
    setStats(prev => {
      const updated = { ...prev, experience: (prev.experience ?? 0) + amount };
      dbSet('stats', 'userStats', updated);
      return updated;
    });
  }, []);

  const saveSession = useCallback(async (session: LearningSession) => {
    setSessions(prev => {
      const updated = [...prev, session];
      dbSet('stats', 'sessions', updated as unknown as UserStats);
      return updated;
    });
    // Award XP for session
    await addXP(session.correctCount * 10);
  }, [addXP]);

  const saveSettings = useCallback(async (s: { sessionSize: number }) => {
    setSettings(s);
    await dbSet('stats', 'settings', s as unknown as UserStats);
  }, []);

  return (
    <StorageContext.Provider value={{
      isLoading,
      vocabulary, saveVocabulary,
      stats, saveStats, addXP,
      sessions, saveSession,
      settings, saveSettings,
      verbs, adjectives, idioms, cases,
    }}>
      {children}
    </StorageContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────────────────
export function useStorageContext() {
  const ctx = useContext(StorageContext);
  if (!ctx) throw new Error('useStorageContext must be used inside <StorageProvider>');
  return ctx;
}
