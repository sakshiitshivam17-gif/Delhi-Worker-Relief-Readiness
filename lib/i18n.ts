import type { Language } from "@/lib/types";
import { bn } from "@/lib/translations/bn";
import { mr } from "@/lib/translations/mr";
import { pa } from "@/lib/translations/pa";
import { ta } from "@/lib/translations/ta";

export const DEFAULT_LANGUAGE: Language = "hinglish";

export const LANGUAGE_OPTIONS: ReadonlyArray<{
  code: Language;
  label: string;
  letter: string;
  short: string;
}> = [
  { code: "en", label: "English", letter: "A", short: "EN" },
  { code: "hinglish", label: "Hinglish", letter: "Aअ", short: "HI" },
  { code: "hi", label: "हिंदी", letter: "अ", short: "हिं" },
  { code: "pa", label: "ਪੰਜਾਬੀ", letter: "ਪ", short: "ਪੰ" },
  { code: "mr", label: "मराठी", letter: "म", short: "मरा" },
  { code: "bn", label: "বাংলা", letter: "ব", short: "বাং" },
  { code: "ta", label: "தமிழ்", letter: "த", short: "தமி" },
];

const en = {
  common: {
    brand: "Worker Saathi",
    tagline: "Delhi worker relief companion",
    language: "Choose language",
    listen: "Listen",
    stop: "Stop",
    close: "Close",
    cancel: "Cancel",
    save: "Save",
    back: "Back",
    next: "Next",
    refresh: "Refresh",
    retry: "Try again",
    viewAll: "View all",
    day: "day",
    days: "days",
    daysCount: "{count} days",
    today: "Today",
    call: "Call",
    directions: "Directions",
    demo: "Demo",
    sampleData: "Sample data · saved on this device",
    notVerified: "Not officially verified",
    skipToContent: "Skip to main content",
    mainNav: "Main navigation",
    helpline: "Shramik Helpline",
    helplineNumber: "155214",
    officialWarning:
      "A preparation tool — not a government portal. Relief is not guaranteed.",
    a11yListen: "Listen to this text",
    a11yStop: "Stop reading",
    percent: "{percent}%",
  },
  nav: {
    home: "Home",
    workdays: "Workdays",
    checklist: "Checklist",
    camps: "Camps",
    updates: "Updates",
    ariaLabel: "Main navigation",
  },
  header: {
    homeLink: "Worker Saathi home",
    help: "Audio help",
  },
  home: {
    greeting: "Namaste, saathi",
    title: "Your work. Your rights. Your next step.",
    body: "Work stopped because of GRAP? Do not wait. Get your workdays and papers ready today.",
    primaryCta: "Check relief readiness",
    secondaryCta: "See my workdays",
    statusLine: "Saved on this phone only",
    relief: {
      eyebrow: "₹10,000 relief readiness",
      title: "Your confirmed workdays",
      subtitle: "Keep a record of every day you work.",
      confirmedLabel: "Workdays confirmed",
      targetLabel: "of {target} days in this demo",
      percentLabel: "{percent}% ready",
      pendingLabel: "{days} days waiting",
      note: "Demo goal only. Check the current official rule before applying.",
      cta: "Open workdays",
    },
    stats: {
      confirmed: "Confirmed",
      waiting: "Waiting for verifier",
      papers: "Papers organised",
    },
    actionsTitle: "What do you need?",
    actionsSubtitle: "Everything is one tap away.",
    nextStep: {
      eyebrow: "Your next step",
      pendingTitle: "Get pending days confirmed",
      pendingBody:
        "{days} workdays are still waiting for a verifier. Take your records to a help camp.",
      docsTitle: "Finish your papers",
      docsBody: "{count} checklist items still need attention.",
      readyTitle: "You are organised",
      readyBody:
        "Your records look ready. Check the latest GRAP notice before relying on any news.",
      pendingCta: "Open workdays",
      docsCta: "Open checklist",
      readyCta: "Check updates",
    },
    actions: {
      workdays: {
        title: "My workdays",
        description:
          "Log today's work and see what a verifier has confirmed.",
        meta: "{count} days recorded",
      },
      checklist: {
        title: "Papers checklist",
        description: "Know what is ready and what is still missing.",
        meta: "{organised}/5 organised",
      },
      camps: {
        title: "Help camps",
        description: "Find a nearby help desk, call, and get directions.",
        meta: "Helpline {helpline}",
      },
      updates: {
        title: "GRAP updates",
        description: "Check official notices before trusting any news.",
        meta: "Last checked {date}",
      },
      readiness: {
        title: "Relief readiness",
        description: "Answer 4 simple questions and get your next step.",
        meta: "4 quick questions",
      },
    },
    disclaimerTitle: "Please remember",
    disclaimerBody:
      "This app helps you organise records. It does not approve relief or decide eligibility. Always check the latest official notice.",
    footer: "Made for Delhi's construction workers.",
  },
  aqi: {
    eyebrow: "Delhi air · live",
    title: "AQI & GRAP status",
    subtitle:
      "Colour shows today's air. The GRAP stage shown is indicative.",
    readingLabel: "Delhi AQI",
    location: "New Delhi, Delhi",
    stageLabel: "Indicative GRAP",
    stageShort: "Stage {stage}",
    updated: "Updated {time}",
    updatedUnknown: "Update time unavailable",
    live: "Live data",
    sample: "Sample reading",
    refresh: "Refresh AQI",
    refreshing: "Refreshing…",
    loadFailed: "Live reading unavailable. Showing a sample.",
    gaugeLabel: "Air quality index from 0 to 500",
    level: {
      good: "Good",
      satisfactory: "Satisfactory",
      moderate: "Moderate",
      poor: "Poor",
      veryPoor: "Very poor",
      severe: "Severe",
      severePlus: "Severe plus",
    },
    stageNames: {
      0: "No GRAP stage",
      1: "Stage I",
      2: "Stage II",
      3: "Stage III",
      4: "Stage IV",
    },
    stageMeansTitle: "What does this stage mean?",
    stageMeans: {
      0: "No GRAP stage is indicated by the AQI. Keep your records ready and check official notices.",
      1: "Some construction work may be restricted. Keep your registration and workday proof ready.",
      2: "More construction restrictions may apply. Record every working day and visit a help camp.",
      3: "Most construction work may stop. Relief steps become urgent. Follow the official order.",
      4: "Emergency restrictions may apply. Use the helpline and official notices for next steps.",
    },
    showStages: "See all stages",
    hideStages: "Hide stages",
    source:
      "Air quality data: Open-Meteo. GRAP stage is not an official order.",
    openCaqm: "Open CAQM official website",
    warning:
      "AQI alone does not confirm that a GRAP stage is activated. Check CAQM before acting.",
    stagesAria: "GRAP stage information",
    pm25: "PM2.5",
  },
  workdays: {
    title: "My workdays",
    subtitle:
      "Log each day you work. Only verifier-confirmed days are marked green.",
    demo: "Sample records · saved on this device",
    reported: "Days reported",
    confirmed: "Days confirmed",
    waiting: "Waiting for verifier",
    addCta: "Add today's work",
    goalTitle: "Relief goal",
    goalBody:
      "{confirmed} of {target} days confirmed for ₹10,000 relief readiness",
    goalNote: "Demo goal. The official requirement may differ.",
    progressLabel: "Confirmed workdays",
    recordsTitle: "Your work timeline",
    filtersAria: "Filter workday records",
    filterAll: "All",
    filterConfirmed: "Confirmed",
    filterWaiting: "Waiting",
    filterReported: "Reported",
    empty: "No work records match this filter.",
    emptyHint: "Tap “Add today's work” to create your first record.",
    status: {
      confirmed: "Confirmed",
      pending: "Pending verifier",
      reported: "Reported",
      correction: "Correction requested",
    },
    statusHelp: {
      confirmed: "A verifier has confirmed these days.",
      pending: "A confirmation request is waiting with a verifier.",
      reported: "You reported this work. A verifier has not confirmed it yet.",
      correction: "This record is flagged for correction.",
    },
    action: {
      request: "Request confirmation",
      flag: "Flag for review",
      correction: "Request correction",
    },
    verifier: "Verifier: {id}",
    legendTitle: "What the colours mean",
    disclaimer:
      "These are sample records. Reported days are not the same as confirmed days. This tracker does not decide eligibility.",
    notice: {
      added:
        "Work record saved on this device. It is waiting for verifier confirmation.",
      requested:
        "Demo only: confirmation request recorded locally. No message was sent.",
      flagged: "Demo only: this record is flagged locally for review.",
      correction: "Demo only: correction request recorded locally.",
    },
  },
  quickEntry: {
    title: "Log today's work",
    subtitle: "It takes one minute. You can change the date.",
    worksite: "Where did you work?",
    worksiteHint: "Choose a worksite or type your own.",
    customWorksite: "Type worksite name",
    customWorksitePlaceholder: "For example: Narela",
    workType: "What work did you do?",
    customWorkType: "Type work type",
    customWorkTypePlaceholder: "For example: Steel fixing",
    date: "Work date",
    days: "How many days?",
    decreaseDays: "One day less",
    increaseDays: "One day more",
    endDate: "Ends {date}",
    save: "Save my workday",
    requiredSite: "Choose or type a worksite.",
    requiredType: "Choose or type a work type.",
    requiredDate: "Choose a valid work date.",
    requiredDays: "Enter between 1 and 31 days.",
    note:
      "Saved as worker-reported. It shows a blue dot until a verifier confirms it.",
    worksites: {
      okhla: "Okhla",
      anandVihar: "Anand Vihar",
      dwarka: "Dwarka",
      karolBagh: "Karol Bagh",
      ito: "ITO",
      lajpatNagar: "Lajpat Nagar",
      other: "Other",
    },
    workTypes: {
      masonry: "Masonry",
      painting: "Painting",
      concrete: "Concrete",
      tiles: "Tiles",
      helper: "Helper",
      electrical: "Electrical",
      other: "Other",
    },
  },
  checklist: {
    title: "Papers & evidence",
    subtitle: "Organise one thing at a time. Nothing is uploaded.",
    demo: "Sample checklist · saved on this device",
    progress: "Checklist progress",
    organisedCount: "{organised} of 5 organised",
    items: {
      registration: {
        title: "Registration details",
        description:
          "Keep your DBOCWWB registration or renewal details handy.",
      },
      workdays: {
        title: "Workday evidence",
        description:
          "Collect work dates, worksites and any record you already have.",
      },
      supporting: {
        title: "Supporting work proof",
        description:
          "Keep references to work records. Check which proof officials accept.",
      },
      renewal: {
        title: "Renewal information",
        description: "Check whether your registration needs renewal.",
      },
      notice: {
        title: "Latest GRAP notice",
        description:
          "Check the official source and date before trusting any relief news.",
      },
    },
    status: {
      organised: "Organised",
      needsReview: "Needs review",
      notStarted: "Not started",
    },
    markOrganised: "Mark as organised",
    markReview: "Move back to review",
    note:
      "This is your personal organiser, not an official document list. No document is uploaded or sent anywhere.",
    helpCta: "Ask at a help camp",
  },
  camps: {
    title: "Find a help camp",
    subtitle: "Demo help points near Delhi Metro. Call before you travel.",
    demo: "Demo listings · not real camps",
    searchLabel: "Search by area, camp or metro station",
    searchPlaceholder: "For example: Kashmere Gate",
    clearSearch: "Clear search",
    filterAria: "Filter help camps by zone",
    zones: {
      all: "All",
      north: "North",
      south: "South",
      east: "East",
      west: "West",
      central: "Central",
    },
    results: "{count} help points",
    fromMetro: "{distance} from {metro}",
    walk: "{minutes} min walk",
    hours: "Open hours",
    services: "What they help with",
    serviceLabels: {
      registration: "Registration",
      verification: "Workday verification",
      documents: "Document guidance",
      helpline: "Helpline support",
    },
    call: "Call helpline",
    callAria: "Call Shramik Helpline {number}",
    directions: "Get directions",
    directionsAria: "Open directions to {camp}",
    noResults: "No help points match your search.",
    noResultsHint: "Try a different area or clear the search.",
    note:
      "These are demo help points for testing. Confirm the real camp location, timing and contact with the Delhi Labour Department before visiting.",
    helplineTitle: "Need to speak to someone now?",
    helplineBody:
      "Shramik Helpline is run by the Delhi Labour Department. Timings and support may change.",
    boardTitle: "DBOCWWB 24x7 helpline",
    openBoard: "Open DBOCWWB website",
  },
  updates: {
    title: "GRAP & relief updates",
    subtitle:
      "Check official information before acting on any forwarded message.",
    demo: "Manually checked demo · not live",
    officialStatus: "Official GRAP status",
    unverified: "Awaiting official verification",
    statusBody:
      "A CAQM order dated 21 Oct 2026 is listed for Stage-I implementation. A newer order or revocation may exist. Check CAQM before treating this as current.",
    source: "Official source",
    sourceValue: "Commission for Air Quality Management (CAQM)",
    published: "Latest stage order listed",
    publishedValue: "21 Oct 2026 · Stage-I implementation",
    checked: "Page checked",
    checkedValue: "30 Oct 2026 · active stage unconfirmed",
    openCaqm: "Open official CAQM website",
    reliefTitle: "₹10,000 relief information",
    reliefBody:
      "Earlier announcements mentioned ₹10,000 assistance for eligible construction workers. The current scheme status, conditions and payment are not confirmed by this app.",
    stepsTitle: "What should you do now?",
    steps: [
      "Check the latest CAQM notice.",
      "Keep registration and workday proof organised.",
      "Ask an authorised help desk if anything is unclear.",
    ],
    warning:
      "AQI alone does not activate GRAP. This app does not guarantee relief or decide eligibility.",
    timelineTitle: "What we checked",
    timeline: [
      {
        date: "21 Oct 2026",
        title: "Stage-I order listed",
        body: "A CAQM order for Stage-I implementation is listed on the official site.",
      },
      {
        date: "30 Oct 2026",
        title: "Active stage not confirmed",
        body: "No manual verification of a newer stage or revocation yet.",
      },
    ],
    boardTitle: "Official DBOCWWB website",
    boardBody:
      "Check current registration and welfare scheme information directly with the Board.",
    helplineTitle: "Call Shramik Helpline",
    helplineBody:
      "For wage, termination or labour-law help: 155214 (9:30 AM – 6:00 PM, Mon–Sat).",
  },
  readiness: {
    title: "Relief readiness check",
    subtitle:
      "Answer four simple questions. This check does not decide eligibility.",
    progress: "Question {current} of {total}",
    back: "Back",
    next: "Next question",
    review: "Review answers",
    summaryTitle: "Your answers",
    summaryNote:
      "Use these answers to plan your next step. They do not confirm official eligibility or payment.",
    nextSteps: "Suggested next steps",
    restart: "Start again",
    findCamp: "Find a help camp",
    checkUpdates: "Check official updates",
    demo: "Saved only on this device",
    questions: [
      {
        title: "Are you registered with the DBOCWWB?",
        hint: "Choose what is true for you today.",
        options: ["Yes", "No", "Not sure"],
      },
      {
        title: "Do you have a record of your construction workdays?",
        hint: "The official workday rule must be checked against current notices.",
        options: ["Yes, full record", "Some records", "No record yet", "Not sure"],
      },
      {
        title: "Do you have proof of your construction work?",
        hint: "Choose what you can show or arrange.",
        options: ["Yes", "Some proof", "No proof yet", "Not sure"],
      },
      {
        title: "Have you checked the latest official GRAP or relief notice?",
        hint: "Check an official source before trusting a forwarded message.",
        options: ["Yes", "No", "Not sure"],
      },
    ],
    advice: {
      registrationNo:
        "Ask an authorised help desk how to check or start your DBOCWWB registration.",
      registrationUnsure:
        "Confirm your DBOCWWB registration with an authorised help desk.",
      workdays:
        "Organise your workday records and identify days that still need a verifier.",
      documents:
        "Organise your available work proof and check which documents officials accept.",
      notice:
        "Open the latest CAQM and DBOCWWB notices before relying on any relief news.",
      default:
        "Keep your records organised and re-check official rules before your next step.",
    },
  },
  consent: {
    label: "Worker Saathi · Privacy",
    title: "Before you start",
    intro:
      "Please read these four points. It will take less than a minute.",
    points: [
      {
        title: "What this app does",
        body: "It helps you organise registration details, workday records and supporting proof.",
      },
      {
        title: "Where your data stays",
        body: "In this demo, records stay in this browser on this phone. Nothing is uploaded to a cloud account.",
      },
      {
        title: "Protect yourself",
        body: "Do not enter Aadhaar numbers, bank details or other sensitive personal information.",
      },
      {
        title: "Relief decisions",
        body: "This app does not approve ₹10,000 relief or decide eligibility. Only the government can do that.",
      },
    ],
    agree: "I have read and understood these points.",
    accept: "I agree, start check",
    cancel: "Go back home",
    listen: "Listen to this page",
  },
  footer: {
    disclaimer:
      "A preparation and tracking tool — not a government portal.",
    helpline: "Shramik Helpline",
    officialSources: "Official sources",
  },
};

