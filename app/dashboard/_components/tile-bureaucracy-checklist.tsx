"use client";

import TileShell from "./tile-shell";

const CHECKS = [
  { label: "Open obrt — pick activity code from NKD 2007", done: false },
  { label: "Submit registration to Porezna uprava Split", done: false },
  { label: "Pay registration fee (~€55) at FINA or via e-Građani", done: false },
  { label: "Register with HZZO within 8 days", done: false },
  { label: "Notify HZMO of your new earnings basis", done: false },
];

export default function TileBureauChecklist() {
  return (
    <TileShell
      tone="navy"
      kicker="RAG · gov.hr + e-Građani"
      title="Open obrt — your checklist"
    >
      <ul className="space-y-2 text-[var(--color-cream)]/85">
        {CHECKS.map((c, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-lg bg-[var(--color-cream)]/8 px-3 py-2 text-[13px]"
          >
            <span
              aria-hidden
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                border: "1px solid var(--color-cream)",
                opacity: c.done ? 1 : 0.4,
                background: c.done ? "var(--color-cream)" : "transparent",
                display: "inline-block",
              }}
            />
            {c.label}
          </li>
        ))}
      </ul>
      <p className="mono-tag mt-3 text-[var(--color-cream)]/60">
        cites: gov.hr/zivotne-situacije, Porezna FAQ, e-Građani katalog
      </p>
    </TileShell>
  );
}
