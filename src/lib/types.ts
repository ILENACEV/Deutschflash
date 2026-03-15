export type WordStatus = 'new' | 'learning' | 'learned' | 'difficult';

export type WordCategory = 
  | 'noun' 
  | 'verb' 
  | 'adjective' 
  | 'adverb' 
  | 'preposition' 
  | 'pronoun' 
  | 'conjunction' 
  | 'article' 
  | 'phrase'
  | 'other';

export type Gender = 'der' | 'die' | 'das' | 'plural' | null;

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  category: WordCategory;
  gender?: Gender;
  sentence_de: string;
  sentence_mk: string;
  image?: string;
  status: WordStatus;
  lastReview?: number; // timestamp
  nextReview?: number; // timestamp
  interval: number; // days
  easeFactor: number;
  swipeCount: {
    left: number;
    right: number;
  };
}

export interface LearningSession {
  id: string;
  date: number;
  wordCount: number;
  correctCount: number;
  incorrectCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface UserStats {
  totalLearned: number;
  streak: number;
  lastSessionDate?: number;
  difficultWordsCount: number;
  highScoreIdioms?: number;
  highScoreVerbs?: number;
  highScoreCases?: number;
  highScoreSpelling?: number;
  highScoreAdjectives?: number;
  highScoreListening?: number;
  sentencesCompleted?: number;
  dailyGoal: number;
  experience: number;
}

export interface ImportData {
  word: string;
  translation: string;
  category?: WordCategory;
  gender?: Gender;
  sentence_de: string;
  sentence_mk: string;
  image?: string;
  theme?: 'travel' | 'tourism' | 'work' | 'health' | 'shopping' | 'social' | 'hobby' | 'school' | 'love' | 'wedding';
}

export interface Idiom {
  de: string;
  mk: string;
  literal: string;
}

export interface VerbData {
  infinitiv: string;
  translation: string;
  praesens: string; // 3rd person er/sie/es
  praeteritum: string; // 3rd person
  perfekt: string; // full form (ist/hat + Partizip II)
  rektion?: string; // e.g., "auf + Akk"
  case?: 'Nominativ' | 'Akkusativ' | 'Dativ' | 'Genitiv';
  type: 'regular' | 'irregular';
}

export interface AdjectiveQuestion {
  sentence: string; // e.g., "Das еst ein schön__ Haus."
  options: string[]; // ["e", "er", "es", "en"]
  correct: string;
  explanation: string;
  gender: Gender;
  case: 'Nominativ' | 'Akkusativ' | 'Dativ';
  articleType: 'definite' | 'indefinite' | 'zero';
}

export interface CaseQuestion {
  sentence: string;
  options: string[];
  correct: string;
  case: string;
  hint: string;
  explanation: string;
}

export interface StoryParagraph {
  de: string;
  mk: string;
}

export interface Story {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1';
  icon: string;
  description: string;
  paragraphs: StoryParagraph[];
  keyWords: { word: string; translation: string }[];
}

export interface ReviewReminder {
  enabled: boolean;
  time: string; // HH:MM format
  lastNotified?: number;
}

export interface StreakFreeze {
  available: number;
  usedDate?: number; // When it was last used
}

export interface Settings {
  sessionSize: number;
  reminder?: ReviewReminder;
  streakFreeze?: StreakFreeze;
}

export interface CustomDeck {
  id: string;
  name: string;
  description: string;
  wordIds: string[];
  color: string;
  createdAt: number;
}
