"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Hammer,
  MapPin,
  Minus,
  Plus,
} from "lucide-react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  WORKDAY_PRESETS,
  WORK_TYPE_CANONICAL,
  WORK_TYPE_OPTIONS,
} from "@/lib/data";
import type { WorkTypeKey, WorkdayInput } from "@/lib/types";
import { addDaysIso, cn, formatDate, todayIso } from "@/lib/utils";

interface QuickEntryDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: WorkdayInput) => void;
}

const PRESET_KEYS: Record<string, keyof ReturnType<typeof usePresetCopy>> = {
  okhla: "okhla",
  "anand-vihar": "anandVihar",
  dwarka: "dwarka",
  "karol-bagh": "karolBagh",
  ito: "ito",
  "lajpat-nagar": "lajpatNagar",
};

type PresetCopy = {
  okhla: string;
  anandVihar: string;
  dwarka: string;
  karolBagh: string;
  ito: string;
  lajpatNagar: string;
  other: string;
};

function usePresetCopy(): PresetCopy {
  const { t } = useLanguage();
  return t.quickEntry.worksites;
}

export function QuickEntryDialog({
  open,
  onClose,
  onSubmit,
}: QuickEntryDialogProps) {
  const { language, t } = useLanguage();
  const presetCopy = usePresetCopy();
  const [worksiteId, setWorksiteId] = useState("okhla");
  const [customWorksite, setCustomWorksite] = useState("");
  const [workType, setWorkType] = useState<WorkTypeKey>("masonry");
  const [customWorkType, setCustomWorkType] = useState("");
  const [date, setDate] = useState(() => (open ? todayIso() : ""));
  const [days, setDays] = useState(1);
  const [error, setError] = useState("");

  const endDate = useMemo(
    () => addDaysIso(date, Math.max(days - 1, 0)),
    [date, days]
  );

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const selectedPreset = WORKDAY_PRESETS.find(
      (preset) => preset.id === worksiteId
    );
    const worksite =
      worksiteId === "other"
        ? customWorksite.trim()
        : selectedPreset?.name ?? "";

    const worksiteLabel =
      worksiteId === "other"
        ? customWorksite.trim()
        : presetCopy[PRESET_KEYS[worksiteId] ?? "okhla"];

    if (!worksiteLabel) {
      setError(t.quickEntry.requiredSite);
      return;
    }

    if (workType === "other" && !customWorkType.trim()) {
      setError(t.quickEntry.requiredType);
      return;
    }

    const today = todayIso();
    if (!date || date > today || endDate > today) {
      setError(t.quickEntry.requiredDate);
      return;
    }

    if (!Number.isInteger(days) || days < 1 || days > 31) {
      setError(t.quickEntry.requiredDays);
      return;
    }

    onSubmit({
      from: date,
      to: endDate,
      days,
      worksite,
      workType:
        workType === "other"
          ? customWorkType.trim()
          : WORK_TYPE_CANONICAL[workType],
      workTypeKey: workType === "other" ? undefined : workType,
    });
  }

  return (
    <BottomSheet open={open} onClose={onClose} title={t.quickEntry.title}>
      <p className="-mt-1 mb-4 text-sm font-medium text-slate-600">
        {t.quickEntry.subtitle}
      </p>

      <form onSubmit={submit} className="space-y-5">
        <fieldset>
          <legend className="flex items-center gap-2 text-[15px] font-black text-slate-950">
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-md bg-cyan-100 text-cyan-800"
            >
              <MapPin className="h-4 w-4" />
            </span>
            {t.quickEntry.worksite}
          </legend>
          <p className="ml-10 mt-0.5 text-xs font-semibold text-slate-500">
            {t.quickEntry.worksiteHint}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {WORKDAY_PRESETS.map((preset) => {
              const copyKey = PRESET_KEYS[preset.id] ?? "okhla";
              const isSelected = worksiteId === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setWorksiteId(preset.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "min-h-12 touch-manipulation rounded-md border-2 px-2 py-2 text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 active:scale-[0.98]",
                    isSelected
                      ? "border-cyan-600 bg-cyan-100 text-cyan-950"
                      : "border-cyan-200/80 bg-white/90 text-slate-700 hover:border-cyan-400 hover:bg-white"
                  )}
                >
                  {presetCopy[copyKey]}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setWorksiteId("other")}
              aria-pressed={worksiteId === "other"}
              className={cn(
                "min-h-12 touch-manipulation rounded-md border-2 px-2 py-2 text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 active:scale-[0.98]",
                worksiteId === "other"
                  ? "border-cyan-600 bg-cyan-100 text-cyan-950"
                  : "border-cyan-200/80 bg-white/90 text-slate-700 hover:border-cyan-400 hover:bg-white"
              )}
            >
              {presetCopy.other}
            </button>
          </div>

          {worksiteId === "other" ? (
            <label className="mt-3 block">
              <span className="text-xs font-extrabold text-slate-700">
                {t.quickEntry.customWorksite}
              </span>
              <input
                value={customWorksite}
                onChange={(event) => setCustomWorksite(event.target.value)}
                placeholder={t.quickEntry.customWorksitePlaceholder}
                autoComplete="off"
                className="mt-1.5 min-h-12 w-full rounded-md border border-cyan-200 bg-white/95 px-3 text-base font-semibold outline-none transition placeholder:font-normal focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              />
            </label>
          ) : null}
        </fieldset>

        <fieldset>
          <legend className="flex items-center gap-2 text-[15px] font-black text-slate-950">
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-md bg-cyan-100 text-cyan-800"
            >
              <Hammer className="h-4 w-4" />
            </span>
            {t.quickEntry.workType}
          </legend>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {WORK_TYPE_OPTIONS.map((option) => {
              const isSelected = workType === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setWorkType(option)}
                  aria-pressed={isSelected}
                  className={cn(
                    "min-h-12 touch-manipulation rounded-md border-2 px-2 py-2 text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 active:scale-[0.98]",
                    isSelected
                      ? "border-cyan-600 bg-cyan-100 text-cyan-950"
                      : "border-cyan-200/80 bg-white/90 text-slate-700 hover:border-cyan-400 hover:bg-white"
                  )}
                >
                  {t.quickEntry.workTypes[option]}
                </button>
              );
            })}
          </div>

          {workType === "other" ? (
            <label className="mt-3 block">
              <span className="text-xs font-extrabold text-slate-700">
                {t.quickEntry.customWorkType}
              </span>
              <input
                value={customWorkType}
                onChange={(event) => setCustomWorkType(event.target.value)}
                placeholder={t.quickEntry.customWorkTypePlaceholder}
                autoComplete="off"
                className="mt-1.5 min-h-12 w-full rounded-md border border-cyan-200 bg-white/95 px-3 text-base font-semibold outline-none transition placeholder:font-normal focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              />
            </label>
          ) : null}
        </fieldset>

        <div className="grid gap-4 rounded-lg border border-cyan-200 bg-cyan-50/70 p-4 sm:grid-cols-2">
          <label className="block">
            <span className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700">
              <CalendarDays aria-hidden="true" className="h-4 w-4 text-cyan-700" />
              {t.quickEntry.date}
            </span>
            <input
              type="date"
              value={date}
              max={open ? todayIso() : undefined}
              onChange={(event) => setDate(event.target.value)}
              className="mt-1.5 min-h-12 w-full rounded-md border border-cyan-200 bg-white/95 px-3 text-base font-semibold outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              required
            />
          </label>

          <div>
            <p className="text-xs font-extrabold text-slate-700">
              {t.quickEntry.days}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDays((value) => Math.max(1, value - 1))}
                disabled={days <= 1}
                aria-label={t.quickEntry.decreaseDays}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-cyan-200/90 bg-white/90 text-slate-800 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 active:scale-95 disabled:opacity-40"
              >
                <Minus aria-hidden="true" className="h-5 w-5" />
              </button>
              <p
                aria-live="polite"
                className="min-w-0 flex-1 rounded-md border border-cyan-200 bg-white/95 px-2 py-2 text-center shadow-xs"
              >
                <span className="block text-2xl font-black leading-none text-slate-950">
                  {days}
                </span>
                <span className="mt-0.5 block text-[10px] font-bold text-slate-600">
                  {t.common.days}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setDays((value) => Math.min(31, value + 1))}
                disabled={days >= 31}
                aria-label={t.quickEntry.increaseDays}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-cyan-200/90 bg-white/90 text-slate-800 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 active:scale-95 disabled:opacity-40"
              >
                <Plus aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            {days > 1 ? (
              <p className="mt-1.5 text-right text-[11px] font-bold text-slate-600">
                {t.quickEntry.endDate.replace(
                  "{date}",
                  formatDate(endDate, language)
                )}
              </p>
            ) : null}
          </div>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-md bg-rose-50 px-3 py-2.5 text-sm font-bold text-rose-900"
          >
            {error}
          </p>
        ) : null}

        <p className="rounded-md border border-cyan-200 bg-cyan-100/60 px-3 py-2.5 text-xs font-semibold leading-relaxed text-cyan-950">
          {t.quickEntry.note}
        </p>

        <div className="flex gap-2 pb-1">
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 flex-1 rounded-md border border-cyan-200/90 bg-white/90 px-4 text-sm font-extrabold text-slate-800 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 active:scale-[0.98]"
          >
            {t.common.cancel}
          </button>
          <button
            type="submit"
            className="min-h-12 flex-[1.4] rounded-md bg-gradient-to-r from-cyan-600 to-purple-600 px-4 text-sm font-black text-white shadow-sm transition hover:from-cyan-700 hover:to-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 active:scale-[0.98]"
          >
            {t.quickEntry.save}
          </button>
        </div>
      </form>
    </BottomSheet>
  );
}
