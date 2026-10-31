"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANGUAGE,
  getDictionary,
  type Dictionary,
} from "@/lib/i18n";
import type { Language } from "@/lib/types";
import { getSpeechLocale } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

const LANGUAGE_STORAGE_KEY = "worker-saathi-language-v1";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
  speechLocale: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "hinglish" || value === "hi";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );

  const storedLanguage = useMemo<Language>(() => {
    if (!hydrated) return DEFAULT_LANGUAGE;
    try {
      const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return isLanguage(saved) ? saved : DEFAULT_LANGUAGE;
    } catch {
      return DEFAULT_LANGUAGE;
    }
  }, [hydrated]);

  const language = selectedLanguage ?? storedLanguage;

  useEffect(() => {
    document.documentElement.lang = language === "hi" ? "hi" : "en";
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setSelectedLanguage(nextLanguage);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // The app still works without local persistence.
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: getDictionary(language),
      speechLocale: getSpeechLocale(language),
    }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
