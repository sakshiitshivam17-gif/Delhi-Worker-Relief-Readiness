"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseSpeechResult {
  isSpeaking: boolean;
  toggle: () => void;
  stop: () => void;
}

export function useSpeech(text: string, locale: string): UseSpeechResult {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const activeUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    activeUtterance.current = null;
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggle = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const synth = window.speechSynthesis;

    if (isSpeaking) {
      stop();
      return;
    }

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale;
    utterance.rate = 0.88;
    utterance.pitch = 1;

    const languagePrefix = locale.slice(0, 2).toLowerCase();
    const matchingVoice = synth
      .getVoices()
      .find((voice) => voice.lang.toLowerCase().startsWith(languagePrefix));

    if (matchingVoice) utterance.voice = matchingVoice;

    utterance.onend = () => {
      activeUtterance.current = null;
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      activeUtterance.current = null;
      setIsSpeaking(false);
    };

    activeUtterance.current = utterance;
    setIsSpeaking(true);
    synth.speak(utterance);
  }, [isSpeaking, locale, stop, text]);

  return { isSpeaking, toggle, stop };
}
