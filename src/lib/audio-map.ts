/**
 * Audio Asset Mapping for DeutschFlash
 * Maps word IDs and phrases to pre-recorded .mp3/.ogg files.
 */

export interface AudioMap {
  [id: string]: string;
}

// Map of high-frequency words that have pre-recorded audio
// The path is relative to /public
export const GERMAN_AUDIO_MAP: AudioMap = {
  // Common A1 Words
  'hallo': '/audio/de/a1/hallo.mp3',
  'danke': '/audio/de/a1/danke.mp3',
  'bitte': '/audio/de/a1/bitte.mp3',
  'ja': '/audio/de/a1/ja.mp3',
  'nein': '/audio/de/a1/nein.mp3',
  
  // These will be dynamically populated or mapped by ID
  // Format: {word_id}: `/audio/de/{level}/{word_id}.mp3`
};

/**
 * Resolves the audio path for a given word.
 * Returns null if no pre-recorded audio is found.
 */
export function getPreRecordedAudio(wordId: string, level?: string): string | null {
  // Check explicit map first
  if (GERMAN_AUDIO_MAP[wordId.toLowerCase()]) {
    return GERMAN_AUDIO_MAP[wordId.toLowerCase()];
  }
  
  // Convention-based lookup (e.g., word-id based)
  // return `/audio/de/${level || 'general'}/${wordId}.mp3`;
  
  return null;
}
