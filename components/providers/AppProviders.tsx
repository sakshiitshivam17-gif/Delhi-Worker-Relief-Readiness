"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { WorkerDataProvider } from "@/components/providers/WorkerDataProvider";
import { AuthGate } from "@/components/AuthGate";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <WorkerDataProvider>
        <AuthGate>{children}</AuthGate>
      </WorkerDataProvider>
    </LanguageProvider>
  );
}