import { findUniquePhotos } from "@/lib/pexels";
import { getOrderedSplitBeaches, ratingMeta } from "@/lib/izor";
import { getSplitObservation, getCurrentObservations } from "@/lib/dhmz";
import DashboardGrid from "./_components/dashboard-grid";
import DashboardShell from "./_components/dashboard-shell";
import ChatPanel from "./_components/chat-panel";
import { IntentProvider } from "./_components/intent-context";
import MobileChatDrawer from "./_components/mobile-chat-drawer";
import type { BeachData } from "./_components/tile-beaches";
import type { WeatherData } from "./_components/tile-weather";
import type { TilePhoto } from "./_components/tile-shell";

export const revalidate = 300;

const BEACH_QUERIES: Record<string, string[]> = {
  Bačvice: [
    "bacvice beach split croatia",
    "bacvice split waterfront",
    "split city beach",
  ],
  Žnjan: ["znjan beach split", "znjan croatia coastline", "split adriatic"],
  Kašjuni: [
    "kasjuni beach marjan split",
    "marjan beach croatia",
    "split pine forest coast",
  ],
  Bene: ["bene marjan split", "marjan park split", "marjan forest sea split"],
  Trstenik: ["trstenik split croatia", "split beach pebble", "dalmatia beach"],
  Ježinac: ["jezinac beach split", "split rocky coast", "adriatic cove"],
  Zvončac: ["zvoncac split", "split coastline pier", "marjan coast"],
  Firule: ["firule split", "split family beach", "dalmatian shore"],
  Duilovo: ["duilovo split", "split eastern coast", "dalmatia bay"],
};

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
  const candidate = [...dedup.values()].slice(0, 6);

  // Build a single photo-allocation request: every beach + every non-beach
  // tile that wants imagery. findUniquePhotos guarantees no two slots get the
  // same Pexels photo.
  const photoItems = [
    ...candidate.map((b) => {
      const name = simpleName(b.lpla);
      return {
        key: `beach:${name}`,
        queries:
          BEACH_QUERIES[name] ??
          [
            `${name} beach split croatia`,
            `${name} split adriatic`,
            "split croatia beach",
          ],
      };
    }),
    {
      key: "weather",
      queries: [
        "split croatia waterfront sunset",
        "split croatia sky",
        "dalmatian sky",
      ],
    },
    {
      key: "civic",
      queries: [
        "split croatia old town street",
        "split palm street",
        "diocletian palace street",
      ],
    },
    {
      key: "marketplace",
      queries: [
        "split croatia balcony old town",
        "split apartment window",
        "mediterranean apartment terrace",
      ],
    },
  ];

  const photoMap = await findUniquePhotos(photoItems, {
    query: "split croatia adriatic",
    minPool: 18,
  });

  const beaches: BeachData[] = candidate.map((b) => {
    const name = simpleName(b.lpla);
    const photo = photoMap[`beach:${name}`];
    return {
      name,
      rating: b.locj,
      year: b.lkad,
      lat: b.lat,
      lng: b.lng,
      image: photo
        ? { src: photo.src.large, alt: photo.alt || `${name} beach` }
        : null,
    };
  });

  const weatherPhoto = pickPhoto(photoMap, "weather");
  const civicPhoto = pickPhoto(photoMap, "civic");
  const marketplacePhoto = pickPhoto(photoMap, "marketplace");

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
      <DashboardShell
        main={
          <>
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
            <DashboardGrid
              beaches={beaches}
              weather={weather}
              weatherPhoto={weatherPhoto}
              civicPhoto={civicPhoto}
              marketplacePhoto={marketplacePhoto}
            />
          </>
        }
        chat={<ChatPanel />}
      />
      <MobileChatDrawer />
    </IntentProvider>
  );
}

function pickPhoto(
  map: Awaited<ReturnType<typeof findUniquePhotos>>,
  key: string,
): TilePhoto | null {
  const p = map[key];
  if (!p) return null;
  return { src: p.src.large, alt: p.alt || key };
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
