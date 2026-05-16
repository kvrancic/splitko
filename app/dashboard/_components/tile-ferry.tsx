"use client";

import TileShell from "./tile-shell";

const TIMELINE = [
  { time: "08:51", what: "Bus 8 from Sukoišan", note: "Catch it" },
  { time: "09:18", what: "Walk to ticket office", note: "5 min line" },
  { time: "09:30", what: "Jadrolinija Split → Supetar", note: "50 min crossing" },
  { time: "10:30", what: "On Brač with 30 min to spare", note: "Pick up rental" },
];

export default function TileFerry() {
  return (
    <TileShell
      tone="teal"
      kicker="Ferry + bus + parking trip"
      title="“Hoću biti na Braču u 11.”"
      hot
    >
      <ol className="space-y-2 text-[13px]">
        {TIMELINE.map((t, i) => (
          <li
            key={i}
            className="grid grid-cols-[68px_1fr_auto] items-center gap-3 rounded-lg bg-[var(--color-cream)] px-3 py-2"
            style={{
              border:
                "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)",
            }}
          >
            <span
              className="display"
              style={{ color: "var(--color-red)", fontSize: "1rem" }}
            >
              {t.time}
            </span>
            <span style={{ fontWeight: 600 }}>{t.what}</span>
            <span className="mono-tag opacity-65">{t.note}</span>
          </li>
        ))}
      </ol>
      <p className="mono-tag mt-3 text-[var(--color-ink-soft)] opacity-70">
        Three separate systems (Jadrolinija, Promet, parking) composed into one
        plan. Drive yourself and the port lot is full by 09:00.
      </p>
    </TileShell>
  );
}
