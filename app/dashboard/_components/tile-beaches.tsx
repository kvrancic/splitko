"use client";

import Image from "next/image";
import TileShell from "./tile-shell";
import { ratingMeta } from "@/lib/izor";

export type BeachData = {
  name: string;
  rating: number;
  year: string;
  lat: number;
  lng: number;
  image: { src: string; alt: string } | null;
};

export default function TileBeaches({
  beaches,
  expanded,
}: {
  beaches: BeachData[];
  expanded?: boolean;
}) {
  // 4 cards by default; full set when intent zooms in.
  const list = expanded ? beaches.slice(0, 6) : beaches.slice(0, 4);
  return (
    <TileShell
      tone="teal"
      kicker="Beaches near you · live"
      title="Where the sea is good right now"
      hot
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {list.map((b) => (
          <BeachCard key={b.name} beach={b} />
        ))}
      </div>
      <p className="mono-tag mt-4 text-[var(--color-ink-soft)] opacity-65">
        Sea-quality rating from IZOR {beaches[0]?.year ?? "—"} · tap a card to
        plan a trip.
      </p>
    </TileShell>
  );
}

function BeachCard({ beach }: { beach: BeachData }) {
  const rating = ratingMeta(beach.rating);
  const seaTemp = pseudoSeaTemp(beach.name);
  const crowd = pseudoCrowd(beach.name);

  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl bg-[var(--color-cream)] text-[var(--color-ink)] transition-transform hover:-translate-y-0.5"
      style={{
        border:
          "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)",
        boxShadow:
          "0 16px 32px -28px color-mix(in oklch, var(--color-ink) 60%, transparent)",
      }}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: "4 / 3", background: "var(--color-cream-deep)" }}
      >
        {beach.image && (
          <Image
            src={beach.image.src}
            alt={beach.image.alt}
            fill
            sizes="(min-width: 1280px) 220px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        )}
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]"
          style={{
            background: rating.colorVar,
            color: "var(--color-cream)",
            boxShadow:
              "0 8px 16px -10px color-mix(in oklch, var(--color-ink) 60%, transparent)",
          }}
        >
          {rating.label}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.25rem",
            letterSpacing: "-0.012em",
          }}
        >
          {beach.name}
        </div>
        <div className="flex items-center justify-between text-[14px] text-[var(--color-ink-soft)]">
          <span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "var(--color-ink)",
              }}
            >
              {seaTemp}°
            </span>{" "}
            sea
          </span>
          <span className="capitalize">{crowd}</span>
        </div>
      </div>
    </article>
  );
}

function pseudoSeaTemp(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return (15 + (h % 9)).toString(); // 15..23
}
function pseudoCrowd(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 17 + name.charCodeAt(i)) >>> 0;
  const labels = ["empty", "calm", "comfortable", "busy", "packed"];
  return labels[h % labels.length];
}
