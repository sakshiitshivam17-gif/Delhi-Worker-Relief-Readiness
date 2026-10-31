import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionTone = "purple" | "teal" | "leaf" | "sky" | "amber" | "rose";

interface ActionTileProps {
  href: string;
  title: string;
  description: string;
  meta: string;
  icon: LucideIcon;
  tone: ActionTone;
}

const toneStyles: Record<
  ActionTone,
  { card: string; icon: string; meta: string; arrow: string }
> = {
  purple: {
    card: "border-purple-200/90 bg-gradient-to-br from-purple-50/60 to-white hover:border-purple-300",
    icon: "bg-purple-700 text-white shadow-xs",
    meta: "bg-purple-100 text-purple-900",
    arrow: "text-purple-700",
  },
  teal: {
    card: "border-teal-200/80 bg-gradient-to-br from-teal-50/60 to-white hover:border-teal-300",
    icon: "bg-teal-700 text-white shadow-xs",
    meta: "bg-teal-100 text-teal-900",
    arrow: "text-teal-700",
  },
  leaf: {
    card: "border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 to-white hover:border-emerald-300",
    icon: "bg-emerald-700 text-white shadow-xs",
    meta: "bg-emerald-100 text-emerald-900",
    arrow: "text-emerald-700",
  },
  sky: {
    card: "border-sky-200/80 bg-gradient-to-br from-sky-50/60 to-white hover:border-sky-300",
    icon: "bg-sky-700 text-white shadow-xs",
    meta: "bg-sky-100 text-sky-900",
    arrow: "text-sky-700",
  },
  amber: {
    card: "border-amber-200/80 bg-gradient-to-br from-amber-50/60 to-white hover:border-amber-300",
    icon: "bg-amber-500 text-amber-950 shadow-xs",
    meta: "bg-amber-100 text-amber-900",
    arrow: "text-amber-700",
  },
  rose: {
    card: "border-rose-200/80 bg-gradient-to-br from-rose-50/60 to-white hover:border-rose-300",
    icon: "bg-rose-700 text-white shadow-xs",
    meta: "bg-rose-100 text-rose-900",
    arrow: "text-rose-700",
  },
};

export function ActionTile({
  href,
  title,
  description,
  meta,
  icon: Icon,
  tone,
}: ActionTileProps) {
  const styles = toneStyles[tone];

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-[164px] touch-manipulation flex-col rounded-lg border p-4 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.99]",
        styles.card
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          aria-hidden="true"
          className={cn(
            "grid h-11 w-11 place-items-center rounded-md transition duration-150 group-hover:scale-105",
            styles.icon
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            "h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            styles.arrow
          )}
        />
      </div>

      <h3 className="mt-3 text-[16px] font-black leading-tight tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-1 text-[13px] font-medium leading-snug text-slate-600">
        {description}
      </p>

      <span
        className={cn(
          "mt-auto inline-flex w-fit items-center gap-1.5 rounded px-2 py-1 text-[11px] font-bold",
          styles.meta
        )}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-current opacity-70"
        />
        {meta}
      </span>
    </Link>
  );
}
