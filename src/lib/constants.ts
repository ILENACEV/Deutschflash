import type { UserStats, Settings } from './types';

export const APP_VERSION = '2.1.0-alpha';

export const DEFAULT_STATS: UserStats = {
  totalLearned: 0,
  streak: 0,
  difficultWordsCount: 0,
  dailyGoal: 10,
  experience: 0,
};

export const DEFAULT_SETTINGS: Settings = {
  sessionSize: 10,
  algorithm: 'sm2',
  voiceSpeed: 0.9,
  voicePitch: 1.0,
  autoPlay: true,
};

export const MS_PER_DAY = 86400000;

export const GAME_DURATIONS = {
  verbs: 45,
  idioms: 30,
  goethe: 20 * 60,
} as const;
