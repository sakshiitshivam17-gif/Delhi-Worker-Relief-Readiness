"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileWarning,
} from "lucide-react";
import { SpeakButton } from "@/components/SpeakButton";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useWorkerData } from "@/components/providers/WorkerDataProvider";
import { formatMessage } from "@/lib/utils";

export function NextStepCard() {
  const { t } = useLanguage();
  const { totals, organisedCount } = useWorkerData();
  const missingPapers = 5 - organisedCount;

  const step =
    totals.awaiting > 0
      ? {
          title: t.home.nextStep.pendingTitle,
          body: formatMessage(t.home.nextStep.pendingBody, {
            days: totals.awaiting,
          }),
          cta: t.home.nextStep.pendingCta,
          href: "/workdays",
          Icon: Clock3,
          container:
            "border-amber-200/90 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30",
          icon: "bg-amber-500 text-amber-950",
          ctaStyle: "bg-slate-900 text-white hover:bg-slate-800",
        }
      : organisedCount < 5
        ? {
            title: t.home.nextStep.docsTitle,
            body: formatMessage(t.home.nextStep.docsBody, {
              count: missingPapers,
            }),
            cta: t.home.nextStep.docsCta,
            href: "/checklist",
            Icon: FileWarning,
            container:
              "border-purple-200/90 bg-gradient-to-br from-purple-50/50 via-white to-purple-50/30",
            icon: "bg-purple-700 text-white",
            ctaStyle: "bg-purple-700 text-white hover:bg-purple-800",
          }
        : {
            title: t.home.nextStep.readyTitle,
            body: t.home.nextStep.readyBody,
            cta: t.home.nextStep.readyCta,
            href: "/updates",
            Icon: CheckCircle2,
            container:
              "border-emerald-200/90 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30",
            icon: "bg-emerald-700 text-white",
            ctaStyle: "bg-emerald-700 text-white hover:bg-emerald-800",
          };

  const { Icon } = step;

  return (
    <section
      aria-labelledby="next-step-title"
      className={`h-full rounded-lg border p-4 shadow-sm sm:p-5 ${step.container}`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-md shadow-xs ${step.icon}`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">
              {t.home.nextStep.eyebrow}
            </p>
            <SpeakButton
              text={`${step.title}. ${step.body}`}
              variant="default"
              showLabel={false}
              className="h-9 w-9 border-slate-200 bg-white/90"
            />
          </div>
          <h2
            id="next-step-title"
            className="mt-0.5 text-base font-black leading-tight tracking-tight text-slate-900"
          >
            {step.title}
          </h2>
          <p className="mt-1 text-[13px] font-medium leading-relaxed text-slate-600">
            {step.body}
          </p>

          <Link
            href={step.href}
            className={`mt-3 inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md px-3.5 text-xs font-bold shadow-xs transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.99] ${step.ctaStyle}`}
          >
            {step.cta}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
