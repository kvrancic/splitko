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
  const list = expanded ? beaches.slice(0, 8) : beaches.slice(0, 4);
  return (
    <TileShell
      tone="teal"
      kicker="Beaches · IZOR · live"
      title="Sea quality, water temperature, crowd"
      hot
    >
      <div className="-mx-2 mt-1 flex gap-2 overflow-x-auto px-2 pb-1 no-scrollbar">
        {list.map((b) => (
          <BeachCard key={b.name} beach={b} />
        ))}
      </div>
      <p className="mono-tag mt-2 text-[var(--color-ink-soft)] opacity-65">
        rating dot · IZOR {beaches[0]?.year ?? "—"} sample · sea temp + crowd
        mocked
      </p>
    </TileShell>
  );
}

function BeachCard({ beach }: { beach: BeachData }) {
  const rating = ratingMeta(beach.rating);
  // small synthetic, plausible-feeling mock fields:
  const seaTemp = pseudoSeaTemp(beach.name);
  const crowd = pseudoCrowd(beach.name);

  return (
    <article
      className="flex w-44 shrink-0 flex-col overflow-hidden rounded-xl bg-[var(--color-cream)] text-[var(--color-ink)]"
      style={{
        border:
          "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)",
      }}
    >
      <div className="relative h-24 w-full bg-[var(--color-cream-deep)]">
        {beach.image && (
          <Image
            src={beach.image.src}
            alt={beach.image.alt}
            fill
            sizes="180px"
            className="object-cover"
          />
        )}
        <span
          className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
          style={{
            background: rating.colorVar,
            color: "var(--color-cream)",
          }}
        >
          {rating.label}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 p-2.5">
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
        >
          {beach.name}
        </div>
        <div className="flex justify-between text-xs text-[var(--color-ink-soft)]">
          <span>{seaTemp}°C</span>
          <span>{crowd}</span>
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
