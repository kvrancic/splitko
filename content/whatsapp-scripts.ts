export type Bubble = {
  side: "user" | "splitko";
  /** Optional text content. Bubbles without text but with an image render the
   *  image alone. */
  text?: string;
  delayMs?: number;
  /** Renders a labeled "file" card (label + optional sub). */
  attachment?: { label: string; sub?: string };
  /** Renders a real image block inside the bubble. */
  image?: { src: string; alt: string };
};

export type Script = {
  id: "events" | "civic";
  title: string;
  blurb: string;
  bubbles: Bubble[];
};

export type ScriptBuildOpts = {
  /** Pexels photo URL used in the civic-action script's image bubble. */
  civicImage: { src: string; alt: string } | null;
};

export function buildScripts({ civicImage }: ScriptBuildOpts): Script[] {
  return [
    {
      id: "events",
      title: "Što se događa danas",
      blurb: "“Što se događa u Splitu?” → 3 stvari, jedna preporuka.",
      bubbles: [
        { side: "user", text: "Što se događa danas u Splitu?" },
        {
          side: "splitko",
          text: "Tri stvari za danas:",
          delayMs: 1100,
        },
        {
          side: "splitko",
          text: "🎶 Klape Skalinada · 21:00 · Diocletian's cellars\n⚽ Hajduk – Lokomotiva · 19:30 · TV\n🥖 Manuš summer market · do 22:00",
          delayMs: 900,
        },
        {
          side: "splitko",
          text: "Ako ćeš s djecom — market do 22h je najlakša opcija. Ako ćeš sa ženom kasnije, klape u podrumima su rezerviraj odmah.",
          delayMs: 1100,
        },
        { side: "user", text: "ajmo klape, rezerviraj nam dva mjesta" },
        {
          side: "splitko",
          text: "Dvije ulaznice, 21:00, podrumi. Šaljem QR kodove odmah.",
          delayMs: 900,
          attachment: {
            label: "klape-skalinada-2x.pdf",
            sub: "QR kodovi · podrumi · 21:00",
          },
        },
        {
          side: "splitko",
          text: "Imaš slobodno parking u Sukoišanu do 20:50, javljam te kad krene puniti.",
          delayMs: 700,
        },
      ],
    },
    {
      id: "civic",
      title: "Prijavi kvar u kvartu",
      blurb: "Fotka rupe na cesti → ticket za 90 sec.",
      bubbles: [
        {
          side: "user",
          text: "Vidim rupu na cesti kod Lučca, neka netko ovo prijavi",
        },
        ...(civicImage
          ? ([
              {
                side: "user",
                delayMs: 700,
                image: civicImage,
              } satisfies Bubble,
            ])
          : []),
        {
          side: "splitko",
          text: "Klasificiram fotku…",
          delayMs: 1100,
        },
        {
          side: "splitko",
          text: "Klasificirano: cestovna rupa. Geokodiram lokaciju.",
          delayMs: 900,
        },
        {
          side: "splitko",
          text: "Lokacija: Domovinskog rata 22, Lučac. Šaljem Hrvatskim cestama + CC Gradu Splitu.",
          delayMs: 900,
        },
        {
          side: "splitko",
          text: "Ticket #2026-05-1192 — otvoren. Javim ti čim se promijeni status.",
          delayMs: 800,
          attachment: {
            label: "Ticket #2026-05-1192",
            sub: "Hrvatske ceste · otvoren · 14:32",
          },
        },
        { side: "user", text: "hvala" },
      ],
    },
  ];
}
