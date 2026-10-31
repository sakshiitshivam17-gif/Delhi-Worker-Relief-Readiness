"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  FolderCheck,
  IdCard,
  Info,
  Megaphone,
  RefreshCw,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useWorkerData } from "@/components/providers/WorkerDataProvider";
import type {
  DocumentKey,
  DocumentStatus,
} from "@/lib/types";
import { cn, formatMessage } from "@/lib/utils";

const DOCUMENT_KEYS: DocumentKey[] = [
  "registration",
  "workdays",
  "supporting",
  "renewal",
  "notice",
];

const DOCUMENT_ICONS: Record<DocumentKey, LucideIcon> = {
  registration: IdCard,
  workdays: CalendarCheck2,
  supporting: FolderCheck,
  renewal: RefreshCw,
  notice: Megaphone,
};

const statusStyles: Record<
  DocumentStatus,
  { pill: string; icon: string }
> = {
  organised: {
    pill: "border-purple-300 bg-purple-50 text-purple-950",
    icon: "bg-purple-700 text-white",
  },
  needsReview: {
    pill: "border-amber-300 bg-amber-50 text-amber-950",
    icon: "bg-amber-400 text-amber-950",
  },
  notStarted: {
    pill: "border-slate-300 bg-slate-100 text-slate-800",
    icon: "bg-slate-300 text-slate-800",
  },
};

export function DocumentsChecklist() {
  const { t } = useLanguage();
  const { documents, organisedCount, setDocumentStatus } = useWorkerData();
  const percent = Math.round((organisedCount / DOCUMENT_KEYS.length) * 100);

  function toggle(key: DocumentKey) {
    setDocumentStatus(
      key,
      documents[key] === "organised" ? "needsReview" : "organised"
    );
  }

  return (
    <div className="space-y-5">
      <section
        aria-labelledby="checklist-progress-title"
        className="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-purple-50/30 p-5 shadow-sm"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.15em] text-purple-800">
              {t.checklist.progress}
            </p>
            <h2
              id="checklist-progress-title"
              className="mt-1 text-xl font-black tracking-tight text-slate-950"
            >
              {formatMessage(t.checklist.organisedCount, {
                organised: organisedCount,
              })}
            </h2>
          </div>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-md bg-purple-700 text-white shadow-xs"
          >
            <ClipboardCheck className="h-5 w-5" />
          </span>
        </div>

        <div
          role="progressbar"
          aria-label={t.checklist.progress}
          aria-valuemin={0}
          aria-valuemax={DOCUMENT_KEYS.length}
          aria-valuenow={organisedCount}
          className="mt-3 h-2.5 overflow-hidden rounded bg-slate-100"
        >
          <div
            className="h-full rounded bg-purple-600 transition-[width] duration-500 motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] font-semibold text-slate-600">
          {t.checklist.demo}
        </p>
      </section>

      <div className="space-y-3">
        {DOCUMENT_KEYS.map((key, index) => {
          const item = t.checklist.items[key];
          const status = documents[key];
          const styles = statusStyles[status];
          const Icon = DOCUMENT_ICONS[key];
          const isOrganised = status === "organised";

          return (
            <article
              key={key}
              className="rounded-lg border border-purple-100 bg-white p-4 shadow-sm transition hover:border-purple-200"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-md",
                    styles.icon
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-1.5">
                    <h3 className="text-[15px] font-black leading-tight text-slate-950">
                      <span className="mr-1 text-slate-400">{index + 1}.</span>
                      {item.title}
                    </h3>
                    <span
                      className={cn(
                        "inline-flex min-h-7 items-center rounded-md border px-2.5 text-[10px] font-extrabold",
                        styles.pill
                      )}
                    >
                      {t.checklist.status[status]}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-slate-600">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-pressed={isOrganised}
                    className={cn(
                      "mt-3 inline-flex min-h-10 w-full touch-manipulation items-center justify-center gap-1.5 rounded-md border px-3 text-xs font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.99] sm:w-auto",
                      isOrganised
                        ? "border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100"
                        : "border-purple-300 bg-purple-50 text-purple-950 hover:bg-purple-100"
                    )}
                  >
                    {isOrganised ? (
                      <RotateCcw aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                    )}
                    {isOrganised
                      ? t.checklist.markReview
                      : t.checklist.markOrganised}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <Link
        href="/camps"
        className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-purple-700 px-4 text-sm font-black text-white shadow-sm transition hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.99]"
      >
        {t.checklist.helpCta}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-2">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-amber-800"
          />
          <p className="text-xs font-semibold leading-relaxed text-amber-950">
            {t.checklist.note}
          </p>
        </div>
      </div>
    </div>
  );
}
