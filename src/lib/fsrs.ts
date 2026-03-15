/**
 * FSRS (Free Spaced Repetition Scheduler) Algorithm Implementation
 * Based on the algorithm by Jarrett Ye and Open Spaced Repetition
 * 
 * This is an alternative to SM-2 that uses a more sophisticated memory model.
 * It models memory as a series of states: Again, Hard, Good, Easy
 * 
 * Reference: https://github.com/open-spaced-repetition/fsrs4anki
 */

import type { VocabularyWord } from './types';

// Memory states in FSRS
export type FSRSSchedulingType = 'again' | 'hard' | 'good' | 'easy';

export interface FSRSPerformance {
  // Stability (S) - how long until retention drops to 90%
  stability: number;
  // Difficulty (D) - how hard the card is (0-1)
  difficulty: number;
}

// Default FSRS parameters (can be customized)
export interface FSRSParams {
  // Initial values
  initialStability: number;
  initialDifficulty: number;
  
  // Rating modifiers
  again: number;
  hard: number;
  good: number;
  easy: number;
  
  // Lapses
  lapseStabilityDecay: number;
  lapseDifficultyIncrease: number;
  
  // Learning steps (in minutes)
  learnSteps: number[];
  reLearnSteps: number[];
  
  // Maximum intervals
  maximumInterval: number;
  easyBonus: number;
  hardInterval: number;
}

export const DEFAULT_FSRS_PARAMS: FSRSParams = {
  initialStability: 1,      // 1 day
  initialDifficulty: 0.3,   // 0.3 (easy side)
  
  // Rating adjustments
  again: -0.8,
  hard: -0.15,
  good: 0,
  easy: 0.1,
  
  // Lapse behavior
  lapseStabilityDecay: 0.5,  // Reduce stability by 50%
  lapseDifficultyIncrease: 0.4, // Increase difficulty
  
  // Learning steps (in minutes)
  learnSteps: [1, 10],
  reLearnSteps: [10],
  
  // Limits
  maximumInterval: 36500,   // 100 years
  easyBonus: 1.3,
  hardInterval: 1.2,
};

// Rating mapping from simple known/unknown to FSRS ratings
export function mapToFSRSRating(known: boolean): FSRSSchedulingType {
  // In a real implementation, you'd have more granular feedback
  return known ? 'good' : 'again';
}

/**
 * Calculate the next review interval using FSRS
 */
export function calculateFSRS(
  word: VocabularyWord,
  rating: FSRSSchedulingType,
  params: FSRSParams = DEFAULT_FSRS_PARAMS
): VocabularyWord {
  const updatedWord = { ...word };
  
  // Get current stability and difficulty from the word, or use defaults
  const easeFactor = word.easeFactor ?? 2.5;
  let stability = easeFactor * 10;
  let difficulty = Math.max(0, Math.min(1, 1 - (easeFactor - 1.3) / 2));
  
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  
  // Ensure swipeCount exists
  const currentSwipeCount = updatedWord.swipeCount ?? { left: 0, right: 0 };
  
  // Calculate new stability and difficulty based on rating
  switch (rating) {
    case 'again':
      // Failed - reset to relearning
      stability = Math.max(params.initialStability, stability * params.lapseStabilityDecay);
      difficulty = Math.min(1, difficulty + params.lapseDifficultyIncrease);
      updatedWord.status = 'difficult';
      break;
      
    case 'hard':
      // Hard - smaller interval increase
      stability = Math.max(params.initialStability, stability * (1 + params.hard));
      difficulty = Math.min(1, difficulty + params.lapseDifficultyIncrease * 0.5);
      updatedWord.status = 'learning';
      break;
      
    case 'good':
      // Good - normal interval increase
      stability = stability * (1 + params.good);
      updatedWord.status = word.status === 'new' ? 'learning' : 'learned';
      break;
      
    case 'easy':
      // Easy - larger interval increase
      stability = stability * params.easyBonus * (1 + params.good);
      difficulty = Math.max(0, difficulty - 0.15);
      updatedWord.status = 'learned';
      break;
  }
  
  // Calculate next interval in days
  let intervalDays = stability;
  
  // Apply rating-specific modifiers
  if (rating === 'hard') {
    intervalDays = Math.min(intervalDays, stability * params.hardInterval);
  } else if (rating === 'easy') {
    intervalDays = Math.min(intervalDays, stability * params.easyBonus);
  }
  
  // Ensure minimum interval
  intervalDays = Math.max(1, Math.round(intervalDays));
  
  // Apply maximum interval limit
  intervalDays = Math.min(intervalDays, params.maximumInterval);
  
  // Update ease factor based on new difficulty (for compatibility)
  updatedWord.easeFactor = Math.max(1.3, 1 + (1 - difficulty) * 2);
  
  // Update intervals and timestamps
  updatedWord.interval = intervalDays;
  updatedWord.lastReview = now;
  updatedWord.nextReview = now + intervalDays * ONE_DAY;
  
  // Update swipe counts for compatibility
  if (rating === 'good' || rating === 'easy') {
    updatedWord.swipeCount = {
      ...currentSwipeCount,
      right: currentSwipeCount.right + 1
    };
  } else {
    updatedWord.swipeCount = {
      ...currentSwipeCount,
      left: currentSwipeCount.left + 1
    };
  }
  
  // Mark as learned if interval is long enough
  if (intervalDays >= 21) {
    updatedWord.status = 'learned';
  }
  
  return updatedWord;
}

