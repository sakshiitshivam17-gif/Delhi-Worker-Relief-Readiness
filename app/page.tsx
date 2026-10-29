
"use client";

import { useEffect, useState } from "react";

type Language = "en" | "hinglish" | "hi";
type ActionKey =
  | "readiness"
  | "workdays"
  | "documents"
  | "updates"
  | "camps";

const text = {
  en: {
    lang: "Choose language",
    brand: "Worker Saathi",
    subtitle: "Delhi GRAP Relief Readiness",
    badge: "GRAP RELIEF READINESS",
    headline: "Your work. Your rights. Your next step.",
    intro:
      "Get organised before you need help. Track your workdays, check your documents and understand the next steps for relief readiness.",
    primary: "Check ₹10,000 relief readiness",
    secondary: "Explore services",
    alertTitle: "GRAP NOTICE TRACKER",
    status: "Official status not verified",
    alertBody:
      "Check the latest official notice before relying on any relief announcement.",
    lastChecked: "Last verified",
    notChecked: "Awaiting official verification",
    moneyTitle: "₹10,000 relief readiness",
    moneyBody:
      "Past announcements have mentioned ₹10,000 assistance. This demo does not confirm that the benefit is currently active or that anyone qualifies.",
    checkNotice: "Review notice status",
    services: "How can we help you?",
    serviceIntro: "Choose what you need help with.",
    actions: {
      readiness: {
        icon: "✓",
        title: "Relief readiness",
        desc: "Check your registration, workday records and missing information.",
      },
      workdays: {
        icon: "▦",
        title: "Track workdays",
        desc: "Record your work and see which days are confirmed.",
      },
      documents: {
        icon: "▤",
        title: "Documents checklist",
        desc: "Know which supporting documents you still need to organise.",
      },
      updates: {
        icon: "◉",
        title: "GRAP updates",
        desc: "Review official notices and the date they were checked.",
      },
      camps: {
        icon: "⌖",
        title: "Find worker support",
        desc: "Search for help camps and support services in your area.",
      },
    },
    detailTitle: {
      readiness: "Your relief readiness journey",
      workdays: "Your workday record",
      documents: "Your document checklist",
      updates: "GRAP and relief updates",
    },
    detailBody: {
      readiness:
        "Start with the information you have. The app will help organise missing items; it will not make an official eligibility decision.",
      workdays:
        "Keep worker-reported days separate from days confirmed by a verifier. Demo records are examples, not real work history.",
      documents:
        "Organise registration information and available work evidence. The exact accepted documents must be confirmed against current official requirements.",
      updates:
        "Official GRAP stage, effective date, relief rules and source links must be checked before an alert is presented as current.",
    },
    steps: ["Registration information", "Workday evidence", "Documents to review", "Official verification"],
    next: "This section is our next build step.",
    close: "Close",
    footer:
      "A preparation and tracking tool — not a government portal.",
    disclaimer:
      "Relief is not guaranteed. Eligibility, current scheme status and payment decisions rest with the relevant government authority.",
  },
  hinglish: {
    lang: "Apni language chunein",
    brand: "Worker Saathi",
    subtitle: "Delhi GRAP Relief Readiness",
    badge: "GRAP RELIEF KI TAIYARI",
    headline: "Aapka kaam. Aapke adhikar. Agla kadam.",
    intro:
      "Zaroorat padne se pehle taiyar raho. Apne workdays track karo, documents check karo aur relief ke liye agla step samjho.",
    primary: "₹10,000 relief readiness check karo",
    secondary: "Saari services dekho",
    alertTitle: "GRAP NOTICE TRACKER",
    status: "Official status verify nahi hua",
    alertBody:
      "Kisi bhi relief announcement par bharosa karne se pehle latest official notice check karo.",
    lastChecked: "Aakhri verification",
    notChecked: "Official verification baaki hai",
    moneyTitle: "₹10,000 relief ki taiyari",
    moneyBody:
      "Pehle ki announcements mein ₹10,000 assistance ka zikr tha. Yeh demo confirm nahi karta ki benefit abhi active hai ya aap eligible ho.",
    checkNotice: "Notice status check karo",
    services: "Aapko kis cheez mein help chahiye?",
    serviceIntro: "Apni zaroorat ke hisaab se option chuno.",
    actions: {
      readiness: {
        icon: "✓",
        title: "Relief readiness",
        desc: "Registration, workdays aur baaki information check karo.",
      },
      workdays: {
        icon: "▦",
        title: "Workdays track karo",
        desc: "Kaam ke din record karo aur dekho kin dinon ki confirmation hui.",
      },
      documents: {
        icon: "▤",
        title: "Documents ki list",
        desc: "Dekho kaunse documents organise karne baaki hain.",
      },
      updates: {
        icon: "◉",
        title: "GRAP updates",
        desc: "Official notices aur last verification date dekho.",
      },

      camps: {
        icon: "⌖",
        title: "Worker support dhoondo",
        desc: "Apne area mein help camps aur support services search karo.",
      },
    },
    detailTitle: {
      readiness: "Relief readiness ke steps",
      workdays: "Aapka workday record",
      documents: "Aapki document checklist",
      updates: "GRAP aur relief updates",
    },
    detailBody: {
      readiness:
        "Jo information aapke paas hai, usse shuru karo. App missing items organise karne mein help karega, official eligibility decide nahi karega.",
      workdays:
        "Khud report kiye gaye days aur verifier-confirmed days alag rakhenge. Demo records sirf examples hain.",
      documents:
        "Registration details aur kaam ke available proof organise karo. Accepted documents ki latest official requirements verify karni hongi.",
      updates:
        "GRAP stage, effective date, relief rules aur source link verify hone ke baad hi update ko current bataya jayega.",
    },
    steps: ["Registration details", "Workday proof", "Documents check", "Official verification"],
    next: "Yeh section hum agle step mein banayenge.",
    close: "Band karo",
    footer: "Taiyari aur tracking ka tool — government portal nahi.",
    disclaimer:
      "Relief ki guarantee nahi hai. Eligibility, scheme ka current status aur payment ka decision relevant government authority karegi.",
  },
  hi: {
    lang: "अपनी भाषा चुनें",
    brand: "वर्कर साथी",
    subtitle: "दिल्ली GRAP सहायता तैयारी",
    badge: "GRAP सहायता की तैयारी",
    headline: "आपका काम। आपके अधिकार। अगला कदम।",
    intro:
      "ज़रूरत पड़ने से पहले तैयारी करें। अपने कार्यदिवस दर्ज करें, दस्तावेज़ जाँचें और सहायता के अगले कदम समझें।",
    primary: "₹10,000 सहायता की तैयारी जाँचें",
    secondary: "सभी सेवाएँ देखें",
    alertTitle: "GRAP सूचना ट्रैकर",
    status: "आधिकारिक स्थिति सत्यापित नहीं",
    alertBody:
      "किसी भी सहायता घोषणा पर निर्भर करने से पहले नवीनतम आधिकारिक सूचना जाँचें।",
    lastChecked: "अंतिम सत्यापन",
    notChecked: "आधिकारिक सत्यापन बाकी है",
    moneyTitle: "₹10,000 सहायता की तैयारी",
    moneyBody:
      "पहले की घोषणाओं में ₹10,000 सहायता का उल्लेख था। यह डेमो इसकी वर्तमान उपलब्धता या आपकी पात्रता की पुष्टि नहीं करता।",
    checkNotice: "सूचना की स्थिति जाँचें",
    services: "आपको किस चीज़ में मदद चाहिए?",
    serviceIntro: "अपनी ज़रूरत के अनुसार विकल्प चुनें।",
    actions: {
      readiness: {
        icon: "✓",
        title: "सहायता की तैयारी",
        desc: "पंजीकरण, कार्यदिवस और बाकी जानकारी जाँचें।",
      },
      workdays: {
        icon: "▦",
        title: "कार्यदिवस ट्रैक करें",
        desc: "काम के दिन दर्ज करें और पुष्टि की स्थिति देखें।",
      },
      documents: {
        icon: "▤",
        title: "दस्तावेज़ों की सूची",
        desc: "जानें कि कौनसे दस्तावेज़ व्यवस्थित करने बाकी हैं।",
      },
      updates: {
        icon: "◉",
        title: "GRAP अपडेट",
        desc: "आधिकारिक सूचनाएँ और सत्यापन की तारीख देखें।",
      },

      camps: {
        icon: "⌖",
        title: "श्रमिक सहायता खोजें",
        desc: "अपने क्षेत्र में सहायता शिविर और सेवाएँ खोजें।",
      },
    },
    detailTitle: {
      readiness: "सहायता की तैयारी के चरण",
      workdays: "आपका कार्यदिवस रिकॉर्ड",
      documents: "आपकी दस्तावेज़ चेकलिस्ट",
      updates: "GRAP और सहायता अपडेट",
    },
    detailBody: {
      readiness:
        "उपलब्ध जानकारी से शुरुआत करें। ऐप बाकी जानकारी व्यवस्थित करने में मदद करेगा, आधिकारिक पात्रता तय नहीं करेगा।",
      workdays:
        "श्रमिक द्वारा दर्ज दिनों और सत्यापनकर्ता द्वारा पुष्टि किए गए दिनों को अलग रखा जाएगा। डेमो रिकॉर्ड केवल उदाहरण हैं।",
      documents:
        "पंजीकरण की जानकारी और काम के उपलब्ध प्रमाण व्यवस्थित करें। स्वीकार्य दस्तावेज़ों की आधिकारिक शर्तें जाँचना ज़रूरी है।",
      updates:
        "GRAP चरण, लागू होने की तारीख, सहायता नियम और स्रोत को सत्यापित करने के बाद ही अपडेट को वर्तमान बताया जाएगा।",
    },
    steps: ["पंजीकरण की जानकारी", "कार्यदिवस का प्रमाण", "दस्तावेज़ों की जाँच", "आधिकारिक सत्यापन"],
    next: "यह भाग हम अगले चरण में बनाएँगे।",
    close: "बंद करें",
    footer: "तैयारी और रिकॉर्ड रखने का टूल — सरकारी पोर्टल नहीं।",
    disclaimer:
      "सहायता की गारंटी नहीं है। पात्रता, योजना की वर्तमान स्थिति और भुगतान का निर्णय संबंधित सरकारी प्राधिकरण करेगा।",
  },
};

