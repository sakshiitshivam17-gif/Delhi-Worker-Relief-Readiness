"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  BookOpen,
  CheckCircle2,
  Headphones,
  MapPin,
  MessageCircle,
  Play,
  RotateCcw,
  Square,
  Volume2,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Language } from "@/lib/types";
import { cn } from "@/lib/utils";

const DISMISSED_STORAGE_KEY = "worker-saathi-audio-guide-dismissed-v1";
const DISMISSED_STORAGE_EVENT = "worker-saathi-audio-guide-dismissed";
const ESTIMATED_SPEECH_DURATION_MS = 30_000;

interface GuideContent {
  badge: string;
  title: string;
  subtitle: string;
  speechText: string;
  playLabel: string;
  stopLabel: string;
  replayLabel: string;
  dismissLabel: string;
  steps: Array<{
    label: string;
    icon: "workdays" | "docs" | "camps" | "bot";
  }>;
}

const STEP_ICONS = {
  workdays: CheckCircle2,
  docs: BookOpen,
  camps: MapPin,
  bot: MessageCircle,
};

const GUIDE_CONTENT: Record<Language, GuideContent> = {
  en: {
    badge: "30-Sec Audio Guide",
    title: "How Worker Saathi Helps You",
    subtitle: "Listen to a quick 30-second walkthrough in your language",
    speechText:
      "Welcome to Worker Saathi. This platform helps Delhi construction workers track their 90 workdays, organize essential DBOCWWB documents, check GRAP winter construction bans, and find verified relief camps with Shramik helpline numbers. Tap any feature below to get started!",
    playLabel: "Play Guide",
    stopLabel: "Pause",
    replayLabel: "Replay",
    dismissLabel: "Dismiss Guide",
    steps: [
      { label: "1. Log 90 Days", icon: "workdays" },
      { label: "2. Check Documents", icon: "docs" },
      { label: "3. Find Camps", icon: "camps" },
      { label: "4. Ask Sahayak", icon: "bot" },
    ],
  },
  hinglish: {
    badge: "30-Sec Audio Guide",
    title: "Worker Saathi Kaise Madad Karta Hai",
    subtitle: "Apni bhasha me 30 second ka guide sunein",
    speechText:
      "Worker Saathi me aapka swagat hai. Yeh platform Delhi ke construction workers ke liye banaya gaya hai. Yahan aap apne 90 din ka kaam track kar sakte hain, DBOCWWB documents verify kar sakte hain, GRAP ban status check kar sakte hain aur verified camps dhundh sakte hain.",
    playLabel: "Guide Sunein",
    stopLabel: "Rokein",
    replayLabel: "Dobara Sunein",
    dismissLabel: "Band Karein",
    steps: [
      { label: "1. 90 Din Track", icon: "workdays" },
      { label: "2. Documents Check", icon: "docs" },
      { label: "3. Camps Khojein", icon: "camps" },
      { label: "4. Sahayak se Poochein", icon: "bot" },
    ],
  },
  hi: {
    badge: "30-सेकंड ऑडियो गाइड",
    title: "वर्कर साथी आपकी कैसे मदद करता है",
    subtitle: "अपनी भाषा में 30 सेकंड का ऑडियो गाइड सुनें",
    speechText:
      "वर्कर साथी में आपका स्वागत है। यह ऐप दिल्ली के निर्माण श्रमिकों के लिए है। यहाँ आप अपने 90 कार्यदिवस दर्ज कर सकते हैं, ज़रूरी दस्तावेज़ों की जांच कर सकते हैं, GRAP निर्माण रोक की स्थिति देख सकते हैं और नज़दीकी सहायता कैंप ढूंढ सकते हैं।",
    playLabel: "गाइड सुनें",
    stopLabel: "रोकें",
    replayLabel: "दोबारा सुनें",
    dismissLabel: "हटाएं",
    steps: [
      { label: "1. 90 दिन दर्ज करें", icon: "workdays" },
      { label: "2. दस्तावेज़ जांचें", icon: "docs" },
      { label: "3. कैंप खोजें", icon: "camps" },
      { label: "4. सहायक से पूछें", icon: "bot" },
    ],
  },
  pa: {
    badge: "30-ਸਕਿੰਟ ਆਡੀਓ ਗਾਈਡ",
    title: "ਵਰਕਰ ਸਾਥੀ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰਦਾ ਹੈ",
    subtitle: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ 30 ਸਕਿੰਟ ਦੀ ਆਡੀਓ ਗਾਈਡ ਸੁਣੋ",
    speechText:
      "ਵਰਕਰ ਸਾਥੀ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਇਹ ਐਪ ਦਿੱਲੀ ਦੇ ਉਸਾਰੀ ਮਜ਼ਦੂਰਾਂ ਲਈ ਹੈ। ਇੱਥੇ ਤੁਸੀਂ ਆਪਣੇ 90 ਕੰਮ ਦੇ ਦਿਨ ਟਰੈਕ ਕਰ ਸਕਦੇ ਹੋ, ਦਸਤਾਵੇਜ਼ ਚੈੱਕ ਕਰ ਸਕਦੇ ਹੋ, GRAP ਸਥਿਤੀ ਦੇਖ ਸਕਦੇ ਹੋ ਅਤੇ ਰਾਹਤ ਕੈਂਪ ਲੱਭ ਸਕਦੇ ਹੋ।",
    playLabel: "ਗਾਈਡ ਸੁਣੋ",
    stopLabel: "ਰੋਕੋ",
    replayLabel: "ਮੁੜ ਸੁਣੋ",
    dismissLabel: "ਬੰਦ ਕਰੋ",
    steps: [
      { label: "1. 90 ਦਿਨ ਦਰਜ ਕਰੋ", icon: "workdays" },
      { label: "2. ਦਸਤਾਵੇਜ਼ ਚੈੱਕ", icon: "docs" },
      { label: "3. ਕੈਂਪ ਲੱਭੋ", icon: "camps" },
      { label: "4. ਸਹਾਇਕ ਨੂੰ ਪੁੱਛੋ", icon: "bot" },
    ],
  },
  mr: {
    badge: "30-सेकंद ऑडिओ मार्गदर्शक",
    title: "वर्कर साथी तुम्हाला कशी मदत करते",
    subtitle: "आपल्या भाषेत 30 सेकंदांचे ऑडिओ मार्गदर्शन ऐका",
    speechText:
      "वर्कर साथी मध्ये आपले स्वागत आहे. हे ॲप दिल्लीतील बांधकाम कामगारांसाठी आहे. येथे तुम्ही तुमचे ९० कामाचे दिवस ट्रॅक करू शकता, कागदपत्रे तपासू शकता, GRAP स्थिती पाहू शकता आणि मदत छावण्या शोधू शकता.",
    playLabel: "मार्गदर्शक ऐका",
    stopLabel: "थांबवा",
    replayLabel: "पुन्हा ऐका",
    dismissLabel: "बंद करा",
    steps: [
      { label: "1. ९० दिवस ट्रॅक", icon: "workdays" },
      { label: "2. कागदपत्रे तपासा", icon: "docs" },
      { label: "3. शिबिरे शोधा", icon: "camps" },
      { label: "4. सहाय्यकाला विचारा", icon: "bot" },
    ],
  },
  bn: {
    badge: "৩০-সেকেন্ডের অডিও গাইড",
    title: "ওয়ার্কার সাথী আপনাকে কীভাবে সাহায্য করে",
    subtitle: "আপনার ভাষায় ৩০ সেকেন্ডের অডিও গাইড শুনুন",
    speechText:
      "ওয়ার্কার সাথীতে আপনাকে স্বাগতম। এই প্ল্যাটফর্মটি দিল্লির নির্মাণ শ্রমিকদের জন্য। এখানে আপনি আপনার ৯০ দিনের কাজের হিসাব রাখতে পারেন, প্রয়োজনীয় নথি পরীক্ষা করতে পারেন, GRAP স্ট্যাটাস দেখতে পারেন এবং ক্যাম্প খুঁজে নিতে পারেন।",
    playLabel: "গাইড শুনুন",
    stopLabel: "থামুন",
    replayLabel: "আবার শুনুন",
    dismissLabel: "বন্ধ করুন",
    steps: [
      { label: "১. ৯০ দিন হিসাব", icon: "workdays" },
      { label: "২. নথি পরীক্ষা", icon: "docs" },
      { label: "৩. ক্যাম্প খুঁজুন", icon: "camps" },
      { label: "৪. সহায়ককে জিজ্ঞাসা", icon: "bot" },
    ],
  },
  ta: {
    badge: "30-விநாடி ஆடியோ வழிகாட்டி",
    title: "ஒர்க்கர் சாதி உங்களுக்கு எவ்வாறு உதவுகிறது",
    subtitle: "உங்கள் மொழியில் 30 விநாடி ஆடியோ வழிகாட்டியை கேளுங்கள்",
    speechText:
      "ஒர்க்கர் சாதிக்கு உங்களை வரவேற்கிறோம். இந்த செயலி டெல்லி கட்டுமானத் தொழிலாளர்களுக்கானது. இங்கே உங்கள் 90 வேலை நாட்களை கண்காணிக்கலாம், ஆவணங்களை சரிபார்க்கலாம், GRAP நிலையை பார்க்கலாம் மற்றும் நிவாரண முகாம்களைக் கண்டறியலாம்.",
    playLabel: "வழிகாட்டி கேளுங்கள்",
    stopLabel: "நிறுத்து",
    replayLabel: "மீண்டும் கேளுங்கள்",
    dismissLabel: "மூடு",
    steps: [
      { label: "1. 90 நாட்கள் பதிவு", icon: "workdays" },
      { label: "2. ஆவணங்கள் சரிபார்ப்பு", icon: "docs" },
      { label: "3. முகாம்களை தேடுங்கள்", icon: "camps" },
      { label: "4. உதவியாளரிடம் கேளுங்கள்", icon: "bot" },
    ],
  },
};

