"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { isNavActive, NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav
      aria-label={t.nav.ariaLabel}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-purple-200/80 bg-white/80 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(30,27,75,0.06)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5 px-1 py-1">
        {NAV_ITEMS.map((item) => {
          const isActive = isNavActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex min-h-[56px] touch-manipulation flex-col items-center justify-center gap-1 rounded-md px-1 py-1 text-[10px] font-bold leading-none transition focus-visible:outline-2 focus-visible:outline-purple-700 active:scale-95 sm:text-[11px]",
                isActive
                  ? "text-purple-900 bg-purple-50/70"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                className="h-5 w-5"
                strokeWidth={isActive ? 2.4 : 2}
              />
              <span>{t.nav[item.key]}</span>
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 h-0.5 w-6 bg-purple-700"
                />
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
