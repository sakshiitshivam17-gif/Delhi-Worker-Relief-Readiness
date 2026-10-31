"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Info,
  Landmark,
  LockKeyhole,
  MapPinned,
  Megaphone,
  RotateCcw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { ReadinessAnswers } from "@/lib/types";
import { cn, formatMessage } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

const CONSENT_KEY = "worker-saathi-consent-v1";
const PROGRESS_KEY = "worker-saathi-readiness-v2";
const EMPTY_PROGRESS: ReadinessAnswers = {
  step: 0,
  answers: {},
  showSummary: false,
};

const POINT_ICONS: LucideIcon[] = [
  BookOpen,
  LockKeyhole,
  ShieldCheck,
  Landmark,
];

function parseSavedProgress(raw: string | null): ReadinessAnswers | null {
  if (!raw) return null;

  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) return null;

    const candidate = value as {
      step?: unknown;
      answers?: unknown;
      showSummary?: unknown;
    };

    if (
      typeof candidate.step !== "number" ||
      !Number.isInteger(candidate.step) ||
      candidate.step < 0 ||
      candidate.step > 3
    ) {
      return null;
    }

    if (
      typeof candidate.answers !== "object" ||
      candidate.answers === null
    ) {
      return null;
    }

    const answers: Record<number, number> = {};
    for (const [key, answer] of Object.entries(candidate.answers)) {
      if (typeof answer === "number" && Number.isInteger(answer)) {
        answers[Number(key)] = answer;
      }
    }

    return {
      step: candidate.step,
      answers,
      showSummary: candidate.showSummary === true,
    };
  } catch {
    return null;
  }
}