const actionKeys: ActionKey[] = [
  "readiness",
  "workdays",
  "documents",
  "updates",
  "camps",
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [active, setActive] = useState<ActionKey | null>(null);
  const [showConsent, setShowConsent] = useState(false);
  const t = text[language];

  function openSection(key: ActionKey) {
  if (key === "readiness") {
    setActive(null);
    setShowConsent(true);

    window.setTimeout(() => {
      document.getElementById("consent-panel")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);

    return;
  }

  setShowConsent(false);
  setActive(key);

  window.setTimeout(() => {
    document.getElementById("section-details")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 80);
}

  return (
    <main className="min-h-screen bg-[#f3f6fa] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-blue-800 text-2xl text-white shadow-lg">
              🦺
            </div>
            <div>
              <h1 className="text-lg font-extrabold">{t.brand}</h1>
              <p className="text-xs text-slate-500">{t.subtitle}</p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-slate-500">
              {t.lang}
            </p>
            <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
              {([
                ["en", "English"],
                ["hinglish", "Hinglish"],
                ["hi", "हिंदी"],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setLanguage(key)}
                  aria-pressed={language === key}
                  className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                    language === key
                      ? "bg-white text-teal-800 shadow-sm"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-7 sm:py-10 lg:px-8">
        <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#102b4b] via-[#15536b] to-[#087d7a] p-6 text-white shadow-xl sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full border-[32px] border-white/5" />
          <div className="relative grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-teal-200/30 bg-white/10 px-3 py-2 text-xs font-bold tracking-wider text-teal-100">
                {t.badge}
              </span>
              <h2 className="mt-6 max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {t.headline}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-blue-50 sm:text-base">
                {t.intro}
              </p>
              <button
                onClick={() => openSection("readiness")}
                className="mt-7 w-full rounded-xl bg-emerald-400 px-5 py-4 text-base font-extrabold text-[#082d3b] shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-300 sm:w-auto"
              >
                {t.primary} <span aria-hidden="true">→</span>
              </button>
              <p className="mt-4 text-xs leading-5 text-blue-100/80">
                {t.disclaimer}
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-400/15 text-2xl">
                    ⚠
                  </div>
                  <div>
                    <p className="text-xs font-extrabold tracking-wider text-teal-100">
                      {t.alertTitle}
                    </p>
                    <h3 className="mt-2 text-lg font-extrabold">{t.status}</h3>
                    <p className="mt-2 text-sm leading-6 text-blue-50">
                      {t.alertBody}
                    </p>
                  </div>
                </div>
                <div className="mt-5 rounded-xl bg-slate-950/20 p-4">
                  <p className="text-xs text-blue-100">{t.lastChecked}</p>
                  <p className="mt-1 text-sm font-bold">{t.notChecked}</p>
                  <button
                    onClick={() => openSection("updates")}
                    className="mt-4 w-full rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-teal-50"
                  >
                    {t.checkNotice} →
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-200/20 bg-emerald-300/10 p-5 sm:p-6">
                <p className="text-2xl font-black">{t.moneyTitle}</p>
                <p className="mt-3 text-sm leading-6 text-emerald-50">
                  {t.moneyBody}
                </p>
                <button
                  onClick={() => openSection("readiness")}
                  className="mt-4 font-bold text-white underline decoration-emerald-200 underline-offset-4"
                >
                  {t.primary} →
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 sm:mt-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-teal-800">
            WORKER SERVICES
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            {t.services}
          </h2>
          <p className="mt-2 text-sm text-slate-500">{t.serviceIntro}</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {actionKeys.map((key, index) => (
              <button
                key={key}
                onClick={() => openSection(key)}
                aria-pressed={active === key}
                className={`group rounded-2xl border bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6 ${
                  active === key
                    ? "border-teal-500 ring-2 ring-teal-100"
                    : "border-slate-200 hover:border-teal-300"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-black ${
                    [
                      "bg-teal-50 text-teal-800",
                      "bg-blue-50 text-blue-800",
                      "bg-amber-50 text-amber-800",
                      "bg-violet-50 text-violet-800",
                    ][index]
                  }`}
                >
                  {t.actions[key].icon}
                </div>
                <h3 className="mt-5 text-lg font-extrabold">
                  {t.actions[key].title}
                </h3>
                <p className="mt-2 min-h-16 text-sm leading-6 text-slate-500">
                  {t.actions[key].desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-teal-800">
                  {language === "hi"
                    ? "खोलें"
                    : language === "en"
                      ? "Open section"
                      : "Open karo"}
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </button>
            ))}
          </div>
        </section>
        {showConsent && (
          <section
            id="consent-panel"
            className="mt-8 scroll-mt-6"
          >
            <ConsentScreen
              language={language}
              onCancel={() => setShowConsent(false)}
              onAccept={() => {
                setShowConsent(false);
                setActive("readiness");

                window.setTimeout(() => {
                  document.getElementById("section-details")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 80);
            }}
          />
        </section>
)}

        {active && (
          <section
            id="section-details"
            className="mt-8 scroll-mt-6 rounded-3xl border border-teal-100 bg-white p-6 shadow-sm sm:p-8"
          >
            {active === "readiness" ? (
              <ReadinessQuestionnaire
              language={language}
              onClose={() => setActive(null)}
              />
            ) : active === "workdays" ? (
              <WorkdaysTracker
                language={language}
                onClose={() => setActive(null)}
              />
              ) : active === "documents" ? (
                <DocumentsChecklist
                  language={language}
                  onClose={() => setActive(null)}
                />
              ) : active === "updates" ? (
                <GrapNoticeTracker
                language={language}
                onClose={() => setActive(null)}
              />
              ) : active === "camps" ? (
                <CampFinder
                language={language}
                onClose={() => setActive(null)}
              />
              ) : (
              <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-teal-800">
                  NEXT STEP
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {t.detailTitle[active]}
                </h2>
              </div>
              <button
                onClick={() => setActive(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold hover:bg-slate-50"
              >
                {t.close}
              </button>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              {t.detailBody[active]}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 font-extrabold text-teal-900">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              {t.next}
            </p>
              </>
            )}
          </section>
        )}

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="text-xl" aria-hidden="true">ⓘ</span>
            <div>
              <h2 className="font-extrabold text-amber-950">
                {language === "hi"
                  ? "ज़रूरी जानकारी"
                  : language === "en"
                    ? "Important information"
                    : "Zaroori jaankari"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-amber-950">
                {t.disclaimer}
              </p>
            </div>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-500">
          {t.footer} · {t.brand}
        </footer>
      </div>
    </main>
  );
}

const readinessQuestions: Record<
  Language,
  { title: string; hint: string; options: string[] }[]
> = {
  en: [
    {
      title:
        "Are you registered with the Delhi Building and Other Construction Workers Welfare Board?",
      hint: "Choose the answer that matches your current information.",
      options: ["Yes", "No", "I'm not sure"],
    },
    {
      title:
        "Do you have records of your construction workdays for the relevant period?",
      hint: "The applicable workday requirement must be checked against current official rules.",
      options: ["Yes, I have records", "I have some records", "Not yet", "I'm not sure"],
    },
    {
      title: "Do you have documents or other evidence of your construction work?",
      hint: "Choose what best describes the evidence you currently have.",
      options: ["Yes", "Some documents", "Not yet", "I'm not sure"],
    },
    {
      title: "Have you checked the latest official notice about GRAP-related relief?",
      hint: "Check the official notice before relying on an announcement.",
      options: ["Yes", "No", "I'm not sure"],
    },
  ],
  hinglish: [
    {
      title:
        "Kya aap Delhi Building and Other Construction Workers Welfare Board mein registered ho?",
      hint: "Jo aapki current information se match karta hai, woh chuno.",
      options: ["Haan", "Nahi", "Pakka nahi"],
    },
    {
      title:
        "Kya aapke paas relevant period ke construction workdays ka record hai?",
      hint: "Workdays ki actual requirement latest official rules se check karni hogi.",
      options: ["Haan, record hai", "Kuch record hai", "Abhi nahi", "Pakka nahi"],
    },
    {
      title: "Kya aapke paas construction work ke documents ya proof hain?",
      hint: "Apne paas available proof ke hisaab se jawab chuno.",
      options: ["Haan", "Kuch documents hain", "Abhi nahi", "Pakka nahi"],
    },
    {
      title: "Kya aapne GRAP relief ka latest official notice check kiya hai?",
      hint: "Kisi announcement par bharosa karne se pehle official notice check karo.",
      options: ["Haan", "Nahi", "Pakka nahi"],
    },
  ],
  hi: [
    {
      title:
        "क्या आप दिल्ली भवन एवं अन्य निर्माण श्रमिक कल्याण बोर्ड में पंजीकृत हैं?",
      hint: "अपनी वर्तमान जानकारी के अनुसार जवाब चुनें।",
      options: ["हाँ", "नहीं", "पक्का नहीं"],
    },
    {
      title: "क्या आपके पास संबंधित अवधि के कार्यदिवसों का रिकॉर्ड है?",
      hint: "कार्यदिवसों की लागू शर्तें नवीनतम आधिकारिक नियमों से जाँचनी होंगी।",
      options: ["हाँ, रिकॉर्ड है", "कुछ रिकॉर्ड है", "अभी नहीं", "पक्का नहीं"],
    },
    {
      title: "क्या आपके पास निर्माण कार्य से जुड़े दस्तावेज़ या प्रमाण हैं?",
      hint: "अपने पास उपलब्ध प्रमाण के अनुसार जवाब चुनें।",
      options: ["हाँ", "कुछ दस्तावेज़ हैं", "अभी नहीं", "पक्का नहीं"],
    },
    {
      title: "क्या आपने GRAP सहायता से जुड़ी नवीनतम आधिकारिक सूचना देखी है?",
      hint: "किसी घोषणा पर निर्भर करने से पहले आधिकारिक सूचना जाँचें।",
      options: ["हाँ", "नहीं", "पक्का नहीं"],
    },
  ],
};

function ReadinessQuestionnaire({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  try {
    const saved = localStorage.getItem("worker-saathi-readiness");

    if (saved) {
      const parsed = JSON.parse(saved) as {
        step?: number;
        answers?: Record<number, number>;
        showSummary?: boolean;
      };

      if (
        typeof parsed.step === "number" &&
        Number.isInteger(parsed.step) &&
        parsed.step >= 0 &&
        parsed.step < 4
      ) {
        setStep(parsed.step);
      }

      if (parsed.answers && typeof parsed.answers === "object") {
        setAnswers(parsed.answers);
      }

      if (typeof parsed.showSummary === "boolean") {
        setShowSummary(parsed.showSummary);
      }
    }
  } catch {
    console.error("Could not load saved readiness progress.");
  } finally {
    setIsLoaded(true);
  }
}, []);

useEffect(() => {
  if (!isLoaded) return;

  try {
    localStorage.setItem(
      "worker-saathi-readiness",
      JSON.stringify({ step, answers, showSummary })
    );
  } catch {
    console.error("Could not save readiness progress.");
  }
}, [step, answers, showSummary, isLoaded]);

  const questions = readinessQuestions[language];
  const question = questions[step];

  const ui = {
    en: {
      title: "Relief readiness check",
      subtitle: "Answer a few simple questions.",
      progress: "Question",
      of: "of",
      back: "Back",
      next: "Next question",
      review: "Review my answers",
      close: "Close",
      summary: "Your answers",
      summaryNote:
        "Use these answers to organise your next steps. They do not establish official eligibility or guarantee payment.",
      restart: "Start again",
      nextSteps: "Suggested next steps",
      actions: [
        "Review registration information if needed.",
        "Organise available workday records and supporting evidence.",
        "Check the latest official notice and seek authorised assistance if unsure.",
      ],
    },
    hinglish: {
      title: "Relief readiness check",
      subtitle: "Kuch simple questions ke jawab do.",
      progress: "Question",
      of: "mein se",
      back: "Peeche",
      next: "Agla question",
      review: "Mere answers dekho",
      close: "Band karo",
      summary: "Aapke answers",
      summaryNote:
        "In answers se agle steps organise karo. Yeh official eligibility ya payment ki guarantee nahi hain.",
      restart: "Dobara shuru karo",
      nextSteps: "Aapke agle steps",
      actions: [
        "Zaroorat ho toh registration details check karo.",
        "Workday records aur available proof organise karo.",
        "Latest official notice check karo; doubt ho toh authorised help lo.",
      ],
    },
    hi: {
      title: "सहायता की तैयारी जाँचें",
      subtitle: "कुछ आसान सवालों के जवाब दें।",
      progress: "प्रश्न",
      of: "में से",
      back: "पीछे",
      next: "अगला प्रश्न",
      review: "मेरे जवाब देखें",
      close: "बंद करें",
      summary: "आपके जवाब",
      summaryNote:
        "इन जवाबों की मदद से अगले कदम व्यवस्थित करें। ये आधिकारिक पात्रता या भुगतान की गारंटी नहीं हैं।",
      restart: "दोबारा शुरू करें",
      nextSteps: "आपके अगले कदम",
      actions: [
        "ज़रूरत होने पर पंजीकरण की जानकारी जाँचें।",
        "कार्यदिवसों के रिकॉर्ड और उपलब्ध प्रमाण व्यवस्थित करें।",
        "नवीनतम आधिकारिक सूचना देखें और संदेह होने पर अधिकृत सहायता लें।",
      ],
    },
  }[language];

  const percentage = showSummary
    ? 100
    : Math.round(((step + 1) / questions.length) * 100);
  const recommendation = (
    en: string,
    hinglish: string,
    hi: string
  ) =>
    language === "en" ? en : language === "hi" ? hi : hinglish;

  const personalizedActions: string[] = [];

  if (answers[0] === 1) {
    personalizedActions.push(
      recommendation(
        "Check your registration status with an authorised help desk.",
        "Authorised help desk se apna registration status check karo.",
        "अधिकृत सहायता केंद्र से अपना पंजीकरण स्टेटस जाँचें।"
      )
    );
  }

  if (answers[0] === 2) {
    personalizedActions.push(
      recommendation(
        "Ask an authorised help desk how to confirm your registration status.",
        "Authorised help desk se registration status confirm karne mein help lo.",
        "अधिकृत सहायता केंद्र से पंजीकरण की स्थिति की पुष्टि करने में मदद लें।"
      )
    );
  }

  if ([1, 2, 3].includes(answers[1])) {
    personalizedActions.push(
      recommendation(
        "Organise your workday records and identify days needing confirmation.",
        "Apne workday records organise karo aur jin dino ki confirmation baaki hai unhe identify karo.",
        "अपने कार्यदिवसों के रिकॉर्ड व्यवस्थित करें और जिन दिनों की पुष्टि बाकी है उन्हें पहचानें।"
      )
    );
  }

  if ([1, 2, 3].includes(answers[2])) {
    personalizedActions.push(
      recommendation(
        "Organise your available documents and check which evidence is accepted under current official rules.",
        "Available documents organise karo aur current official rules ke according accepted proof check karo.",
        "उपलब्ध दस्तावेज़ व्यवस्थित करें और वर्तमान आधिकारिक नियमों के अनुसार स्वीकार्य प्रमाण जाँचें।"
      )
    );
  }

  if ([1, 2].includes(answers[3])) {
    personalizedActions.push(
      recommendation(
        "Review the latest official GRAP and relief notice before relying on an announcement.",
        "Kisi announcement par rely karne se pehle latest official GRAP aur relief notice check karo.",
        "किसी घोषणा पर भरोसा करने से पहले नवीनतम आधिकारिक GRAP और सहायता सूचना जाँचें।"
      )
    );
  }

  if (personalizedActions.length === 0) {
    personalizedActions.push(
      recommendation(
        "Keep your records organised and re-check current official rules before taking the next step.",
        "Apne records organised rakho aur agla step lene se pehle current official rules dobara check karo.",
        "अपने रिकॉर्ड व्यवस्थित रखें और अगला कदम उठाने से पहले वर्तमान आधिकारिक नियम दोबारा जाँचें।"
      )
    );
  }
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-teal-800">
            WORKER SAATHI
          </p>
          <h2 className="mt-2 text-2xl font-black">{ui.title}</h2>
          <p className="mt-2 text-sm text-slate-500">{ui.subtitle}</p>
        </div>

        <button
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold hover:bg-slate-50"
        >
          {ui.close}
        </button>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-teal-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showSummary ? (
        <div className="mt-6">
          <h3 className="text-xl font-extrabold">{ui.summary}</h3>

          <div className="mt-4 space-y-3">
            {questions.map((item, index) => (
              <div key={item.title} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">
                  {index + 1}. {item.title}
                </p>
                <p className="mt-2 font-bold text-teal-800">
                  {item.options[answers[index]]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-teal-100 bg-teal-50 p-5">
            <h4 className="font-extrabold">{ui.nextSteps}</h4>
            <ul className="mt-3 space-y-2 text-sm leading-6">
              {personalizedActions.map((action) => (
                <li key={action}>• {action}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-amber-900">
              {ui.summaryNote}
            </p>
          </div>

          <button
            onClick={() => {
              setStep(0);
              setAnswers({});
              setShowSummary(false);
            }}
            className="mt-5 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold hover:bg-slate-50"
          >
            {ui.restart}
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm font-bold text-teal-800">
            {ui.progress} {step + 1} {ui.of} {questions.length}
          </p>

          <h3 className="mt-3 text-xl font-extrabold leading-relaxed">
            {question.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {question.hint}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {question.options.map((option, index) => (
              <button
                key={option}
                onClick={() =>
                  setAnswers((previous) => ({
                    ...previous,
                    [step]: index,
                  }))
                }
                aria-pressed={answers[step] === index}
                className={`rounded-xl border p-4 text-left font-bold transition ${
                  answers[step] === index
                    ? "border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-100"
                    : "border-slate-200 bg-white hover:border-teal-300"
                }`}
              >
                <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-sm">
                  {answers[step] === index ? "✓" : index + 1}
                </span>
                {option}
              </button>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap justify-between gap-3">
            <button
              disabled={step === 0}
              onClick={() => setStep((previous) => previous - 1)}
              className="rounded-xl border border-slate-200 px-5 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← {ui.back}
            </button>

            <button
              disabled={answers[step] === undefined}
              onClick={() => {
                if (step < questions.length - 1) {
                  setStep((previous) => previous + 1);
                } else {
                  setShowSummary(true);
                }
              }}
              className="rounded-xl bg-teal-700 px-5 py-3 font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === questions.length - 1 ? ui.review : ui.next} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type WorkdayStatus =
  | "Confirmed"
  | "Awaiting confirmation"
  | "Worker-reported"
  | "Correction requested";

type WorkdayEntry = {
  id: number;
  from: string;
  to: string;
  days: number;
  area: string;
  workType: string;
  verifier: string;
  status: WorkdayStatus;
};

function WorkdaysTracker({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const [entries, setEntries] = useState<WorkdayEntry[]>([
    {
      id: 1,
      from: "2026-09-01",
      to: "2026-09-24",
      days: 24,
      area: "Okhla Phase II",
      workType: "Masonry",
      verifier: "DEMO-V-001",
      status: "Confirmed",
    },
    {
      id: 2,
      from: "2026-10-01",
      to: "2026-10-10",
      days: 10,
      area: "Lajpat Nagar",
      workType: "Painting",
      verifier: "",
      status: "Awaiting confirmation",
    },
    {
      id: 3,
      from: "2026-10-12",
      to: "2026-10-15",
      days: 4,
      area: "ITO",
      workType: "Concrete work",
      verifier: "",
      status: "Awaiting confirmation",
    },
  ]);

  const [totals, setTotals] = useState({
    reported: 38,
    confirmed: 24,
    pending: 14,
  });

  const [filter, setFilter] = useState<"All" | "Confirmed" | "Pending">(
    "All"
  );
  const [showForm, setShowForm] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [days, setDays] = useState("1");
  const [area, setArea] = useState("");
  const [workType, setWorkType] = useState("");
  const [verifier, setVerifier] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  try {
    const savedEntries = localStorage.getItem("worker-saathi-workdays");
    const savedTotals = localStorage.getItem("worker-saathi-workday-totals");

    if (savedEntries) {
      setEntries(JSON.parse(savedEntries) as WorkdayEntry[]);
    }

    if (savedTotals) {
      setTotals(JSON.parse(savedTotals) as {
        reported: number;
        confirmed: number;
        pending: number;
      });
    }
  } catch {
    console.error("Could not load saved workday data.");
  } finally {
    setIsLoaded(true);
  }
}, []);

useEffect(() => {
  if (!isLoaded) return;

  try {
    localStorage.setItem("worker-saathi-workdays", JSON.stringify(entries));
    localStorage.setItem("worker-saathi-workday-totals", JSON.stringify(totals));
  } catch {
    console.error("Could not save workday data.");
  }
}, [entries, totals, isLoaded]);

  const locale = language === "hi" ? "hi-IN" : "en-IN";

  const t =
    language === "en"
      ? {
          title: "My Workdays",
          subtitle: "Keep a record of your work and track confirmation.",
          demo: "SAMPLE DATA · LOCAL DEMO",
          reported: "Days reported",
          confirmed: "Days confirmed",
          pending: "Days not yet confirmed",
          add: "Add work record",
          recent: "Work records",
          all: "All records",
          confirmedFilter: "Confirmed",
          pendingFilter: "Pending",
          period: "Work period",
          area: "Worksite area",
          type: "Type of work",
          verifier: "Verifier reference (optional)",
          daysInput: "Number of workdays in this period",
          from: "Start date",
          to: "End date",
          save: "Save work record",
          cancel: "Cancel",
          close: "Close",
          empty: "No records in this filter.",
          request: "Request confirmation",
          issue: "Flag for review",
          correction: "Request correction",
          correctionDone: "Correction requested",
          saveSuccess: "Demo record added. No data was sent to a server.",
          confirmationDemo:
            "Demo only: no message was sent to a verifier.",
          correctionDemo:
            "Demo only: the record was flagged locally. No official correction request was sent.",
          disclaimer:
            "These records are examples. Reported days are not the same as verifier-confirmed days. This tracker does not determine official eligibility.",
          required: "Enter valid dates, worksite, work type and a positive number of workdays.",
        }
      : language === "hi"
        ? {
            title: "मेरे कार्यदिवस",
            subtitle: "काम का रिकॉर्ड रखें और पुष्टि की स्थिति देखें।",
            demo: "नमूना जानकारी · स्थानीय डेमो",
            reported: "दर्ज कार्यदिवस",
            confirmed: "पुष्टि किए गए दिन",
            pending: "पुष्टि बाकी दिन",
            add: "काम का रिकॉर्ड जोड़ें",
            recent: "काम के रिकॉर्ड",
            all: "सभी रिकॉर्ड",
            confirmedFilter: "पुष्टि किए गए",
            pendingFilter: "पुष्टि बाकी",
            period: "काम की अवधि",
            area: "काम की जगह",
            type: "काम का प्रकार",
            verifier: "सत्यापनकर्ता संदर्भ (वैकल्पिक)",
            daysInput: "इस अवधि में काम के दिनों की संख्या",
            from: "शुरू होने की तारीख",
            to: "अंतिम तारीख",
            save: "रिकॉर्ड सेव करें",
            cancel: "रद्द करें",
            close: "बंद करें",
            empty: "इस फ़िल्टर में कोई रिकॉर्ड नहीं है।",
            request: "पुष्टि का अनुरोध",
            issue: "समीक्षा के लिए चिन्हित करें",
            correction: "सुधार का अनुरोध",
            correctionDone: "सुधार का अनुरोध दर्ज है",
            saveSuccess: "डेमो रिकॉर्ड जोड़ा गया। सर्वर पर कोई जानकारी नहीं भेजी गई।",
            confirmationDemo: "केवल डेमो: सत्यापनकर्ता को कोई संदेश नहीं भेजा गया।",
            correctionDemo:
              "केवल डेमो: रिकॉर्ड को स्थानीय रूप से चिन्हित किया गया। कोई आधिकारिक अनुरोध नहीं भेजा गया।",
            disclaimer:
              "ये उदाहरण हैं। दर्ज कार्यदिवस और सत्यापन किए गए दिन अलग हैं। यह ट्रैकर आधिकारिक पात्रता तय नहीं करता।",
            required: "सही तारीखें, काम की जगह, काम का प्रकार और कार्यदिवसों की सकारात्मक संख्या भरें।",
          }
        : {
            title: "Mere Workdays",
            subtitle: "Kaam ka record rakho aur confirmation track karo.",
            demo: "SAMPLE DATA · LOCAL DEMO",
            reported: "Reported days",
            confirmed: "Confirmed days",
            pending: "Confirmation baaki",
            add: "Work record add karo",
            recent: "Work records",
            all: "Saare records",
            confirmedFilter: "Confirmed",
            pendingFilter: "Pending",
            period: "Kaam ki duration",
            area: "Worksite area",
            type: "Kaam ka type",
            verifier: "Verifier reference (optional)",
            daysInput: "Is period mein workdays ki sankhya",
            from: "Start date",
            to: "End date",
            save: "Work record save karo",
            cancel: "Cancel",
            close: "Band karo",
            empty: "Is filter mein koi record nahi hai.",
            request: "Confirmation maango",
            issue: "Review ke liye flag karo",
            correction: "Correction maango",
            correctionDone: "Correction request ho gayi",
            saveSuccess: "Demo record add ho gaya. Server par data nahi bheja gaya.",
            confirmationDemo: "Sirf demo: verifier ko koi message nahi bheja gaya.",
            correctionDemo:
              "Sirf demo: record locally flag hua hai. Official correction request nahi gayi.",
            disclaimer:
              "Ye sample records hain. Reported aur verifier-confirmed days alag hain. Ye tracker official eligibility decide nahi karta.",
            required: "Sahi dates, worksite, work type aur positive workday count bharo.",
          };

  const visibleEntries = entries.filter((entry) => {
    if (filter === "Confirmed") return entry.status === "Confirmed";
    if (filter === "Pending") return entry.status !== "Confirmed";
    return true;
  });

  function formatDate(value: string) {
    return new Date(`${value}T12:00:00`).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function addEntry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    const count = Number(days);

    if (
      !from ||
      !to ||
      from > to ||
      !area.trim() ||
      !workType.trim() ||
      !Number.isInteger(count) ||
      count < 1
    ) {
      setError(t.required);
      return;
    }

    const newEntry: WorkdayEntry = {
      id: Date.now(),
      from,
      to,
      days: count,
      area: area.trim(),
      workType: workType.trim(),
      verifier: verifier.trim(),
      status: "Worker-reported",
    };

    setEntries((previous) => [newEntry, ...previous]);
    setTotals((previous) => ({
      ...previous,
      reported: previous.reported + count,
      pending: previous.pending + count,
    }));

    setFrom("");
    setTo("");
    setDays("1");
    setArea("");
    setWorkType("");
    setVerifier("");
    setShowForm(false);
    setNotice(t.saveSuccess);
    setFilter("All");
  }

  function updateStatus(entry: WorkdayEntry) {
    if (entry.status === "Correction requested") return;

    if (entry.status === "Confirmed") {
      setTotals((previous) => ({
        ...previous,
        confirmed: previous.confirmed - entry.days,
        pending: previous.pending + entry.days,
      }));

      setEntries((previous) =>
        previous.map((item) =>
          item.id === entry.id
            ? { ...item, status: "Correction requested" }
            : item
        )
      );

      setNotice(t.correctionDemo);
      return;
    }

    if (entry.status === "Awaiting confirmation") {
      setEntries((previous) =>
        previous.map((item) =>
          item.id === entry.id
            ? { ...item, status: "Correction requested" }
            : item
        )
      );

      setNotice(t.correctionDemo);
      return;
    }

    setEntries((previous) =>
      previous.map((item) =>
        item.id === entry.id
          ? { ...item, status: "Awaiting confirmation" }
          : item
      )
    );

    setNotice(t.confirmationDemo);
  }

  function statusLabel(status: WorkdayStatus) {
    if (status === "Confirmed") return t.confirmedFilter;
    if (status === "Awaiting confirmation") return t.pending;
    if (status === "Worker-reported") {
      return language === "hi"
        ? "श्रमिक द्वारा दर्ज"
        : language === "en"
          ? "Worker-reported"
          : "Worker-reported";
    }
    return t.correctionDone;
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-teal-800">
            WORKER SAATHI
          </p>
          <h2 className="mt-2 text-2xl font-black">{t.title}</h2>
          <p className="mt-2 text-sm text-slate-500">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900">
            {t.demo}
          </span>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold hover:bg-slate-50"
          >
            {t.close}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            label: t.reported,
            value: totals.reported,
            style: "bg-blue-50 text-blue-900",
          },
          {
            label: t.confirmed,
            value: totals.confirmed,
            style: "bg-emerald-50 text-emerald-900",
          },
          {
            label: t.pending,
            value: totals.pending,
            style: "bg-amber-50 text-amber-900",
          },
        ].map((item) => (
          <div key={item.label} className={`rounded-2xl p-4 ${item.style}`}>
            <p className="text-3xl font-black">{item.value}</p>
            <p className="mt-1 text-sm font-semibold">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-extrabold">{t.recent}</h3>
        <button
          onClick={() => {
            setShowForm((previous) => !previous);
            setError("");
            setNotice("");
          }}
          className="rounded-xl bg-teal-700 px-4 py-3 text-sm font-extrabold text-white hover:bg-teal-800"
        >
          + {t.add}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={addEntry}
          className="mt-4 grid gap-4 rounded-2xl border border-teal-100 bg-teal-50/50 p-5 sm:grid-cols-2"
        >
          <label className="text-sm font-bold">
            {t.from}
            <input
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal"
              required
            />
          </label>

          <label className="text-sm font-bold">
            {t.to}
            <input
              type="date"
              min={from || undefined}
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal"
              required
            />
          </label>

          <label className="text-sm font-bold">
            {t.daysInput}
            <input
              type="number"
              min="1"
              step="1"
              value={days}
              onChange={(event) => setDays(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal"
              required
            />
          </label>

          <label className="text-sm font-bold">
            {t.area}
            <input
              value={area}
              onChange={(event) => setArea(event.target.value)}
              placeholder="e.g. Okhla Phase II"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal"
              required
            />
          </label>

          <label className="text-sm font-bold">
            {t.type}
            <input
              value={workType}
              onChange={(event) => setWorkType(event.target.value)}
              placeholder="e.g. Masonry"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal"
              required
            />
          </label>

          <label className="text-sm font-bold">
            {t.verifier}
            <input
              value={verifier}
              onChange={(event) => setVerifier(event.target.value)}
              placeholder="Demo reference only"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-800 sm:col-span-2">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-teal-700 px-5 py-3 font-bold text-white hover:bg-teal-800"
            >
              {t.save}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold"
            >
              {t.cancel}
            </button>
          </div>
        </form>
      )}

      {notice && (
        <p className="mt-4 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          {notice}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {(
          [
            ["All", t.all],
            ["Confirmed", t.confirmedFilter],
            ["Pending", t.pendingFilter],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
            className={`rounded-xl px-4 py-2 text-sm font-bold ${
              filter === key
                ? "bg-blue-700 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {visibleEntries.map((entry) => {
          const statusStyle =
            entry.status === "Confirmed"
              ? "bg-emerald-50 text-emerald-800"
              : entry.status === "Correction requested"
                ? "bg-rose-50 text-rose-800"
                : entry.status === "Worker-reported"
                  ? "bg-blue-50 text-blue-800"
                  : "bg-amber-50 text-amber-900";

          return (
            <article
              key={entry.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    {formatDate(entry.from)} – {formatDate(entry.to)}
                  </p>
                  <h4 className="mt-2 text-lg font-extrabold">{entry.area}</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    {entry.workType}
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-700">
                    {entry.days} {language === "hi" ? "दिन" : "days"}
                  </p>
                  {entry.verifier && (
                    <p className="mt-1 text-xs text-slate-500">
                      Verifier reference: {entry.verifier}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <span
                    className={`rounded-full px-3 py-2 text-xs font-extrabold ${statusStyle}`}
                  >
                    {statusLabel(entry.status)}
                  </span>

                  {entry.status !== "Correction requested" && (
                    <button
                      onClick={() => updateStatus(entry)}
                      className="text-sm font-bold text-teal-800 underline underline-offset-4"
                    >
                      {entry.status === "Confirmed"
                        ? t.correction
                        : entry.status === "Awaiting confirmation"
                          ? t.issue
                          : t.request}
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        {visibleEntries.length === 0 && (
          <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">
            {t.empty}
          </p>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm leading-6 text-amber-950">{t.disclaimer}</p>
      </div>
    </div>
  );
}

type DocumentKey =
  | "registration"
  | "workdays"
  | "supporting"
  | "renewal"
  | "notice";

type DocumentStatus = "Not started" | "Needs review" | "Organised";

function DocumentsChecklist({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const [statuses, setStatuses] = useState<Record<DocumentKey, DocumentStatus>>({
    registration: "Needs review",
    workdays: "Organised",
    supporting: "Not started",
    renewal: "Not started",
    notice: "Needs review",
  });
  const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  try {
    const saved = localStorage.getItem("worker-saathi-documents");

    if (saved) {
      setStatuses(JSON.parse(saved) as Record<DocumentKey, DocumentStatus>);
    }
  } catch {
    console.error("Could not load saved document checklist.");
  } finally {
    setIsLoaded(true);
  }
}, []);

useEffect(() => {
  if (!isLoaded) return;

  try {
    localStorage.setItem(
      "worker-saathi-documents",
      JSON.stringify(statuses)
    );
  } catch {
    console.error("Could not save document checklist.");
  }
}, [statuses, isLoaded]);

  const t =
    language === "en"
      ? {
          title: "Documents & Evidence",
          subtitle: "Organise your information one step at a time.",
          demo: "SAMPLE DATA · LOCAL DEMO",
          organised: "Organised",
          review: "Needs review",
          notStarted: "Not started",
          mark: "Mark as organised",
          reviewButton: "Needs review",
          close: "Close",
          progress: "Checklist progress",
          note:
            "This checklist is a personal organiser, not an official list of required documents. No documents are uploaded or sent anywhere in this demo.",
          items: {
            registration: {
              title: "Registration information",
              desc: "Keep your registration or renewal details available and check the current official process.",
            },
            workdays: {
              title: "Workday evidence",
              desc: "Organise work dates, worksite areas and any records you already have.",
            },
            supporting: {
              title: "Supporting work evidence",
              desc: "Keep references to available work records. Check which evidence is accepted under current official rules.",
            },
            renewal: {
              title: "Renewal information",
              desc: "Review whether renewal information is relevant to your situation.",
            },
            notice: {
              title: "Latest GRAP and relief notice",
              desc: "Check the official source, publication date and applicable relief information.",
            },
          },
        }
      : language === "hi"
        ? {
            title: "दस्तावेज़ और प्रमाण",
            subtitle: "अपनी जानकारी एक-एक करके व्यवस्थित करें।",
            demo: "नमूना जानकारी · स्थानीय डेमो",
            organised: "व्यवस्थित",
            review: "जाँच बाकी",
            notStarted: "शुरू नहीं हुआ",
            mark: "व्यवस्थित के रूप में चिन्हित करें",
            reviewButton: "जाँच बाकी",
            close: "बंद करें",
            progress: "चेकलिस्ट की प्रगति",
            note:
              "यह व्यक्तिगत जानकारी व्यवस्थित करने का टूल है, आधिकारिक दस्तावेज़ सूची नहीं। इस डेमो में कोई दस्तावेज़ अपलोड या भेजा नहीं जाता।",
            items: {
              registration: {
                title: "पंजीकरण की जानकारी",
                desc: "पंजीकरण या नवीनीकरण की जानकारी रखें और वर्तमान आधिकारिक प्रक्रिया जाँचें।",
              },
              workdays: {
                title: "कार्यदिवसों का प्रमाण",
                desc: "काम की तारीखें, कार्यस्थल का क्षेत्र और उपलब्ध रिकॉर्ड व्यवस्थित करें।",
              },
              supporting: {
                title: "काम से जुड़े अन्य प्रमाण",
                desc: "उपलब्ध कार्य रिकॉर्ड की जानकारी व्यवस्थित रखें। वर्तमान नियमों में स्वीकार्य प्रमाण जाँचें।",
              },
              renewal: {
                title: "नवीनीकरण की जानकारी",
                desc: "जाँचें कि आपकी स्थिति में नवीनीकरण की जानकारी प्रासंगिक है या नहीं।",
              },
              notice: {
                title: "नवीनतम GRAP और सहायता सूचना",
                desc: "आधिकारिक स्रोत, प्रकाशन की तारीख और लागू सहायता संबंधी जानकारी जाँचें।",
              },
            },
          }
        : {
            title: "Documents aur Evidence",
            subtitle: "Apni information ek-ek step mein organise karo.",
            demo: "SAMPLE DATA · LOCAL DEMO",
            organised: "Organised",
            review: "Review karna hai",
            notStarted: "Abhi shuru nahi",
            mark: "Organised mark karo",
            reviewButton: "Review baaki hai",
            close: "Band karo",
            progress: "Checklist progress",
            note:
              "Ye personal organiser hai, official required-documents list nahi. Is demo mein koi document upload ya send nahi hota.",
            items: {
              registration: {
                title: "Registration information",
                desc: "Registration ya renewal ki details sambhal kar rakho aur current official process check karo.",
              },
              workdays: {
                title: "Workday evidence",
                desc: "Kaam ki dates, worksite area aur available records organise karo.",
              },
              supporting: {
                title: "Supporting work evidence",
                desc: "Available work records ka reference rakho. Current official rules ke according accepted proof check karo.",
              },
              renewal: {
                title: "Renewal information",
                desc: "Check karo ki tumhari situation mein renewal ki information relevant hai ya nahi.",
              },
              notice: {
                title: "Latest GRAP aur relief notice",
                desc: "Official source, publication date aur applicable relief information check karo.",
              },
            },
          };

  const keys: DocumentKey[] = [
    "registration",
    "workdays",
    "supporting",
    "renewal",
    "notice",
  ];

  const items = keys.map((id) => ({
    id,
    ...t.items[id],
    status: statuses[id],
  }));

  const organisedCount = keys.filter(
    (key) => statuses[key] === "Organised"
  ).length;

  const statusLabel = (status: DocumentStatus) => {
    if (status === "Organised") return t.organised;
    if (status === "Needs review") return t.review;
    return t.notStarted;
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-teal-800">
            WORKER SAATHI
          </p>
          <h2 className="mt-2 text-2xl font-black">{t.title}</h2>
          <p className="mt-2 text-sm text-slate-500">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900">
            {t.demo}
          </span>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold hover:bg-slate-50"
          >
            {t.close}
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50 p-5">
        <div className="flex items-end justify-between gap-3">
          <p className="text-sm font-bold text-teal-950">{t.progress}</p>
          <p className="text-lg font-black text-teal-900">
            {organisedCount}/5
          </p>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-teal-600 transition-all"
            style={{ width: `${(organisedCount / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item, index) => {
          const statusStyle =
            item.status === "Organised"
              ? "bg-emerald-50 text-emerald-800"
              : item.status === "Needs review"
                ? "bg-amber-50 text-amber-900"
                : "bg-slate-100 text-slate-700";

          return (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-black text-blue-800">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold">{item.title}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle}`}
                    >
                      {statusLabel(item.status)}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.desc}
                  </p>

                  <button
                    onClick={() =>
                      setStatuses((previous) => ({
                        ...previous,
                        [item.id]:
                          previous[item.id] === "Organised"
                            ? "Needs review"
                            : "Organised",
                      }))
                    }
                    aria-pressed={item.status === "Organised"}
                    className="mt-4 rounded-xl border border-teal-200 px-4 py-2 text-sm font-bold text-teal-800 transition hover:bg-teal-50"
                  >
                    {item.status === "Organised"
                      ? t.reviewButton
                      : t.mark}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm leading-6 text-amber-950">{t.note}</p>
      </div>
    </div>
  );
}

function GrapNoticeTracker({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const t = {
    en: {
      title: "GRAP Notice Tracker",
      subtitle: "Check official updates before taking action.",
      demo: "DEMO · MANUAL VERIFICATION",
      status: "Current GRAP status",
      unverified: "Awaiting official verification",
      statusDesc: "A CAQM order dated 21 Oct 2026 is listed for Stage-I implementation in Delhi-NCR. Check the official website for newer orders or revocation before treating this as current.",
      source: "Official source",
      sourceName: "Commission for Air Quality Management (CAQM)",
      published: "Latest stage order listed",
      notLoaded: "21 Oct 2026 — Stage-I implementation order",
      checked: "Page checked",
      notChecked: "29 Oct 2026 — active stage unconfirmed",
      open: "Open official CAQM website ↗",
      relief: "₹10,000 relief information",
      reliefDesc:
        "Earlier announcements mentioned assistance for eligible construction workers. Current scheme status, conditions and payment must be verified independently.",
      steps: "What should you do?",
      actions: [
        "Check the latest official notice.",
        "Keep registration and workday evidence organised.",
        "Ask an authorised help desk if anything is unclear.",
      ],
      warning:
        "AQI alone does not confirm that a GRAP stage has been activated. This app does not guarantee relief or decide eligibility.",
      close: "Close",
    },
    hinglish: {
      title: "GRAP Notice Tracker",
      subtitle: "Koi action lene se pehle official updates check karo.",
      demo: "DEMO · MANUAL VERIFICATION",
      status: "Current GRAP status",
      unverified: "Official verification baaki hai",
      statusDesc:
        "Is prototype ne latest GRAP order fetch ya verify nahi kiya hai.",
      source: "Official source",
      sourceName: "Commission for Air Quality Management (CAQM)",
      published: "Notice ki publication date",
      notLoaded: "Abhi available nahi",
      checked: "Last checked",
      notChecked: "Record nahi hua",
      open: "Official CAQM website kholo ↗",
      relief: "₹10,000 relief information",
      reliefDesc:
        "Pehle ki announcements mein eligible construction workers ke liye assistance ka zikr tha. Current scheme status, conditions aur payment independently verify karna zaroori hai.",
      steps: "Aapko kya karna chahiye?",
      actions: [
        "Latest official notice check karo.",
        "Registration aur workday proof organise rakho.",
        "Kuch clear na ho toh authorised help desk se poochho.",
      ],
      warning:
        "Sirf AQI se confirm nahi hota ki GRAP stage activate hui hai. App relief ki guarantee nahi deta aur eligibility decide nahi karta.",
      close: "Band karo",
    },
    hi: {
      title: "GRAP सूचना ट्रैकर",
      subtitle: "कोई कदम उठाने से पहले आधिकारिक अपडेट जाँचें।",
      demo: "डेमो · मैनुअल सत्यापन",
      status: "वर्तमान GRAP स्थिति",
      unverified: "आधिकारिक सत्यापन बाकी है",
      statusDesc:
        "इस प्रोटोटाइप ने नवीनतम GRAP आदेश प्राप्त या सत्यापित नहीं किया है।",
      source: "आधिकारिक स्रोत",
      sourceName: "वायु गुणवत्ता प्रबंधन आयोग (CAQM)",
      published: "सूचना प्रकाशित होने की तारीख",
      notLoaded: "उपलब्ध नहीं",
      checked: "अंतिम जाँच",
      notChecked: "दर्ज नहीं",
      open: "आधिकारिक CAQM वेबसाइट खोलें ↗",
      relief: "₹10,000 सहायता की जानकारी",
      reliefDesc:
        "पहले की घोषणाओं में पात्र निर्माण श्रमिकों के लिए सहायता का उल्लेख था। योजना की वर्तमान स्थिति, शर्तें और भुगतान अलग से सत्यापित करना आवश्यक है।",
      steps: "आपको क्या करना चाहिए?",
      actions: [
        "नवीनतम आधिकारिक सूचना जाँचें।",
        "पंजीकरण और कार्यदिवसों के प्रमाण व्यवस्थित रखें।",
        "संदेह होने पर अधिकृत सहायता केंद्र से पूछें।",
      ],
      warning:
        "केवल AQI से GRAP चरण लागू होने की पुष्टि नहीं होती। यह ऐप सहायता की गारंटी नहीं देता और पात्रता तय नहीं करता।",
      close: "बंद करें",
    },
  }[language];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-teal-800">
            WORKER SAATHI
          </p>
          <h2 className="mt-2 text-2xl font-black">{t.title}</h2>
          <p className="mt-2 text-sm text-slate-500">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900">
            {t.demo}
          </span>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold hover:bg-slate-50"
          >
            {t.close}
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-2xl">
            ⚠
          </div>
          <div>
            <p className="text-sm font-bold text-amber-900">{t.status}</p>
            <h3 className="mt-2 text-xl font-black text-amber-950">
              {t.unverified}
            </h3>
            <p className="mt-2 text-sm leading-6 text-amber-950">
              {t.statusDesc}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { label: t.source, value: t.sourceName },
          { label: t.published, value: t.notLoaded },
          { label: t.checked, value: t.notChecked },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <p className="text-xs font-semibold text-slate-500">
              {item.label}
            </p>
            <p className="mt-2 text-sm font-extrabold leading-6">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <a
        href="https://caqm.nic.in/"
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex items-center justify-center rounded-xl bg-blue-700 px-5 py-4 text-center text-sm font-extrabold text-white transition hover:bg-blue-800"
      >
        {t.open}
      </a>

      <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50 p-5">
        <h3 className="text-lg font-black">{t.relief}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          {t.reliefDesc}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-black">{t.steps}</h3>
        <ol className="mt-4 space-y-3">
          {t.actions.map((action, index) => (
            <li key={action} className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-black text-teal-900">
                {index + 1}
              </span>
              <span className="pt-1 text-sm leading-6 text-slate-700">
                {action}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm leading-6 text-amber-950">{t.warning}</p>
      </div>
    </div>
  );
}

const demoCamps = [
  {
    id: 1,
    name: "Sample Worker Help Desk",
    area: "Area A, Delhi",
    timing: "Demo schedule — not verified",
    contact: "Official contact not added",
  },
  {
    id: 2,
    name: "Sample Labour Support Point",
    area: "Area B, Delhi",
    timing: "Demo schedule — not verified",
    contact: "Official contact not added",
  },
  {
    id: 3,
    name: "Sample Assistance Camp",
    area: "Area C, Delhi",
    timing: "Demo schedule — not verified",
    contact: "Official contact not added",
  },
];

function CampFinder({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const t = {
    en: {
      title: "Find Worker Support",
      subtitle: "Search for help centres by area.",
      demo: "DEMO LISTINGS · NOT VERIFIED",
      search: "Enter your area or neighbourhood",
      placeholder: "e.g. your neighbourhood",
      results: "Sample support listings",
      area: "Area",
      hours: "Opening hours",
      contact: "Contact information",
      status: "Location and details need verification",
      empty: "No sample listings match your search.",
      note:
        "These are fictional listings for interface testing. They are not real camps. Confirm actual locations, schedules and contact details with an authorised source before visiting.",
      close: "Close",
      clear: "Clear search",
    },
    hinglish: {
      title: "Worker Help Centre Dhoondo",
      subtitle: "Apne area ke hisaab se help search karo.",
      demo: "DEMO LISTINGS · VERIFIED NAHI",
      search: "Apna area ya neighbourhood likho",
      placeholder: "e.g. apna neighbourhood",
      results: "Sample help listings",
      area: "Area",
      hours: "Timing",
      contact: "Contact information",
      status: "Location aur details verify karni hain",
      empty: "Search se match karti koi sample listing nahi mili.",
      note:
        "Ye interface testing ke liye fictional listings hain, real camps nahi. Visit karne se pehle authorised source se actual location, timing aur contact verify karo.",
      close: "Band karo",
      clear: "Search clear karo",
    },
    hi: {
      title: "श्रमिक सहायता केंद्र खोजें",
      subtitle: "अपने क्षेत्र के अनुसार सहायता खोजें।",
      demo: "डेमो सूची · सत्यापित नहीं",
      search: "अपने क्षेत्र या मोहल्ले का नाम लिखें",
      placeholder: "जैसे, अपने मोहल्ले का नाम",
      results: "नमूना सहायता केंद्र",
      area: "क्षेत्र",
      hours: "समय",
      contact: "संपर्क जानकारी",
      status: "स्थान और जानकारी का सत्यापन बाकी है",
      empty: "आपकी खोज से मेल खाने वाली नमूना सूची नहीं मिली।",
      note:
        "ये केवल इंटरफ़ेस की जाँच के लिए काल्पनिक सूचियाँ हैं, वास्तविक शिविर नहीं। जाने से पहले अधिकृत स्रोत से वास्तविक स्थान, समय और संपर्क की पुष्टि करें।",
      close: "बंद करें",
      clear: "खोज हटाएँ",
    },
  }[language];

  const filteredCamps = demoCamps.filter((camp) =>
    `${camp.name} ${camp.area}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-teal-800">
            WORKER SAATHI
          </p>
          <h2 className="mt-2 text-2xl font-black">{t.title}</h2>
          <p className="mt-2 text-sm text-slate-500">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900">
            {t.demo}
          </span>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold hover:bg-slate-50"
          >
            {t.close}
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50 p-5">
        <label
          htmlFor="camp-search"
          className="text-sm font-extrabold text-teal-950"
        >
          {t.search}
        </label>

        <input
          id="camp-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.placeholder}
          className="mt-3 w-full rounded-xl border border-slate-200 bg-white p-4 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="mt-3 text-sm font-bold text-teal-800 underline underline-offset-4"
          >
            {t.clear}
          </button>
        )}
      </div>

      <h3 className="mt-6 text-lg font-black">{t.results}</h3>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {filteredCamps.map((camp) => (
          <article
            key={camp.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                📍
              </div>
              <div>
                <h4 className="font-extrabold">{camp.name}</h4>
                <p className="mt-1 text-sm text-slate-500">{camp.area}</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div>
                <p className="font-bold text-slate-700">{t.area}</p>
                <p className="mt-1 text-slate-600">{camp.area}</p>
              </div>
              <div>
                <p className="font-bold text-slate-700">{t.hours}</p>
                <p className="mt-1 text-slate-600">{camp.timing}</p>
              </div>
              <div>
                <p className="font-bold text-slate-700">{t.contact}</p>
                <p className="mt-1 text-slate-600">{camp.contact}</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-amber-50 p-3 text-sm font-semibold leading-6 text-amber-900">
              ⚠ {t.status}
            </div>
          </article>
        ))}
      </div>

      {filteredCamps.length === 0 && (
        <p className="mt-4 rounded-xl bg-slate-50 p-5 text-sm text-slate-600">
          {t.empty}
        </p>
      )}

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm leading-6 text-amber-950">{t.note}</p>
      </div>
    </div>
  );
}

function ConsentScreen({
  language,
  onAccept,
  onCancel,
}: {
  language: Language;
  onAccept: () => void;
  onCancel: () => void;
}) {
  const [consentChecked, setConsentChecked] = useState(false);

  const t = {
    en: {
      label: "WORKER SAATHI · PRIVACY",
      title: "Before you continue",
      intro:
        "Please understand how this demo works before starting your relief-readiness check.",
      points: [
        {
          title: "What this app does",
          body: "It helps you organise registration information, workday records and supporting evidence.",
        },
        {
          title: "Your information",
          body: "In this prototype, records may be saved in this browser on this device. There is no cloud account or secure database connected yet.",
        },
        {
          title: "Your choice",
          body: "You can choose not to continue. Do not enter Aadhaar numbers, bank details or other sensitive personal information.",
        },
        {
          title: "Relief decisions",
          body: "This app does not decide official eligibility or guarantee ₹10,000 relief. The relevant government authority makes those decisions.",
        },
      ],
      agree: "I have read this information and agree to continue with the demo.",
      cancel: "Not now",
      accept: "I agree & continue",
    },
    hinglish: {
      label: "WORKER SAATHI · PRIVACY",
      title: "Aage badhne se pehle",
      intro:
        "Relief readiness check shuru karne se pehle samajh lo ki ye demo kaise kaam karta hai.",
      points: [
        {
          title: "App kya karta hai",
          body: "Registration information, workday records aur supporting proof organise karne mein help karta hai.",
        },
        {
          title: "Aapki information",
          body: "Is prototype mein records isi device ke browser mein save ho sakte hain. Abhi cloud account ya secure database connected nahi hai.",
        },
        {
          title: "Aapki choice",
          body: "Aap aage badhne se mana kar sakte ho. Aadhaar number, bank details ya sensitive personal information enter mat karo.",
        },
        {
          title: "Relief ka decision",
          body: "App official eligibility decide nahi karta aur ₹10,000 relief ki guarantee nahi deta. Decision relevant government authority leti hai.",
        },
      ],
      agree: "Maine information padh li hai aur demo continue karne ke liye agree karta/karti hoon.",
      cancel: "Abhi nahi",
      accept: "Agree karke aage badhein",
    },
    hi: {
      label: "वर्कर साथी · गोपनीयता",
      title: "आगे बढ़ने से पहले",
      intro:
        "सहायता की तैयारी जाँचने से पहले समझें कि यह डेमो कैसे काम करता है।",
      points: [
        {
          title: "यह ऐप क्या करता है",
          body: "यह पंजीकरण की जानकारी, कार्यदिवसों के रिकॉर्ड और सहायक प्रमाण व्यवस्थित करने में मदद करता है।",
        },
        {
          title: "आपकी जानकारी",
          body: "इस प्रोटोटाइप में रिकॉर्ड इसी डिवाइस के ब्राउज़र में सेव हो सकते हैं। अभी क्लाउड अकाउंट या सुरक्षित डेटाबेस जुड़ा नहीं है।",
        },
        {
          title: "आपकी पसंद",
          body: "आप आगे बढ़ने से मना कर सकते हैं। आधार नंबर, बैंक विवरण या अन्य संवेदनशील व्यक्तिगत जानकारी न भरें।",
        },
        {
          title: "सहायता का निर्णय",
          body: "यह ऐप आधिकारिक पात्रता तय नहीं करता और ₹10,000 सहायता की गारंटी नहीं देता। निर्णय संबंधित सरकारी प्राधिकरण करता है।",
        },
      ],
      agree: "मैंने यह जानकारी पढ़ ली है और डेमो जारी रखने के लिए सहमत हूँ।",
      cancel: "अभी नहीं",
      accept: "सहमत होकर आगे बढ़ें",
    },
  }[language];

  return (
    <section className="mx-auto max-w-4xl rounded-3xl border border-teal-100 bg-white p-6 shadow-sm sm:p-9">
      <p className="text-xs font-extrabold tracking-widest text-teal-800">
        {t.label}
      </p>

      <h2 className="mt-3 text-2xl font-black sm:text-3xl">
        {t.title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        {t.intro}
      </p>

      <div className="mt-6 space-y-3">
        {t.points.map((point, index) => (
          <article
            key={point.title}
            className="flex gap-3 rounded-2xl bg-slate-50 p-4 sm:p-5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-100 font-black text-teal-900">
              {index + 1}
            </div>

            <div>
              <h3 className="font-extrabold">{point.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {point.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(event) => setConsentChecked(event.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-teal-700"
        />
        <span className="text-sm font-semibold leading-6 text-slate-700">
          {t.agree}
        </span>
      </label>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 px-5 py-3 font-bold hover:bg-slate-50"
        >
          {t.cancel}
        </button>

        <button
          type="button"
          disabled={!consentChecked}
          onClick={onAccept}
          className="rounded-xl bg-teal-700 px-5 py-3 font-extrabold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.accept} →
        </button>
      </div>
    </section>
  );
}
