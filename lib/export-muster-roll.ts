"use client";

import type { WorkdayEntry, WorkdayTotals, Language } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const STATUS_LABELS: Record<WorkdayEntry["status"], string> = {
  confirmed: "Confirmed",
  pending: "Waiting Verification",
  reported: "Reported",
  correction: "Needs Correction",
};

export function generateWhatsAppMusterRoll({
  entries,
  totals,
  language,
}: {
  entries: WorkdayEntry[];
  totals: WorkdayTotals;
  language: Language;
}): string {
  const isTargetMet = totals.confirmed >= totals.target;
  const statusEmoji = isTargetMet ? "✅" : "⏳";
  const percent =
    totals.target > 0
      ? Math.round((totals.confirmed / totals.target) * 100)
      : 0;

  let message = `📋 *WORKER SAATHI - DELHI SHRAMIK MUSTER ROLL RECORD*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🎯 *Goal Status:* ${statusEmoji} ${totals.confirmed}/${totals.target} Days Confirmed (${percent}%)\n`;
  message += `📊 *Total Logged:* ${totals.confirmed + totals.awaiting} Days\n\n`;

  message += `*Work History (Last 12 Months):*\n`;

  if (entries.length === 0) {
    message += `(No workday entries logged yet)\n`;
  } else {
    entries.forEach((entry, idx) => {
      const dates = `${formatDate(entry.from, language)} - ${formatDate(entry.to, language)}`;
      const statusText = STATUS_LABELS[entry.status];
      message += `${idx + 1}. *${entry.worksite}* (${entry.workType})\n`;
      message += `   📅 ${dates} | *${entry.days} Days* [${statusText}]\n`;
    });
  }

  message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📌 *Self-declaration for DBOCWWB 90-Day Requirement*\n`;
  message += `🔗 Generated on Worker Saathi (Delhi Worker Relief Readiness)\n`;

  return message;
}

export function openWhatsAppMusterRoll(options: {
  entries: WorkdayEntry[];
  totals: WorkdayTotals;
  language: Language;
}) {
  if (typeof window === "undefined") return;

  const text = generateWhatsAppMusterRoll(options);
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
