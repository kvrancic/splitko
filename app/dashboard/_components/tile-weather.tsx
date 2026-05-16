"use client";

import Image from "next/image";
import TileShell, { type TilePhoto } from "./tile-shell";

export type WeatherData = {
  station: string;
  observedAt: string;
  tempC: number | null;
  humidity: number | null;
  windDir: string | null;
  windSpeed: number | null;
  description: string;
};

export default function TileWeather({
  weather,
  photo,
}: {
  weather: WeatherData | null;
  photo?: TilePhoto | null;
}) {
  if (!weather) {
    return (
      <TileShell tone="cream" kicker="Weather · DHMZ" title="Split">
        <p className="text-[var(--color-ink-soft)]">
          Weather is offline for a moment. Last known reading is being shown
          where relevant.
        </p>
      </TileShell>
    );
  }
  return (
    <TileShell tone="cream" kicker="Weather · Split" title="" hot>
      <div className="flex h-full flex-col gap-3">
        {photo && (
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{ aspectRatio: "16 / 9", background: "var(--color-cream-deep)" }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 22vw, 90vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex items-end gap-3">
          <div
            className="display"
            style={{
              fontSize: "clamp(2.4rem, 1.2rem + 2vw, 3.2rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
            }}
          >
            {weather.tempC?.toFixed(0) ?? "—"}
            <span
              style={{
                fontSize: "0.45em",
                marginLeft: "0.08em",
                color: "var(--color-ink-soft)",
              }}
            >
              °C
            </span>
          </div>
          <div
            className="pb-2 text-[var(--color-ink-soft)]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.95rem",
              letterSpacing: "-0.005em",
            }}
          >
            {weather.description || "—"}
          </div>
        </div>
        <dl className="grid grid-cols-3 gap-2 text-[var(--color-ink-soft)]">
          <Stat label="Humidity" value={`${weather.humidity ?? "—"}%`} />
          <Stat
            label="Wind"
            value={`${weather.windSpeed ?? "—"} m/s`}
          />
          <Stat label="Dir" value={weather.windDir ?? "—"} />
        </dl>
        <div className="mono-tag opacity-55">
          DHMZ · {weather.station} · {weather.observedAt}
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
          fontSize: "1rem",
          letterSpacing: "-0.01em",
          color: "var(--color-ink)",
        }}
      >
        {value}
      </dd>
    </div>
  );
}
