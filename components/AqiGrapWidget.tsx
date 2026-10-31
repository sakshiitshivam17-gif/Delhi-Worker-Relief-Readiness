"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  MapPin,
  RefreshCw,
  ShieldAlert,
  Wind,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  AQI_BANDS,
  AQI_REFRESH_INTERVAL_MS,
  fetchDelhiAqi,
  getAqiBand,
  SAMPLE_AQI,
} from "@/lib/aqi";
import { CAQM_URL } from "@/lib/data";
import type { AqiReading, GrapStage } from "@/lib/types";
import {
  cn,
  formatMessage,
  formatObservationTime,
} from "@/lib/utils";

const GAUGE_WIDTH = 280;
const GAUGE_HEIGHT = 158;
const GAUGE_CENTER_X = GAUGE_WIDTH / 2;
const GAUGE_CENTER_Y = 138;
const GAUGE_RADIUS = 108;

function needlePoint(value: number): { x: number; y: number } {
  const angle = 180 - (Math.min(Math.max(value, 0), 500) / 500) * 180;
  const radians = (angle * Math.PI) / 180;
  return {
    x: GAUGE_CENTER_X + Math.cos(radians) * 78,
    y: GAUGE_CENTER_Y - Math.sin(radians) * 78,
  };
}

export function AqiGrapWidget() {
  const { language, t } = useLanguage();
  const [reading, setReading] = useState<AqiReading>(SAMPLE_AQI);
  const [isFetching, setIsFetching] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);
  const [showStages, setShowStages] = useState(false);
  const [selectedStage, setSelectedStage] = useState<GrapStage | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    fetchDelhiAqi(controller.signal)
      .then((liveReading) => {
        if (!isActive) return;
        setReading(liveReading);
        setLoadFailed(false);
      })
      .catch(() => {
        if (!isActive || controller.signal.aborted) return;
        setLoadFailed(true);
      })
      .finally(() => {
        if (isActive) setIsFetching(false);
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [refreshToken]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsFetching(true);
      setRefreshToken((value) => value + 1);
    }, AQI_REFRESH_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, []);

  const band = useMemo(() => getAqiBand(reading.aqi), [reading.aqi]);
  const stage = band.stage;
  const activeStage = selectedStage ?? stage;
  const needle = useMemo(() => needlePoint(reading.aqi), [reading.aqi]);
  const updatedTime = formatObservationTime(reading.measuredAt, language);

  const refresh = useCallback(() => {
    setIsFetching(true);
    setRefreshToken((value) => value + 1);
  }, []);

  return (
    <section
      aria-labelledby="aqi-widget-title"
      className="overflow-hidden rounded-lg border border-purple-100/90 bg-white shadow-sm"
    >
      <div
        aria-hidden="true"
        className="h-1.5 w-full transition-colors duration-500"
        style={{ backgroundColor: band.hex }}
      />

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.15em] text-purple-700">
              <Wind aria-hidden="true" className="h-3.5 w-3.5" />
              {t.aqi.eyebrow}
            </p>
            <h2
              id="aqi-widget-title"
              className="mt-1 text-xl font-black tracking-tight text-slate-900"
            >
              {t.aqi.title}
            </h2>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              {t.aqi.location}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex min-h-7 items-center gap-1.5 rounded px-2.5 text-[11px] font-bold",
                reading.source === "live"
                  ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                  : "bg-amber-50 text-amber-900 ring-1 ring-amber-200"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  reading.source === "live"
                    ? "bg-emerald-600"
                    : "bg-amber-600"
                )}
              />
              {reading.source === "live" ? t.aqi.live : t.aqi.sample}
            </span>
            <button
              type="button"
              onClick={refresh}
              disabled={isFetching}
              aria-label={t.aqi.refresh}
              aria-busy={isFetching}
              className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-xs transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 active:scale-95 disabled:opacity-60"
            >
              <RefreshCw
                aria-hidden="true"
                className={cn("h-4 w-4", isFetching && "animate-spin")}
              />
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-md border border-purple-100/80 bg-purple-50/40 p-4 sm:p-5">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-5">
            <div
              role="img"
              aria-label={`${t.aqi.readingLabel}: ${reading.aqi}. ${t.aqi.level[band.level]}. ${t.aqi.stageLabel}: ${t.aqi.stageNames[stage]}.`}
              className="mx-auto w-full max-w-[340px]"
            >
              <svg
                aria-hidden="true"
                viewBox={`0 0 ${GAUGE_WIDTH} ${GAUGE_HEIGHT}`}
                className="w-full"
              >
                <path
                  d={`M ${GAUGE_CENTER_X - GAUGE_RADIUS} ${GAUGE_CENTER_Y} A ${GAUGE_RADIUS} ${GAUGE_RADIUS} 0 0 1 ${GAUGE_CENTER_X + GAUGE_RADIUS} ${GAUGE_CENTER_Y}`}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth={20}
                  strokeLinecap="round"
                />
                {AQI_BANDS.map((item) => {
                  const start = item.min / 5;
                  const length = (item.max - item.min + 1) / 5;
                  const gap = item.level === "satisfactory" ? 2 : 1.2;

                  return (
                    <path
                      key={item.level}
                      d={`M ${GAUGE_CENTER_X - GAUGE_RADIUS} ${GAUGE_CENTER_Y} A ${GAUGE_RADIUS} ${GAUGE_RADIUS} 0 0 1 ${GAUGE_CENTER_X + GAUGE_RADIUS} ${GAUGE_CENTER_Y}`}
                      fill="none"
                      stroke={item.hex}
                      strokeWidth={20}
                      pathLength={100}
                      strokeDasharray={`${Math.max(length - gap, 0.4)} 100`}
                      strokeDashoffset={-start}
                      strokeLinecap="butt"
                    />
                  );
                })}
                <line
                  x1={GAUGE_CENTER_X}
                  y1={GAUGE_CENTER_Y}
                  x2={needle.x}
                  y2={needle.y}
                  stroke="#1E1B4B"
                  strokeWidth={3}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out motion-reduce:transition-none"
                />
                <circle
                  cx={GAUGE_CENTER_X}
                  cy={GAUGE_CENTER_Y}
                  r={7}
                  fill="#1E1B4B"
                  stroke="#FFFFFF"
                  strokeWidth={2.5}
                />
              </svg>

              <div className="mt-1 flex justify-between px-2 text-[10px] font-bold text-slate-400">
                <span>0</span>
                <span>200</span>
                <span>500</span>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-purple-100 bg-white p-4 shadow-xs lg:mt-0">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    {t.aqi.readingLabel}
                  </p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className="text-[48px] font-black leading-none tracking-tight"
                      style={{ color: band.hex }}
                    >
                      {reading.aqi}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {t.aqi.level[band.level]}
                    </span>
                  </div>
                </div>

                <span
                  className="inline-flex min-h-8 items-center gap-1.5 rounded px-2.5 text-[11px] font-bold"
                  style={{
                    backgroundColor: `${band.hex}16`,
                    color: band.hex,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: band.hex }}
                  />
                  {stage === 0
                    ? t.aqi.stageNames[0]
                    : formatMessage(t.aqi.stageShort, { stage })}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                <div className="rounded-md bg-slate-50 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t.aqi.pm25}
                  </p>
                  <p className="mt-0.5 whitespace-nowrap text-base font-black text-slate-900">
                    {reading.pm25 !== null ? `${reading.pm25} µg/m³` : "—"}
                  </p>
                </div>
                <div className="flex min-h-14 items-center rounded-md bg-slate-50 px-3 py-2">
                  <p className="text-xs font-bold leading-snug text-slate-600">
                    {updatedTime
                      ? formatMessage(t.aqi.updated, { time: updatedTime })
                      : t.aqi.updatedUnknown}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p aria-live="polite" className="sr-only">
          {reading.aqi} {t.aqi.readingLabel}. {t.aqi.level[band.level]}.{" "}
          {t.aqi.stageNames[stage]}.
        </p>

        {loadFailed ? (
          <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs font-bold leading-relaxed text-amber-950">
            {t.aqi.loadFailed}
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => setShowStages((value) => !value)}
          aria-expanded={showStages}
          aria-controls="aqi-stage-details"
          className="mt-4 flex min-h-11 w-full items-center justify-between gap-3 rounded-md border border-purple-200/80 bg-purple-50/60 px-4 text-left text-xs font-bold text-purple-950 transition hover:bg-purple-100/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
        >
          <span className="flex items-center gap-2">
            <ShieldAlert aria-hidden="true" className="h-4 w-4 text-purple-700" />
            {t.aqi.stageMeansTitle}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-4 w-4 transition-transform",
              showStages && "rotate-180"
            )}
          />
        </button>

        {showStages ? (
          <div id="aqi-stage-details" className="mt-2.5">
            <div
              role="group"
              aria-label={t.aqi.stagesAria}
              className="grid grid-cols-4 gap-1.5"
            >
              {(
                [
                  [1, "Poor"],
                  [2, "Very poor"],
                  [3, "Severe"],
                  [4, "Severe plus"],
                ] as const
              ).map(([stageValue]) => {
                const stageBand = AQI_BANDS.find(
                  (item) => item.stage === stageValue
                );
                const isSelected = activeStage === stageValue;

                return (
                  <button
                    key={stageValue}
                    type="button"
                    onClick={() => setSelectedStage(stageValue)}
                    aria-pressed={isSelected}
                    className={cn(
                      "min-h-10 rounded-md border px-1 py-1.5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700",
                      isSelected
                        ? "border-purple-700 text-purple-950 bg-purple-50 shadow-xs"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="mx-auto mb-1 block h-1 w-5 rounded-full"
                      style={{ backgroundColor: stageBand?.hex ?? band.hex }}
                    />
                    {formatMessage(t.aqi.stageShort, { stage: stageValue })}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 rounded-md bg-slate-50 p-3">
              <p className="text-xs font-black text-slate-900">
                {t.aqi.stageNames[activeStage]}
              </p>
              <p className="mt-0.5 text-xs font-medium leading-relaxed text-slate-600">
                {t.aqi.stageMeans[activeStage]}
              </p>
            </div>
          </div>
        ) : null}

        <p className="mt-3 text-[11px] font-medium leading-relaxed text-slate-500">
          {t.aqi.warning}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <p className="text-[11px] font-medium text-slate-400">
            {t.aqi.source}
          </p>
          <a
            href={CAQM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-xs font-bold text-purple-700 underline decoration-purple-300 underline-offset-4 transition hover:text-purple-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
          >
            {t.aqi.openCaqm}
            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
