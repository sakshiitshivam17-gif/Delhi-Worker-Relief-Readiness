import type {
  AqiBand,
  AqiReading,
  GrapStage,
} from "@/lib/types";

const DELHI_LATITUDE = 28.6139;
const DELHI_LONGITUDE = 77.209;
export const AQI_REFRESH_INTERVAL_MS = 15 * 60 * 1000;

export const AQI_BANDS: AqiBand[] = [
  {
    level: "good",
    stage: 0,
    min: 0,
    max: 50,
    hex: "#15803d",
    foreground: "#ffffff",
  },
  {
    level: "satisfactory",
    stage: 0,
    min: 51,
    max: 100,
    hex: "#65a30d",
    foreground: "#ffffff",
  },
  {
    level: "moderate",
    stage: 0,
    min: 101,
    max: 200,
    hex: "#f59e0b",
    foreground: "#1c1917",
  },
  {
    level: "poor",
    stage: 1,
    min: 201,
    max: 300,
    hex: "#ea580c",
    foreground: "#ffffff",
  },
  {
    level: "veryPoor",
    stage: 2,
    min: 301,
    max: 400,
    hex: "#dc2626",
    foreground: "#ffffff",
  },
  {
    level: "severe",
    stage: 3,
    min: 401,
    max: 450,
    hex: "#b91c1c",
    foreground: "#ffffff",
  },
  {
    level: "severePlus",
    stage: 4,
    min: 451,
    max: 500,
    hex: "#7f1d1d",
    foreground: "#ffffff",
  },
];

export const AQI_STAGES: ReadonlyArray<{
  stage: GrapStage;
  band: AqiBand;
}> = [1, 2, 3, 4].map((stage) => {
  const band = AQI_BANDS.find((item) => item.stage === stage);
  if (!band) throw new Error(`Missing AQI band for GRAP stage ${stage}`);
  return { stage: stage as GrapStage, band };
});

export const SAMPLE_AQI: AqiReading = {
  aqi: 338,
  pm25: 198,
  measuredAt: null,
  source: "sample",
};

export function clampAqi(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(Math.round(value), 0), 500);
}

export function getAqiBand(value: number): AqiBand {
  const safeValue = clampAqi(value);
  return (
    AQI_BANDS.find(
      (band) => safeValue >= band.min && safeValue <= band.max
    ) ?? AQI_BANDS[AQI_BANDS.length - 1]
  );
}

export function stageFromAqi(value: number): GrapStage {
  return getAqiBand(value).stage;
}

interface OpenMeteoAirQualityResponse {
  current?: {
    us_aqi?: number;
    pm2_5?: number;
    time?: string;
  };
}

export async function fetchDelhiAqi(
  signal?: AbortSignal
): Promise<AqiReading> {
  const url = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
  url.searchParams.set("latitude", String(DELHI_LATITUDE));
  url.searchParams.set("longitude", String(DELHI_LONGITUDE));
  url.searchParams.set("current", "us_aqi,pm2_5");
  url.searchParams.set("timezone", "Asia/Kolkata");

  const response = await fetch(url.toString(), {
    signal,
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`AQI request failed with status ${response.status}`);
  }

  const data = (await response.json()) as OpenMeteoAirQualityResponse;
  const aqi = data.current?.us_aqi;

  if (typeof aqi !== "number" || !Number.isFinite(aqi)) {
    throw new Error("AQI response did not include a valid reading");
  }

  return {
    aqi: clampAqi(aqi),
    pm25:
      typeof data.current?.pm2_5 === "number" &&
      Number.isFinite(data.current.pm2_5)
        ? Math.round(data.current.pm2_5)
        : null,
    measuredAt: data.current?.time ?? null,
    source: "live",
  };
}
