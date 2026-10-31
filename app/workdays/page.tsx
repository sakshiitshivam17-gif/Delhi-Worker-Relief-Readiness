"use client";

import { PageHeader } from "@/components/PageHeader";
import { WorkdaysTracker } from "@/components/WorkdaysTracker";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function WorkdaysPage() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader
        eyebrow={t.nav.workdays}
        title={t.workdays.title}
        subtitle={t.workdays.subtitle}
        backHref="/"
        speakText={`${t.workdays.title}. ${t.workdays.subtitle}`}
      />
      <WorkdaysTracker />
    </div>
  );
}
