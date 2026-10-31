import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope, Noto_Sans_Devanagari } from "next/font/google";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { SkipLink } from "@/components/SkipLink";
import { WorkerChatbot } from "@/components/WorkerChatbot";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Worker Saathi | Delhi worker relief readiness",
    template: "%s | Worker Saathi",
  },
  description:
    "A simple step-by-step guide for Delhi construction workers to track workdays, organise documents, find relief camps and check GRAP and DBOCWWB updates.",
  applicationName: "Worker Saathi",
  keywords: [
    "Delhi construction workers",
    "DBOCWWB",
    "GRAP relief",
    "worker relief",
    "Shramik helpline",
  ],
  openGraph: {
    title: "Worker Saathi | Delhi worker relief readiness",
    description:
      "Track workdays, prepare documents and find verified relief help points in Delhi.",
    type: "website",
    locale: "en_IN",
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ede9fe",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoDevanagari.variable}`}
    >
      <body className="min-h-dvh bg-canvas text-ink antialiased">
        <AppProviders>
          <SkipLink />
          <AppHeader />
          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto w-full max-w-6xl px-4 pb-24 pt-5 outline-none sm:px-6 sm:pt-6 md:pb-12 lg:px-8 lg:pt-8"
          >
            {children}
          </main>
          <BottomNav />
          <WorkerChatbot />
        </AppProviders>
      </body>
    </html>
  );
}
