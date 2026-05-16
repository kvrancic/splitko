"use client";

import TileShell from "./tile-shell";

const EVENTS = [
  {
    time: "21:00",
    title: "Klape Skalinada",
    venue: "Diocletian’s cellars",
    note: "7+ · €10",
  },
  {
    time: "19:30",
    title: "Hajduk – Lokomotiva",
    venue: "Anywhere with a TV",
    note: "kafić-friendly",
  },
  {
    time: "till 22:00",
    title: "Manuš summer market",
    venue: "Manuš trg",
    note: "kids ok",
  },
];

export default function TileTonight({ expanded }: { expanded?: boolean }) {
  return (
    <TileShell tone="amber" kicker="Tonight in Split" title="Three things on">
      <ul className="space-y-2">
        {EVENTS.map((e) => (
          <li
            key={e.title}
            className="grid grid-cols-[60px_1fr] gap-3 rounded-lg bg-[var(--color-cream)] px-3 py-2 text-[13px]"
          >
            <div
              className="display"
              style={{
                fontSize: "0.95rem",
                color: "var(--color-red)",
                letterSpacing: "-0.01em",
              }}
            >
              {e.time}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{e.title}</div>
              <div className="mono-tag text-[var(--color-ink-soft)] opacity-75">
                {e.venue} · {e.note}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {expanded && (
        <p className="body-lg mt-3 text-[var(--color-ink-soft)]">
          A user asking what is on tonight is using Splitko several times a
          week, and the flywheel is fully loaded.
        </p>
      )}
    </TileShell>
  );
}
