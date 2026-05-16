export type VoiceLine = {
  speaker: "anka" | "splitko" | "reception";
  text: string;
  /** ms duration of this line's animated voicing */
  durationMs: number;
};

export const VOICE_SCRIPT: VoiceLine[] = [
  {
    speaker: "splitko",
    text: "Dobar dan, Splitko ovdje. Kako vam mogu pomoći?",
    durationMs: 2400,
  },
  {
    speaker: "anka",
    text: "Dohtor mi je naškrabao ovaj recept, ne razumin što piše.",
    durationMs: 3000,
  },
  {
    speaker: "splitko",
    text: "Pročitat ću vam ga. Slikajte mi ga molim — možete kroz onu strelicu u sredini.",
    durationMs: 3300,
  },
  {
    speaker: "anka",
    text: "Slikala san.",
    durationMs: 1100,
  },
  {
    speaker: "splitko",
    text: "U redu, vidim. Dvije tablete dnevno, jednu ujutro i jednu navečer, uz hranu. Refill je 14. kolovoza. Hoćete li da nazovem KBC i potvrdim termin?",
    durationMs: 5400,
  },
  {
    speaker: "anka",
    text: "Bilo bi mi to puno lakše.",
    durationMs: 1800,
  },
  {
    speaker: "splitko",
    text: "Prebacujem vas na recepciju ambulante. Ostajem na liniji, ne morate ništa ponavljati.",
    durationMs: 3400,
  },
  {
    speaker: "reception",
    text: "Ambulanta KBC Split, izvolite.",
    durationMs: 1500,
  },
];
