/**
 * Helpers for DiceBear v9 "personas" style (by Draftbit).
 * https://www.dicebear.com/styles/personas/
 *
 * We lock seeds per character AND lock skin/hair/eye options so the same
 * person reads consistently across every scene. Scenes only vary the
 * `mouth` (expression) and optionally `clothingColor`.
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
  marina: "marina-lucac-38-locked-v1",
  anka: "anka-mejasi-76-locked-v1",
  luka: "luka-husband-locked-v1",
  roko: "roko-os-manus-locked-v1",
  ana: "ana-vrtic-locked-v1",
  brother: "brat-toronto-locked-v1",
  broker: "broker-split-v1",
  official: "civic-clerk-v1",
  clerk: "porezna-clerk-v1",
  tourist: "tourist-ferry-v1",
  student: "student-mansa-v1",
  doctor: "kbc-receptionist-v1",
};

/**
 * Locked per-character traits. DiceBear's personas style accepts these
 * options exactly (any unknown option name is ignored and the seed
 * fallback picks a random value, which is why characters previously
 * looked different across scenes).
 *
 * Valid hair: balding, beanie, bunUndercut, buzzcut, cap, hatBeanie,
 *   hatHip, long, mohawk, pixie, short, shortCombover, shortComboverChops,
 *   shortMessy, shortRound, shortWaved, sideShave.
 * Valid skinColor (hex): 623d36, b16a5b, d78774, e5a07e, e7a391,
 *   eeb4a4, f5cfa0, ffe4c0.
 * Valid eyes: glasses, happy, open, sleep, sunglasses, wink.
 * Valid mouth: bigSmile, frown, lipstick, pacifier, smile, smirk, surprise.
 * Valid nose: mediumRound, smallRound, wrinkles.
 * Valid body: checkered, rounded, small, squared.
 */
const BASE_OPTIONS: Record<Character, DicebearOptions> = {
  marina: {
    skinColor: "f5cfa0",
    hair: "long",
    hairColor: "362c47",
    eyes: "happy",
    nose: "smallRound",
    body: "squared",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
  anka: {
    skinColor: "ffe4c0",
    hair: "pixie",
    hairColor: "dcd6cb",
    eyes: "happy",
    nose: "wrinkles",
    body: "squared",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
  luka: {
    skinColor: "e5a07e",
    hair: "shortMessy",
    hairColor: "362c47",
    eyes: "happy",
    nose: "mediumRound",
    body: "squared",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
  roko: {
    skinColor: "f5cfa0",
    hair: "shortMessy",
    hairColor: "362c47",
    eyes: "happy",
    nose: "smallRound",
    body: "small",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
  ana: {
    skinColor: "f5cfa0",
    hair: "long",
    hairColor: "362c47",
    eyes: "happy",
    nose: "smallRound",
    body: "small",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
  brother: {
    skinColor: "e5a07e",
    hair: "buzzcut",
    hairColor: "362c47",
    eyes: "happy",
    nose: "mediumRound",
    body: "squared",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
  broker: {
    skinColor: "e5a07e",
    hair: "short",
    hairColor: "362c47",
    eyes: "happy",
    nose: "mediumRound",
    body: "squared",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
  official: {
    skinColor: "f5cfa0",
    hair: "shortCombover",
    hairColor: "362c47",
    eyes: "open",
    nose: "mediumRound",
    body: "squared",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
  clerk: {
    skinColor: "f5cfa0",
    hair: "long",
    hairColor: "362c47",
    eyes: "open",
    nose: "smallRound",
    body: "squared",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
  tourist: {
    skinColor: "eeb4a4",
    hair: "cap",
    hairColor: "d6b370",
    eyes: "sunglasses",
    nose: "mediumRound",
    body: "squared",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
  student: {
    skinColor: "f5cfa0",
    hair: "shortMessy",
    hairColor: "362c47",
    eyes: "glasses",
    nose: "smallRound",
    body: "small",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
  doctor: {
    skinColor: "ffe4c0",
    hair: "shortCombover",
    hairColor: "5a3a20",
    eyes: "open",
    nose: "smallRound",
    body: "squared",
    backgroundColor: "f0e1c8",
    backgroundType: "solid",
  },
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
