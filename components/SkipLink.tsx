"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export function SkipLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="fixed left-3 top-3 z-[100] inline-flex min-h-12 -translate-y-24 items-center rounded-xl bg-slate-950 px-4 text-sm font-extrabold text-white shadow-lg transition-transform focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 motion-reduce:transition-none"
    >
      {t.common.skipToContent}
    </a>
  );
}