/**
 * Sort words for session using FSRS priorities
 * Priority: difficult -> due -> new
 */
export function sortWordsForSessionFSRS(
  words: VocabularyWord[],
  limit: number
): VocabularyWord[] {
  const now = Date.now();
  
  // 1. Difficult words (most important)
  const difficult = words.filter(w => w.status === 'difficult');
  
  // 2. Due for review
  const due = words.filter(w => 
    w.status !== 'new' && 
    w.status !== 'difficult' &&
    w.nextReview && 
    w.nextReview <= now
  );
  
  // 3. New words
  const newWords = words.filter(w => w.status === 'new');
  
  // Sort due by oldest first
  const sortedDue = due.sort((a, b) => 
    (a.nextReview || 0) - (b.nextReview || 0)
  );
  
  // Combine: difficult + due + new, limited
  const result = [...difficult, ...sortedDue, ...newWords].slice(0, limit);
  
  // Shuffle for variety
  return result.sort(() => Math.random() - 0.5);
}

/**
 * Get the scheduling information for a word
 */
export function getFSRSSchedule(
  word: VocabularyWord,
  params: FSRSParams = DEFAULT_FSRS_PARAMS
): {
  again: number;
  hard: number;
  good: number;
  easy: number;
} {
  const easeFactor = word.easeFactor ?? 2.5;
  const stability = easeFactor * 10;
  const difficulty = Math.max(0, Math.min(1, 1 - (easeFactor - 1.3) / 2));
  
  return {
    again: Math.round(Math.max(1, stability * params.lapseStabilityDecay)),
    hard: Math.round(Math.max(1, stability * (1 + params.hard))),
    good: Math.round(Math.max(1, stability * (1 + params.good))),
    easy: Math.round(Math.max(1, stability * params.easyBonus * (1 + params.good)))
  };
}

/**
 * Calculate retention probability at a given time
 */
export function calculateRetention(
  stability: number,
  elapsedDays: number,
  difficulty: number
): number {
  // FSRS retention formula
  const R = Math.E ** (-elapsedDays / (stability * (1 + difficulty)));
  return Math.max(0, Math.min(1, R));
}

/**
 * Convert FSRS stability/ease back to SM-2 format for compatibility
 */
export function fsrsToSM2(
  stability: number,
  difficulty: number
): { easeFactor: number; interval: number } {
  return {
    easeFactor: Math.max(1.3, 1 + (1 - difficulty) * 2),
    interval: Math.round(stability)
  };
}

/**
 * Convert SM-2 to FSRS format
 */
export function sm2ToFSRS(
  easeFactor: number,
  interval: number
): { stability: number; difficulty: number } {
  return {
    stability: interval * easeFactor / 2,
    difficulty: Math.max(0, Math.min(1, 1 - (easeFactor - 1.3) / 2))
  };
}
