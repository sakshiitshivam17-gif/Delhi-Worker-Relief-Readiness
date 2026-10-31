"use client";

import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Flag,
  PencilLine,
  Send,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { WorkdayEntry, WorkdayStatus } from "@/lib/types";
import { cn, formatDateRange, formatMessage } from "@/lib/utils";

interface WorkdayCardProps {
  entry: WorkdayEntry;
  onAdvance: (entry: WorkdayEntry) => void;
}

const statusStyles: Record<
  WorkdayStatus,
  {
    Icon: LucideIcon;
    pill: string;
    icon: string;
    dot: string;
  }
> = {
  confirmed: {
    Icon: CheckCircle2,
    pill: "border-emerald-200 bg-emerald-50 text-emerald-950",
    icon: "bg-emerald-700 text-white",
    dot: "bg-emerald-600",
  },
  pending: {
    Icon: Clock3,
    pill: "border-amber-200 bg-amber-50 text-amber-950",
    icon: "bg-amber-500 text-amber-950",
    dot: "bg-amber-500",
  },
  reported: {
    Icon: PencilLine,
    pill: "border-purple-200 bg-purple-50 text-purple-950",
    icon: "bg-purple-700 text-white",
    dot: "bg-purple-600",
  },
  correction: {
    Icon: AlertTriangle,
    pill: "border-rose-200 bg-rose-50 text-rose-950",
    icon: "bg-rose-700 text-white",
    dot: "bg-rose-600",
  },
};

const actionCopy: Partial<
  Record<
    WorkdayStatus,
    { label: "request" | "flag" | "correction"; Icon: LucideIcon }
  >
> = {
  reported: { label: "request", Icon: Send },
  pending: { label: "flag", Icon: Flag },
  confirmed: { label: "correction", Icon: Wrench },
};

export function WorkdayCard({ entry, onAdvance }: WorkdayCardProps) {
  const { language, t } = useLanguage();
  const styles = statusStyles[entry.status];
  const { Icon } = styles;
  const action = actionCopy[entry.status];
  const workTypeLabel = entry.workTypeKey
    ? t.quickEntry.workTypes[entry.workTypeKey]
    : entry.workType;

  return (
    <li className="relative flex gap-3">
      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-md border-2 border-white shadow-xs",
          styles.icon
        )}
      >
        <Icon className="h-4 w-4" />
      </span>

      <article className="min-w-0 flex-1 rounded-lg border border-purple-100/80 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
              {formatDateRange(entry.from, entry.to, language)}
            </p>
            <h3 className="mt-0.5 text-[16px] font-black leading-tight tracking-tight text-slate-900">
              {entry.worksite}
            </h3>
            <p className="mt-0.5 text-[13px] font-medium text-slate-600">
              {workTypeLabel}
            </p>
          </div>

          <span
            className={cn(
              "inline-flex min-h-7 items-center gap-1.5 rounded border px-2 text-[10px] font-bold",
              styles.pill
            )}
          >
            <span
              aria-hidden="true"
              className={cn("h-1.5 w-1.5 rounded-full", styles.dot)}
            />
            {t.workdays.status[entry.status]}
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900">
            <CheckCircle2
              aria-hidden="true"
              className="h-3.5 w-3.5 text-purple-600"
            />
            {formatMessage(t.common.daysCount, { count: entry.days })}
          </span>

          {entry.verifier ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600">
              <BadgeCheck
                aria-hidden="true"
                className="h-3.5 w-3.5 text-emerald-700"
              />
              {formatMessage(t.workdays.verifier, { id: entry.verifier })}
            </span>
          ) : null}
        </div>

        <p className="mt-1.5 text-[11px] font-medium leading-snug text-slate-500">
          {t.workdays.statusHelp[entry.status]}
        </p>

        {action ? (
          <button
            type="button"
            onClick={() => onAdvance(entry)}
            className="mt-3 inline-flex min-h-10 w-full touch-manipulation items-center justify-center gap-1.5 rounded-md border border-purple-200/90 bg-purple-50/50 px-3 text-xs font-bold text-purple-950 transition hover:border-purple-300 hover:bg-purple-100/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.99] sm:w-auto"
          >
            <action.Icon aria-hidden="true" className="h-3.5 w-3.5" />
            {t.workdays.action[action.label]}
          </button>
        ) : null}
      </article>
    </li>
  );
}
