import type { Language } from "@/lib/types";

export function cn(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}

export function formatMessage(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}

const LOCALES: Record<Language, string> = {
  en: "en-IN",
  hinglish: "en-IN",
  hi: "hi-IN",
  pa: "pa-IN",
  mr: "mr-IN",
  bn: "bn-IN",
  ta: "ta-IN",
};

export function getLocale(language: Language): string {
  return LOCALES[language];
}

export function getSpeechLocale(language: Language): string {
  return LOCALES[language];
}

export function todayIso(timeZone = "Asia/Kolkata"): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) return new Date().toISOString().slice(0, 10);
  return `${year}-${month}-${day}`;
}

export function addDaysIso(value: string, days: number): string {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function isValidIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function formatDate(value: string, language: Language): string {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(getLocale(language), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateRange(
  from: string,
  to: string,
  language: Language
): string {
  if (from === to) return formatDate(from, language);
  return `${formatDate(from, language)} – ${formatDate(to, language)}`;
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${meters} m`;
  const kilometres = meters / 1000;
  return `${kilometres.toFixed(kilometres % 1 === 0 ? 0 : 1)} km`;
}

export function formatObservationTime(
  value: string | null,
  language: Language
): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleTimeString(getLocale(language), {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function createId(prefix: string): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