export type Dictionary = typeof en;

const hinglish: Dictionary = {
  common: {
    brand: "Worker Saathi",
    tagline: "Delhi worker relief ka saathi",
    language: "Apni bhasha chuno",
    listen: "Suno",
    stop: "Roko",
    close: "Band karo",
    cancel: "Cancel",
    save: "Save karo",
    back: "Peeche",
    next: "Aage",
    refresh: "Refresh",
    retry: "Dobara try karo",
    viewAll: "Sab dekho",
    day: "din",
    days: "din",
    daysCount: "{count} din",
    today: "Aaj",
    call: "Call",
    directions: "Raasta",
    demo: "Demo",
    sampleData: "Sample data · sirf isi phone par saved",
    notVerified: "Official verify nahi hua",
    skipToContent: "Seedha main content par jao",
    mainNav: "Main navigation",
    helpline: "Shramik Helpline",
    helplineNumber: "155214",
    officialWarning:
      "Yeh taiyari ka tool hai — government portal nahi. Relief ki guarantee nahi hai.",
    a11yListen: "Yeh text suno",
    a11yStop: "Padhna roko",
    percent: "{percent}%",
  },
  nav: {
    home: "Home",
    workdays: "Kaam",
    checklist: "Kagaz",
    camps: "Camps",
    updates: "Updates",
    ariaLabel: "Main navigation",
  },
  header: {
    homeLink: "Worker Saathi home",
    help: "Audio help",
  },
  home: {
    greeting: "Namaste, saathi",
    title: "Aapka kaam. Aapka haq. Agla kadam.",
    body: "GRAP ki wajah se kaam band hai? Der mat karo. Aaj hi apne kaam ke din aur kagaz taiyar karo.",
    primaryCta: "Relief taiyari check karo",
    secondaryCta: "Mere workdays dekho",
    statusLine: "Sirf isi phone par saved",
    relief: {
      eyebrow: "₹10,000 relief ki taiyari",
      title: "Aapke confirm workdays",
      subtitle: "Jo din kaam kiya, uska record rakho.",
      confirmedLabel: "Confirm workdays",
      targetLabel: "{target} din mein se (demo)",
      percentLabel: "{percent}% taiyar",
      pendingLabel: "{days} din baaki",
      note: "Sirf demo target. Apply karne se pehle current official niyam check karo.",
      cta: "Workdays kholo",
    },
    stats: {
      confirmed: "Confirmed",
      waiting: "Verifier ka wait",
      papers: "Kagaz taiyar",
    },
    actionsTitle: "Aapko kya chahiye?",
    actionsSubtitle: "Har cheez ek tap par.",
    nextStep: {
      eyebrow: "Aapka agla kadam",
      pendingTitle: "Pending dinon ki confirmation lo",
      pendingBody:
        "{days} workdays abhi verifier ke paas confirmation ka wait kar rahe hain. Kagaz le kar help camp jao.",
      docsTitle: "Kagaz pura karo",
      docsBody: "{count} checklist items par abhi dhyan dena hai.",
      readyTitle: "Aap taiyar ho",
      readyBody:
        "Aapke records taiyar lag rahe hain. Kisi bhi news par bharosa karne se pehle latest GRAP notice check karo.",
      pendingCta: "Workdays kholo",
      docsCta: "Checklist kholo",
      readyCta: "Updates dekho",
    },
    actions: {
      workdays: {
        title: "Mere workdays",
        description:
          "Aaj ka kaam likho aur dekho kis din verifier ne confirm kiya.",
        meta: "{count} din record hue",
      },
      checklist: {
        title: "Kagaz checklist",
        description: "Kya taiyar hai aur kya baaki hai, samjho.",
        meta: "{organised}/5 taiyar",
      },
      camps: {
        title: "Help camps",
        description: "Paas ka help desk dhoondo, call karo, raasta dekho.",
        meta: "Helpline {helpline}",
      },
      updates: {
        title: "GRAP updates",
        description:
          "Kisi bhi news par bharosa karne se pehle official notice dekho.",
        meta: "Last check {date}",
      },
      readiness: {
        title: "Relief taiyari",
        description: "4 aasan sawal, phir agla kadam.",
        meta: "4 chhote sawal",
      },
    },
    disclaimerTitle: "Yeh zaroor yaad rakho",
    disclaimerBody:
      "Yeh app records organise karne mein madad karti hai. Relief approve nahi karti aur eligibility decide nahi karti. Latest official notice zaroor check karo.",
    footer: "Delhi ke construction workers ke liye.",
  },
  aqi: {
    eyebrow: "Delhi ki hawa · live",
    title: "AQI aur GRAP status",
    subtitle:
      "Rang aaj ki hawa dikhata hai. Dikhaaya gaya GRAP stage sirf andaza hai.",
    readingLabel: "Delhi AQI",
    location: "New Delhi, Delhi",
    stageLabel: "Andaza GRAP",
    stageShort: "Stage {stage}",
    updated: "Update {time}",
    updatedUnknown: "Update ka time nahi mila",
    live: "Live data",
    sample: "Sample reading",
    refresh: "AQI refresh karo",
    refreshing: "Refresh ho raha hai…",
    loadFailed: "Live reading nahi mili. Sample dikha rahe hain.",
    gaugeLabel: "Air quality index zero se 500 tak",
    level: {
      good: "Good",
      satisfactory: "Satisfactory",
      moderate: "Moderate",
      poor: "Poor",
      veryPoor: "Bahut kharab",
      severe: "Severe",
      severePlus: "Severe plus",
    },
    stageNames: {
      0: "Koi GRAP stage nahi",
      1: "Stage I",
      2: "Stage II",
      3: "Stage III",
      4: "Stage IV",
    },
    stageMeansTitle: "Is stage ka matlab kya hai?",
    stageMeans: {
      0: "AQI se koi GRAP stage nahi dikh rahi. Records taiyar rakho aur official notice check karo.",
      1: "Kuch construction kaam par rok lag sakti hai. Registration aur workday proof taiyar rakho.",
      2: "Zyada construction restrictions lag sakti hain. Har kaam ka din likho aur help camp jao.",
      3: "Zyadatar construction kaam band ho sakta hai. Relief ke steps zaroori ho jaate hain. Official order follow karo.",
      4: "Emergency restrictions lag sakti hain. Agle kadam ke liye helpline aur official notice use karo.",
    },
    showStages: "Saare stages dekho",
    hideStages: "Stages chhupao",
    source:
      "Hawa ka data: Open-Meteo. GRAP stage official order nahi hai.",
    openCaqm: "CAQM ki official website kholo",
    warning:
      "Sirf AQI se GRAP stage activate hone ki pushti nahi hoti. Koi kadam lene se pehle CAQM check karo.",
    stagesAria: "GRAP stage ki jaankari",
    pm25: "PM2.5",
  },
  workdays: {
    title: "Mere workdays",
    subtitle:
      "Har kaam ka din likho. Sirf verifier-confirmed din green dikhte hain.",
    demo: "Sample records · sirf isi device par saved",
    reported: "Reported din",
    confirmed: "Confirmed din",
    waiting: "Verifier ka wait",
    addCta: "Aaj ka kaam likho",
    goalTitle: "Relief goal",
    goalBody:
      "{target} mein se {confirmed} din confirm — ₹10,000 relief ki taiyari",
    goalNote: "Demo goal. Official requirement alag ho sakti hai.",
    progressLabel: "Confirm workdays",
    recordsTitle: "Aapka kaam timeline",
    filtersAria: "Workday records filter karo",
    filterAll: "Sab",
    filterConfirmed: "Confirmed",
    filterWaiting: "Wait",
    filterReported: "Reported",
    empty: "Is filter mein koi record nahi.",
    emptyHint: "“Aaj ka kaam likho” dabao aur pehla record banao.",
    status: {
      confirmed: "Confirmed",
      pending: "Verifier pending",
      reported: "Reported",
      correction: "Correction maangi",
    },
    statusHelp: {
      confirmed: "Verifier ne in dinon ko confirm kiya hai.",
      pending: "Confirmation request verifier ke paas wait kar rahi hai.",
      reported: "Aapne yeh kaam report kiya hai. Verifier ne abhi confirm nahi kiya.",
      correction: "Yeh record correction ke liye flag hai.",
    },
    action: {
      request: "Confirmation maango",
      flag: "Review ke liye flag karo",
      correction: "Correction maango",
    },
    verifier: "Verifier: {id}",
    legendTitle: "Rang ka matlab",
    disclaimer:
      "Yeh sample records hain. Reported din aur confirmed din alag hain. Yeh tracker eligibility decide nahi karta.",
    notice: {
      added:
        "Kaam ka record is device par save ho gaya. Verifier confirmation ka wait hai.",
      requested:
        "Sirf demo: confirmation request locally darj hui. Koi message nahi bheja gaya.",
      flagged: "Sirf demo: record locally review ke liye flag hua.",
      correction: "Sirf demo: correction request locally darj hui.",
    },
  },
  quickEntry: {
    title: "Aaj ka kaam likho",
    subtitle: "Ek minute lagega. Taareekh badal bhi sakte ho.",
    worksite: "Kaam kahan kiya?",
    worksiteHint: "Jagah chuno ya apni likho.",
    customWorksite: "Kaam ki jagah likho",
    customWorksitePlaceholder: "Jaise: Narela",
    workType: "Kya kaam kiya?",
    customWorkType: "Kaam ka type likho",
    customWorkTypePlaceholder: "Jaise: Steel fixing",
    date: "Kaam ki taareekh",
    days: "Kitne din kaam kiya?",
    decreaseDays: "Ek din kam",
    increaseDays: "Ek din zyada",
    endDate: "{date} tak",
    save: "Mera workday save karo",
    requiredSite: "Kaam ki jagah chuno ya likho.",
    requiredType: "Kaam ka type chuno ya likho.",
    requiredDate: "Sahi kaam ki taareekh chuno.",
    requiredDays: "1 se 31 din ke beech chuno.",
    note:
      "Worker-reported ke roop mein save hoga. Verifier confirm karega tab green hoga.",
    worksites: {
      okhla: "Okhla",
      anandVihar: "Anand Vihar",
      dwarka: "Dwarka",
      karolBagh: "Karol Bagh",
      ito: "ITO",
      lajpatNagar: "Lajpat Nagar",
      other: "Doosri jagah",
    },
    workTypes: {
      masonry: "Chunai",
      painting: "Putai",
      concrete: "Concrete",
      tiles: "Tiles",
      helper: "Helper",
      electrical: "Bijli ka kaam",
      other: "Doosra kaam",
    },
  },
  checklist: {
    title: "Kagaz aur proof",
    subtitle: "Ek-ek cheez organise karo. Kuch upload nahi hota.",
    demo: "Sample checklist · isi device par saved",
    progress: "Checklist progress",
    organisedCount: "5 mein se {organised} taiyar",
    items: {
      registration: {
        title: "Registration details",
        description:
          "DBOCWWB registration ya renewal ki details paas rakho.",
      },
      workdays: {
        title: "Kaam ke dinon ka proof",
        description:
          "Kaam ki dates, jagah aur jo record hai, sab ikattha karo.",
      },
      supporting: {
        title: "Kaam ka doosra proof",
        description:
          "Work records ka reference rakho. Official kaun sa proof maante hain, check karo.",
      },
      renewal: {
        title: "Renewal ki jaankari",
        description: "Check karo ki registration renewal chahiye ya nahi.",
      },
      notice: {
        title: "Latest GRAP notice",
        description:
          "Kisi relief news par bharosa karne se pehle official source aur date dekho.",
      },
    },
    status: {
      organised: "Taiyar",
      needsReview: "Check karna hai",
      notStarted: "Shuru nahi",
    },
    markOrganised: "Taiyar mark karo",
    markReview: "Wapas review mein daalo",
    note:
      "Yeh aapka personal organiser hai, official document list nahi. Koi document upload ya send nahi hota.",
    helpCta: "Help camp par poochho",
  },
  camps: {
    title: "Help camp dhoondo",
    subtitle:
      "Delhi Metro ke paas demo help points. Jaane se pehle call karo.",
    demo: "Demo listings · real camps nahi",
    searchLabel: "Area, camp ya metro station se search karo",
    searchPlaceholder: "Jaise: Kashmere Gate",
    clearSearch: "Search clear karo",
    filterAria: "Zone se help camps filter karo",
    zones: {
      all: "Sab",
      north: "North",
      south: "South",
      east: "East",
      west: "West",
      central: "Central",
    },
    results: "{count} help points",
    fromMetro: "{metro} se {distance}",
    walk: "{minutes} min paidal",
    hours: "Khulne ka time",
    services: "Kis cheez mein madad",
    serviceLabels: {
      registration: "Registration",
      verification: "Workday verification",
      documents: "Document guidance",
      helpline: "Helpline support",
    },
    call: "Helpline par call",
    callAria: "Shramik Helpline {number} par call karo",
    directions: "Raasta dekho",
    directionsAria: "{camp} ka raasta kholo",
    noResults: "Search se koi help point nahi mila.",
    noResultsHint: "Doosra area try karo ya search clear karo.",
    note:
      "Yeh testing ke liye demo help points hain. Jaane se pehle Delhi Labour Department se asli camp, time aur contact confirm karo.",
    helplineTitle: "Abhi kisi se baat karni hai?",
    helplineBody:
      "Shramik Helpline Delhi Labour Department chalata hai. Time aur support badal sakte hain.",
    boardTitle: "DBOCWWB 24x7 helpline",
    openBoard: "DBOCWWB website kholo",
  },
  updates: {
    title: "GRAP aur relief updates",
    subtitle:
      "Kisi forwarded message par kaam karne se pehle official jaankari check karo.",
    demo: "Manual check kiya demo · live nahi",
    officialStatus: "Official GRAP status",
    unverified: "Official verification baaki",
    statusBody:
      "CAQM ka 21 Oct 2026 ka order Stage-I implementation ke liye listed hai. Naya order ya revocation bhi ho sakta hai. Ise current maanne se pehle CAQM check karo.",
    source: "Official source",
    sourceValue: "Commission for Air Quality Management (CAQM)",
    published: "Latest stage order",
    publishedValue: "21 Oct 2026 · Stage-I implementation",
    checked: "Page kab check kiya",
    checkedValue: "30 Oct 2026 · active stage unconfirmed",
    openCaqm: "CAQM ki official website kholo",
    reliefTitle: "₹10,000 relief ki jaankari",
    reliefBody:
      "Pehle ki announcements mein eligible construction workers ke liye ₹10,000 assistance ka zikr tha. Scheme ka current status, conditions aur payment yeh app confirm nahi karta.",
    stepsTitle: "Ab aapko kya karna chahiye?",
    steps: [
      "Latest CAQM notice check karo.",
      "Registration aur workday proof taiyar rakho.",
      "Kuch samajh na aaye toh authorised help desk se poochho.",
    ],
    warning:
      "Sirf AQI se GRAP activate nahi hota. Yeh app relief ki guarantee nahi deta aur eligibility decide nahi karta.",
    timelineTitle: "Humne kya check kiya",
    timeline: [
      {
        date: "21 Oct 2026",
        title: "Stage-I order listed",
        body: "Official site par Stage-I implementation ka CAQM order listed hai.",
      },
      {
        date: "30 Oct 2026",
        title: "Active stage confirm nahi",
        body: "Naye stage ya revocation ki manual verification abhi nahi hui.",
      },
    ],
    boardTitle: "Official DBOCWWB website",
    boardBody:
      "Registration aur welfare scheme ki current jaankari seedha Board se check karo.",
    helplineTitle: "Shramik Helpline par call karo",
    helplineBody:
      "Wage, termination ya labour-law help ke liye: 155214 (9:30 AM – 6:00 PM, Mon–Sat).",
  },
  readiness: {
    title: "Relief taiyari check",
    subtitle:
      "Char aasan sawal ke jawab do. Yeh check eligibility decide nahi karta.",
    progress: "Sawal {current} / {total}",
    back: "Peeche",
    next: "Agla sawal",
    review: "Jawab dekho",
    summaryTitle: "Aapke jawab",
    summaryNote:
      "In jawabon se apna agla kadam plan karo. Yeh official eligibility ya payment confirm nahi karte.",
    nextSteps: "Sujhaaye gaye agle kadam",
    restart: "Dobara shuru karo",
    findCamp: "Help camp dhoondo",
    checkUpdates: "Official updates dekho",
    demo: "Sirf isi device par saved",
    questions: [
      {
        title: "Kya aap DBOCWWB mein registered ho?",
        hint: "Aaj jo sach hai, woh chuno.",
        options: ["Haan", "Nahi", "Pakka nahi"],
      },
      {
        title: "Kya aapke paas construction workdays ka record hai?",
        hint: "Official workday rule current notices se check karni hogi.",
        options: ["Haan, pura record", "Kuch record", "Abhi record nahi", "Pakka nahi"],
      },
      {
        title: "Kya aapke paas construction kaam ka proof hai?",
        hint: "Jo aap dikha sakte ho ya arrange kar sakte ho, woh chuno.",
        options: ["Haan", "Kuch proof", "Abhi proof nahi", "Pakka nahi"],
      },
      {
        title: "Kya aapne latest official GRAP ya relief notice check kiya?",
        hint: "Kisi forwarded message par bharosa karne se pehle official source dekho.",
        options: ["Haan", "Nahi", "Pakka nahi"],
      },
    ],
    advice: {
      registrationNo:
        "Authorised help desk se poochho ki DBOCWWB registration kaise check ya shuru karein.",
      registrationUnsure:
        "Authorised help desk se apni DBOCWWB registration confirm karo.",
      workdays:
        "Workday records organise karo aur jin dinon ko verifier chahiye unhe identify karo.",
      documents:
        "Available work proof organise karo aur check karo official kaun se documents maante hain.",
      notice:
        "Kisi relief news par bharosa karne se pehle latest CAQM aur DBOCWWB notice kholo.",
      default:
        "Records organised rakho aur agla kadam lene se pehle official rules dobara check karo.",
    },
  },
  consent: {
    label: "Worker Saathi · Privacy",
    title: "Shuru karne se pehle",
    intro: "Yeh char points padho. Ek minute se kam lagega.",
    points: [
      {
        title: "Yeh app kya karti hai",
        body: "Registration details, workday records aur supporting proof organise karne mein madad karti hai.",
      },
      {
        title: "Aapka data kahan rehta hai",
        body: "Is demo mein records isi phone ke browser mein rehte hain. Cloud account par kuch upload nahi hota.",
      },
      {
        title: "Apna bachav karo",
        body: "Aadhaar number, bank details ya doosri sensitive personal jaankari mat daalo.",
      },
      {
        title: "Relief ka decision",
        body: "Yeh app ₹10,000 relief approve nahi karti aur eligibility decide nahi karti. Sirf government yeh kar sakti hai.",
      },
    ],
    agree: "Maine yeh points padh aur samajh liye hain.",
    accept: "Sahmat hoon, check shuru karo",
    cancel: "Home wapas jao",
    listen: "Yeh page suno",
  },
  footer: {
    disclaimer: "Taiyari aur tracking ka tool — government portal nahi.",
    helpline: "Shramik Helpline",
    officialSources: "Official sources",
  },
};

