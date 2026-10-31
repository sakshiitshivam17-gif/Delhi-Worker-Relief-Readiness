"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Info,
  Plus,
  X,
} from "lucide-react";
import { QuickEntryDialog } from "@/components/QuickEntryDialog";
import { WorkdayCard } from "@/components/WorkdayCard";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useWorkerData } from "@/components/providers/WorkerDataProvider";
import type { WorkdayEntry, WorkdayInput } from "@/lib/types";
import { cn, formatMessage } from "@/lib/utils";

type WorkdayFilter = "all" | "confirmed" | "waiting" | "reported";

const FILTERS: WorkdayFilter[] = [
  "all",
  "confirmed",
  "waiting",
  "reported",
];

export function WorkdaysTracker() {
  const { t } = useLanguage();
  const {
    entries,
    totals,
    addWorkday,
    advanceWorkday,
  } = useWorkerData();
  const [filter, setFilter] = useState<WorkdayFilter>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSession, setDialogSession] = useState(0);
  const [notice, setNotice] = useState("");

  const percent = Math.round(
    (Math.min(totals.confirmed, totals.target) / totals.target) * 100
  );

  const filteredEntries = useMemo(() => {
    const sorted = [...entries].sort((a, b) =>
      b.from.localeCompare(a.from)
    );

    if (filter === "confirmed") {
      return sorted.filter((entry) => entry.status === "confirmed");
    }
    if (filter === "waiting") {
      return sorted.filter(
        (entry) =>
          entry.status === "pending" || entry.status === "correction"
      );
    }
    if (filter === "reported") {
      return sorted.filter((entry) => entry.status === "reported");
    }
    return sorted;
  }, [entries, filter]);

  function openDialog() {
    setDialogSession((value) => value + 1);
    setDialogOpen(true);
  }

  function handleSubmit(input: WorkdayInput) {
    addWorkday(input);
    setFilter("all");
    setNotice(t.workdays.notice.added);
    setDialogOpen(false);
  }

  function handleAdvance(entry: WorkdayEntry) {
    const nextStatus = advanceWorkday(entry.id);
    if (!nextStatus) return;

    if (entry.status === "reported") {
      setNotice(t.workdays.notice.requested);
    } else if (entry.status === "pending") {
      setNotice(t.workdays.notice.flagged);
    } else if (entry.status === "confirmed") {
      setNotice(t.workdays.notice.correction);
    }
  }

  function filterLabel(key: WorkdayFilter) {
    if (key === "confirmed") return t.workdays.filterConfirmed;
    if (key === "waiting") return t.workdays.filterWaiting;
    if (key === "reported") return t.workdays.filterReported;
    return t.workdays.filterAll;
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={openDialog}
        className="flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-md bg-purple-700 px-5 text-sm font-bold text-white shadow-xs transition hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.99]"
      >
        <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
        {t.workdays.addCta}
      </button>

      <section
        aria-labelledby="workday-goal-title"
        className="rounded-lg border border-purple-100/90 bg-white p-5 shadow-sm"
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.15em] text-purple-700">
              {t.workdays.goalTitle}
            </p>
            <h2
              id="workday-goal-title"
              className="mt-1 text-lg font-black leading-snug tracking-tight text-slate-900"
            >
              {formatMessage(t.workdays.goalBody, {
                confirmed: totals.confirmed,
                target: totals.target,
              })}
            </h2>
          </div>
          <span className="rounded bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-900 border border-purple-200">
            {formatMessage(t.common.percent, { percent })}
          </span>
        </div>

        <div
          role="progressbar"
          aria-label={t.workdays.progressLabel}
          aria-valuemin={0}
          aria-valuemax={totals.target}
          aria-valuenow={totals.confirmed}
          className="mt-3 h-2.5 overflow-hidden rounded bg-slate-100"
        >
          <div
            className="h-full rounded bg-purple-700 transition-[width] duration-700 motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-md border border-purple-100 bg-purple-50/50 p-3 text-center">
            <CalendarDays
              aria-hidden="true"
              className="mx-auto h-4 w-4 text-purple-700"
            />
            <p className="mt-1 text-2xl font-black leading-none text-purple-950">
              {totals.reported}
            </p>
            <p className="mt-0.5 text-[10px] font-bold leading-tight text-purple-900">
              {t.workdays.reported}
            </p>
          </div>
          <div className="rounded-md border border-emerald-100 bg-emerald-50/50 p-3 text-center">
            <CheckCircle2
              aria-hidden="true"
              className="mx-auto h-4 w-4 text-emerald-700"
            />
            <p className="mt-1 text-2xl font-black leading-none text-emerald-950">
              {totals.confirmed}
            </p>
            <p className="mt-0.5 text-[10px] font-bold leading-tight text-emerald-900">
              {t.workdays.confirmed}
            </p>
          </div>
          <div className="rounded-md border border-amber-100 bg-amber-50/50 p-3 text-center">
            <Clock3
              aria-hidden="true"
              className="mx-auto h-4 w-4 text-amber-700"
            />
            <p className="mt-1 text-2xl font-black leading-none text-amber-950">
              {totals.awaiting}
            </p>
            <p className="mt-0.5 text-[10px] font-bold leading-tight text-amber-900">
              {t.workdays.waiting}
            </p>
          </div>
        </div>

        <p className="mt-3 flex items-start gap-1.5 text-[11px] font-medium leading-relaxed text-slate-500">
          <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {t.workdays.goalNote} {t.workdays.demo}
        </p>
      </section>

      {notice ? (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-2.5 rounded-md border border-emerald-200 bg-emerald-50 p-3"
        >
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
          />
          <p className="min-w-0 flex-1 text-xs font-bold leading-snug text-emerald-950">
            {notice}
          </p>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label={t.common.close}
            className="grid h-7 w-7 shrink-0 place-items-center rounded text-emerald-900 transition hover:bg-emerald-100"
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}

      <section aria-labelledby="workday-records-title">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2
            id="workday-records-title"
            className="text-lg font-black tracking-tight text-slate-900"
          >
            {t.workdays.recordsTitle}
            <span className="ml-1.5 text-xs font-bold text-slate-500">
              ({filteredEntries.length})
            </span>
          </h2>
        </div>

        <div
          role="group"
          aria-label={t.workdays.filtersAria}
          className="mt-3 flex flex-wrap gap-1.5"
        >
          {FILTERS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={cn(
                "min-h-10 touch-manipulation rounded-md border px-3 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.98]",
                filter === key
                  ? "border-purple-800 bg-purple-800 text-white shadow-xs"
                  : "border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:bg-purple-50/50"
              )}
            >
              {filterLabel(key)}
            </button>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 rounded-md border border-purple-100 bg-white p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            {t.workdays.status.confirmed}
          </p>
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            {t.workdays.status.pending}
          </p>
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
            <span className="h-2 w-2 rounded-full bg-purple-600" />
            {t.workdays.status.reported}
          </p>
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
            <span className="h-2 w-2 rounded-full bg-rose-600" />
            {t.workdays.status.correction}
          </p>
        </div>

        {filteredEntries.length > 0 ? (
          <ol className="relative mt-4 space-y-3 before:absolute before:bottom-8 before:left-5 before:top-8 before:w-0.5 before:bg-slate-200">
            {filteredEntries.map((entry) => (
              <WorkdayCard
                key={entry.id}
                entry={entry}
                onAdvance={handleAdvance}
              />
            ))}
          </ol>
        ) : (
          <div className="mt-4 rounded-md border border-dashed border-slate-200 bg-white p-6 text-center">
            <CalendarDays
              aria-hidden="true"
              className="mx-auto h-8 w-8 text-slate-300"
            />
            <p className="mt-2 text-sm font-bold text-slate-800">
              {t.workdays.empty}
            </p>
            <p className="mt-0.5 text-xs font-medium text-slate-500">
              {t.workdays.emptyHint}
            </p>
          </div>
        )}
      </section>

      <div className="rounded-md border border-purple-100 bg-purple-50/50 p-4">
        <p className="text-xs font-medium leading-relaxed text-purple-950">
          {t.workdays.disclaimer}
        </p>
      </div>

      <QuickEntryDialog
        key={dialogSession}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
