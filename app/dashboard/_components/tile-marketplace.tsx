"use client";

import Image from "next/image";
import TileShell, { type TilePhoto } from "./tile-shell";

const LISTINGS = [
  {
    side: "demand" as const,
    title: "Wirth family · Frankfurt",
    detail: "Jul 4 → Aug 1 · €1,000 / month · 2 kids",
    matchScore: 92,
  },
  {
    side: "supply" as const,
    title: "Your room · Manuš, 18 m²",
    detail: "Available Jul–Sep · asking €950 / month",
    matchScore: 0,
  },
  {
    side: "demand" as const,
    title: "Berlin couple · no pets",
    detail: "Jul 8 → Jul 22 · €1,200 / month",
    matchScore: 81,
  },
];

export default function TileMarketplace({
  expanded,
  photo,
}: {
  expanded?: boolean;
  photo?: TilePhoto | null;
}) {
  return (
    <TileShell
      tone="green"
      kicker="Marketplace · 2 matches today"
      title="Sublet your room — no agency, no fee"
    >
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_1.4fr]">
        <div
          className="relative w-full overflow-hidden rounded-xl"
          style={{
            aspectRatio: "4 / 3",
            background: "var(--color-cream-deep)",
            minHeight: 160,
          }}
        >
          {photo && (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 280px, 90vw"
              className="object-cover"
            />
          )}
          <div
            className="absolute inset-x-0 bottom-0 p-3 text-[var(--color-cream)]"
            style={{
              background:
                "linear-gradient(0deg, color-mix(in oklch, var(--color-ink) 78%, transparent), transparent)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.05rem",
                letterSpacing: "-0.01em",
              }}
            >
              Your room · Manuš
            </div>
            <div className="text-[12px] opacity-90">
              Asking €950 · July to September
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ul className="flex flex-col gap-2 text-[14px]">
            {LISTINGS.map((l, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 rounded-xl bg-[var(--color-cream)] px-3 py-2.5"
                style={{
                  border:
                    "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)",
                }}
              >
                <div className="min-w-0">
                  <div className="truncate font-semibold">{l.title}</div>
                  <div className="mono-tag truncate text-[var(--color-ink-soft)] opacity-80">
                    {l.detail}
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]"
                  style={{
                    background:
                      l.side === "demand"
                        ? "var(--color-red)"
                        : "var(--color-navy)",
                    color: "var(--color-cream)",
                  }}
                >
                  {l.side === "demand" ? "wants it" : "your listing"}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full px-4 py-2 text-[13px] font-semibold"
              style={{
                background: "var(--color-navy)",
                color: "var(--color-cream)",
                boxShadow:
                  "0 10px 22px -16px color-mix(in oklch, var(--color-navy) 75%, transparent)",
              }}
            >
              Open Wirth match
            </button>
            <button
              type="button"
              className="rounded-full px-4 py-2 text-[13px] font-semibold"
              style={{
                background: "var(--color-cream)",
                color: "var(--color-ink)",
                border:
                  "1px solid color-mix(in oklch, var(--color-ink) 18%, transparent)",
              }}
            >
              Edit my listing
            </button>
          </div>
        </div>
      </div>
      {expanded && (
        <p className="body-lg mt-4 text-[var(--color-ink-soft)]">
          Your agent stayed within the band you set. Sign on the 4th, no agency
          fee. The city facilitates the trade — it doesn’t take a cut.
        </p>
      )}
    </TileShell>
  );
}
