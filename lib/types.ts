export type Language = "en" | "hinglish" | "hi" | "pa" | "mr" | "bn" | "ta";

export type NavKey = "home" | "workdays" | "checklist" | "camps" | "updates";

export type WorkdayStatus =
  | "confirmed"
  | "pending"
  | "reported"
  | "correction";

export type WorkTypeKey =
  | "masonry"
  | "painting"
  | "concrete"
  | "tiles"
  | "helper"
  | "electrical"
  | "other";

export interface WorkdayEntry {
  id: string;
  from: string;
  to: string;
  days: number;
  worksite: string;
  workType: string;
  workTypeKey?: WorkTypeKey;
  verifier?: string;
  status: WorkdayStatus;
  createdAt: string;
}

export interface WorkdayInput {
  from: string;
  to: string;
  days: number;
  worksite: string;
  workType: string;
  workTypeKey?: WorkTypeKey;
  verifier?: string;
}

export interface WorkdayTotals {
  reported: number;
  confirmed: number;
  awaiting: number;
  target: number;
}

export type DocumentKey =
  | "registration"
  | "workdays"
  | "supporting"
  | "renewal"
  | "notice";

export type DocumentStatus = "organised" | "needsReview" | "notStarted";

export type DocumentState = Record<DocumentKey, DocumentStatus>;

export type CampZone = "north" | "south" | "east" | "west" | "central";

export type CampServiceKey =
  | "registration"
  | "verification"
  | "documents"
  | "helpline";

export interface Camp {
  id: string;
  name: string;
  area: string;
  zone: CampZone;
  metro: string;
  distanceMeters: number;
  walkMinutes: number;
  hours: string;
  services: CampServiceKey[];
  mapsQuery: string;
  voiceAliases?: string[];
}

export type GrapStage = 0 | 1 | 2 | 3 | 4;

export type AqiLevel =
  | "good"
  | "satisfactory"
  | "moderate"
  | "poor"
  | "veryPoor"
  | "severe"
  | "severePlus";

export interface AqiBand {
  level: AqiLevel;
  stage: GrapStage;
  min: number;
  max: number;
  hex: string;
  foreground: string;
}

export interface AqiReading {
  aqi: number;
  pm25: number | null;
  measuredAt: string | null;
  source: "live" | "sample";
}

export interface AqiBandInfo extends AqiBand {
  label: string;
}

export interface ReadinessAnswers {
  answers: Record<number, number>;
  step: number;
  showSummary: boolean;
}
