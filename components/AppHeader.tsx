"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HardHat } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { isNavActive, NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-purple-200/60 bg-white/70 shadow-[0_1px_3px_rgba(15,23,42,0.03)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-2.5 sm:px-6 md:flex-row md:items-center md:gap-3 lg:px-8">
        <Link
          href="/"
          aria-label={t.header.homeLink}
          className="flex min-h-12 w-fit items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
        >
          <span className="grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br from-purple-700 via-indigo-600 to-violet-700 text-white shadow-sm">
            <HardHat aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[17px] font-black leading-tight tracking-tight text-slate-950">
              {t.common.brand}
            </span>
            <span className="hidden text-[11px] font-semibold leading-tight text-slate-500 sm:block">
              {t.common.tagline}
            </span>
          </span>
        </Link>

        <nav
          aria-label={t.nav.ariaLabel}
          className="hidden items-center gap-1 md:ml-4 md:flex lg:ml-8 lg:gap-1.5"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isNavActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 lg:text-[13px]",
                  isActive
                    ? "bg-purple-50 text-purple-900 border border-purple-200 shadow-xs"
                    : "text-slate-600 hover:bg-purple-50/50 hover:text-purple-950"
                )}
              >
                <Icon
                  aria-hidden="true"
                  className="hidden h-4 w-4 lg:block"
                  strokeWidth={isActive ? 2.4 : 2}
                />
                {t.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="mt-2 md:ml-auto md:mt-0">
          <div className="md:hidden">
            <LanguageSelector />
          </div>
          <div className="hidden md:block">
            <LanguageSelector compact />
          </div>
        </div>
      </div>
    </header>
  );
}
