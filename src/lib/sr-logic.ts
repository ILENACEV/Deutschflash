import type { VocabularyWord } from './types';

/**
 * Имплементација на SM-2 алгоритамот (SuperMemo-2).
 * Ова е математички детерминистички модел за меморирање.
 */
export function calculateSpacedRepetition(
  word: VocabularyWord,
  known: boolean
): VocabularyWord {
  const updatedWord = { ...word };
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  // Simplified grading: correct = 4, incorrect = 0
  const grade = known ? 4 : 0;

  if (grade >= 3) {
    // Correct answer
    updatedWord.swipeCount.right += 1;

    // SM‑2 interval logic
    if (updatedWord.status === 'new' || updatedWord.interval === 0) {
      updatedWord.interval = 1;
      updatedWord.status = 'learning';
    } else if (updatedWord.interval === 1) {
      updatedWord.interval = 6;
      updatedWord.status = 'learning';
    } else {
      updatedWord.interval = Math.round(updatedWord.interval * updatedWord.easeFactor);
    }

    // Update Ease Factor ONLY for successful recall (true SM‑2 behavior)
    const newEF =
      updatedWord.easeFactor +
      (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

    updatedWord.easeFactor = Math.max(1.3, newEF);

    // Mark word as learned when interval becomes large
    if (updatedWord.interval >= 21) {
      updatedWord.status = 'learned';
    }
  } else {
    // Incorrect answer
    updatedWord.swipeCount.left += 1;

    // Reset interval for relearning
    updatedWord.interval = 1;
    updatedWord.status = 'difficult';

    // Slight penalty to ease factor (kept minimal)
    updatedWord.easeFactor = Math.max(1.3, updatedWord.easeFactor - 0.2);
  }

  updatedWord.lastReview = now;
  updatedWord.nextReview = now + updatedWord.interval * ONE_DAY;

  return updatedWord;
}

/**
 * Ги избира и сортира зборовите за сесија врз основа на математички приоритет.
 */
export function sortWordsForSession(words: VocabularyWord[], limit: number): VocabularyWord[] {
  const now = Date.now();
  
  // 1. Прво ги земаме тие што се „доспеани“ (due) за преглед
  const dueWords = words.filter(w => w.status !== 'new' && w.nextReview && w.nextReview <= now);
  
  // 2. Потоа ги земаме новите зборови
  const newWords = words.filter(w => w.status === 'new');
  
  // Сортирање на доспеаните по итност (најстарите прво)
  const sortedDue = dueWords.sort((a, b) => (a.nextReview || 0) - (b.nextReview || 0));
  
  // Комбинирање: Доспеани + Нови додека не се исполни лимитот
  return [...sortedDue, ...newWords].slice(0, limit);
}
