"use client";

import TileShell from "./tile-shell";

export type WeatherData = {
  station: string;
  observedAt: string;
  tempC: number | null;
  humidity: number | null;
  windDir: string | null;
  windSpeed: number | null;
  description: string;
};

export default function TileWeather({ weather }: { weather: WeatherData | null }) {
  if (!weather) {
    return (
      <TileShell tone="navy" kicker="Weather · DHMZ" title="Split">
        <p className="text-[var(--color-cream)]/70">
          DHMZ feed unavailable. Last known good cached locally.
        </p>
      </TileShell>
    );
  }
  return (
    <TileShell
      tone="navy"
      kicker={`DHMZ · ${weather.station}`}
      title=""
      hot
    >
      <div className="flex h-full flex-col justify-between gap-5">
        <div>
          <div
            className="display"
            style={{
              fontSize: "clamp(2.6rem, 1.3rem + 3vw, 4rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
            }}
          >
            {weather.tempC?.toFixed(1) ?? "—"}
            <span
              style={{
                fontSize: "0.45em",
                marginLeft: "0.15em",
                color: "var(--color-cream)",
                opacity: 0.5,
              }}
            >
              °C
            </span>
          </div>
          <div
            className="mt-2 text-[var(--color-cream)]/80"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.05rem",
              letterSpacing: "-0.005em",
            }}
          >
            {weather.description || "—"}
          </div>
        </div>
        <dl className="grid grid-cols-3 gap-2 text-[var(--color-cream)]/75">
          <Stat label="Humidity" value={`${weather.humidity ?? "—"}%`} />
          <Stat label="Wind" value={`${weather.windSpeed ?? "—"} m/s`} />
          <Stat label="Dir" value={weather.windDir ?? "—"} />
        </dl>
        <div className="mono-tag opacity-55">
          observed · {weather.observedAt}
        </div>
      </div>
    </TileShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mono-tag opacity-60">{label}</dt>
      <dd
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.05rem",
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </dd>
    </div>
  );
}
