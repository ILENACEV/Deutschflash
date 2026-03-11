import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { VocabularyWord, UserStats, LearningSession } from './types';
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
    value: UserStats | { sessionSize: number } | LearningSession[];
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
type StatsKey = 'userStats' | 'settings' | 'sessions';

export async function dbGet<T>(store: 'stats', key: StatsKey): Promise<T | undefined> {
  const db = await getDB();
  return db.get(store, key) as Promise<T | undefined>;
}

export async function dbSet<T>(store: 'stats', key: StatsKey, value: T): Promise<void> {
  const db = await getDB();
  await db.put(store, value as UserStats, key);
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
