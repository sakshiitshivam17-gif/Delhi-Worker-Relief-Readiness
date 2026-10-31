"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  Loader2,
  MessageCircle,
  Mic,
  MicOff,
  SendHorizontal,
  Square,
  Volume2,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  getChatbotContent,
  findChatbotAnswer,
} from "@/lib/chatbot-knowledge";
import { LANGUAGE_OPTIONS } from "@/lib/i18n";
import { useSpeechRecognition } from "@/lib/use-speech-recognition";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
}

function createMessageId(): string {
  return `chat-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function WorkerChatbot() {
  const { language, speechLocale, t } = useLanguage();
  const content = useMemo(() => getChatbotContent(language), [language]);
  const activeLanguage = useMemo(
    () =>
      LANGUAGE_OPTIONS.find((option) => option.code === language) ??
      LANGUAGE_OPTIONS[0],
    [language]
  );

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const previousLanguage = useRef(language);

  const handleSpeechResult = useCallback((transcript: string) => {
    setInput(transcript);
  }, []);

  const {
    isListening,
    isSupported,
    error: speechError,
    cancelListening,
    toggleListening,
  } = useSpeechRecognition({
    locale: speechLocale,
    onResult: handleSpeechResult,
  });

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
  }, []);

  const speak = useCallback(
    (text: string, id: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      const synth = window.speechSynthesis;
      synth.cancel();

      if (speakingId === id) {
        setSpeakingId(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLocale;
      utterance.rate = 0.9;
      utterance.pitch = 1;

      const languagePrefix = speechLocale.slice(0, 2).toLowerCase();
      const matchingVoice = synth
        .getVoices()
        .find((voice) => voice.lang.toLowerCase().startsWith(languagePrefix));
      if (matchingVoice) utterance.voice = matchingVoice;

      utterance.onend = () => {
        setSpeakingId((current) => (current === id ? null : current));
      };
      utterance.onerror = () => {
        setSpeakingId((current) => (current === id ? null : current));
      };

      setSpeakingId(id);
      synth.speak(utterance);
    },
    [speakingId, speechLocale]
  );

  const sendMessage = useCallback(
    (rawValue: string) => {
      const text = rawValue.trim();
      if (!text) return;

      cancelListening();
      const response = findChatbotAnswer(text, language);
      setMessages((current) => [
        ...current,
        { id: createMessageId(), role: "user", text },
        { id: createMessageId(), role: "bot", text: response.answer },
      ]);
      setInput("");
      stopSpeaking();
    },
    [cancelListening, language, stopSpeaking]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  function handleVoiceToggle() {
    if (!isListening) {
      stopSpeaking();
    }
    toggleListening();
  }

  const closeChat = useCallback(() => {
    setOpen(false);
    cancelListening();
    stopSpeaking();
  }, [cancelListening, stopSpeaking]);

  useEffect(() => {
    if (previousLanguage.current === language) return;
    previousLanguage.current = language;
    setMessages([]);
    setInput("");
    stopSpeaking();
  }, [language, stopSpeaking]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChat();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeChat, open]);

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={content.openLabel}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 rounded-md bg-gradient-to-r from-cyan-600 to-purple-600 p-3.5 text-white shadow-lg transition hover:from-cyan-700 hover:to-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-95"
        >
          <MessageCircle aria-hidden="true" className="h-6 w-6" />
        </button>
      ) : (
        <section
          role="dialog"
          aria-modal="false"
          aria-label={content.title}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex h-[min(34rem,80vh)] max-h-[80vh] w-[92vw] flex-col overflow-hidden rounded-lg border border-cyan-200 bg-[#ecfeff] shadow-2xl sm:w-[400px]"
        >
          <header className="border-b border-cyan-200/80 bg-gradient-to-r from-cyan-100 via-cyan-50 to-purple-50 p-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-start gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gradient-to-br from-cyan-600 to-purple-600 text-white shadow-sm">
                  <MessageCircle aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-black leading-tight text-slate-950">
                    {content.title}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center rounded border border-cyan-200 bg-white/80 px-1.5 py-0.5 text-[10px] font-bold text-cyan-800">
                      {activeLanguage.label}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {content.subtitle}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={closeChat}
                aria-label={content.closeLabel}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-slate-600 transition hover:bg-white/80 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div
            role="log"
            aria-live="polite"
            aria-label={content.title}
            className="min-h-0 flex-1 space-y-2.5 overflow-y-auto p-3"
          >
            <div className="flex items-end gap-1.5">
              <div className="max-w-[85%] rounded-lg border border-cyan-200 bg-white/95 px-3 py-2 text-[13px] leading-relaxed text-slate-800 shadow-sm">
                <p className="whitespace-pre-line">{content.greeting}</p>
              </div>
              <button
                type="button"
                onClick={() => speak(content.greeting, "welcome")}
                aria-label={
                  speakingId === "welcome"
                    ? content.stopLabel
                    : content.listenLabel
                }
                aria-pressed={speakingId === "welcome"}
                className="grid h-7 w-7 shrink-0 place-items-center rounded border border-cyan-200 bg-white text-cyan-800 transition hover:border-cyan-300 hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              >
                {speakingId === "welcome" ? (
                  <Square aria-hidden="true" className="h-3 w-3 fill-current" />
                ) : (
                  <Volume2 aria-hidden="true" className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-lg bg-purple-700 px-3 py-2 text-[13px] leading-relaxed text-white shadow-sm">
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              ) : (
                <div
                  key={message.id}
                  className="flex items-end gap-1.5"
                >
                  <div className="max-w-[85%] rounded-lg border border-cyan-200 bg-white/95 px-3 py-2 text-[13px] leading-relaxed text-slate-800 shadow-sm">
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => speak(message.text, message.id)}
                    aria-label={
                      speakingId === message.id
                        ? content.stopLabel
                        : content.listenLabel
                    }
                    aria-pressed={speakingId === message.id}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded border border-cyan-200 bg-white text-cyan-800 transition hover:border-cyan-300 hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                  >
                    {speakingId === message.id ? (
                      <Square
                        aria-hidden="true"
                        className="h-3 w-3 fill-current"
                      />
                    ) : (
                      <Volume2 aria-hidden="true" className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              )
            )}

            {messages.length === 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {content.starters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    onClick={() => sendMessage(starter)}
                    className={cn(
                      "rounded border border-cyan-200 bg-white/95 px-2.5 py-1.5 text-left text-[11px] font-semibold leading-snug text-cyan-900 shadow-xs transition",
                      "hover:border-cyan-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.98]"
                    )}
                  >
                    {starter}
                  </button>
                ))}
              </div>
            ) : null}

            <div ref={endRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-cyan-200/80 bg-white/70 p-2.5"
          >
            <div className="flex items-center gap-1.5 rounded-md border border-cyan-200 bg-white/95 p-1.5 shadow-sm focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-600/15">
              <div className="relative min-w-0 flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => {
                    if (isListening) cancelListening();
                    setInput(event.target.value);
                  }}
                  placeholder={
                    isListening
                      ? t.common.voiceListening
                      : content.placeholder
                  }
                  aria-label={
                    isListening
                      ? t.common.voiceListening
                      : content.placeholder
                  }
                  autoComplete="off"
                  className={cn(
                    "min-h-10 w-full rounded-md bg-transparent px-2 text-sm text-slate-900 outline-none placeholder:text-slate-400",
                    isListening && "pr-8"
                  )}
                />
                {isListening ? (
                  <Loader2
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-rose-600"
                  />
                ) : null}
              </div>
              {isSupported ? (
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  aria-label={
                    isListening ? t.common.voiceStop : t.common.voiceStart
                  }
                  aria-pressed={isListening}
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-md border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700",
                    isListening
                      ? "animate-pulse border-rose-300 bg-rose-100 text-rose-700"
                      : "border-cyan-200 bg-white text-cyan-800 hover:bg-cyan-50"
                  )}
                >
                  {isListening ? (
                    <MicOff aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Mic aria-hidden="true" className="h-4 w-4" />
                  )}
                </button>
              ) : null}
              <button
                type="submit"
                disabled={!input.trim()}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-md bg-purple-700 px-3 text-xs font-bold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:bg-purple-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              >
                <SendHorizontal aria-hidden="true" className="h-4 w-4" />
                <span className="hidden sm:inline">{content.send}</span>
                <span className="sr-only sm:hidden">{content.send}</span>
              </button>
            </div>
            <span role="status" aria-live="polite" className="sr-only">
              {isListening ? t.common.voiceListening : ""}
            </span>
            {speechError ? (
              <p
                role="alert"
                className="px-1 pt-1.5 text-[11px] font-semibold leading-snug text-rose-700"
              >
                {t.common.voiceError}
              </p>
            ) : null}
          </form>
        </section>
      )}
    </>
  );
}
