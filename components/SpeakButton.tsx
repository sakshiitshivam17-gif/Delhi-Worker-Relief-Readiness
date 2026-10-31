"use client";

import { Square, Volume2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSpeech } from "@/lib/use-speech";
import { cn } from "@/lib/utils";

type SpeakButtonVariant = "default" | "dark" | "soft";

interface SpeakButtonProps {
  text: string;
  label?: string;
  variant?: SpeakButtonVariant;
  className?: string;
  showLabel?: boolean;
}

const variantStyles: Record<SpeakButtonVariant, string> = {
  default:
    "border border-purple-200/80 bg-white text-purple-900 shadow-sm hover:border-purple-300 hover:bg-purple-50 hover:text-purple-950",
  dark:
    "border border-white/30 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25",
  soft:
    "border border-purple-200 bg-purple-100 text-purple-950 hover:bg-purple-200",
};

export function SpeakButton({
  text,
  label,
  variant = "default",
  className,
  showLabel = true,
}: SpeakButtonProps) {
  const { t, speechLocale } = useLanguage();
  const { isSpeaking, toggle } = useSpeech(text, speechLocale);
  const visibleLabel = label ?? t.common.listen;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isSpeaking ? t.common.a11yStop : t.common.a11yListen}
      aria-pressed={isSpeaking}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md px-3 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-98",
        variantStyles[variant],
        !showLabel && "w-11 px-0",
        className
      )}
    >
      {isSpeaking ? (
        <Square aria-hidden="true" className="h-4 w-4 fill-current" />
      ) : (
        <Volume2 aria-hidden="true" className="h-4 w-4" />
      )}
      {showLabel ? (
        <span>{isSpeaking ? t.common.stop : visibleLabel}</span>
      ) : null}
      {isSpeaking ? (
        <span
          aria-hidden="true"
          className="flex h-3.5 items-end gap-0.5"
        >
          <span className="speech-bar h-2 w-0.5 bg-current" />
          <span className="speech-bar h-3.5 w-0.5 bg-current [animation-delay:120ms]" />
          <span className="speech-bar h-2.5 w-0.5 bg-current [animation-delay:240ms]" />
        </span>
      ) : null}
    </button>
  );
}
