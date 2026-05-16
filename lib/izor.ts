const IZOR_ALL =
  "https://vrtlac.izor.hr/ords/kakvoca/kakvoce_sve_json?p_jezik=hrv";

export type IzorMarker = {
  lat: number;
  lng: number;
  lsta: number; // station id
  lvro: string; // version (k=annual)
  locj: number; // category 1..4 (1=excellent, 4=poor)
  lkad: string; // year
  lbri: number;
  lpla: string; // beach name
  lgrad: string; // city
  lpodr: string; // sub-area
  lzup: number; // county
  lbsli: number;
  lbobj: number;
  lobj: string;
};

type IzorAll = { markers: IzorMarker[] };

/** Map IZOR locj rating to a semantic label + brand color token name. */
export function ratingMeta(locj: number): {
  label: string;
  english: string;
  tone: "excellent" | "good" | "satisfactory" | "poor";
  colorVar: string;
} {
  switch (locj) {
    case 1:
      return {
        label: "izvrsna",
        english: "excellent",
        tone: "excellent",
        colorVar: "var(--color-teal)",
      };
    case 2:
      return {
        label: "dobra",
        english: "good",
        tone: "good",
        colorVar: "var(--color-green-good)",
      };
    case 3:
      return {
        label: "zadovoljavajuća",
        english: "satisfactory",
        tone: "satisfactory",
        colorVar: "var(--color-amber-warn)",
      };
    default:
      return {
        label: "nezadovoljavajuća",
        english: "poor",
        tone: "poor",
        colorVar: "var(--color-red-hot)",
      };
  }
}

export async function getSplitBeaches(): Promise<IzorMarker[]> {
  const res = await fetch(IZOR_ALL, {
    next: { revalidate: 60 * 60 * 24 },
    headers: { "User-Agent": "splitko/0.1 (demo)" },
  });
  if (!res.ok) {
    throw new Error(`IZOR returned ${res.status}`);
  }
  const data = (await res.json()) as IzorAll;
  return data.markers.filter((m) => m.lgrad === "Split");
}

/** Convenience: order by a hand-picked priority list, then alphabetical. */
const PRIORITY = [
  "Bačvice",
  "Žnjan",
  "Kašjuni",
  "Uvala Kašjuni",
  "Bene",
  "Trstenik",
  "Trstenik-Radoševac",
  "Ježinac",
  "Zvončac",
  "Firule",
  "Gusar",
];

export async function getOrderedSplitBeaches(): Promise<IzorMarker[]> {
  const all = await getSplitBeaches();
  const priorityIndex = (name: string): number => {
    const i = PRIORITY.findIndex((p) =>
      name.toLowerCase().includes(p.toLowerCase()),
    );
    return i === -1 ? 999 : i;
  };
  return [...all].sort((a, b) => {
    const ai = priorityIndex(a.lpla);
    const bi = priorityIndex(b.lpla);
    if (ai !== bi) return ai - bi;
    return a.lpla.localeCompare(b.lpla);
  });
}
