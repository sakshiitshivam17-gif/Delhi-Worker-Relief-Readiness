"use client";

import {
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import {
  Clock3,
  ExternalLink,
  Footprints,
  Info,
  Loader2,
  MapPin,
  Mic,
  Navigation,
  Phone,
  PhoneCall,
  Search,
  TrainFront,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  DBOCWWB_HELPLINE,
  DBOCWWB_URL,
  DEMO_CAMPS,
  SHARMIK_HELPLINE,
} from "@/lib/data";
import type { Camp, CampZone } from "@/lib/types";
import { useSpeechRecognition } from "@/lib/use-speech-recognition";
import {
  cn,
  formatDistance,
  formatMessage,
} from "@/lib/utils";

type ZoneFilter = "all" | CampZone;

const ZONES: ZoneFilter[] = [
  "all",
  "north",
  "south",
  "east",
  "west",
  "central",
];

export function CampFinder() {
  const { t, speechLocale } = useLanguage();
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState<ZoneFilter>("all");

  const handleSpeechResult = useCallback((transcript: string) => {
    setQuery(transcript.trim());
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

  const deferredQuery = useDeferredValue(query);

  const camps = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    return DEMO_CAMPS.filter((camp) => {
      if (zone !== "all" && camp.zone !== zone) return false;
      if (!normalized) return true;

      const serviceText = camp.services
        .map((service) => t.camps.serviceLabels[service])
        .join(" ");

      const aliasText = camp.voiceAliases?.join(" ") ?? "";

      return `${camp.name} ${camp.area} ${camp.metro} ${aliasText} ${serviceText}`
        .toLowerCase()
        .includes(normalized);
    }).sort((a, b) => a.distanceMeters - b.distanceMeters);
  }, [deferredQuery, t.camps.serviceLabels, zone]);

  function zoneLabel(key: ZoneFilter): string {
    return t.camps.zones[key];
  }

  return (
    <div className="space-y-5">
      <section
        aria-labelledby="camp-search-title"
        className="rounded-lg border border-purple-200/90 bg-gradient-to-br from-purple-50/50 via-white to-purple-50/30 p-4 shadow-sm sm:p-5"
      >
        <h2
          id="camp-search-title"
          className="flex items-center gap-2 text-sm font-black text-purple-950"
        >
          <Search aria-hidden="true" className="h-4 w-4 text-purple-700" />
          {t.camps.searchLabel}
        </h2>

        <div className="relative mt-2">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(event) => {
              if (isListening) cancelListening();
              setQuery(event.target.value);
            }}
            placeholder={
              isListening
                ? t.common.voiceListening
                : t.camps.searchPlaceholder
            }
            aria-label={t.camps.searchLabel}
            autoComplete="off"
            className="min-h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-20 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
          />
          <div className="absolute inset-y-0 right-1 flex items-center gap-0.5">
            {isSupported ? (
              <button
                type="button"
                onClick={toggleListening}
                aria-label={
                  isListening ? t.common.voiceStop : t.common.voiceStart
                }
                aria-pressed={isListening}
                title={
                  isListening ? t.common.voiceStop : t.common.voiceStart
                }
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-md border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 active:scale-95",
                  isListening
                    ? "animate-pulse border-rose-300 bg-rose-100 text-rose-700"
                    : "border-cyan-200 bg-white text-cyan-800 hover:bg-cyan-50"
                )}
              >
                {isListening ? (
                  <Loader2
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin"
                  />
                ) : (
                  <Mic aria-hidden="true" className="h-4 w-4" />
                )}
              </button>
            ) : null}
            {query ? (
              <button
                type="button"
                onClick={() => {
                  cancelListening();
                  setQuery("");
                }}
                aria-label={t.camps.clearSearch}
                className="grid h-9 w-9 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-purple-600"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
        <span role="status" aria-live="polite" className="sr-only">
          {isListening ? t.common.voiceListening : ""}
        </span>
        {speechError ? (
          <p
            role="alert"
            className="mt-1.5 text-[11px] font-semibold leading-snug text-rose-700"
          >
            {t.common.voiceError}
          </p>
        ) : null}

        <div
          role="group"
          aria-label={t.camps.filterAria}
          className="mt-3 flex flex-wrap gap-1.5"
        >
          {ZONES.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setZone(key)}
              aria-pressed={zone === key}
              className={cn(
                "min-h-9 touch-manipulation rounded-md border px-3 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.98]",
                zone === key
                  ? "border-purple-800 bg-purple-800 text-white shadow-xs"
                  : "border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:bg-purple-50/50"
              )}
            >
              {zoneLabel(key)}
            </button>
          ))}
        </div>
      </section>

      <div
        aria-live="polite"
        className="flex items-center justify-between gap-3"
      >
        <h2 className="text-base font-black tracking-tight text-slate-900">
          {formatMessage(t.camps.results, { count: camps.length })}
        </h2>
        <span className="rounded bg-purple-50 border border-purple-200 px-2 py-1 text-[11px] font-bold text-purple-950">
          {t.camps.demo}
        </span>
      </div>

      <div className="space-y-3">
        {camps.map((camp) => (
          <CampCard key={camp.id} camp={camp} />
        ))}
      </div>

      {camps.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 bg-white p-6 text-center">
          <MapPin
            aria-hidden="true"
            className="mx-auto h-8 w-8 text-slate-300"
          />
          <p className="mt-2 text-sm font-bold text-slate-800">
            {t.camps.noResults}
          </p>
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            {t.camps.noResultsHint}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setZone("all");
            }}
            className="mt-3 min-h-10 rounded-md bg-purple-800 px-4 text-xs font-bold text-white transition hover:bg-purple-900 focus-visible:outline-2 focus-visible:outline-purple-700"
          >
            {t.camps.clearSearch}
          </button>
        </div>
      ) : null}

      <section className="rounded-lg border border-purple-100 bg-purple-50/60 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-purple-700 text-white shadow-xs"
          >
            <PhoneCall className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-black text-purple-950">
              {t.camps.helplineTitle}
            </h2>
            <p className="mt-0.5 text-[13px] font-medium leading-relaxed text-purple-900">
              {t.camps.helplineBody}
            </p>
          </div>
        </div>

        <a
          href={`tel:${SHARMIK_HELPLINE}`}
          className="mt-3.5 flex min-h-11 items-center justify-center gap-2 rounded-md bg-purple-800 px-4 text-xs font-bold text-white shadow-xs transition hover:bg-purple-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800 active:scale-[0.99]"
        >
          <Phone aria-hidden="true" className="h-4 w-4" />
          {t.common.call} {t.common.helplineNumber}
        </a>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <a
            href={`tel:${DBOCWWB_HELPLINE}`}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 text-xs font-bold text-purple-950 underline decoration-purple-300 underline-offset-4 transition hover:text-purple-800"
          >
            <Phone aria-hidden="true" className="h-3.5 w-3.5" />
            {t.camps.boardTitle}: {DBOCWWB_HELPLINE.replace(
              /(\d{4})(\d{4})(\d+)/,
              "$1 $2 $3"
            )}
          </a>
          <a
            href={DBOCWWB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 text-xs font-bold text-purple-800 underline decoration-purple-300 underline-offset-4 transition hover:text-purple-950"
          >
            {t.camps.openBoard}
            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <div className="rounded-lg border border-purple-100 bg-purple-50/50 p-4">
        <div className="flex items-start gap-2">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-purple-800"
          />
          <p className="text-xs font-medium leading-relaxed text-purple-950">
            {t.camps.note}
          </p>
        </div>
      </div>
    </div>
  );
}

