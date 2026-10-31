"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SpeakButton } from "@/components/SpeakButton";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  speakText?: string;
  backHref?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  speakText,
  backHref,
  children,
}: PageHeaderProps) {
  const { t } = useLanguage();
  const textToSpeak = speakText ?? [title, subtitle].filter(Boolean).join(". ");

  return (
    <header className="mb-5">
      {backHref ? (
        <Link
          href={backHref}
          className="mb-2 inline-flex min-h-10 items-center gap-1.5 rounded-md pr-3 text-xs font-bold text-slate-600 transition hover:text-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {t.common.back}
        </Link>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="mb-1 text-[11px] font-black uppercase tracking-[0.16em] text-purple-700">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-balance text-[24px] font-black leading-[1.12] tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h1>
        </div>
        <SpeakButton text={textToSpeak} className="mt-0.5" />
      </div>

      {subtitle ? (
        <p className="mt-1.5 max-w-prose text-[14px] font-medium leading-relaxed text-slate-600">
          {subtitle}
        </p>
      ) : null}

      {children}
    </header>
  );
}