const hi: Dictionary = {
  common: {
    brand: "वर्कर साथी",
    tagline: "दिल्ली श्रमिक सहायता साथी",
    language: "अपनी भाषा चुनें",
    listen: "सुनें",
    stop: "रोकें",
    close: "बंद करें",
    cancel: "रद्द करें",
    save: "सेव करें",
    back: "पीछे",
    next: "आगे",
    refresh: "रिफ़्रेश",
    retry: "दोबारा कोशिश करें",
    viewAll: "सब देखें",
    day: "दिन",
    days: "दिन",
    daysCount: "{count} दिन",
    today: "आज",
    call: "कॉल",
    directions: "रास्ता",
    demo: "डेमो",
    sampleData: "नमूना डेटा · सिर्फ़ इसी फ़ोन पर सेव",
    notVerified: "आधिकारिक सत्यापन नहीं",
    skipToContent: "सीधे मुख्य सामग्री पर जाएँ",
    mainNav: "मुख्य नेविगेशन",
    helpline: "श्रमिक हेल्पलाइन",
    helplineNumber: "155214",
    officialWarning:
      "यह तैयारी का टूल है — सरकारी पोर्टल नहीं। सहायता की गारंटी नहीं है।",
    a11yListen: "यह टेक्स्ट सुनें",
    a11yStop: "पढ़ना रोकें",
    percent: "{percent}%",
  },
  nav: {
    home: "होम",
    workdays: "काम",
    checklist: "कागज़",
    camps: "शिविर",
    updates: "अपडेट",
    ariaLabel: "मुख्य नेविगेशन",
  },
  header: {
    homeLink: "वर्कर साथी होम",
    help: "ऑडियो सहायता",
  },
  home: {
    greeting: "नमस्ते, साथी",
    title: "आपका काम। आपका हक़। अगला कदम।",
    body: "GRAP की वजह से काम बंद है? देर न करें। आज ही अपने काम के दिन और कागज़ तैयार करें।",
    primaryCta: "सहायता की तैयारी जाँचें",
    secondaryCta: "मेरे काम के दिन देखें",
    statusLine: "सिर्फ़ इसी फ़ोन पर सेव",
    relief: {
      eyebrow: "₹10,000 सहायता की तैयारी",
      title: "आपके पक्के कार्यदिवस",
      subtitle: "जिस दिन काम किया, उसका रिकॉर्ड रखें।",
      confirmedLabel: "पक्के कार्यदिवस",
      targetLabel: "{target} दिनों में से (डेमो)",
      percentLabel: "{percent}% तैयार",
      pendingLabel: "{days} दिन बाकी",
      note: "सिर्फ़ डेमो लक्ष्य। आवेदन से पहले मौजूदा आधिकारिक नियम जाँचें।",
      cta: "कार्यदिवस खोलें",
    },
    stats: {
      confirmed: "पक्के",
      waiting: "सत्यापन बाकी",
      papers: "कागज़ तैयार",
    },
    actionsTitle: "आपको क्या चाहिए?",
    actionsSubtitle: "हर चीज़ एक टैप पर।",
    nextStep: {
      eyebrow: "आपका अगला कदम",
      pendingTitle: "बाकी दिनों का सत्यापन कराएँ",
      pendingBody:
        "{days} कार्यदिवस अभी सत्यापनकर्ता के पास हैं। कागज़ लेकर सहायता शिविर जाएँ।",
      docsTitle: "कागज़ पूरे करें",
      docsBody: "{count} चेकलिस्ट चीज़ों पर अभी ध्यान देना है।",
      readyTitle: "आप तैयार हैं",
      readyBody:
        "आपके रिकॉर्ड तैयार लग रहे हैं। किसी भी ख़बर पर भरोसा करने से पहले नवीनतम GRAP सूचना देखें।",
      pendingCta: "कार्यदिवस खोलें",
      docsCta: "चेकलिस्ट खोलें",
      readyCta: "अपडेट देखें",
    },
    actions: {
      workdays: {
        title: "मेरे कार्यदिवस",
        description:
          "आज का काम दर्ज करें और देखें किस दिन सत्यापन हुआ।",
        meta: "{count} दिन दर्ज",
      },
      checklist: {
        title: "कागज़ चेकलिस्ट",
        description: "क्या तैयार है और क्या बाकी है, समझें।",
        meta: "5 में से {organised} तैयार",
      },
      camps: {
        title: "सहायता शिविर",
        description: "पास का हेल्प डेस्क खोजें, कॉल करें, रास्ता देखें।",
        meta: "हेल्पलाइन {helpline}",
      },
      updates: {
        title: "GRAP अपडेट",
        description:
          "किसी भी ख़बर पर भरोसा करने से पहले आधिकारिक सूचना देखें।",
        meta: "अंतिम जाँच {date}",
      },
      readiness: {
        title: "सहायता की तैयारी",
        description: "4 आसान सवाल, फिर अगला कदम।",
        meta: "4 छोटे सवाल",
      },
    },
    disclaimerTitle: "यह ज़रूर याद रखें",
    disclaimerBody:
      "यह ऐप रिकॉर्ड व्यवस्थित करने में मदद करती है। सहायता मंज़ूर नहीं करती और पात्रता तय नहीं करती। नवीनतम आधिकारिक सूचना ज़रूर देखें।",
    footer: "दिल्ली के निर्माण श्रमिकों के लिए।",
  },
  aqi: {
    eyebrow: "दिल्ली की हवा · लाइव",
    title: "AQI और GRAP स्थिति",
    subtitle:
      "रंग आज की हवा दिखाता है। दिखाया गया GRAP चरण सिर्फ़ अनुमान है।",
    readingLabel: "दिल्ली AQI",
    location: "नई दिल्ली, दिल्ली",
    stageLabel: "अनुमानित GRAP",
    stageShort: "चरण {stage}",
    updated: "अपडेट {time}",
    updatedUnknown: "अपडेट का समय नहीं मिला",
    live: "लाइव डेटा",
    sample: "नमूना रीडिंग",
    refresh: "AQI रिफ़्रेश करें",
    refreshing: "रिफ़्रेश हो रहा है…",
    loadFailed: "लाइव रीडिंग नहीं मिली। नमूना दिखा रहे हैं।",
    gaugeLabel: "वायु गुणवत्ता सूचकांक शून्य से 500 तक",
    level: {
      good: "अच्छी",
      satisfactory: "ठीक",
      moderate: "मध्यम",
      poor: "खराब",
      veryPoor: "बहुत खराब",
      severe: "गंभीर",
      severePlus: "गंभीर प्लस",
    },
    stageNames: {
      0: "कोई GRAP चरण नहीं",
      1: "चरण I",
      2: "चरण II",
      3: "चरण III",
      4: "चरण IV",
    },
    stageMeansTitle: "इस चरण का क्या मतलब है?",
    stageMeans: {
      0: "AQI से कोई GRAP चरण नहीं दिख रहा। रिकॉर्ड तैयार रखें और आधिकारिक सूचना देखें।",
      1: "कुछ निर्माण काम पर रोक लग सकती है। पंजीकरण और कार्यदिवस का प्रमाण तैयार रखें।",
      2: "ज़्यादा निर्माण पाबंदियाँ लग सकती हैं। हर काम का दिन लिखें और सहायता शिविर जाएँ।",
      3: "ज़्यादातर निर्माण काम बंद हो सकता है। सहायता के कदम ज़रूरी हो जाते हैं। आधिकारिक आदेश मानें।",
      4: "आपातकालीन पाबंदियाँ लग सकती हैं। अगले कदम के लिए हेल्पलाइन और आधिकारिक सूचना देखें।",
    },
    showStages: "सभी चरण देखें",
    hideStages: "चरण छिपाएँ",
    source:
      "हवा का डेटा: Open-Meteo। GRAP चरण आधिकारिक आदेश नहीं है।",
    openCaqm: "CAQM की आधिकारिक वेबसाइट खोलें",
    warning:
      "सिर्फ़ AQI से GRAP चरण लागू होने की पुष्टि नहीं होती। कोई कदम लेने से पहले CAQM देखें।",
    stagesAria: "GRAP चरण की जानकारी",
    pm25: "PM2.5",
  },
  workdays: {
    title: "मेरे कार्यदिवस",
    subtitle:
      "हर काम का दिन दर्ज करें। सिर्फ़ सत्यापित दिन हरे दिखते हैं।",
    demo: "नमूना रिकॉर्ड · सिर्फ़ इसी डिवाइस पर सेव",
    reported: "दर्ज दिन",
    confirmed: "पक्के दिन",
    waiting: "सत्यापन बाकी",
    addCta: "आज का काम दर्ज करें",
    goalTitle: "सहायता लक्ष्य",
    goalBody:
      "{target} में से {confirmed} दिन पक्के — ₹10,000 सहायता की तैयारी",
    goalNote: "डेमो लक्ष्य। आधिकारिक शर्त अलग हो सकती है।",
    progressLabel: "पक्के कार्यदिवस",
    recordsTitle: "आपकी काम की टाइमलाइन",
    filtersAria: "कार्यदिवस रिकॉर्ड फ़िल्टर करें",
    filterAll: "सब",
    filterConfirmed: "पक्के",
    filterWaiting: "बाकी",
    filterReported: "दर्ज",
    empty: "इस फ़िल्टर में कोई रिकॉर्ड नहीं।",
    emptyHint: "“आज का काम दर्ज करें” दबाएँ और पहला रिकॉर्ड बनाएँ।",
    status: {
      confirmed: "पक्का",
      pending: "सत्यापन बाकी",
      reported: "दर्ज",
      correction: "सुधार माँगा",
    },
    statusHelp: {
      confirmed: "सत्यापनकर्ता ने इन दिनों की पुष्टि की है।",
      pending: "सत्यापन का अनुरोध सत्यापनकर्ता के पास है।",
      reported: "आपने यह काम दर्ज किया है। सत्यापन अभी नहीं हुआ।",
      correction: "यह रिकॉर्ड सुधार के लिए चिह्नित है।",
    },
    action: {
      request: "सत्यापन माँगें",
      flag: "जाँच के लिए चिह्नित करें",
      correction: "सुधार माँगें",
    },
    verifier: "सत्यापनकर्ता: {id}",
    legendTitle: "रंगों का मतलब",
    disclaimer:
      "ये नमूना रिकॉर्ड हैं। दर्ज दिन और पक्के दिन अलग हैं। यह ट्रैकर पात्रता तय नहीं करता।",
    notice: {
      added:
        "काम का रिकॉर्ड इस डिवाइस पर सेव हुआ। सत्यापन का इंतज़ार है।",
      requested:
        "सिर्फ़ डेमो: सत्यापन अनुरोध लोकल दर्ज हुआ। कोई संदेश नहीं भेजा गया।",
      flagged: "सिर्फ़ डेमो: रिकॉर्ड लोकल जाँच के लिए चिह्नित हुआ।",
      correction: "सिर्फ़ डेमो: सुधार अनुरोध लोकल दर्ज हुआ।",
    },
  },
  quickEntry: {
    title: "आज का काम दर्ज करें",
    subtitle: "एक मिनट लगेगा। तारीख़ बदल भी सकते हैं।",
    worksite: "काम कहाँ किया?",
    worksiteHint: "जगह चुनें या अपनी लिखें।",
    customWorksite: "काम की जगह लिखें",
    customWorksitePlaceholder: "जैसे: नरेला",
    workType: "क्या काम किया?",
    customWorkType: "काम का प्रकार लिखें",
    customWorkTypePlaceholder: "जैसे: सरिया बाँधना",
    date: "काम की तारीख़",
    days: "कितने दिन काम किया?",
    decreaseDays: "एक दिन कम",
    increaseDays: "एक दिन ज़्यादा",
    endDate: "{date} तक",
    save: "मेरा कार्यदिवस सेव करें",
    requiredSite: "काम की जगह चुनें या लिखें।",
    requiredType: "काम का प्रकार चुनें या लिखें।",
    requiredDate: "सही काम की तारीख़ चुनें।",
    requiredDays: "1 से 31 दिन के बीच चुनें।",
    note:
      "श्रमिक-दर्ज के रूप में सेव होगा। सत्यापन के बाद ही हरा दिखेगा।",
    worksites: {
      okhla: "ओखला",
      anandVihar: "आनंद विहार",
      dwarka: "द्वारका",
      karolBagh: "करोल बाग",
      ito: "ITO",
      lajpatNagar: "लाजपत नगर",
      other: "दूसरी जगह",
    },
    workTypes: {
      masonry: "चिनाई",
      painting: "पुताई",
      concrete: "कंक्रीट",
      tiles: "टाइल",
      helper: "मददगार",
      electrical: "बिजली का काम",
      other: "दूसरा काम",
    },
  },
  checklist: {
    title: "कागज़ और प्रमाण",
    subtitle: "एक-एक चीज़ व्यवस्थित करें। कुछ अपलोड नहीं होता।",
    demo: "नमूना चेकलिस्ट · इसी डिवाइस पर सेव",
    progress: "चेकलिस्ट प्रगति",
    organisedCount: "5 में से {organised} तैयार",
    items: {
      registration: {
        title: "पंजीकरण की जानकारी",
        description:
          "DBOCWWB पंजीकरण या नवीनीकरण की जानकारी पास रखें।",
      },
      workdays: {
        title: "काम के दिनों का प्रमाण",
        description:
          "काम की तारीख़ें, जगह और जो रिकॉर्ड है, सब इकट्ठा करें।",
      },
      supporting: {
        title: "काम का दूसरा प्रमाण",
        description:
          "काम के रिकॉर्ड का संदर्भ रखें। आधिकारिक रूप से कौन सा प्रमाण मान्य है, जाँचें।",
      },
      renewal: {
        title: "नवीनीकरण की जानकारी",
        description: "जाँचें कि पंजीकरण का नवीनीकरण चाहिए या नहीं।",
      },
      notice: {
        title: "नवीनतम GRAP सूचना",
        description:
          "किसी सहायता ख़बर पर भरोसा करने से पहले आधिकारिक स्रोत और तारीख़ देखें।",
      },
    },
    status: {
      organised: "तैयार",
      needsReview: "जाँच बाकी",
      notStarted: "शुरू नहीं",
    },
    markOrganised: "तैयार के रूप में चिह्नित करें",
    markReview: "वापस जाँच में डालें",
    note:
      "यह आपका निजी व्यवस्थित करने का टूल है, आधिकारिक दस्तावेज़ सूची नहीं। कोई दस्तावेज़ अपलोड या भेजा नहीं जाता।",
    helpCta: "सहायता शिविर में पूछें",
  },
  camps: {
    title: "सहायता शिविर खोजें",
    subtitle:
      "दिल्ली मेट्रो के पास डेमो हेल्प पॉइंट। जाने से पहले कॉल करें।",
    demo: "डेमो सूची · असली शिविर नहीं",
    searchLabel: "क्षेत्र, शिविर या मेट्रो स्टेशन से खोजें",
    searchPlaceholder: "जैसे: कश्मीरी गेट",
    clearSearch: "खोज हटाएँ",
    filterAria: "क्षेत्र से सहायता शिविर फ़िल्टर करें",
    zones: {
      all: "सब",
      north: "उत्तर",
      south: "दक्षिण",
      east: "पूर्व",
      west: "पश्चिम",
      central: "मध्य",
    },
    results: "{count} हेल्प पॉइंट",
    fromMetro: "{metro} से {distance}",
    walk: "{minutes} मिनट पैदल",
    hours: "खुलने का समय",
    services: "किस चीज़ में मदद",
    serviceLabels: {
      registration: "पंजीकरण",
      verification: "कार्यदिवस सत्यापन",
      documents: "दस्तावेज़ मार्गदर्शन",
      helpline: "हेल्पलाइन सहायता",
    },
    call: "हेल्पलाइन पर कॉल",
    callAria: "श्रमिक हेल्पलाइन {number} पर कॉल करें",
    directions: "रास्ता देखें",
    directionsAria: "{camp} का रास्ता खोलें",
    noResults: "खोज से कोई हेल्प पॉइंट नहीं मिला।",
    noResultsHint: "दूसरा क्षेत्र आज़माएँ या खोज हटाएँ।",
    note:
      "ये जाँच के लिए डेमो हेल्प पॉइंट हैं। जाने से पहले दिल्ली श्रम विभाग से असली शिविर, समय और संपर्क की पुष्टि करें।",
    helplineTitle: "अभी किसी से बात करनी है?",
    helplineBody:
      "श्रमिक हेल्पलाइन दिल्ली श्रम विभाग चलाता है। समय और सहायता बदल सकते हैं।",
    boardTitle: "DBOCWWB 24x7 हेल्पलाइन",
    openBoard: "DBOCWWB वेबसाइट खोलें",
  },
  updates: {
    title: "GRAP और सहायता अपडेट",
    subtitle:
      "किसी फ़ॉरवर्ड किए संदेश पर काम करने से पहले आधिकारिक जानकारी देखें।",
    demo: "मैन्युअल जाँच डेमो · लाइव नहीं",
    officialStatus: "आधिकारिक GRAP स्थिति",
    unverified: "आधिकारिक सत्यापन बाकी",
    statusBody:
      "CAQM का 21 अक्टूबर 2026 का आदेश चरण-I लागू करने के लिए सूचीबद्ध है। नया आदेश या निरसन भी हो सकता है। इसे वर्तमान मानने से पहले CAQM देखें।",
    source: "आधिकारिक स्रोत",
    sourceValue: "वायु गुणवत्ता प्रबंधन आयोग (CAQM)",
    published: "नवीनतम चरण आदेश",
    publishedValue: "21 अक्टूबर 2026 · चरण-I लागू",
    checked: "पेज कब जाँचा",
    checkedValue: "30 अक्टूबर 2026 · सक्रिय चरण असत्यापित",
    openCaqm: "CAQM की आधिकारिक वेबसाइट खोलें",
    reliefTitle: "₹10,000 सहायता की जानकारी",
    reliefBody:
      "पहले की घोषणाओं में पात्र निर्माण श्रमिकों के लिए ₹10,000 सहायता का उल्लेख था। यह ऐप योजना की वर्तमान स्थिति, शर्तें और भुगतान की पुष्टि नहीं करता।",
    stepsTitle: "अब आपको क्या करना चाहिए?",
    steps: [
      "नवीनतम CAQM सूचना देखें।",
      "पंजीकरण और कार्यदिवस का प्रमाण तैयार रखें।",
      "कुछ समझ न आए तो अधिकृत हेल्प डेस्क से पूछें।",
    ],
    warning:
      "सिर्फ़ AQI से GRAP लागू नहीं होता। यह ऐप सहायता की गारंटी नहीं देता और पात्रता तय नहीं करता।",
    timelineTitle: "हमने क्या जाँचा",
    timeline: [
      {
        date: "21 अक्टूबर 2026",
        title: "चरण-I आदेश सूचीबद्ध",
        body: "आधिकारिक साइट पर चरण-I लागू करने का CAQM आदेश सूचीबद्ध है।",
      },
      {
        date: "30 अक्टूबर 2026",
        title: "सक्रिय चरण असत्यापित",
        body: "नए चरण या निरसन का मैन्युअल सत्यापन अभी नहीं हुआ।",
      },
    ],
    boardTitle: "आधिकारिक DBOCWWB वेबसाइट",
    boardBody:
      "पंजीकरण और कल्याण योजना की वर्तमान जानकारी सीधे बोर्ड से जाँचें।",
    helplineTitle: "श्रमिक हेल्पलाइन पर कॉल करें",
    helplineBody:
      "मज़दूरी, नौकरी से निकाले जाने या श्रम कानून सहायता के लिए: 155214 (सोम–शनि, 9:30 AM – 6:00 PM)।",
  },
  readiness: {
    title: "सहायता की तैयारी जाँच",
    subtitle:
      "चार आसान सवालों के जवाब दें। यह जाँच पात्रता तय नहीं करती।",
    progress: "सवाल {current} / {total}",
    back: "पीछे",
    next: "अगला सवाल",
    review: "जवाब देखें",
    summaryTitle: "आपके जवाब",
    summaryNote:
      "इन जवाबों से अपना अगला कदम तय करें। ये आधिकारिक पात्रता या भुगतान की पुष्टि नहीं करते।",
    nextSteps: "सुझाए गए अगले कदम",
    restart: "दोबारा शुरू करें",
    findCamp: "सहायता शिविर खोजें",
    checkUpdates: "आधिकारिक अपडेट देखें",
    demo: "सिर्फ़ इसी डिवाइस पर सेव",
    questions: [
      {
        title: "क्या आप DBOCWWB में पंजीकृत हैं?",
        hint: "आज जो सच है, वह चुनें।",
        options: ["हाँ", "नहीं", "पक्का नहीं"],
      },
      {
        title: "क्या आपके पास निर्माण कार्यदिवसों का रिकॉर्ड है?",
        hint: "आधिकारिक कार्यदिवस नियम मौजूदा सूचनाओं से जाँचना होगा।",
        options: ["हाँ, पूरा रिकॉर्ड", "कुछ रिकॉर्ड", "अभी रिकॉर्ड नहीं", "पक्का नहीं"],
      },
      {
        title: "क्या आपके पास निर्माण काम का प्रमाण है?",
        hint: "जो आप दिखा सकते हैं या जुटा सकते हैं, वह चुनें।",
        options: ["हाँ", "कुछ प्रमाण", "अभी प्रमाण नहीं", "पक्का नहीं"],
      },
      {
        title: "क्या आपने नवीनतम आधिकारिक GRAP या सहायता सूचना देखी है?",
        hint: "किसी फ़ॉरवर्ड संदेश पर भरोसा करने से पहले आधिकारिक स्रोत देखें।",
        options: ["हाँ", "नहीं", "पक्का नहीं"],
      },
    ],
    advice: {
      registrationNo:
        "अधिकृत हेल्प डेस्क से पूछें कि DBOCWWB पंजीकरण कैसे जाँचें या शुरू करें।",
      registrationUnsure:
        "अधिकृत हेल्प डेस्क से अपना DBOCWWB पंजीकरण पक्का करें।",
      workdays:
        "कार्यदिवस रिकॉर्ड व्यवस्थित करें और जिन दिनों को सत्यापन चाहिए उन्हें पहचानें।",
      documents:
        "उपलब्ध काम का प्रमाण व्यवस्थित करें और जाँचें कि आधिकारिक रूप से कौन से दस्तावेज़ मान्य हैं।",
      notice:
        "किसी सहायता ख़बर पर भरोसा करने से पहले नवीनतम CAQM और DBOCWWB सूचना खोलें।",
      default:
        "रिकॉर्ड व्यवस्थित रखें और अगला कदम उठाने से पहले आधिकारिक नियम दोबारा जाँचें।",
    },
  },
  consent: {
    label: "वर्कर साथी · गोपनीयता",
    title: "शुरू करने से पहले",
    intro: "ये चार बातें पढ़ें। एक मिनट से कम लगेगा।",
    points: [
      {
        title: "यह ऐप क्या करती है",
        body: "पंजीकरण की जानकारी, कार्यदिवस रिकॉर्ड और सहायक प्रमाण व्यवस्थित करने में मदद करती है।",
      },
      {
        title: "आपका डेटा कहाँ रहता है",
        body: "इस डेमो में रिकॉर्ड इसी फ़ोन के ब्राउज़र में रहते हैं। क्लाउड अकाउंट पर कुछ अपलोड नहीं होता।",
      },
      {
        title: "अपनी सुरक्षा करें",
        body: "आधार नंबर, बैंक विवरण या दूसरी संवेदनशील निजी जानकारी न डालें।",
      },
      {
        title: "सहायता का फ़ैसला",
        body: "यह ऐप ₹10,000 सहायता मंज़ूर नहीं करती और पात्रता तय नहीं करती। यह सिर्फ़ सरकार कर सकती है।",
      },
    ],
    agree: "मैंने ये बातें पढ़ और समझ ली हैं।",
    accept: "सहमत हूँ, जाँच शुरू करें",
    cancel: "होम पर वापस जाएँ",
    listen: "यह पेज सुनें",
  },
  footer: {
    disclaimer: "तैयारी और ट्रैकिंग का टूल — सरकारी पोर्टल नहीं।",
    helpline: "श्रमिक हेल्पलाइन",
    officialSources: "आधिकारिक स्रोत",
  },
};

export const dictionaries: Record<Language, Dictionary> = {
  en,
  hinglish,
  hi,
  pa,
  mr,
  bn,
  ta,
};

export function getDictionary(language: Language): Dictionary {
  return dictionaries[language];
}
