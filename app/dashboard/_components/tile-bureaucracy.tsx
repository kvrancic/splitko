"use client";

import TileShell from "./tile-shell";

const ACTIONS = [
  { id: "obrt", label: "Open obrt", reason: "1 day form" },
  { id: "prijava", label: "Prijava prebivališta", reason: "10 min @ MUP" },
  { id: "permit", label: "Building permit for adaptacija", reason: "GUP-aware" },
  { id: "id-renew", label: "Renew osobna", reason: "your card expires Aug" },
];

export default function TileBureaucracy() {
  return (
    <TileShell
      tone="cream"
      kicker="Bureaucracy quick actions"
      title="What you might actually need this month"
    >
      <ul className="flex flex-wrap gap-2">
        {ACTIONS.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              className="rounded-full border border-[var(--color-ink)]/15 bg-[var(--color-cream)] px-3 py-2 text-left text-xs font-semibold transition-colors hover:border-[var(--color-ink)]"
            >
              {a.label}
              <span
                className="ml-2 inline-block opacity-65"
                style={{ fontWeight: 400 }}
              >
                · {a.reason}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mono-tag mt-3 text-[var(--color-ink-soft)] opacity-65">
        We prepare. You sign. Splitko never logs in to e-Građani as you.
      </p>
    </TileShell>
  );
}
