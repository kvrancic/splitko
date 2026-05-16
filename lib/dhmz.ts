import { XMLParser } from "fast-xml-parser";

const DHMZ_FEEDS = {
  current: "https://vrijeme.hr/hrvatska_n.xml",
  sea: "https://vrijeme.hr/more_n.xml",
  seaTemp: "https://vrijeme.hr/temp_vode.xml",
  uvi: "https://vrijeme.hr/uvi.xml",
  todayForecast: "https://prognoza.hr/prognoza_danas.xml",
  regionToday: "https://prognoza.hr/regije_danas.xml",
} as const;

export type DhmzFeed = keyof typeof DHMZ_FEEDS;

export type StationObservation = {
  name: string;
  lat: number;
  lng: number;
  tempC: number | null;
  humidity: number | null;
  pressureHpa: number | null;
  windDir: string | null;
  windSpeed: number | null;
  description: string;
  symbol: string | null;
};

type CurrentParsed = {
  Hrvatska: {
    DatumTermin: { Datum: string; Termin: string };
    Grad: Array<{
      GradIme: string;
      Lat: string | number;
      Lon: string | number;
      Podatci: {
        Temp: string | number;
        Vlaga: string | number;
        Tlak: string | number;
        VjetarSmjer: string;
        VjetarBrzina: string | number;
        Vrijeme: string;
        VrijemeZnak: string | number;
      };
    }>;
  };
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
  trimValues: true,
});

const toNumber = (v: unknown): number | null => {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (s === "" || s === "-") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};

async function fetchFeed(feed: DhmzFeed): Promise<string> {
  const res = await fetch(DHMZ_FEEDS[feed], {
    next: { revalidate: 300 },
    headers: { "User-Agent": "splitko/0.1 (demo, contact via repo)" },
  });
  if (!res.ok) {
    throw new Error(`DHMZ ${feed} returned ${res.status}`);
  }
  return await res.text();
}

export async function getCurrentObservations(): Promise<{
  observedAt: string;
  stations: StationObservation[];
}> {
  const xml = await fetchFeed("current");
  const parsed = parser.parse(xml) as CurrentParsed;
  const { Datum, Termin } = parsed.Hrvatska.DatumTermin;
  const cities = parsed.Hrvatska.Grad ?? [];

  const stations: StationObservation[] = cities.map((g) => ({
    name: String(g.GradIme),
    lat: Number(g.Lat),
    lng: Number(g.Lon),
    tempC: toNumber(g.Podatci.Temp),
    humidity: toNumber(g.Podatci.Vlaga),
    pressureHpa: toNumber(g.Podatci.Tlak),
    windDir: String(g.Podatci.VjetarSmjer ?? "").trim() || null,
    windSpeed: toNumber(g.Podatci.VjetarBrzina),
    description: String(g.Podatci.Vrijeme ?? "").trim(),
    symbol: String(g.Podatci.VrijemeZnak ?? "").trim() || null,
  }));

  return { observedAt: `${Datum} ${Termin}h`, stations };
}

export async function getSplitObservation(): Promise<StationObservation | null> {
  const data = await getCurrentObservations();
  return (
    data.stations.find((s) => s.name === "Split-Marjan") ??
    data.stations.find((s) => s.name === "Split-aerodrom") ??
    null
  );
}

/** Sea temperatures by station name; returns map keyed by station. */
export async function getSeaTemperatures(): Promise<Record<string, number>> {
  const xml = await fetchFeed("seaTemp");
  // The file uses a non-trivial schema; we extract numeric pairs liberally.
  // Map of station-name -> degrees C, last numeric reading.
  const out: Record<string, number> = {};
  const matches = xml.matchAll(
    /<Postaja>[\s\S]*?<Ime>([^<]+)<\/Ime>[\s\S]*?<Temp(?:eratura)?>([^<]+)<\/Temp(?:eratura)?>/g,
  );
  for (const m of matches) {
    const name = m[1]?.trim() ?? "";
    const t = toNumber(m[2]);
    if (name && t !== null) out[name] = t;
  }
  return out;
}

/** Simple typed wrapper over today's forecast text. */
export async function getTodayForecast(): Promise<{
  issuedAt: string | null;
  summary: string;
}> {
  const xml = await fetchFeed("todayForecast");
  const parsed = parser.parse(xml) as Record<string, unknown>;
  const root = (parsed.Prognoza ?? parsed.HrvatskaPrognoza ?? {}) as Record<
    string,
    unknown
  >;
  const issuedAt =
    typeof root.Vrijeme === "string"
      ? (root.Vrijeme as string)
      : typeof root.IzdanoUTermin === "string"
        ? (root.IzdanoUTermin as string)
        : null;
  const summary =
    (typeof root.Tekst === "string" && (root.Tekst as string)) ||
    (typeof root.Opis === "string" && (root.Opis as string)) ||
    JSON.stringify(root).slice(0, 600);
  return { issuedAt, summary };
}
