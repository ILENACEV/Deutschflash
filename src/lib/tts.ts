import { useCallback, useEffect, useState } from 'react';

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

function initSpeechSynthesis(): SpeechSynthesis | null {
  if (typeof window === 'undefined' || isInitialized) return speechSynthesisInstance;
  
  if (typeof window.speechSynthesis !== 'undefined') {
    speechSynthesisInstance = window.speechSynthesis;
    
    const loadVoices = () => {
      const voices = speechSynthesisInstance?.getVoices() || [];
      
      germanVoice = voices.find(v => v.lang.startsWith('de')) || 
                    voices.find(v => v.lang.startsWith('en')) ||
                    voices[0] || null;
      
      isInitialized = true;
    };
    
    if (speechSynthesisInstance.getVoices().length > 0) {
      loadVoices();
    } else {
      speechSynthesisInstance.onvoiceschanged = loadVoices;
    }
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

export function speakGerman(text: string, options?: TTSOptions): void {
  const synth = initSpeechSynthesis();
  if (!synth) {
    console.warn('Speech synthesis not supported');
    return;
  }

  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = options?.rate ?? 0.9;
  utterance.pitch = options?.pitch ?? 1;
  utterance.volume = options?.volume ?? 1;

  const voices = synth.getVoices();
  const voice = voices.find(v => v.lang.startsWith('de')) || 
                voices.find(v => v.lang.startsWith('en')) ||
                voices[0];
  if (voice) {
    utterance.voice = voice;
  }

  synth.speak(utterance);
}

export function stopSpeaking(): void {
  if (speechSynthesisInstance) {
    speechSynthesisInstance.cancel();
  }
}
