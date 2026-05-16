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
