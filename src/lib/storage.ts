/**
 * storage.ts — async IndexedDB-backed storage
 *
 * This module mirrors the OLD synchronous storage API but now
 * delegates to IndexedDB via db.ts helpers. Components that already
 * use the StorageContext get data from there (zero changes needed).
 * This file is kept for any direct callers (backup/import utilities).
 */

import type { VocabularyWord, UserStats, LearningSession, ImportData, Achievement } from './types';
import type { VerbData, AdjectiveQuestion, Idiom, CaseQuestion } from './types';
import { VERBS_DATA } from './verbs-data';
import { ADJECTIVES_DATA } from './adjectives-data';
import { IDIOMS_DATA } from './idioms-data';
import { CASES_DATA } from './cases-data';
import { dbGetAllVocab, dbSaveAllVocab, dbGet, dbSet, dbGetArray, dbSaveArray } from './db';

const DEFAULT_STATS: UserStats = {
  totalLearned: 0,
  streak: 0,
  difficultWordsCount: 0,
  dailyGoal: 10,
  experience: 0,
};

export const storage = {
  // ── Vocabulary ─────────────────────────────────────────────────────────────
  getVocabulary: async (): Promise<VocabularyWord[]> => {
    if (typeof window === 'undefined') return [];
    return dbGetAllVocab();
  },

  saveVocabulary: async (words: VocabularyWord[]): Promise<void> => {
    await dbSaveAllVocab(words);
  },

  removeWord: async (id: string): Promise<void> => {
    const vocab = await storage.getVocabulary();
    await storage.saveVocabulary(vocab.filter(w => w.id !== id));
  },

  // ── Verbs ──────────────────────────────────────────────────────────────────
  getVerbs: async (): Promise<VerbData[]> => {
    if (typeof window === 'undefined') return VERBS_DATA;
    const data = await dbGetArray<VerbData>('verbs');
    return data.length > 0 ? data : VERBS_DATA;
  },
  saveVerbs: async (verbs: VerbData[]): Promise<void> => {
    await dbSaveArray('verbs', verbs);
  },

  // ── Adjectives ─────────────────────────────────────────────────────────────
  getAdjectives: async (): Promise<AdjectiveQuestion[]> => {
    if (typeof window === 'undefined') return ADJECTIVES_DATA;
    const data = await dbGetArray<AdjectiveQuestion>('adjectives');
    return data.length > 0 ? data : ADJECTIVES_DATA;
  },
  saveAdjectives: async (data: AdjectiveQuestion[]): Promise<void> => {
    await dbSaveArray('adjectives', data);
  },

  // ── Idioms ─────────────────────────────────────────────────────────────────
  getIdioms: async (): Promise<Idiom[]> => {
    if (typeof window === 'undefined') return IDIOMS_DATA;
    const data = await dbGetArray<Idiom>('idioms');
    return data.length > 0 ? data : IDIOMS_DATA;
  },
  saveIdioms: async (data: Idiom[]): Promise<void> => {
    await dbSaveArray('idioms', data);
  },

  // ── Cases ──────────────────────────────────────────────────────────────────
  getCases: async (): Promise<CaseQuestion[]> => {
    if (typeof window === 'undefined') return CASES_DATA;
    const data = await dbGetArray<CaseQuestion>('cases');
    return data.length > 0 ? data : CASES_DATA;
  },
  saveCases: async (data: CaseQuestion[]): Promise<void> => {
    await dbSaveArray('cases', data);
  },

  // ── Stats ──────────────────────────────────────────────────────────────────
  getStats: async (): Promise<UserStats> => {
    if (typeof window === 'undefined') return DEFAULT_STATS;
    const data = await dbGet<UserStats>('stats', 'userStats');
    return data ? { ...DEFAULT_STATS, ...data } : DEFAULT_STATS;
  },

  saveStats: async (stats: UserStats): Promise<void> => {
    await dbSet('stats', 'userStats', stats);
  },

  addXP: async (amount: number): Promise<void> => {
    const stats = await storage.getStats();
    stats.experience = (stats.experience ?? 0) + amount;
    await storage.saveStats(stats);
  },

  // ── Sessions ───────────────────────────────────────────────────────────────
  getSessions: async (): Promise<LearningSession[]> => {
    if (typeof window === 'undefined') return [];
    const data = await dbGet<LearningSession[]>('stats', 'sessions');
    return data ?? [];
  },

  saveSession: async (session: LearningSession): Promise<void> => {
    const sessions = await storage.getSessions();
    sessions.push(session);
    await dbSet('stats', 'sessions', sessions as unknown as UserStats);
    await storage.addXP(session.correctCount * 10);
  },

  // ── Settings ───────────────────────────────────────────────────────────────
  getSettings: async (): Promise<{ sessionSize: number }> => {
    if (typeof window === 'undefined') return { sessionSize: 10 };
    const data = await dbGet<{ sessionSize: number }>('stats', 'settings');
    return data ?? { sessionSize: 10 };
  },

  saveSettings: async (settings: { sessionSize: number }): Promise<void> => {
    await dbSet('stats', 'settings', settings as unknown as UserStats);
  },

  // ── Achievements (computed, no storage needed) ─────────────────────────────
  getAchievements: (stats: UserStats, vocab: VocabularyWord[]): Achievement[] => {
    const learnedCount = vocab.filter(v => v.status === 'learned').length;
    return [
      {
        id: 'streak_5',
        title: 'Фанатик',
        description: 'Одржувај 5 дена streak',
        icon: '🔥',
        unlocked: stats.streak >= 5,
      },
      {
        id: 'learned_50',
        title: 'Полиглот во најава',
        description: 'Научи 50 зборови',
        icon: '📚',
        unlocked: learnedCount >= 50,
      },
      {
        id: 'case_master',
        title: 'Падежен Мајстор',
        description: 'Освој над 150 поени во Падежи',
        icon: '⚖️',
        unlocked: (stats.highScoreCases ?? 0) >= 150,
      },
      {
        id: 'verb_master',
        title: 'Глаголски Експерт',
        description: 'Освој над 200 поени во Глаголски Мајстор',
        icon: '⚔️',
        unlocked: (stats.highScoreVerbs ?? 0) >= 200,
      },
    ];
  },

  // ── Backup / Import ────────────────────────────────────────────────────────
  exportFullBackup: async (): Promise<void> => {
    const data = {
      vocabulary: await storage.getVocabulary(),
      verbs: await storage.getVerbs(),
      adjectives: await storage.getAdjectives(),
      idioms: await storage.getIdioms(),
      cases: await storage.getCases(),
      stats: await storage.getStats(),
      sessions: await storage.getSessions(),
      settings: await storage.getSettings(),
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deutschflash_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importFullBackup: async (jsonString: string): Promise<boolean> => {
    try {
      const data = JSON.parse(jsonString);
      if (data.vocabulary) await storage.saveVocabulary(data.vocabulary);
      if (data.verbs) await storage.saveVerbs(data.verbs);
      if (data.adjectives) await storage.saveAdjectives(data.adjectives);
      if (data.idioms) await storage.saveIdioms(data.idioms);
      if (data.cases) await storage.saveCases(data.cases);
      if (data.stats) await storage.saveStats(data.stats);
      if (data.sessions)
        await dbSet('stats', 'sessions', data.sessions as unknown as UserStats);
      if (data.settings) await storage.saveSettings(data.settings);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  },

  initFromImportData: (data: ImportData[]): VocabularyWord[] => {
    return data.map(item => ({
      id: Math.random().toString(36).substr(2, 9),
      word: item.word,
      translation: item.translation,
      category: item.category || 'other',
      gender: item.gender,
      sentence_de: item.sentence_de || '',
      sentence_mk: item.sentence_mk || '',
      image: item.image,
      status: 'new',
      interval: 0,
      easeFactor: 2.5,
      swipeCount: { left: 0, right: 0 },
    }));
  },
};
