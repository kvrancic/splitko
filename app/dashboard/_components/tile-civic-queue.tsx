"use client";

import { motion } from "framer-motion";
import TileShell from "./tile-shell";

const ITEMS = [
  {
    id: "2026-05-1192",
    label: "Street lamp · Lučac vrtić zone",
    status: "Routed · EVN Split",
    age: "11 min",
    tone: "warn" as const,
  },
  {
    id: "2026-05-1188",
    label: "Garbage overflow · Trg braće Radić",
    status: "In progress · Čistoća",
    age: "4 h",
    tone: "good" as const,
  },
  {
    id: "2026-05-1170",
    label: "Pothole · Domovinskog rata 22",
    status: "Closed · 2 days ago",
    age: "—",
    tone: "neutral" as const,
  },
];

const TONE: Record<"warn" | "good" | "neutral", string> = {
  warn: "var(--color-amber-warn)",
  good: "var(--color-green-good)",
  neutral: "color-mix(in oklch, var(--color-ink) 30%, transparent)",
};

export default function TileCivicQueue({ expanded }: { expanded?: boolean }) {
  return (
    <TileShell tone="red" kicker="Civic queue · your block" title="3 reports">
      <ul className="space-y-2">
        {ITEMS.map((it) => (
          <motion.li
            key={it.id}
            layout
            className="grid grid-cols-[8px_1fr_auto] items-center gap-3 rounded-lg bg-[var(--color-cream)]/65 px-3 py-2 text-[13px]"
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: TONE[it.tone],
              }}
            />
            <div>
              <div style={{ fontWeight: 600 }}>{it.label}</div>
              <div className="mono-tag text-[var(--color-ink-soft)] opacity-75">
                #{it.id} · {it.status}
              </div>
            </div>
            <div className="mono-tag opacity-65">{it.age}</div>
          </motion.li>
        ))}
      </ul>
      {expanded && (
        <p className="body-lg mt-3 text-[var(--color-ink-soft)]">
          The same data, aggregated, is a public map of what your city is
          currently broken at and how long since they were told.
        </p>
      )}
    </TileShell>
  );
}
