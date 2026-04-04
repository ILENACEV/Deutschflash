'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { 
  VocabularyWord, 
  UserStats, 
  LearningSession, 
  Settings,
  VerbData, 
  AdjectiveQuestion, 
  Idiom, 
  CaseQuestion 
} from '@/lib/types';
// Static data imports removed for dynamic loading
import { DEFAULT_STATS, DEFAULT_SETTINGS } from '@/lib/constants';
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
  settings: Settings;
  saveSettings: (s: Settings) => Promise<void>;

  // Game data (read only from context — rarely changes)
  verbs: VerbData[];
  adjectives: AdjectiveQuestion[];
  idioms: Idiom[];
  cases: CaseQuestion[];
}

const StorageContext = createContext<StorageContextType | null>(null);

// ─── Provider ───────────────────────────────────────────────────────────────────
export function StorageProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>([]);
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [verbs, setVerbs] = useState<VerbData[]>([]);
  const [adjectives, setAdjectives] = useState<AdjectiveQuestion[]>([]);
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [cases, setCases] = useState<CaseQuestion[]>([]);

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
        setSettings((settingsData as Settings) ?? DEFAULT_SETTINGS);
        // Fallback to static data if IDB is empty
        if (verbsData.length === 0) {
          const { VERBS_DATA } = await import('@/lib/verbs-data');
          setVerbs(VERBS_DATA);
        } else {
          setVerbs(verbsData);
        }

        if (adjData.length === 0) {
          const { ADJECTIVES_DATA } = await import('@/lib/adjectives-data');
          setAdjectives(ADJECTIVES_DATA);
        } else {
          setAdjectives(adjData);
        }

        if (idiomsData.length === 0) {
          const { IDIOMS_DATA } = await import('@/lib/idioms-data');
          setIdioms(IDIOMS_DATA);
        } else {
          setIdioms(idiomsData);
        }

        if (casesData.length === 0) {
          const { CASES_DATA } = await import('@/lib/cases-data');
          setCases(CASES_DATA);
        } else {
          setCases(casesData);
        }

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

  const saveSettings = useCallback(async (s: Settings) => {
    setSettings(s);
    await dbSet('stats', 'settings', s as unknown as UserStats);
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
