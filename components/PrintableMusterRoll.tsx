"use client";

import {
  useEffect,
  useId,
  useMemo,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { FileDown, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type {
  Language,
  WorkdayEntry,
  WorkdayTotals,
} from "@/lib/types";
import { cn, formatDate, todayIso } from "@/lib/utils";

interface PrintableMusterRollProps {
  open: boolean;
  entries: WorkdayEntry[];
  totals: WorkdayTotals;
  language: Language;
  onClose: () => void;
}

const STATUS_LABELS: Record<WorkdayEntry["status"], string> = {
  confirmed: "Confirmed",
  pending: "Waiting Verification",
  reported: "Reported",
  correction: "Needs Correction",
};

const STATUS_STYLES: Record<WorkdayEntry["status"], string> = {
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-900",
  pending: "border-amber-200 bg-amber-50 text-amber-900",
  reported: "border-purple-200 bg-purple-50 text-purple-900",
  correction: "border-rose-200 bg-rose-50 text-rose-900",
};

export function PrintableMusterRoll({
  open,
  entries,
  totals,
  language,
  onClose,
}: PrintableMusterRollProps) {
  const { t } = useLanguage();
  const titleId = useId();

  const sortedEntries = useMemo(
    () =>
      [...entries].sort((a, b) => a.from.localeCompare(b.from)),
    [entries]
  );
  const totalDays = useMemo(
    () => sortedEntries.reduce((sum, entry) => sum + entry.days, 0),
    [sortedEntries]
  );

  const isTargetMet = totals.confirmed >= totals.target;
  const remaining = Math.max(totals.target - totals.confirmed, 0);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open || typeof document === "undefined") return null;

  const generatedOn = formatDate(todayIso(), language);

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return createPortal(
    <div
      className="muster-roll-portal fixed inset-0 z-[100] overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="muster-roll-shell mx-auto flex w-full max-w-4xl flex-col gap-3"
      >
        <div className="no-print flex flex-wrap items-center justify-between gap-2 rounded-md border border-cyan-200 bg-[#ecfeff] p-2.5 shadow-lg">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-sm font-black tracking-tight text-slate-950"
            >
              {t.workdays.printPdf}
            </h2>
            <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
              A4 · DBOCWWB
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-11 touch-manipulation items-center gap-2 rounded-md bg-gradient-to-r from-cyan-600 to-purple-600 px-3.5 text-xs font-bold text-white shadow-sm transition hover:from-cyan-700 hover:to-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.98]"
            >
              <FileDown aria-hidden="true" className="h-4 w-4" />
              {t.workdays.printPdf}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.common.close}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-cyan-200 bg-white text-cyan-900 shadow-xs transition hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 active:scale-95"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <article className="muster-roll-sheet rounded-lg border border-slate-300 bg-white p-5 text-slate-900 shadow-2xl sm:p-8 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <header className="border-b-2 border-slate-900 pb-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Government of NCT of Delhi
            </p>
            <h1 className="mt-1 text-[13px] font-black uppercase leading-snug text-slate-950 sm:text-base">
              Delhi Building & Other Construction Workers Welfare Board
              (DBOCWWB)
            </h1>
            <p className="mt-1.5 text-[17px] font-black leading-tight text-slate-950">
              Muster Roll & 90-Day Work Verification Slip
            </p>
            <p className="mt-1 text-[10px] font-semibold text-slate-500">
              Generated on {generatedOn} · Worker Saathi
            </p>
          </header>

          <section className="mt-4 grid gap-2 text-[11px] sm:grid-cols-2">
            <p className="flex items-end gap-1.5">
              <span className="font-bold text-slate-800">Worker Name:</span>
              <span className="h-4 flex-1 border-b border-dashed border-slate-400" />
            </p>
            <p className="flex items-end gap-1.5">
              <span className="font-bold text-slate-800">Mobile No.:</span>
              <span className="h-4 flex-1 border-b border-dashed border-slate-400" />
            </p>
            <p className="flex items-end gap-1.5">
              <span className="font-bold text-slate-800">
                DBOCWWB Reg. No.:
              </span>
              <span className="h-4 flex-1 border-b border-dashed border-slate-400" />
            </p>
            <p className="flex items-end gap-1.5">
              <span className="font-bold text-slate-800">Work Location:</span>
              <span className="h-4 flex-1 border-b border-dashed border-slate-400" />
            </p>
          </section>

          <section className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md border border-slate-300 bg-slate-50 p-2.5">
              <p className="text-[9px] font-black uppercase tracking-wide text-slate-500">
                Confirmed Days
              </p>
              <p className="mt-0.5 text-xl font-black leading-none text-slate-950">
                {totals.confirmed}
              </p>
            </div>
            <div className="rounded-md border border-slate-300 bg-slate-50 p-2.5">
              <p className="text-[9px] font-black uppercase tracking-wide text-slate-500">
                Target Days
              </p>
              <p className="mt-0.5 text-xl font-black leading-none text-slate-950">
                {totals.target}
              </p>
            </div>
            <div
              className={cn(
                "rounded-md border p-2.5",
                isTargetMet
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-amber-300 bg-amber-50"
              )}
            >
              <p className="text-[9px] font-black uppercase tracking-wide text-slate-500">
                Verification Eligibility
              </p>
              <p
                className={cn(
                  "mt-0.5 text-sm font-black leading-tight",
                  isTargetMet ? "text-emerald-900" : "text-amber-900"
                )}
              >
                {isTargetMet ? "Target met" : `${remaining} days short`}
              </p>
            </div>
          </section>

          <section className="mt-5">
            <h2 className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-700">
              Workday Entries
            </h2>
            <div className="mt-1.5 overflow-hidden rounded-md border border-slate-300">
              <table className="muster-roll-table w-full border-collapse text-left text-[10px]">
                <thead className="bg-slate-100 text-[8px] font-black uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="border border-slate-300 px-2 py-1.5 text-center">
                      #
                    </th>
                    <th className="border border-slate-300 px-2 py-1.5">
                      Worksite Name
                    </th>
                    <th className="border border-slate-300 px-2 py-1.5">
                      Trade / Work Type
                    </th>
                    <th className="border border-slate-300 px-2 py-1.5">
                      Date Range
                    </th>
                    <th className="border border-slate-300 px-2 py-1.5 text-center">
                      Days
                    </th>
                    <th className="border border-slate-300 px-2 py-1.5">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEntries.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="border border-slate-300 px-2 py-4 text-center font-semibold text-slate-500"
                      >
                        No workday entries recorded.
                      </td>
                    </tr>
                  ) : (
                    sortedEntries.map((entry, index) => (
                      <tr key={entry.id} className="align-top">
                        <td className="border border-slate-300 px-2 py-1.5 text-center font-bold">
                          {index + 1}
                        </td>
                        <td className="border border-slate-300 px-2 py-1.5 font-semibold">
                          {entry.worksite}
                        </td>
                        <td className="border border-slate-300 px-2 py-1.5">
                          {entry.workType}
                        </td>
                        <td className="border border-slate-300 px-2 py-1.5 whitespace-nowrap">
                          {formatDate(entry.from, language)} –{" "}
                          {formatDate(entry.to, language)}
                        </td>
                        <td className="border border-slate-300 px-2 py-1.5 text-center font-bold">
                          {entry.days}
                        </td>
                        <td className="border border-slate-300 px-2 py-1.5">
                          <span
                            className={cn(
                              "inline-flex rounded-sm border px-1.5 py-0.5 text-[8px] font-bold",
                              STATUS_STYLES[entry.status]
                            )}
                          >
                            {STATUS_LABELS[entry.status]}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 font-bold">
                    <td
                      colSpan={4}
                      className="border border-slate-300 px-2 py-1.5 text-right"
                    >
                      Total days in this slip
                    </td>
                    <td className="border border-slate-300 px-2 py-1.5 text-center">
                      {totalDays}
                    </td>
                    <td className="border border-slate-300 px-2 py-1.5" />
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>

          <section className="muster-roll-signatures mt-5 border-t border-slate-300 pt-3 text-[10px] leading-relaxed text-slate-700">
            <h2 className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-700">
              Worker Self-Declaration
            </h2>
            <p className="mt-1">
              I declare that the workday details listed above are true and
              correct to the best of my knowledge. I understand that this slip
              is a self-declaration generated from Worker Saathi and is not an
              official DBOCWWB certificate. Final verification is subject to
              official records.
            </p>
          </section>

          <section className="muster-roll-signatures mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex min-h-24 flex-col justify-between rounded-md border border-slate-400 p-3 text-[10px] font-semibold">
              <p>
                Signature / Thumb Impression of Construction Worker
              </p>
              <p className="text-[9px] font-medium text-slate-500">
                Date: ____________________
              </p>
            </div>
            <div className="flex min-h-24 flex-col justify-between rounded-md border border-slate-400 p-3 text-[10px] font-semibold">
              <p>
                Signature & Official Stamp of Contractor / Employer / Trade
                Union Representative (with Contact No.)
              </p>
              <p className="text-[9px] font-medium text-slate-500">
                Contact No.: __________________ · Date: ____________
              </p>
            </div>
          </section>

          <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-300 pt-2 text-[8px] font-semibold text-slate-500">
            <span>
              Generated by Worker Saathi · Delhi Worker Relief Readiness
            </span>
            <span>
              Self-declaration only · Not an official government document
            </span>
          </footer>
        </article>
      </div>
    </div>,
    document.body
  );
}
