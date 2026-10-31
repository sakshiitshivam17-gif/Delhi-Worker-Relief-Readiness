"use client";

import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  History,
  IndianRupee,
  Info,
  Landmark,
  ListChecks,
  Phone,
  ShieldAlert,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  CAQM_URL,
  DBOCWWB_URL,
  SHARMIK_HELPLINE,
} from "@/lib/data";

export function GrapUpdates() {
  const { t } = useLanguage();

  const facts = [
    { label: t.updates.source, value: t.updates.sourceValue },
    { label: t.updates.published, value: t.updates.publishedValue },
    { label: t.updates.checked, value: t.updates.checkedValue },
  ];

  return (
    <div className="space-y-5">
      <section
        aria-labelledby="official-status-title"
        className="rounded-lg border border-amber-300 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 p-5 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-amber-400 text-amber-950 shadow-xs"
          >
            <ShieldAlert className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.15em] text-amber-800">
              {t.updates.officialStatus}
            </p>
            <h2
              id="official-status-title"
              className="mt-1 text-xl font-black leading-tight tracking-tight text-slate-950"
            >
              {t.updates.unverified}
            </h2>
            <p className="mt-2 text-[13px] font-semibold leading-relaxed text-slate-700">
              {t.updates.statusBody}
            </p>
          </div>
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-white/90 px-2.5 py-1 text-[11px] font-bold text-amber-950">
          <span className="h-2 w-2 rounded-xs bg-amber-600" />
          {t.updates.demo}
        </span>
      </section>

      <section aria-label={t.updates.source} className="grid gap-2 sm:grid-cols-3">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-lg border border-purple-100 bg-white p-3.5"
          >
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">
              {fact.label}
            </p>
            <p className="mt-1 text-[13px] font-extrabold leading-snug text-slate-900">
              {fact.value}
            </p>
          </div>
        ))}
      </section>

      <a
        href={CAQM_URL}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-purple-900 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-purple-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.99]"
      >
        <Landmark aria-hidden="true" className="h-5 w-5" />
        {t.updates.openCaqm}
        <ExternalLink aria-hidden="true" className="h-4 w-4" />
      </a>

      <section className="rounded-lg border border-purple-200 bg-purple-50/50 p-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-purple-700 text-white shadow-xs"
          >
            <IndianRupee className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-black leading-tight tracking-tight text-purple-950">
              {t.updates.reliefTitle}
            </h2>
            <p className="mt-1.5 text-[13px] font-semibold leading-relaxed text-purple-950">
              {t.updates.reliefBody}
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <a
            href={`tel:${SHARMIK_HELPLINE}`}
            className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-purple-700 px-3 text-xs font-black text-white transition hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            {t.updates.helplineTitle}
          </a>
          <a
            href={DBOCWWB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-md border border-purple-200 bg-white px-3 text-xs font-black text-purple-950 transition hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
          >
            {t.updates.boardTitle}
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
        <p className="mt-2 text-[11px] font-semibold leading-relaxed text-purple-900">
          {t.updates.helplineBody}
        </p>
      </section>

      <section className="rounded-lg border border-purple-100 bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-950">
          <ListChecks aria-hidden="true" className="h-5 w-5 text-purple-700" />
          {t.updates.stepsTitle}
        </h2>
        <ol className="mt-3 space-y-2.5">
          {t.updates.steps.map((step, index) => (
            <li key={step} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-purple-100 text-xs font-black text-purple-900"
              >
                {index + 1}
              </span>
              <span className="pt-0.5 text-[13px] font-semibold leading-relaxed text-slate-700">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-lg border border-purple-100 bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-950">
          <History aria-hidden="true" className="h-5 w-5 text-slate-500" />
          {t.updates.timelineTitle}
        </h2>
        <ol className="mt-3 space-y-3 border-l-2 border-purple-200 pl-4">
          {t.updates.timeline.map((item) => (
            <li key={item.date} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[21px] top-1.5 grid h-2.5 w-2.5 place-items-center rounded-xs border border-white bg-purple-700"
              />
              <p className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500">
                <Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-purple-600" />
                {item.date}
              </p>
              <p className="mt-0.5 text-sm font-black text-slate-900">
                {item.title}
              </p>
              <p className="mt-0.5 text-[12px] font-medium leading-relaxed text-slate-600">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
        <div className="flex items-start gap-2">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-rose-800"
          />
          <p className="text-xs font-semibold leading-relaxed text-rose-950">
            {t.updates.warning}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-purple-200 bg-purple-50/70 p-4">
        <div className="flex items-start gap-2">
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-purple-700"
          />
          <p className="text-xs font-semibold leading-relaxed text-purple-950">
            {t.updates.boardBody}
          </p>
        </div>
      </div>
    </div>
  );
}