function CampCard({ camp }: { camp: Camp }) {
  const { t } = useLanguage();
  const distance = formatDistance(camp.distanceMeters);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(camp.mapsQuery)}`;

  return (
    <article className="overflow-hidden rounded-lg border border-purple-100/90 bg-white shadow-sm">
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-purple-100 text-purple-800"
          >
            <MapPin className="h-5 w-5" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-1.5">
              <h3 className="text-[16px] font-black leading-tight tracking-tight text-slate-900">
                {camp.name}
              </h3>
              <span className="rounded bg-purple-50 border border-purple-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-950">
                {t.common.demo}
              </span>
            </div>
            <p className="mt-0.5 text-[13px] font-medium text-slate-600">
              {camp.area}
            </p>
          </div>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <span className="inline-flex min-h-7 items-center gap-1.5 rounded border border-purple-200 bg-purple-50/60 px-2 text-[10px] font-bold text-purple-950">
            <TrainFront aria-hidden="true" className="h-3 w-3" />
            {formatMessage(t.camps.fromMetro, {
              distance,
              metro: camp.metro,
            })}
          </span>
          <span className="inline-flex min-h-7 items-center gap-1.5 rounded border border-emerald-200 bg-emerald-50 px-2 text-[10px] font-bold text-emerald-950">
            <Footprints aria-hidden="true" className="h-3 w-3" />
            {formatMessage(t.camps.walk, { minutes: camp.walkMinutes })}
          </span>
        </div>

        <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-slate-600">
          <Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
          <span>
            {t.camps.hours}: {camp.hours}
          </span>
        </div>

        <div className="mt-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            {t.camps.services}
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {camp.services.map((service) => (
              <span
                key={service}
                className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
              >
                {t.camps.serviceLabels[service]}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <a
            href={`tel:${SHARMIK_HELPLINE}`}
            aria-label={formatMessage(t.camps.callAria, {
              number: t.common.helplineNumber,
            })}
            className="flex min-h-10 touch-manipulation items-center justify-center gap-1.5 rounded-md bg-purple-800 px-2 text-xs font-bold text-white transition hover:bg-purple-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.98]"
          >
            <Phone aria-hidden="true" className="h-3.5 w-3.5" />
            {t.camps.call}
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={formatMessage(t.camps.directionsAria, {
              camp: camp.name,
            })}
            className="flex min-h-10 touch-manipulation items-center justify-center gap-1.5 rounded-md border border-purple-200/90 bg-purple-50/50 px-2 text-xs font-bold text-purple-950 transition hover:bg-purple-100/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-[0.98]"
          >
            <Navigation aria-hidden="true" className="h-3.5 w-3.5" />
            {t.camps.directions}
          </a>
        </div>
      </div>
    </article>
  );
}
