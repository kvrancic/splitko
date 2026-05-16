export type Bubble = {
  side: "user" | "splitko";
  text: string;
  delayMs?: number;
  /** Optional attachment label rendered in a card style. */
  attachment?: { label: string; sub?: string };
};

export type Script = {
  id: "beach" | "civic" | "obrt";
  title: string;
  blurb: string;
  bubbles: Bubble[];
};

export const SCRIPTS: Script[] = [
  {
    id: "beach",
    title: "Beach concierge",
    blurb: "“idemo na žnjan?” → Splitko picks Kašjuni and a bus.",
    bubbles: [
      { side: "user", text: "Idemo na žnjan poslije posla?" },
      { side: "splitko", text: "Žnjan parking full po prognozi do 19:00.", delayMs: 1100 },
      { side: "splitko", text: "Kašjuni u 17:30 je bolji – sea izvrsna, vjetar slab, plus bus 12 ti je tu za 4 min.", delayMs: 900 },
      { side: "user", text: "ajmo onda Kašjuni" },
      { side: "splitko", text: "Postavljam rutu, javljam ti 10 min prije polaska.", delayMs: 700 },
    ],
  },
  {
    id: "civic",
    title: "Civic action",
    blurb: "Photo of a broken streetlight → ticket inside 90 sec.",
    bubbles: [
      {
        side: "user",
        text: "Fenjer pukao kod vrtića, šaljem foto",
      },
      {
        side: "user",
        text: "",
        attachment: { label: "image · streetlight_42.jpg", sub: "geocoded · Lučac vrtić zone" },
      },
      {
        side: "splitko",
        text: "Klasificirano: rasvjeta. Routam EVN Split + CC Čistoća.",
        delayMs: 1100,
      },
      {
        side: "splitko",
        text: "Ticket #2026-05-1192 — otvoren. Šaljem ti status čim se promijeni.",
        delayMs: 800,
      },
    ],
  },
  {
    id: "obrt",
    title: "Bureaucracy RAG",
    blurb: "“kako otvoriti obrt” → personalised checklist.",
    bubbles: [
      { side: "user", text: "Kako otvoriti obrt?" },
      {
        side: "splitko",
        text: "Tri stvarna koraka — pickaj NKD šifru na gov.hr, prijavi Poreznoj Split, pa registar HZZO unutar 8 dana.",
        delayMs: 1100,
      },
      {
        side: "splitko",
        text: "Šaljem ti checklist + točan ured i radno vrijeme.",
        delayMs: 700,
        attachment: { label: "obrt-checklist.pdf", sub: "5 koraka · €55 ukupno" },
      },
      { side: "user", text: "savršeno, hvala" },
    ],
  },
];
