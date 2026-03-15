import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { VocabularyWord, UserStats, LearningSession, Settings, CustomDeck } from './types';
import type { VerbData, AdjectiveQuestion, Idiom, CaseQuestion } from './types';

// ─── Schema ────────────────────────────────────────────────────────────────────
export interface DeutschFlashDB extends DBSchema {
  vocabulary: {
    key: string;
    value: VocabularyWord;
    indexes: { 'by-status': string };
  };
  stats: {
    key: string;
    value: UserStats | Settings | LearningSession[] | CustomDeck[];
  };
  verbs: {
    key: number;
    value: VerbData;
  };
  adjectives: {
    key: number;
    value: AdjectiveQuestion;
  };
  idioms: {
    key: number;
    value: Idiom;
  };
  cases: {
    key: number;
    value: CaseQuestion;
  };
}

const DB_NAME = 'deutschflash-db';
const DB_VERSION = 1;

let _db: IDBPDatabase<DeutschFlashDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<DeutschFlashDB>> {
  if (_db) return _db;
  _db = await openDB<DeutschFlashDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // vocabulary store with index on status
      if (!db.objectStoreNames.contains('vocabulary')) {
        const vocabStore = db.createObjectStore('vocabulary', { keyPath: 'id' });
        vocabStore.createIndex('by-status', 'status');
      }
      // key-value store for stats, settings, sessions
      if (!db.objectStoreNames.contains('stats')) {
        db.createObjectStore('stats');
      }
      // array stores (using autoIncrement keys, replaced wholesale)
      if (!db.objectStoreNames.contains('verbs')) {
        db.createObjectStore('verbs', { autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('adjectives')) {
        db.createObjectStore('adjectives', { autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('idioms')) {
        db.createObjectStore('idioms', { autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('cases')) {
        db.createObjectStore('cases', { autoIncrement: true });
      }
    },
  });
  return _db;
}

// ─── Typed Key-Value helpers ────────────────────────────────────────────────────
type StatsKey = 'userStats' | 'settings' | 'sessions' | 'customDecks';
type StatsValue = UserStats | Settings | LearningSession[] | CustomDeck[];

function isValidStatsKey(key: string): key is StatsKey {
  return ['userStats', 'settings', 'sessions', 'customDecks'].includes(key);
}

function validateUserStats(value: unknown): value is UserStats {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.totalLearned === 'number' &&
    typeof obj.streak === 'number' &&
    typeof obj.dailyGoal === 'number' &&
    typeof obj.experience === 'number'
  );
}

function validateSettings(value: unknown): value is Settings {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.sessionSize === 'number';
}

function validateLearningSessionArray(value: unknown): value is LearningSession[] {
  if (!Array.isArray(value)) return false;
  return value.every(item => 
    typeof item === 'object' && 
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.date === 'number' &&
    typeof item.wordCount === 'number'
  );
}

function validateCustomDeckArray(value: unknown): value is CustomDeck[] {
  if (!Array.isArray(value)) return false;
  return value.every(item => 
    typeof item === 'object' && 
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    Array.isArray(item.wordIds)
  );
}

export async function dbGet(store: 'stats', key: StatsKey): Promise<StatsValue | undefined> {
  const db = await getDB();
  return db.get(store, key);
}

export async function dbSet(store: 'stats', key: StatsKey, value: StatsValue): Promise<void> {
  if (!isValidStatsKey(key)) {
    console.error(`Invalid stats key: ${key}`);
    return;
  }
  
  let validatedValue: StatsValue = value;
  if (key === 'userStats' && !validateUserStats(value)) {
    console.warn('Invalid UserStats data, using defaults');
    validatedValue = {
      totalLearned: 0,
      streak: 0,
      difficultWordsCount: 0,
      dailyGoal: 10,
      experience: 0
    };
  } else if (key === 'settings' && !validateSettings(value)) {
    console.warn('Invalid Settings data, using defaults');
    validatedValue = { sessionSize: 10 };
  } else if (key === 'sessions' && !validateLearningSessionArray(value)) {
    console.warn('Invalid Sessions data, using empty array');
    validatedValue = [];
  } else if (key === 'customDecks' && !validateCustomDeckArray(value)) {
    console.warn('Invalid CustomDecks data, using empty array');
    validatedValue = [];
  }
  
  const db = await getDB();
  await db.put(store, validatedValue, key);
}

// ─── Vocabulary helpers ─────────────────────────────────────────────────────────
export async function dbGetAllVocab(): Promise<VocabularyWord[]> {
  const db = await getDB();
  return db.getAll('vocabulary');
}

export async function dbSaveAllVocab(words: VocabularyWord[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('vocabulary', 'readwrite');
  await tx.store.clear();
  await Promise.all(words.map(w => tx.store.put(w)));
  await tx.done;
}

// ─── Array-store helpers (verbs, adjectives, idioms, cases) ─────────────────────
type ArrayStores = 'verbs' | 'adjectives' | 'idioms' | 'cases';

export async function dbGetArray<T>(store: ArrayStores): Promise<T[]> {
  const db = await getDB();
  return (db.getAll(store) as unknown) as T[];
}

export async function dbSaveArray<T>(store: ArrayStores, items: T[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(store, 'readwrite');
  await (tx.store as IDBPObjectStore).clear();
  await Promise.all(items.map((item) => (tx.store as IDBPObjectStore).add(item)));
  await tx.done;
}

// Helper type to avoid lint issues
type IDBPObjectStore = {
  clear: () => Promise<void>;
  add: (item: unknown) => Promise<unknown>;
};