function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function subscribeToDismissedPreference(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(DISMISSED_STORAGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(DISMISSED_STORAGE_EVENT, onStoreChange);
  };
}

function getDismissedPreference(): boolean {
  return getLocalStorage()?.getItem(DISMISSED_STORAGE_KEY) === "true";
}

function getServerDismissedPreference(): boolean {
  return false;
}

function setDismissedPreference(value: boolean) {
  try {
    const storage = getLocalStorage();
    if (!storage) return;

    if (value) {
      storage.setItem(DISMISSED_STORAGE_KEY, "true");
    } else {
      storage.removeItem(DISMISSED_STORAGE_KEY);
    }

    window.dispatchEvent(new Event(DISMISSED_STORAGE_EVENT));
  } catch {
    return;
  }
}

export function AudioOnboardingWalkthrough() {
  const { language, speechLocale } = useLanguage();
  const content = useMemo(
    () => GUIDE_CONTENT[language] ?? GUIDE_CONTENT.en,
    [language]
  );
  const storedDismissed = useSyncExternalStore(
    subscribeToDismissedPreference,
    getDismissedPreference,
    getServerDismissedPreference
  );

  const [sessionDismissed, setSessionDismissed] = useState<boolean | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const dismissed = sessionDismissed ?? storedDismissed;

  useEffect(() => {
    if (!isPlaying) return;

    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min(
        95,
        Math.round((elapsed / ESTIMATED_SPEECH_DURATION_MS) * 100)
      );
      setProgress((previous) => Math.max(previous, nextProgress));
    }, 250);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const stopAudio = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setHasFinished(false);
    setProgress(0);
  }, []);

  const playAudio = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();
    setProgress(0);

    const utterance = new SpeechSynthesisUtterance(content.speechText);
    utterance.lang = speechLocale;
    utterance.rate = 0.92;
    utterance.pitch = 1;

    const languagePrefix = speechLocale.slice(0, 2).toLowerCase();
    const voice = synth
      .getVoices()
      .find((item) => item.lang.toLowerCase().startsWith(languagePrefix));
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      setIsPlaying(true);
      setHasFinished(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setHasFinished(true);
      setProgress(100);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setHasFinished(false);
      setProgress(0);
    };

    synth.speak(utterance);
  }, [content.speechText, speechLocale]);

  const dismiss = () => {
    stopAudio();
    setSessionDismissed(true);
    setDismissedPreference(true);
  };

  const reopen = () => {
    setSessionDismissed(false);
    setDismissedPreference(false);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (dismissed) {
    return (
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={reopen}
          className="inline-flex min-h-11 touch-manipulation items-center gap-1.5 rounded-md border border-cyan-200 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-cyan-900 shadow-xs transition hover:border-cyan-300 hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.98]"
        >
          <Headphones
            aria-hidden="true"
            className="h-4 w-4 text-cyan-700"
          />
          <span>{content.badge}</span>
        </button>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="audio-guide-title"
      className="mb-5 overflow-hidden rounded-lg border border-cyan-200 bg-gradient-to-br from-cyan-50/90 via-purple-50/40 to-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-gradient-to-br from-cyan-600 to-purple-600 text-white shadow-sm">
            <Headphones aria-hidden="true" className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-cyan-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-cyan-900">
                {content.badge}
              </span>
              {isPlaying ? (
                <span
                  aria-hidden="true"
                  className="flex items-center gap-0.5"
                >
                  <span className="speech-bar inline-block h-3 w-1 rounded-xs bg-purple-700" />
                  <span className="speech-bar inline-block h-4 w-1 rounded-xs bg-purple-700 [animation-delay:150ms]" />
                  <span className="speech-bar inline-block h-2.5 w-1 rounded-xs bg-purple-700 [animation-delay:300ms]" />
                </span>
              ) : null}
            </div>
            <h2
              id="audio-guide-title"
              className="mt-1 text-base font-black leading-snug tracking-tight text-slate-950 sm:text-lg"
            >
              {content.title}
            </h2>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-slate-600">
              {content.subtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label={content.dismissLabel}
          className="grid h-11 w-11 shrink-0 touch-manipulation place-items-center rounded-md text-slate-500 transition hover:bg-white hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-95"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Volume2
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-purple-700"
        />
        <div
          role="progressbar"
          aria-label={`${content.badge} ${Math.round(progress)}%`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          className="h-1.5 min-w-0 flex-1 overflow-hidden rounded bg-cyan-100"
        >
          <div
            className="h-full rounded bg-gradient-to-r from-cyan-500 to-purple-600 transition-[width] duration-200 motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="w-8 text-right text-[10px] font-black tabular-nums text-purple-800">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={isPlaying ? stopAudio : playAudio}
          aria-pressed={isPlaying}
          className={cn(
            "inline-flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-md px-4 text-xs font-black text-white shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.98] sm:w-auto",
            isPlaying
              ? "bg-rose-700 hover:bg-rose-800"
              : "bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
          )}
        >
          {isPlaying ? (
            <>
              <Square
                aria-hidden="true"
                className="h-3.5 w-3.5 fill-current"
              />
              <span>{content.stopLabel}</span>
            </>
          ) : hasFinished ? (
            <>
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              <span>{content.replayLabel}</span>
            </>
          ) : (
            <>
              <Play aria-hidden="true" className="h-4 w-4 fill-current" />
              <span>{content.playLabel}</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {content.steps.map((step) => {
          const Icon = STEP_ICONS[step.icon];
          return (
            <div
              key={step.label}
              className="flex items-start gap-1.5 rounded-md border border-cyan-100 bg-white/80 px-2.5 py-2 text-[11px] font-bold leading-snug text-slate-800 shadow-xs"
            >
              <Icon
                aria-hidden="true"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-700"
              />
              <span className="min-w-0">{step.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
