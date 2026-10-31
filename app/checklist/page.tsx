"use client";

import { DocumentsChecklist } from "@/components/DocumentsChecklist";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ChecklistPage() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader
        eyebrow={t.nav.checklist}
        title={t.checklist.title}
        subtitle={t.checklist.subtitle}
        backHref="/"
        speakText={`${t.checklist.title}. ${t.checklist.subtitle}`}
      />
      <DocumentsChecklist />
    </div>
  );
}
