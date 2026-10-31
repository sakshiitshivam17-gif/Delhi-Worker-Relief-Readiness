import type {
  Camp,
  DocumentState,
  WorkTypeKey,
  WorkdayEntry,
} from "@/lib/types";

export const RELIEF_TARGET_DAYS = 90;
export const RELIEF_AMOUNT = 10_000;
export const SHARMIK_HELPLINE = "155214";
export const DBOCWWB_HELPLINE = "01141236600";
export const CAQM_URL = "https://caqm.nic.in/";
export const DBOCWWB_URL = "https://dbocwwb.delhi.gov.in/";
export const LAST_VERIFIED = "30 Oct 2026";

export const WORKDAY_PRESETS: ReadonlyArray<{
  id: string;
  name: string;
}> = [
  { id: "okhla", name: "Okhla" },
  { id: "anand-vihar", name: "Anand Vihar" },
  { id: "dwarka", name: "Dwarka" },
  { id: "karol-bagh", name: "Karol Bagh" },
  { id: "ito", name: "ITO" },
  { id: "lajpat-nagar", name: "Lajpat Nagar" },
];

export const WORK_TYPE_OPTIONS: ReadonlyArray<WorkTypeKey> = [
  "masonry",
  "painting",
  "concrete",
  "tiles",
  "helper",
  "electrical",
  "other",
];

export const WORK_TYPE_CANONICAL: Record<WorkTypeKey, string> = {
  masonry: "Masonry",
  painting: "Painting",
  concrete: "Concrete work",
  tiles: "Tile work",
  helper: "Helper",
  electrical: "Electrical work",
  other: "Other work",
};

export const SEED_WORKDAYS: WorkdayEntry[] = [
  {
    id: "demo-1",
    from: "2026-09-01",
    to: "2026-09-30",
    days: 30,
    worksite: "Okhla Phase II",
    workType: WORK_TYPE_CANONICAL.masonry,
    workTypeKey: "masonry",
    verifier: "DV-014",
    status: "confirmed",
    createdAt: "2026-09-30T12:00:00.000Z",
  },
  {
    id: "demo-2",
    from: "2026-07-01",
    to: "2026-08-15",
    days: 34,
    worksite: "Anand Vihar",
    workType: WORK_TYPE_CANONICAL.painting,
    workTypeKey: "painting",
    verifier: "DV-027",
    status: "confirmed",
    createdAt: "2026-08-15T12:00:00.000Z",
  },
  {
    id: "demo-3",
    from: "2026-10-01",
    to: "2026-10-08",
    days: 8,
    worksite: "Dwarka Sector 21",
    workType: WORK_TYPE_CANONICAL.tiles,
    workTypeKey: "tiles",
    status: "pending",
    createdAt: "2026-10-08T12:00:00.000Z",
  },
  {
    id: "demo-4",
    from: "2026-10-12",
    to: "2026-10-17",
    days: 6,
    worksite: "Karol Bagh",
    workType: WORK_TYPE_CANONICAL.concrete,
    workTypeKey: "concrete",
    status: "reported",
    createdAt: "2026-10-17T12:00:00.000Z",
  },
];

export const SEED_DOCUMENTS: DocumentState = {
  registration: "needsReview",
  workdays: "organised",
  supporting: "notStarted",
  renewal: "notStarted",
  notice: "needsReview",
};

export const DEMO_CAMPS: Camp[] = [
  {
    id: "kashmere-gate",
    name: "Kashmere Gate Sahayata Point",
    area: "Kashmere Gate, North Delhi",
    zone: "north",
    metro: "Kashmere Gate Metro Gate 3",
    distanceMeters: 500,
    walkMinutes: 7,
    hours: "9:30 AM – 5:30 PM",
    services: ["registration", "verification", "helpline"],
    mapsQuery: "Kashmere Gate Metro Station, Delhi",
    voiceAliases: [
      "कश्मीरी गेट",
      "काश्मीर गेट",
      "ਕਸ਼ਮੀਰੀ ਗੇਟ",
      "কাশ্মীরি গেট",
      "காஷ்மீரி கேட்",
    ],
  },
  {
    id: "okhla",
    name: "Okhla Worker Help Desk",
    area: "Okhla Phase II, South Delhi",
    zone: "south",
    metro: "Okhla NSIC Metro Gate 2",
    distanceMeters: 450,
    walkMinutes: 6,
    hours: "10:00 AM – 5:00 PM",
    services: ["registration", "documents", "verification"],
    mapsQuery: "Okhla NSIC Metro Station, New Delhi",
    voiceAliases: ["ओखला", "ਓਖਲਾ", "ওখলা", "ஒக்லா"],
  },
  {
    id: "dwarka",
    name: "Dwarka Sahayata Camp",
    area: "Dwarka Sector 21, South West Delhi",
    zone: "west",
    metro: "Dwarka Sector 21 Metro Gate 1",
    distanceMeters: 350,
    walkMinutes: 5,
    hours: "9:30 AM – 5:30 PM",
    services: ["registration", "documents", "helpline"],
    mapsQuery: "Dwarka Sector 21 Metro Station, Delhi",
    voiceAliases: ["द्वारका", "ਦਵਾਰਕਾ", "দ্বারকা", "துவாரகா"],
  },
  {
    id: "anand-vihar",
    name: "Anand Vihar Labour Facilitation Point",
    area: "Anand Vihar, East Delhi",
    zone: "east",
    metro: "Anand Vihar ISBT Metro Gate 4",
    distanceMeters: 700,
    walkMinutes: 9,
    hours: "10:00 AM – 4:30 PM",
    services: ["verification", "documents", "helpline"],
    mapsQuery: "Anand Vihar ISBT Metro Station, Delhi",
    voiceAliases: [
      "आनंद विहार",
      "ਆਨੰਦ ਵਿਹਾਰ",
      "আনন্দ বিহার",
      "ஆனந்த் விஹார்",
    ],
  },
  {
    id: "karol-bagh",
    name: "Karol Bagh Workers' Aid Point",
    area: "Karol Bagh, Central Delhi",
    zone: "central",
    metro: "Karol Bagh Metro Gate 2",
    distanceMeters: 250,
    walkMinutes: 4,
    hours: "9:30 AM – 5:00 PM",
    services: ["registration", "verification", "documents"],
    mapsQuery: "Karol Bagh Metro Station, Delhi",
    voiceAliases: [
      "करोल बाग",
      "ਕਰੋਲ ਬਾਗ",
      "করোল বাগ",
      "கரோல் பாக்",
    ],
  },
];
