import type { Character, DicebearOptions } from "@/lib/dicebear";

export type MarinaScene = {
  id: string;
  timeLabel: string;
  title: string;
  /** Quote in Croatian — preserved verbatim from `POLISHED-IDEA.md`. */
  croatianQuote: string;
  /** English explanation of which Splitko block fires here. */
  beat: string;
  /** Block tag — drives the chip color. */
  block:
    | "dashboard"
    | "civic-action"
    | "whatsapp"
    | "voice"
    | "marketplace"
    | "cultural";
  /** Pexels search queries, in fallback order. */
  imageQuery: string[];
  imageAlt: string;
  /** The DiceBear character to render in this scene. */
  character: Character;
  /**
   * Per-scene DiceBear overrides. Only `mouth` (expression) and optionally
   * `clothingColor` may vary — skin / hair / eyes are locked in
   * `lib/dicebear.ts` so the character reads as the same person every time.
   */
  options?: DicebearOptions;
};

export const MARINA_DAY: MarinaScene[] = [
  {
    id: "07-40-commute",
    timeLabel: "Tue / 07:40",
    title: "The school run, planned by a city that already knows.",
    croatianQuote:
      "“Kad moram krenuti da stignem obojicu predati i na posao do 9:30?”",
    beat:
      "She types into Splitko. The dashboard reconfigures around her commute — the OŠ Manuš zone, the vrtić curb, the Riva parking, the bus alternative. She accepts the suggested 07:48 departure. Splitko learns this is her Tuesday.",
    block: "dashboard",
    imageQuery: [
      "split croatia morning street",
      "diocletian palace morning",
      "split old town narrow street",
    ],
    imageAlt: "Quiet morning in a Split alley near Lučac.",
    character: "marina",
    options: { mouth: "smile", clothingColor: "8a9bb0" },
  },
  {
    id: "11-00-streetlight",
    timeLabel: "Tue / 11:00",
    title: "The streetlight she’s been meaning to report for three weeks.",
    croatianQuote: "“Ovaj fenjer je pukao još od bure prošlog mjeseca.”",
    beat:
      "She opens Splitko, taps the photo. The agent classifies it (lighting), geocodes it (vrtić zone), routes it to Čistoća + EVN, returns a ticket. Two hours later: “Status: dodijeljeno.” The first time the city visibly heard her.",
    block: "civic-action",
    imageQuery: [
      "broken street lamp city",
      "split croatia street light evening",
      "old city street lamp",
    ],
    imageAlt: "A streetlight near a Split crosswalk.",
    character: "marina",
    options: { mouth: "surprise", clothingColor: "8a9bb0" },
  },
  {
    id: "14-00-whatsapp",
    timeLabel: "Tue / 14:00",
    title: "WhatsApp from Luka: Žnjan or Kašjuni?",
    croatianQuote: "“Idemo na Žnjan poslije posla?”",
    beat:
      "Marina asks Splitko on WhatsApp. The same brain answers, with the same memory of who she is — Žnjan vs Kašjuni at 17:30 given sea, crowd, and wind. Recommends Kašjuni. Suggests the bus because the lot will fill.",
    block: "whatsapp",
    imageQuery: [
      "kasjuni beach split",
      "marjan park split",
      "split beach pine trees",
    ],
    imageAlt: "Pine-shaded coast near Kašjuni.",
    character: "marina",
    options: { mouth: "bigSmile", clothingColor: "8a9bb0" },
  },
  {
    id: "18-00-baka",
    timeLabel: "Tue / 18:00",
    title: "Baka Anka calls the number from her landline.",
    croatianQuote: "“Kako ono ću kazat dohtoru, ne razumin ovaj recept.”",
    beat:
      "The voice agent picks up in the Dalmatian Croatian she actually speaks, walks her through the prescription, then transfers to the KBC reception with a one-line briefing for the human on the other end. The first piece of digital infrastructure she has ever used.",
    block: "voice",
    imageQuery: [
      "elderly woman split croatia",
      "old croatian woman home",
      "dalmatian grandmother",
    ],
    imageAlt: "A Dalmatian sitting room with afternoon light.",
    character: "anka",
    options: { mouth: "smile", clothingColor: "5a615f" },
  },
  {
    id: "week-later-marketplace",
    timeLabel: "+ 1 week",
    title: "Her brother in Toronto sublets the apartment in Bačvice.",
    croatianQuote: "“Ima li tko za jul, dvije sobe iza Hrvojeve?”",
    beat:
      "His Splitko negotiates with the Splitko of a family arriving from Frankfurt for July. They agree on the price within the band he gave it. They meet to sign. Nobody paid a broker.",
    block: "marketplace",
    imageQuery: [
      "bacvice apartment split",
      "split mediterranean apartment balcony",
      "split harbour residential",
    ],
    imageAlt: "A balcony above the Bačvice bay.",
    character: "brother",
    options: { mouth: "smile", clothingColor: "344b6b" },
  },
  {
    id: "saturday-cultural",
    timeLabel: "Sat / 19:00",
    title: "Roko’s birthday weekend.",
    croatianQuote: "“Što ima ovaj vikend u Splitu, ne preskupo?”",
    beat:
      "Splitko surfaces the klape concert in Diocletian’s cellars, the Hajduk fixture, the family market on Manuš. They pick the cellars. Marina is wearing the Hajduk scarf.",
    block: "cultural",
    imageQuery: [
      "diocletian palace cellars",
      "split klapa concert",
      "split old town night",
    ],
    imageAlt: "Diocletian’s cellars lit warm at night.",
    character: "marina",
    options: { mouth: "bigSmile", clothingColor: "1e3a8a" },
  },
];
