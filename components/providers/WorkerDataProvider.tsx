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
  RELIEF_TARGET_DAYS,
  SEED_DOCUMENTS,
  SEED_WORKDAYS,
} from "@/lib/data";
import type {
  DocumentKey,
  DocumentState,
  DocumentStatus,
  WorkdayEntry,
  WorkdayInput,
  WorkdayStatus,
  WorkdayTotals,
} from "@/lib/types";
import { createId } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

const WORKDAYS_KEY = "worker-saathi-workdays-v2";
const DOCUMENTS_KEY = "worker-saathi-documents-v2";

const DOCUMENT_KEYS: DocumentKey[] = [
  "registration",
  "workdays",
  "supporting",
  "renewal",
  "notice",
];

const DOCUMENT_STATUSES: DocumentStatus[] = [
  "organised",
  "needsReview",
  "notStarted",
];

const WORKDAY_STATUSES: WorkdayStatus[] = [
  "confirmed",
  "pending",
  "reported",
  "correction",
];

interface WorkerDataContextValue {
  entries: WorkdayEntry[];
  totals: WorkdayTotals;
  documents: DocumentState;
  organisedCount: number;
  addWorkday: (input: WorkdayInput) => WorkdayEntry;
  advanceWorkday: (id: string) => WorkdayStatus | null;
  setDocumentStatus: (key: DocumentKey, status: DocumentStatus) => void;
}

const WorkerDataContext = createContext<WorkerDataContextValue | null>(null);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isWorkdayEntry(value: unknown): value is WorkdayEntry {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.from === "string" &&
    typeof value.to === "string" &&
    typeof value.days === "number" &&
    Number.isFinite(value.days) &&
    value.days > 0 &&
    typeof value.worksite === "string" &&
    value.worksite.length > 0 &&
    typeof value.workType === "string" &&
    value.workType.length > 0 &&
    typeof value.status === "string" &&
    WORKDAY_STATUSES.includes(value.status as WorkdayStatus) &&
    typeof value.createdAt === "string"
  );
}

function parseEntries(raw: string | null): WorkdayEntry[] | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return null;
    const entries = value.filter(isWorkdayEntry);
    return entries.length > 0 ? entries : null;
  } catch {
    return null;
  }
}

function parseDocuments(raw: string | null): DocumentState | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value)) return null;

    const documents = {} as DocumentState;
    for (const key of DOCUMENT_KEYS) {
      const status = value[key];
      if (
        typeof status !== "string" ||
        !DOCUMENT_STATUSES.includes(status as DocumentStatus)
      ) {
        return null;
      }
      documents[key] = status as DocumentStatus;
    }
    return documents;
  } catch {
    return null;
  }
}

export function WorkerDataProvider({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const [draftEntries, setDraftEntries] = useState<WorkdayEntry[] | null>(
    null
  );
  const [draftDocuments, setDraftDocuments] =
    useState<DocumentState | null>(null);

  const storedEntries = useMemo<WorkdayEntry[] | null>(() => {
    if (!hydrated) return null;
    try {
      return parseEntries(window.localStorage.getItem(WORKDAYS_KEY));
    } catch {
      return null;
    }
  }, [hydrated]);

  const storedDocuments = useMemo<DocumentState | null>(() => {
    if (!hydrated) return null;
    try {
      return parseDocuments(window.localStorage.getItem(DOCUMENTS_KEY));
    } catch {
      return null;
    }
  }, [hydrated]);

  const entries = draftEntries ?? storedEntries ?? SEED_WORKDAYS;
  const documents = draftDocuments ?? storedDocuments ?? SEED_DOCUMENTS;

  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(WORKDAYS_KEY, JSON.stringify(entries));
      window.localStorage.setItem(
        DOCUMENTS_KEY,
        JSON.stringify(documents)
      );
    } catch {
      // The UI remains fully usable for this session.
    }
  }, [documents, entries, hydrated]);

  const addWorkday = useCallback(
    (input: WorkdayInput): WorkdayEntry => {
      const entry: WorkdayEntry = {
        ...input,
        id: createId("workday"),
        status: "reported",
        createdAt: new Date().toISOString(),
      };
      setDraftEntries((previous) => [entry, ...(previous ?? entries)]);
      return entry;
    },
    [entries]
  );

  const advanceWorkday = useCallback(
    (id: string): WorkdayStatus | null => {
      const current = entries.find((entry) => entry.id === id);
      if (!current) return null;

      let nextStatus: WorkdayStatus;
      if (current.status === "reported") nextStatus = "pending";
      else if (current.status === "pending") nextStatus = "correction";
      else if (current.status === "confirmed") nextStatus = "correction";
      else return null;

      setDraftEntries((previous) =>
        (previous ?? entries).map((entry) =>
          entry.id === id && entry.status === current.status
            ? { ...entry, status: nextStatus }
            : entry
        )
      );

      return nextStatus;
    },
    [entries]
  );

  const setDocumentStatus = useCallback(
    (key: DocumentKey, status: DocumentStatus) => {
      setDraftDocuments((previous) => ({
        ...(previous ?? documents),
        [key]: status,
      }));
    },
    [documents]
  );

  const totals = useMemo<WorkdayTotals>(() => {
    let reported = 0;
    let confirmed = 0;

    for (const entry of entries) {
      reported += entry.days;
      if (entry.status === "confirmed") confirmed += entry.days;
    }

    return {
      reported,
      confirmed,
      awaiting: Math.max(reported - confirmed, 0),
      target: RELIEF_TARGET_DAYS,
    };
  }, [entries]);

  const organisedCount = useMemo(
    () =>
      DOCUMENT_KEYS.filter(
        (key) => documents[key] === "organised"
      ).length,
    [documents]
  );

  const value = useMemo<WorkerDataContextValue>(
    () => ({
      entries,
      totals,
      documents,
      organisedCount,
      addWorkday,
      advanceWorkday,
      setDocumentStatus,
    }),
    [
      addWorkday,
      advanceWorkday,
      documents,
      entries,
      organisedCount,
      setDocumentStatus,
      totals,
    ]
  );

  return (
    <WorkerDataContext.Provider value={value}>
      {children}
    </WorkerDataContext.Provider>
  );
}

export function useWorkerData(): WorkerDataContextValue {
  const context = useContext(WorkerDataContext);
  if (!context) {
    throw new Error("useWorkerData must be used inside WorkerDataProvider");
  }
  return context;
}
