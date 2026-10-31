"use client";

import { PageHeader } from "@/components/PageHeader";
import { ReadinessFlow } from "@/components/ReadinessFlow";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ReadinessPage() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader
        eyebrow={t.home.actions.readiness.title}
        title={t.readiness.title}
        subtitle={t.readiness.subtitle}
        backHref="/"
        speakText={`${t.readiness.title}. ${t.readiness.subtitle}`}
      />
      <ReadinessFlow />
    </div>
  );
}
