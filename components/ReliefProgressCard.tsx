"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  FolderCheck,
} from "lucide-react";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useWorkerData } from "@/components/providers/WorkerDataProvider";
import { formatMessage } from "@/lib/utils";

export function ReliefProgressCard() {
  const { t } = useLanguage();
  const { totals, organisedCount } = useWorkerData();
  const percent = Math.round(
    (Math.min(totals.confirmed, totals.target) / totals.target) * 100
  );

  return (
    <section
      aria-labelledby="relief-progress-title"
      className="rounded-lg border border-purple-100/90 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.15em] text-purple-700">
            {t.home.relief.eyebrow}
          </p>
          <h2
            id="relief-progress-title"
            className="mt-1 text-xl font-black tracking-tight text-slate-900"
          >
            {t.home.relief.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {t.home.relief.subtitle}
          </p>
        </div>
        <Link
          href="/workdays"
          className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-md px-2.5 text-xs font-bold text-purple-700 transition hover:bg-purple-50 hover:text-purple-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
        >
          {t.common.viewAll}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 xl:flex-row xl:gap-5">
        <ProgressRing
          value={totals.confirmed}
          max={totals.target}
          label={t.home.relief.confirmedLabel}
          size={146}
          tone="leaf"
          className="shrink-0"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {t.home.stats.confirmed}
            </p>
            <p className="mt-0.5 text-[34px] font-black leading-none tracking-tighter text-slate-900">
              {totals.confirmed}
              <span className="text-base font-bold text-slate-400">
                /{totals.target}
              </span>
            </p>
            <p className="mt-1 text-xs font-bold text-purple-700">
              {formatMessage(t.home.relief.percentLabel, { percent })}
            </p>
          </div>
        </ProgressRing>

        <div className="w-full min-w-0 flex-1">
          <div className="rounded-md border border-purple-100 bg-purple-50/50 p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2
                aria-hidden="true"
                className="h-4 w-4 text-purple-700"
              />
              <p className="text-sm font-bold text-purple-950">
                {formatMessage(t.home.relief.targetLabel, {
                  target: totals.target,
                })}
              </p>
            </div>
            <p className="mt-0.5 text-xs font-medium text-purple-800">
              {formatMessage(t.home.relief.pendingLabel, {
                days: totals.awaiting,
              })}
            </p>
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-2">
            <div className="rounded-md border border-slate-200 bg-slate-50/80 p-2 text-center">
              <CalendarCheck2
                aria-hidden="true"
                className="mx-auto h-4 w-4 text-purple-600"
              />
              <p className="mt-1 text-lg font-black leading-none text-slate-900">
                {totals.reported}
              </p>
              <p className="mt-0.5 text-[10px] font-bold leading-tight text-slate-500">
                {t.workdays.reported}
              </p>
            </div>
            <div className="rounded-md border border-amber-200/80 bg-amber-50/70 p-2 text-center">
              <Clock3
                aria-hidden="true"
                className="mx-auto h-4 w-4 text-amber-600"
              />
              <p className="mt-1 text-lg font-black leading-none text-amber-950">
                {totals.awaiting}
              </p>
              <p className="mt-0.5 text-[10px] font-bold leading-tight text-amber-900">
                {t.home.stats.waiting}
              </p>
            </div>
            <div className="rounded-md border border-sky-200/80 bg-sky-50/70 p-2 text-center">
              <FolderCheck
                aria-hidden="true"
                className="mx-auto h-4 w-4 text-sky-600"
              />
              <p className="mt-1 text-lg font-black leading-none text-sky-950">
                {organisedCount}/5
              </p>
              <p className="mt-0.5 text-[10px] font-bold leading-tight text-sky-900">
                {t.home.stats.papers}
              </p>
            </div>
          </div>

          <p className="mt-2.5 text-[11px] font-medium leading-relaxed text-slate-500">
            {t.home.relief.note}
          </p>
        </div>
      </div>

      <Link
        href="/workdays"
        className="mt-4 flex min-h-11 items-center justify-center gap-1.5 rounded-md bg-purple-700 px-4 text-xs font-bold text-white shadow-xs transition hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.99]"
      >
        {t.home.relief.cta}
        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
      </Link>
    </section>
  );
}
