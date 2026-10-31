"use client";

import { ChevronDown, Languages } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LANGUAGE_OPTIONS } from "@/lib/i18n";
import type { Language } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  compact?: boolean;
}

export function LanguageSelector({ compact = false }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();

  if (compact) {
    return (
      <div className="relative inline-flex items-center rounded-md border border-purple-200/80 bg-white shadow-sm transition hover:border-purple-300 hover:bg-purple-50/40 focus-within:ring-2 focus-within:ring-purple-600/30">
        <Languages
          aria-hidden="true"
          className="pointer-events-none absolute left-3 h-4 w-4 text-purple-700"
        />
        <select
          value={language}
          onChange={(event) =>
            setLanguage(event.target.value as Language)
          }
          aria-label={t.common.language}
          className="min-h-11 cursor-pointer appearance-none rounded-md bg-transparent py-2 pl-9 pr-8 text-xs font-bold text-slate-700 outline-none"
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 h-4 w-4 text-slate-400"
        />
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={t.common.language}
      className="flex w-full items-center gap-1 rounded-md border border-purple-200/80 bg-purple-50/50 p-1 shadow-sm sm:w-auto"
    >
      <span
        aria-hidden="true"
        className="hidden h-8 w-8 shrink-0 place-items-center text-purple-700 min-[430px]:grid"
      >
        <Languages className="h-4 w-4" />
      </span>
      {LANGUAGE_OPTIONS.map((option) => {
        const isActive = language === option.code;

        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-pressed={isActive}
            aria-label={option.label}
            className={cn(
              "flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-md px-2.5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.98] sm:flex-none sm:px-3",
              isActive
                ? "bg-purple-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid h-5 min-w-5 place-items-center rounded px-1 text-[10px] font-black",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-white text-purple-800 border border-purple-100 shadow-xs"
              )}
            >
              {option.letter}
            </span>
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
