export type IntentId =
  | "default"
  | "beach"
  | "transit"
  | "parking"
  | "bureaucracy"
  | "civic-report"
  | "marketplace"
  | "cultural"
  | "voice-handoff"
  | "ferry";

export type ToolCall = {
  name: string;
  args?: string;
  durationMs: number;
  /** When true, the orchestrator actually fires this real port behind the animation. */
  real?: "dhmz" | "izor";
};

export type Intent = {
  id: IntentId;
  match: RegExp[];
  example: string;
  toolCalls: ToolCall[];
  answer: string;
  citations: string[];
  highlight: string[];
};

export const INTENTS: Intent[] = [
  {
    id: "beach",
    match: [
      /\bba[čc]vice\b/i,
      /\b[žz]njan\b/i,
      /\bka[šs]juni\b/i,
      /\bbene\b/i,
      /\btrstenik\b/i,
      /\bbeach|plaž|kupanj|swim|sea\b/i,
      /\bidem na (kav|kup)/i,
      /\bvrijedi\b.*sad/i,
    ],
    example: "Idem na kupanje, koja plaža sad?",
    toolCalls: [
      { name: "getSeaQuality", args: "Bačvice, Žnjan, Kašjuni", durationMs: 1200, real: "izor" },
      { name: "getCurrentWeather", args: "Split-Marjan", durationMs: 900, real: "dhmz" },
      { name: "getWebcamFrame", args: "Bačvice-east", durationMs: 800 },
      { name: "getBusETA", args: "stop=Sukoišan, line=17", durationMs: 600 },
    ],
    answer:
      "Right now, Kašjuni in 20 min is the call. Sea rated izvrsna this season. Wind {wind} m/s {windDir}. Air {temp}°C. Bus 12 from your stop in 4 min. The Matejuška lot fills inside the hour — take the bus.",
    citations: ["IZOR", "DHMZ", "Webcam Vision", "Promet Buses"],
    highlight: ["beach"],
  },
  {
    id: "transit",
    match: [
      /\bbus\b/i,
      /\bkako do\b/i,
      /\btram\b/i,
      /\bautobus\b/i,
      /\bline\b/i,
      /\bsukoi[šs]an\b/i,
      /\bmertojak\b/i,
    ],
    example: "Kako do Mertojaka u 8?",
    toolCalls: [
      { name: "getBusETA", args: "stop=Sukoišan, line=17", durationMs: 700 },
      { name: "getTrafficState", args: "Trumbićeva, Domovinskog rata", durationMs: 600 },
      { name: "getParkingSignal", args: "Riva, Tržnica, Sukoišan", durationMs: 700 },
    ],
    answer:
      "Take line 17 at 07:48 from Sukoišan — it gets you to Mertojak by 08:11 with one stop. Trumbićeva has light congestion already. Driving puts you 8 min behind and into a full lot.",
    citations: ["Promet Buses", "HAK Traffic", "Promet Parking"],
    highlight: ["transit"],
  },
  {
    id: "parking",
    match: [/\bpark/i, /\bspot\b/i, /\bmjest/i, /\blot\b/i, /\bparkiranj/i],
    example: "Gdje ima parking blizu Rive sad?",
    toolCalls: [
      { name: "getParkingSignal", args: "Riva, Tržnica, Sukoišan", durationMs: 800 },
      { name: "getDynamicPrice", args: "zone=Riva", durationMs: 500 },
    ],
    answer:
      "Riva is full. Matejuška has 4 empty bays at €4/h right now (demand surge active). Sukoišan has 27 bays at €1.50/h and a 9-min walk to Marmontova. Pick Sukoišan and save €7.",
    citations: ["Promet Parking", "SFpark-style pricing"],
    highlight: ["parking"],
  },
  {
    id: "bureaucracy",
    match: [
      /\bobrt\b/i,
      /\bprijav/i,
      /\bporezn/i,
      /\bdozvol/i,
      /\bbureaucra/i,
      /\bregistr/i,
      /\bID card/i,
    ],
    example: "Kako otvoriti obrt?",
    toolCalls: [
      { name: "ragLookup", args: "obrt registration on gov.hr", durationMs: 1400 },
      { name: "ragLookup", args: "e-Građani služba katalog", durationMs: 1100 },
      { name: "matchProfile", args: "DOB → relevant life event", durationMs: 400 },
    ],
    answer:
      "Open obrt in three real steps: (1) Pick the activity code at gov.hr/zivotne-situacije/posao-i-karijera, (2) Submit to Porezna Split via e-Građani (~€55 fee), (3) Register with HZZO. We never log in for you. Splitko prepares the form, you sign.",
    citations: ["gov.hr", "e-Građani", "Porezna FAQ"],
    highlight: ["bureaucracy"],
  },
  {
    id: "civic-report",
    match: [
      /\brupa\b/i,
      /\bkvar/i,
      /\bbroken\b/i,
      /\bpothole\b/i,
      /\bstreet ?lamp/i,
      /fenjer/i,
      /smec/i,
      /smeć/i,
      /\bgarbage\b/i,
      /fotku\b/i,
      /prijav.*kvar/i,
      /prijavit/i,
    ],
    example: "Imam fotku puknutog fenjera, gdje da je pošaljem?",
    toolCalls: [
      { name: "classifyIssue", args: "image=streetlight_42.jpg", durationMs: 1100 },
      { name: "geocodeFromExif", durationMs: 600 },
      { name: "routeToDepartment", args: "Čistoća + EVN", durationMs: 700 },
    ],
    answer:
      "Classified: lighting. Geocoded: vrtić zone, Lučac. Routed: EVN Split with a CC to Čistoća. Your ticket is #2026-05-1192 — current status open. You will see status updates inline; no email needed.",
    citations: ["Civic Action Router", "Vision"],
    highlight: ["civic-report"],
  },
  {
    id: "marketplace",
    match: [
      /sublet/i,
      /iznajml/i,
      /izdaj/i,
      /tra[žz]im/i,
      /podstanar/i,
      /apartment/i,
      /\bsobu\b/i,
      /\bstan\b/i,
      /\brent\b/i,
    ],
    example: "Tražim podstanara za jul, soba u Manušu.",
    toolCalls: [
      { name: "listMarketSide", args: "side=supply, kvart=Manuš, month=07", durationMs: 800 },
      { name: "matchCounterparty", args: "demand near OŠ Manuš, budget €1100", durationMs: 1200 },
      { name: "negotiateBand", args: "€800-€1100", durationMs: 600 },
    ],
    answer:
      "Three counterparts. The Wirth family from Frankfurt arrives July 4th, budget €1000, two kids. Their agent already accepted €950. Want me to draft a meet-up at the apartment and a deposit memo? You pay no broker.",
    citations: ["Marketplace", "Crowdsourcing"],
    highlight: ["marketplace"],
  },
  {
    id: "cultural",
    match: [
      /\btonight\b/i,
      /\bvečeras\b/i,
      /\bvikend\b/i,
      /\bklap/i,
      /\bkoncert\b/i,
      /\bhajduk\b/i,
      /\bdjecom\b/i,
      /\bkid/i,
    ],
    example: "Što ima u Splitu večeras s djecom?",
    toolCalls: [
      { name: "listEvents", args: "city=Split, kid_friendly=true", durationMs: 800 },
      { name: "getWeather", args: "tonight", durationMs: 500, real: "dhmz" },
      { name: "matchProfile", args: "kids ages 7 and 4", durationMs: 400 },
    ],
    answer:
      "Three real things tonight: klape Skalinada in Diocletian’s cellars (21:00, 7+), summer market at Manuš (open till 22:00, kids ok), Hajduk vs Lokomotiva 19:30 on TV at any kafić. Weather mild, light NW.",
    citations: ["Cultural Calendar", "DHMZ"],
    highlight: ["cultural"],
  },
  {
    id: "voice-handoff",
    match: [
      /\bcall\b/i,
      /\bphone\b/i,
      /nazov/i,
      /nazvat/i,
      /\bbaka\b/i,
      /grandmother/i,
      /recept/i,
      /prescription/i,
      /\bKBC\b/,
    ],
    example: "Trebam nazvati KBC, ne razumim recept moje bake.",
    toolCalls: [
      { name: "transcribeAudio", args: "ja-anka.mp3", durationMs: 1200 },
      { name: "ragLookup", args: "KBC reception scheduling", durationMs: 900 },
      { name: "prepareHandoff", args: "to=KBC ambulanta", durationMs: 700 },
    ],
    answer:
      "I read the prescription with baka Anka. Two pills/day, take with food, refill August 14th. I’m placing the call to KBC Split reception now and briefing the human on the other end. She stays on the line. Transfer ready.",
    citations: ["Voice", "RAG: KBC public docs"],
    highlight: ["voice-handoff"],
  },
  {
    id: "ferry",
    match: [
      /bra[čc]/i,
      /hvar/i,
      /ferry/i,
      /trajekt/i,
      /jadrolinij/i,
      /\bna otok/i,
    ],
    example: "Hoću biti na Braču u 11.",
    toolCalls: [
      { name: "getFerry", args: "Split→Supetar", durationMs: 800 },
      { name: "getBusETA", args: "stop=AS, line=8", durationMs: 600 },
      { name: "getParkingSignal", args: "zone=Trajektna luka", durationMs: 600 },
    ],
    answer:
      "Catch the 09:30 Jadrolinija (~50 min), bus 8 to AS leaves Sukoišan at 08:51 — that puts you on the boat with 9 min to spare. If you drive, the port lot is full by 09:00; switch to Sukoišan + bus.",
    citations: ["Jadrolinija", "Promet Buses", "Promet Parking"],
    highlight: ["ferry"],
  },
];

export function detectIntent(text: string): Intent {
  const cleaned = text.trim();
  if (!cleaned) {
    return DEFAULT_INTENT;
  }
  for (const intent of INTENTS) {
    if (intent.match.some((re) => re.test(cleaned))) return intent;
  }
  return DEFAULT_INTENT;
}

const DEFAULT_INTENT: Intent = {
  id: "default",
  match: [/.*/],
  example: "",
  toolCalls: [],
  answer:
    "I’m Splitko. I can answer about beaches, buses, parking, civic reports, bureaucracy, your kvart’s schedule tonight, or place a call to a human. Try one of the suggestions on the right.",
  citations: ["—"],
  highlight: [],
};
