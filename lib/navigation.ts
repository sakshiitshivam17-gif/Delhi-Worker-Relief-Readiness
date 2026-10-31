import {
  CalendarCheck2,
  ClipboardList,
  Home,
  MapPinned,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import type { NavKey } from "@/lib/types";

export interface NavItem {
  key: NavKey;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/", icon: Home },
  { key: "workdays", href: "/workdays", icon: CalendarCheck2 },
  { key: "checklist", href: "/checklist", icon: ClipboardList },
  { key: "camps", href: "/camps", icon: MapPinned },
  { key: "updates", href: "/updates", icon: Megaphone },
];

export function isNavActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
