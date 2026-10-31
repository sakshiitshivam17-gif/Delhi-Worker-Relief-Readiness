"use client";

import { CampFinder } from "@/components/CampFinder";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function CampsPage() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader
        eyebrow={t.nav.camps}
        title={t.camps.title}
        subtitle={t.camps.subtitle}
        backHref="/"
        speakText={`${t.camps.title}. ${t.camps.subtitle}`}
      />
      <CampFinder />
    </div>
  );
}
