"use client";

import { GrapUpdates } from "@/components/GrapUpdates";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function UpdatesPage() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader
        eyebrow={t.nav.updates}
        title={t.updates.title}
        subtitle={t.updates.subtitle}
        backHref="/"
        speakText={`${t.updates.title}. ${t.updates.subtitle}`}
      />
      <GrapUpdates />
    </div>
  );
}
