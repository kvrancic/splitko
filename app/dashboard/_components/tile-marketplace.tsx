"use client";

import Image from "next/image";
import TileShell, { type TilePhoto } from "./tile-shell";

const TOP_MATCH = {
  family: "Wirth family",
  from: "Frankfurt",
  window: "Jul 4 → Aug 1",
  offer: "€1,000 / month",
  matchScore: 92,
};

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
      title=""
    >
      <div className="flex h-full flex-col gap-4">
        <div
          className="relative w-full overflow-hidden rounded-xl"
          style={{
            aspectRatio: "16 / 9",
            background: "var(--color-cream-deep)",
          }}
        >
          {photo && (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="object-cover"
            />
          )}
          <div
            className="absolute inset-x-0 bottom-0 p-4 text-[var(--color-cream)]"
            style={{
              background:
                "linear-gradient(0deg, color-mix(in oklch, var(--color-ink) 80%, transparent) 0%, transparent 80%)",
            }}
          >
            <div
              className="display"
              style={{
                fontSize: "clamp(1.5rem, 0.7rem + 1.3vw, 2rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.018em",
              }}
            >
              Sublet your room — no agency, no fee.
            </div>
            <p className="mt-1 text-[13px] opacity-90">
              Your listing in Manuš · asking €950 · July to September
            </p>
          </div>
        </div>

        <div
          className="rounded-xl bg-[var(--color-cream)] p-4"
          style={{
            border:
              "1px solid color-mix(in oklch, var(--color-ink) 10%, transparent)",
          }}
        >
          <div className="flex items-baseline justify-between gap-2">
            <div className="mono-tag text-[var(--color-ink-soft)] opacity-80">
              Top match · {TOP_MATCH.matchScore}% fit
            </div>
            <div
              className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em]"
              style={{
                background: "var(--color-red)",
                color: "var(--color-cream)",
              }}
            >
              wants it
            </div>
          </div>
          <div
            className="mt-1"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "-0.01em",
            }}
          >
            {TOP_MATCH.family} · {TOP_MATCH.from}
          </div>
          <div className="mt-0.5 text-[13.5px] text-[var(--color-ink-soft)]">
            {TOP_MATCH.window} · offering {TOP_MATCH.offer}
          </div>

          <button
            type="button"
            className="mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold transition-transform hover:scale-[1.02] active:scale-[0.99]"
            style={{
              background: "var(--color-navy)",
              color: "var(--color-cream)",
              boxShadow:
                "0 12px 24px -16px color-mix(in oklch, var(--color-navy) 75%, transparent)",
            }}
          >
            See the match
          </button>
        </div>

        {expanded && (
          <p className="body-lg text-[var(--color-ink-soft)]">
            Your agent stayed within the band you set. Sign on the 4th. No
            broker fee — the city facilitates the trade.
          </p>
        )}
      </div>
    </TileShell>
  );
}
