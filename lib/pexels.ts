const PEXELS_ENDPOINT = "https://api.pexels.com/v1/search";

export type PexelsPhoto = {
  id: number;
  url: string;
  width: number;
  height: number;
  avg_color: string;
  alt: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
};

type PexelsResponse = { photos: PexelsPhoto[] };

const memo = new Map<string, PexelsPhoto[]>();

/**
 * Server-side Pexels search with in-memory memoization for the dev session.
 * Always called from API routes or RSC; never expose the key to the browser.
 */
export async function searchPexels(
  query: string,
  perPage = 6,
  orientation: "landscape" | "portrait" | "square" = "landscape",
): Promise<PexelsPhoto[]> {
  const key = `${query}::${perPage}::${orientation}`;
  const cached = memo.get(key);
  if (cached) return cached;

  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    console.warn("[pexels] PEXELS_API_KEY missing, returning [].");
    return [];
  }

  const url = new URL(PEXELS_ENDPOINT);
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("orientation", orientation);

  try {
    const res = await fetch(url, {
      headers: { Authorization: apiKey },
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) {
      console.warn("[pexels] non-ok:", res.status, query);
      return [];
    }
    const data = (await res.json()) as PexelsResponse;
    memo.set(key, data.photos);
    return data.photos;
  } catch (err) {
    console.warn("[pexels] failed:", (err as Error).message);
    return [];
  }
}

/** Convenience: fetch one photo for a query, with fallback queries. */
export async function findHeroPhoto(
  queries: string[],
  orientation: "landscape" | "portrait" | "square" = "landscape",
): Promise<PexelsPhoto | null> {
  for (const q of queries) {
    const photos = await searchPexels(q, 5, orientation);
    if (photos.length > 0) return photos[0]!;
  }
  return null;
}

/**
 * Pick a distinct photo for each item in `items` using its query list, ensuring
 * no two items return the same photo. Falls back to a shared pool when a
 * specific search has no hits. Order-stable per `items`.
 */
export async function findUniquePhotos<T extends { key: string; queries: string[] }>(
  items: T[],
  fallback: { query: string; minPool?: number } = { query: "split croatia" },
  orientation: "landscape" | "portrait" | "square" = "landscape",
): Promise<Record<string, PexelsPhoto | null>> {
  const used = new Set<number>();
  const result: Record<string, PexelsPhoto | null> = {};

  // Run specific searches in parallel — Pexels memoises so repeated calls
  // across items don't multiply traffic.
  const perItemPhotos = await Promise.all(
    items.map((it) => Promise.all(it.queries.map((q) => searchPexels(q, 6, orientation)))),
  );

  // Fallback pool, large enough to cover any items that miss everything specific.
  const minPool = Math.max(items.length + 2, fallback.minPool ?? 8);
  const pool = await searchPexels(fallback.query, minPool, orientation);
  let poolIdx = 0;

  items.forEach((it, i) => {
    let chosen: PexelsPhoto | null = null;
    for (const photos of perItemPhotos[i]!) {
      const candidate = photos.find((p) => !used.has(p.id));
      if (candidate) {
        chosen = candidate;
        break;
      }
    }
    if (!chosen) {
      while (poolIdx < pool.length) {
        const p = pool[poolIdx++]!;
        if (!used.has(p.id)) {
          chosen = p;
          break;
        }
      }
    }
    if (chosen) used.add(chosen.id);
    result[it.key] = chosen;
  });

  return result;
}
