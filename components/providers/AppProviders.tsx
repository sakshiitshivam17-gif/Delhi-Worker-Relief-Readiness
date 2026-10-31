"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { WorkerDataProvider } from "@/components/providers/WorkerDataProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <WorkerDataProvider>{children}</WorkerDataProvider>
    </LanguageProvider>
  );
}
