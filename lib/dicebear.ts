/**
 * Helpers for DiceBear v9 "personas" style (by Draftbit).
 * https://www.dicebear.com/styles/personas/
 *
 * We lock seeds per character so the same person appears across scenes.
 * Per-scene tweaks come from option overrides (clothing color, expression, ...).
 */

const DICEBEAR_BASE = "https://api.dicebear.com/9.x";

export type DicebearOptions = Record<string, string | number | boolean>;

export type Character =
  | "marina"
  | "anka"
  | "luka" // Marina's husband
  | "roko" // older son, OŠ Manuš
  | "ana" // younger daughter, vrtić
  | "brother" // Toronto brother
  | "broker"
  | "official"
  | "clerk"
  | "tourist"
  | "student"
  | "doctor";

const SEEDS: Record<Character, string> = {
  marina: "marina-lucac-38-v6",
  anka: "baka-anka-mejasi-76-v3",
  luka: "luka-solin-commute-v2",
  roko: "roko-os-manus-v3",
  ana: "ana-vrtic-near-bacvice-v2",
  brother: "brat-toronto-v2",
  broker: "broker-split-v1",
  official: "civic-clerk-v1",
  clerk: "porezna-clerk-v1",
  tourist: "tourist-ferry-v1",
  student: "student-mansa-v1",
  doctor: "kbc-receptionist-v1",
};

const BASE_OPTIONS: Record<Character, DicebearOptions> = {
  marina: {
    backgroundType: "solid",
    backgroundColor: "transparent",
  },
  anka: {
    backgroundType: "solid",
    backgroundColor: "transparent",
  },
  luka: {
    backgroundType: "solid",
    backgroundColor: "transparent",
  },
  roko: { backgroundType: "solid", backgroundColor: "transparent" },
  ana: { backgroundType: "solid", backgroundColor: "transparent" },
  brother: { backgroundType: "solid", backgroundColor: "transparent" },
  broker: { backgroundType: "solid", backgroundColor: "transparent" },
  official: { backgroundType: "solid", backgroundColor: "transparent" },
  clerk: { backgroundType: "solid", backgroundColor: "transparent" },
  tourist: { backgroundType: "solid", backgroundColor: "transparent" },
  student: { backgroundType: "solid", backgroundColor: "transparent" },
  doctor: { backgroundType: "solid", backgroundColor: "transparent" },
};

export function dicebearUrl(
  character: Character,
  overrides: DicebearOptions = {},
  style = "personas",
): string {
  const seed = SEEDS[character];
  const params = new URLSearchParams();
  params.set("seed", seed);
  const merged = { ...BASE_OPTIONS[character], ...overrides };
  for (const [k, v] of Object.entries(merged)) {
    params.set(k, String(v));
  }
  return `${DICEBEAR_BASE}/${style}/svg?${params.toString()}`;
}

/** Server-side SVG fetch with in-memory memoization for the dev session. */
const svgMemo = new Map<string, string>();

export async function fetchDicebearSvg(url: string): Promise<string> {
  const cached = svgMemo.get(url);
  if (cached) return cached;
  try {
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) return "";
    const svg = await res.text();
    svgMemo.set(url, svg);
    return svg;
  } catch {
    return "";
  }
}
