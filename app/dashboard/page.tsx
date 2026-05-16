import { findHeroPhoto, searchPexels } from "@/lib/pexels";
import { getOrderedSplitBeaches, ratingMeta } from "@/lib/izor";
import { getSplitObservation, getCurrentObservations } from "@/lib/dhmz";
import DashboardGrid from "./_components/dashboard-grid";
import ChatPanel from "./_components/chat-panel";
import { IntentProvider } from "./_components/intent-context";
import type { BeachData } from "./_components/tile-beaches";
import type { WeatherData } from "./_components/tile-weather";

export const revalidate = 300;

export default async function DashboardPage() {
  const [beachesRaw, splitObs, allObs] = await Promise.all([
    getOrderedSplitBeaches().catch(() => []),
    getSplitObservation().catch(() => null),
    getCurrentObservations().catch(() => ({ observedAt: "—", stations: [] })),
  ]);

  // Dedupe Bačvice sub-locations to one card by picking the worst rating.
  const dedup = new Map<string, (typeof beachesRaw)[number]>();
  for (const b of beachesRaw) {
    const key = simpleName(b.lpla);
    const prev = dedup.get(key);
    if (!prev || b.locj > prev.locj) dedup.set(key, b);
  }
  const candidate = [...dedup.values()].slice(0, 8);

  // Fetch one Pexels image per beach (in parallel).
  const beaches: BeachData[] = await Promise.all(
    candidate.map(async (b) => {
      const simplified = simpleName(b.lpla);
      const photo = await findHeroPhoto([
        `${simplified} beach split`,
        `${simplified} split croatia`,
        "split croatia beach",
      ]);
      return {
        name: simplified,
        rating: b.locj,
        year: b.lkad,
        lat: b.lat,
        lng: b.lng,
        image: photo
          ? { src: photo.src.medium, alt: photo.alt || simplified }
          : null,
      };
    }),
  );

  // Pre-warm a fallback pool too so future queries are instant.
  await searchPexels("split croatia beach", 6).catch(() => []);

  const weather: WeatherData | null = splitObs
    ? {
        station: splitObs.name,
        observedAt: allObs.observedAt,
        tempC: splitObs.tempC,
        humidity: splitObs.humidity,
        windDir: splitObs.windDir,
        windSpeed: splitObs.windSpeed,
        description: splitObs.description,
      }
    : null;

  return (
    <IntentProvider>
      <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 py-4 lg:grid-cols-[1fr_360px] lg:px-6 lg:py-6">
        <main>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="mono-tag text-[var(--color-ink-soft)]">
                Live state of Split
              </div>
              <h1
                className="display"
                style={{
                  fontSize: "clamp(1.7rem, 0.7rem + 2.2vw, 2.4rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.018em",
                }}
              >
                Your city, right now.
              </h1>
            </div>
            <Legend />
          </div>
          <DashboardGrid beaches={beaches} weather={weather} />
        </main>
        <div
          className="hidden h-[calc(100dvh-90px)] overflow-hidden rounded-2xl lg:block"
          style={{
            border:
              "1px solid color-mix(in oklch, var(--color-ink) 10%, transparent)",
          }}
        >
          <ChatPanel />
        </div>
      </div>
      <MobileChatDrawer />
    </IntentProvider>
  );
}

function Legend() {
  const labels = [1, 2, 3, 4].map((n) => ({ n, ...ratingMeta(n) }));
  return (
    <div className="flex flex-wrap items-center gap-2 text-[var(--color-ink-soft)]">
      <span className="mono-tag opacity-70">IZOR rating</span>
      {labels.map((l) => (
        <span
          key={l.n}
          className="mono-tag flex items-center gap-1.5"
        >
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: l.colorVar,
              display: "inline-block",
            }}
          />
          {l.english}
        </span>
      ))}
    </div>
  );
}

function MobileChatDrawer() {
  return null; // chat panel folds into the grid as a future enhancement; lg+ users get the persistent rail
}

function simpleName(raw: string) {
  // collapse "Bačvice - ulaz" / "Trstenik-Radoševac" / "Uvala Kašjuni" into a tile-friendly label
  if (/ba[čc]vice/i.test(raw)) return "Bačvice";
  if (/trstenik/i.test(raw)) return "Trstenik";
  if (/ka[šs]juni/i.test(raw)) return "Kašjuni";
  if (/jeb-?inac/i.test(raw)) return "Ježinac";
  if (/jezinac/i.test(raw)) return "Ježinac";
  if (/ježinac/i.test(raw)) return "Ježinac";
  if (/zvon[čc]ac/i.test(raw)) return "Zvončac";
  return raw.split(/[-–]/)[0]!.trim();
}
