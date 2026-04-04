import { useCallback, useEffect, useState } from 'react';
import { getPreRecordedAudio } from './audio-map';

export type TTSLanguage = 'de-DE' | 'en-US' | 'mk-MK';

interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface VoiceInfo {
  name: string;
  lang: string;
  default: boolean;
}

let speechSynthesisInstance: SpeechSynthesis | null = null;
let germanVoice: SpeechSynthesisVoice | null = null;
let isInitialized = false;
let isUnlocked = false;

function initSpeechSynthesis(): SpeechSynthesis | null {
  if (typeof window === 'undefined') return null;
  
  if (!speechSynthesisInstance && typeof window.speechSynthesis !== 'undefined') {
    speechSynthesisInstance = window.speechSynthesis;
    
    const loadVoices = () => {
      const voices = speechSynthesisInstance?.getVoices() || [];
      if (voices.length === 0) return;

      // Prioritize Google German (High Quality) over local/system voices
      germanVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('de')) || 
                    voices.find(v => v.lang.startsWith('de')) || 
                    voices.find(v => v.lang.startsWith('en')) ||
                    voices[0] || null;
      
      isInitialized = true;
    };
    
    // Chrome/Edge load voices asynchronously
    if (speechSynthesisInstance.onvoiceschanged !== undefined) {
      speechSynthesisInstance.onvoiceschanged = loadVoices;
    }
    loadVoices();

    // Browser Unlock Hack: Many browsers block auto-play until a user interaction
    const unlock = () => {
      if (isUnlocked) return;
      
      // Play a tiny silent utterance to "unlock" the engine
      const silent = new SpeechSynthesisUtterance('');
      silent.volume = 0;
      speechSynthesisInstance?.speak(silent);
      
      isUnlocked = true;
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      console.log('[TTS] Audio engine unlocked via user interaction');
    };

    window.addEventListener('click', unlock);
    window.addEventListener('touchstart', unlock);
  }
  
  return speechSynthesisInstance;
}

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<VoiceInfo[]>([]);

  useEffect(() => {
    const synth = initSpeechSynthesis();
    setIsSupported(!!synth);
    
    if (synth) {
      const voices = synth.getVoices().map(v => ({
        name: v.name,
        lang: v.lang,
        default: v.default,
      }));
      setAvailableVoices(voices);
    }
  }, []);

  const speak = useCallback((text: string, lang: TTSLanguage = 'de-DE', options?: TTSOptions) => {
    const synth = initSpeechSynthesis();
    if (!synth) return;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = options?.rate ?? 0.9;
    utterance.pitch = options?.pitch ?? 1;
    utterance.volume = options?.volume ?? 1;

    const voices = synth.getVoices();
    const voice = voices.find(v => v.lang.startsWith(lang.split('-')[0])) || germanVoice;
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (speechSynthesisInstance) {
      speechSynthesisInstance.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    availableVoices,
  };
}

export function speakGerman(text: string, options?: TTSOptions, wordId?: string): void {
  // 1. Try pre-recorded audio first
  if (wordId) {
    const audioPath = getPreRecordedAudio(wordId);
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.playbackRate = options?.rate ?? 1.0;
      audio.volume = options?.volume ?? 1.0;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('[TTS] Pre-recorded audio blocked or missing, falling back:', err);
          performTTS(text, options);
        });
      }
      return;
    }
  }

  // 2. Fallback to Browser TTS
  performTTS(text, options);
}

function performTTS(text: string, options?: TTSOptions) {
  const synth = initSpeechSynthesis();
  if (!synth) return;

  // Stop any current speech
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = options?.rate ?? 0.9;
  utterance.pitch = options?.pitch ?? 1;
  utterance.volume = options?.volume ?? 1;

  const voices = synth.getVoices();
  // Chrome fix: re-find the best voice in case it wasn't ready at init
  const bestVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('de')) || 
                    voices.find(v => v.lang.startsWith('de')) || 
                    germanVoice;
                    
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  // Chrome Bug Fix: Long utterances can sometimes hang. 
  // We force a resume every 10 seconds if it's still "speaking"
  const resumeInterval = setInterval(() => {
    if (!synth.speaking) {
      clearInterval(resumeInterval);
    } else {
      synth.pause();
      synth.resume();
    }
  }, 10000);

  utterance.onend = () => clearInterval(resumeInterval);
  utterance.onerror = () => clearInterval(resumeInterval);

  synth.speak(utterance);
}

export function stopSpeaking(): void {
  if (speechSynthesisInstance) {
    speechSynthesisInstance.cancel();
  }
}
