import type { UserStats, Settings } from './types';

export const DEFAULT_STATS: UserStats = {
  totalLearned: 0,
  streak: 0,
  difficultWordsCount: 0,
  dailyGoal: 10,
  experience: 0,
};

export const DEFAULT_SETTINGS: Settings = {
  sessionSize: 10,
};

export const MS_PER_DAY = 86400000;

export const GAME_DURATIONS = {
  verbs: 45,
  idioms: 30,
  goethe: 20 * 60,
} as const;