export function ReadinessFlow() {
  const { t } = useLanguage();
  const hydrated = useHydrated();
  const [consentOverride, setConsentOverride] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const storedConsent = useMemo(() => {
    if (!hydrated) return false;
    try {
      return window.localStorage.getItem(CONSENT_KEY) === "accepted";
    } catch {
      return false;
    }
  }, [hydrated]);

  const hasConsent = consentOverride || storedConsent;

  function acceptConsent() {
    try {
      window.localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      // Continue without persistence.
    }
    setConsentOverride(true);
  }

  if (!hasConsent) {
    return (
      <section
        aria-labelledby="consent-title"
        className="rounded-lg border border-purple-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-purple-800">
          {t.consent.label}
        </p>
        <h2
          id="consent-title"
          className="mt-1 text-2xl font-black tracking-tight text-slate-950"
        >
          {t.consent.title}
        </h2>
        <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
          {t.consent.intro}
        </p>

        <ol className="mt-4 space-y-2.5">
          {t.consent.points.map((point, index) => {
            const Icon = POINT_ICONS[index] ?? Info;
            return (
              <li
                key={point.title}
                className="flex items-start gap-3 rounded-md bg-purple-50/40 border border-purple-100/60 p-3.5"
              >
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-purple-100 text-purple-900"
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-slate-950">
                    {point.title}
                  </h3>
                  <p className="mt-0.5 text-[12px] font-medium leading-relaxed text-slate-600">
                    {point.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <label className="mt-4 flex min-h-12 cursor-pointer items-start gap-3 rounded-md border border-slate-300 bg-white p-3.5 transition hover:border-purple-300">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(event) => setConsentChecked(event.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-purple-700"
          />
          <span className="text-[13px] font-semibold leading-relaxed text-slate-800">
            {t.consent.agree}
          </span>
        </label>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/"
            className="flex min-h-12 flex-1 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-extrabold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 active:scale-[0.99]"
          >
            {t.consent.cancel}
          </Link>
          <button
            type="button"
            onClick={acceptConsent}
            disabled={!consentChecked}
            className="flex min-h-12 flex-[1.4] items-center justify-center gap-2 rounded-md bg-purple-700 px-4 text-sm font-black text-white shadow-sm transition hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.consent.accept}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </section>
    );
  }

  return <Questionnaire />;
}

function Questionnaire() {
  const { t } = useLanguage();
  const hydrated = useHydrated();
  const [draft, setDraft] = useState<ReadinessAnswers | null>(null);

  const storedProgress = useMemo(() => {
    if (!hydrated) return null;
    try {
      return parseSavedProgress(
        window.localStorage.getItem(PROGRESS_KEY)
      );
    } catch {
      return null;
    }
  }, [hydrated]);

  const progress = draft ?? storedProgress ?? EMPTY_PROGRESS;
  const { answers, showSummary, step } = progress;

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // Progress simply remains in memory.
    }
  }, [hydrated, progress]);

  const questions = t.readiness.questions;
  const total = questions.length;
  const question = questions[step];
  const selectedAnswer = answers[step];
  const percent = showSummary
    ? 100
    : Math.round(((step + 1) / total) * 100);

  const nextSteps = useMemo(() => {
    const actions: string[] = [];

    if (answers[0] === 1) actions.push(t.readiness.advice.registrationNo);
    if (answers[0] === 2) actions.push(t.readiness.advice.registrationUnsure);

    const workdayAnswer = answers[1];
    if (
      workdayAnswer === 1 ||
      workdayAnswer === 2 ||
      workdayAnswer === 3
    ) {
      actions.push(t.readiness.advice.workdays);
    }

    const proofAnswer = answers[2];
    if (proofAnswer === 1 || proofAnswer === 2 || proofAnswer === 3) {
      actions.push(t.readiness.advice.documents);
    }

    const noticeAnswer = answers[3];
    if (noticeAnswer === 1 || noticeAnswer === 2) {
      actions.push(t.readiness.advice.notice);
    }

    if (actions.length === 0) actions.push(t.readiness.advice.default);
    return actions;
  }, [answers, t.readiness.advice]);

  function goToStep(nextStep: number) {
    setDraft({ ...progress, step: nextStep });
  }

  function selectAnswer(answer: number) {
    setDraft({
      ...progress,
      answers: { ...answers, [step]: answer },
    });
  }

  function reviewAnswers() {
    setDraft({ ...progress, showSummary: true });
  }

  function restart() {
    setDraft(EMPTY_PROGRESS);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-purple-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-black uppercase tracking-[0.15em] text-purple-800">
            {showSummary
              ? t.readiness.summaryTitle
              : formatMessage(t.readiness.progress, {
                  current: step + 1,
                  total,
                })}
          </p>
          <span className="rounded-md border border-purple-200 bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-900">
            {formatMessage(t.common.percent, { percent })}
          </span>
        </div>

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label={t.readiness.title}
          className="mt-2.5 h-2 overflow-hidden rounded bg-slate-100"
        >
          <div
            className="h-full rounded bg-purple-600 transition-[width] duration-500 motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>

        {showSummary ? (
          <div className="mt-5">
            <h2 className="text-xl font-black tracking-tight text-slate-950">
              {t.readiness.summaryTitle}
            </h2>

            <div className="mt-3 space-y-2">
              {questions.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-md border border-purple-100 bg-purple-50/20 p-3"
                >
                  <p className="text-[12px] font-semibold leading-snug text-slate-600">
                    {index + 1}. {item.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-black text-purple-950">
                    <CheckCircle2
                      aria-hidden="true"
                      className="h-4 w-4 text-purple-700"
                    />
                    {item.options[answers[index]] ?? "—"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50/60 p-4">
              <h3 className="text-sm font-black text-purple-950">
                {t.readiness.nextSteps}
              </h3>
              <ul className="mt-2 space-y-2">
                {nextSteps.map((action) => (
                  <li key={action} className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-purple-700"
                    />
                    <span className="text-[12px] font-semibold leading-relaxed text-purple-950">
                      {action}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 flex items-start gap-1.5 text-[11px] font-semibold leading-relaxed text-amber-900">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                />
                {t.readiness.summaryNote}
              </p>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link
                href="/camps"
                className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-purple-700 px-4 text-sm font-black text-white transition hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.99]"
              >
                <MapPinned aria-hidden="true" className="h-5 w-5" />
                {t.readiness.findCamp}
              </Link>
              <Link
                href="/updates"
                className="flex min-h-12 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-extrabold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 active:scale-[0.99]"
              >
                <Megaphone aria-hidden="true" className="h-5 w-5" />
                {t.readiness.checkUpdates}
              </Link>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold text-slate-500">
                {t.readiness.demo}
              </p>
              <button
                type="button"
                onClick={restart}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-xs font-extrabold text-purple-800 transition hover:bg-purple-50 hover:text-purple-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                {t.readiness.restart}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <fieldset>
              <legend className="text-xl font-black leading-snug tracking-tight text-slate-950">
                {question.title}
              </legend>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-600">
                {question.hint}
              </p>

              <div className="mt-4 grid gap-2">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectAnswer(index)}
                      aria-pressed={isSelected}
                      className={cn(
                        "flex min-h-12 touch-manipulation items-center gap-3 rounded-md border-2 px-4 text-left text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 active:scale-[0.99]",
                        isSelected
                          ? "border-purple-600 bg-purple-50 text-purple-950"
                          : "border-slate-200 bg-white text-slate-800 hover:border-purple-300 hover:bg-purple-50/40"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs font-black",
                          isSelected
                            ? "bg-purple-700 text-white"
                            : "bg-slate-100 text-slate-600"
                        )}
                      >
                        {isSelected ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => goToStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                {t.readiness.back}
              </button>
              <button
                type="button"
                disabled={selectedAnswer === undefined}
                onClick={() => {
                  if (step < total - 1) goToStep(step + 1);
                  else reviewAnswers();
                }}
                className="inline-flex min-h-12 flex-[1.35] items-center justify-center gap-1.5 rounded-md bg-purple-700 px-3 text-sm font-black text-white shadow-sm transition hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === total - 1
                  ? t.readiness.review
                  : t.readiness.next}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-3 text-center text-[11px] font-semibold text-slate-500">
              {t.readiness.demo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
