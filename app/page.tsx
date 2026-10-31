"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  ClipboardList,
  Info,
  LockKeyhole,
  MapPinned,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { ActionTile } from "@/components/ActionTile";
import { AqiGrapWidget } from "@/components/AqiGrapWidget";
import { NextStepCard } from "@/components/NextStepCard";
import { ReliefProgressCard } from "@/components/ReliefProgressCard";
import { SpeakButton } from "@/components/SpeakButton";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useWorkerData } from "@/components/providers/WorkerDataProvider";
import { formatMessage } from "@/lib/utils";

export default function HomePage() {
  const { t } = useLanguage();
  const { totals, organisedCount } = useWorkerData();
  const heroSpeech = `${t.home.greeting}. ${t.home.title}. ${t.home.body}`;

  return (
    <div className="space-y-5 lg:space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        <div className="space-y-4 md:col-span-1 lg:col-span-7 lg:space-y-5">
          <section
            aria-labelledby="home-hero-title"
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-950 p-5 text-white shadow-md sm:p-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 border-8 border-white/5 opacity-40"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-14 h-52 w-52 bg-purple-400/10"
            />

            <div className="relative">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex min-h-8 items-center gap-1.5 rounded border border-purple-300/30 bg-white/10 px-2.5 text-xs font-bold text-purple-100 backdrop-blur-sm">
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-purple-300" />
                  {t.home.greeting}
                </span>
                <SpeakButton
                  text={heroSpeech}
                  variant="dark"
                  className="min-h-10"
                />
              </div>

              <h1
                id="home-hero-title"
                className="mt-4 max-w-[18ch] text-balance text-[28px] font-black leading-[1.08] tracking-[-0.03em] text-white sm:text-[38px] lg:max-w-[20ch] xl:text-[42px]"
              >
                {t.home.title}
              </h1>

              <p className="mt-2.5 max-w-[44ch] text-[14px] font-medium leading-relaxed text-purple-100/90 sm:text-[15px]">
                {t.home.body}
              </p>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <Link
                  href="/readiness"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-white px-5 text-xs font-black text-purple-950 shadow-sm transition hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.99] sm:w-auto"
                >
                  {t.home.primaryCta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href="/workdays"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-purple-300/40 bg-white/10 px-5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.99] sm:w-auto"
                >
                  <CalendarCheck2 aria-hidden="true" className="h-4 w-4" />
                  {t.home.secondaryCta}
                </Link>
              </div>

              <p className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-medium text-purple-200/80">
                <LockKeyhole aria-hidden="true" className="h-3.5 w-3.5" />
                {t.home.statusLine}
                <span aria-hidden="true" className="mx-1 opacity-60">
                  ·
                </span>
                {t.common.demo}
              </p>
            </div>
          </section>

          <AqiGrapWidget />
        </div>

        <div className="space-y-4 md:col-span-1 lg:col-span-5 lg:space-y-5">
          <ReliefProgressCard />

          <section aria-labelledby="quick-actions-title">
            <div className="mb-2.5">
              <h2
                id="quick-actions-title"
                className="text-lg font-black tracking-tight text-slate-900"
              >
                {t.home.actionsTitle}
              </h2>
              <p className="mt-0.5 text-xs font-medium text-slate-500">
                {t.home.actionsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <ActionTile
                href="/workdays"
                title={t.home.actions.workdays.title}
                description={t.home.actions.workdays.description}
                meta={formatMessage(t.home.actions.workdays.meta, {
                  count: totals.reported,
                })}
                icon={CalendarCheck2}
                tone="purple"
              />
              <ActionTile
                href="/checklist"
                title={t.home.actions.checklist.title}
                description={t.home.actions.checklist.description}
                meta={formatMessage(t.home.actions.checklist.meta, {
                  organised: organisedCount,
                })}
                icon={ClipboardList}
                tone="leaf"
              />
              <ActionTile
                href="/camps"
                title={t.home.actions.camps.title}
                description={t.home.actions.camps.description}
                meta={formatMessage(t.home.actions.camps.meta, {
                  helpline: t.common.helplineNumber,
                })}
                icon={MapPinned}
                tone="sky"
              />
              <ActionTile
                href="/updates"
                title={t.home.actions.updates.title}
                description={t.home.actions.updates.description}
                meta={formatMessage(t.home.actions.updates.meta, {
                  date: t.updates.timeline[1].date,
                })}
                icon={Megaphone}
                tone="amber"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-stretch">
        <NextStepCard />

        <section
          aria-labelledby="disclaimer-title"
          className="h-full rounded-lg border border-purple-200/80 bg-purple-50/50 p-4 shadow-xs sm:p-5"
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded bg-purple-200 text-purple-900"
            >
              <Info className="h-4 w-4" />
            </span>
            <div>
              <h2
                id="disclaimer-title"
                className="text-sm font-black text-purple-950"
              >
                {t.home.disclaimerTitle}
              </h2>
              <p className="mt-1 text-[13px] font-medium leading-relaxed text-purple-900/90">
                {t.home.disclaimerBody}
              </p>
            </div>
          </div>
        </section>
      </div>

      <p className="pb-2 pt-1 text-center text-xs font-medium text-slate-400">
        {t.home.footer} · {t.common.brand}
      </p>
    </div>
  );
}
