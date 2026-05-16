"use client";

import TileShell from "./tile-shell";

const LISTINGS = [
  { side: "demand", title: "Wirth family, FR", detail: "Jul 4 → Aug 1 · €1000 · 2 kids" },
  { side: "supply", title: "Your room, Manuš", detail: "Available Jul–Sep · €950 asking" },
  { side: "demand", title: "Couple from Berlin", detail: "Jul 8 → Jul 22 · €1200" },
];

export default function TileMarketplace({ expanded }: { expanded?: boolean }) {
  return (
    <TileShell
      tone="green"
      kicker="Marketplace · 2 new matches"
      title="Sublet your room without a broker"
    >
      <ul className="space-y-2 text-[13px]">
        {LISTINGS.map((l, i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-3 rounded-lg bg-[var(--color-cream)]/85 px-3 py-2"
          >
            <div>
              <div style={{ fontWeight: 600 }}>{l.title}</div>
              <div className="mono-tag text-[var(--color-ink-soft)] opacity-75">
                {l.detail}
              </div>
            </div>
            <span
              className="mono-tag rounded-full px-2 py-0.5"
              style={{
                background:
                  l.side === "demand"
                    ? "var(--color-red)"
                    : "var(--color-navy)",
                color: "var(--color-cream)",
              }}
            >
              {l.side}
            </span>
          </li>
        ))}
      </ul>
      {expanded && (
        <p className="body-lg mt-3 text-[var(--color-ink-soft)]">
          Your agent negotiated within the band you set. Meet to sign on the
          4th. Nobody paid a percentage.
        </p>
      )}
    </TileShell>
  );
}
