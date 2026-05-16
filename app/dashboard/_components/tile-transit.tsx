"use client";

import TileShell from "./tile-shell";
import type { IntentId } from "@/lib/intents";

const ROUTES = [
  { line: "17", from: "Sukoišan", eta: "4 min", load: "comfortable" },
  { line: "12", from: "Kašjuni → centar", eta: "11 min", load: "busy" },
  { line: "8", from: "AS → Sukoišan", eta: "9 min", load: "calm" },
];

const PARKING = [
  { zone: "Riva", state: "FULL", price: "€4.00/h" },
  { zone: "Matejuška", state: "4 bays", price: "€4.00/h" },
  { zone: "Sukoišan", state: "27 bays", price: "€1.50/h" },
];

export default function TileTransit({ highlight }: { highlight: IntentId }) {
  const showParking = highlight === "parking" || highlight === "transit";
  return (
    <TileShell
      tone="cream"
      kicker={
        highlight === "parking"
          ? "Promet Parking · live (mock)"
          : "Promet Buses + Parking · mock"
      }
      title="Move through Split"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="mono-tag text-[var(--color-ink-soft)] opacity-65">
            buses
          </div>
          <ul className="mt-1.5 space-y-1.5 text-[13px]">
            {ROUTES.map((r) => (
              <li
                key={r.line}
                className="grid grid-cols-[28px_1fr_auto] items-center gap-2 rounded-lg bg-[var(--color-cream)] px-3 py-2"
                style={{
                  border:
                    "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)",
                }}
              >
                <span
                  className="display"
                  style={{ color: "var(--color-red)", fontSize: "1rem" }}
                >
                  {r.line}
                </span>
                <span>{r.from}</span>
                <span className="mono-tag opacity-65">{r.eta}</span>
              </li>
            ))}
          </ul>
        </div>
        {showParking ? (
          <div>
            <div className="mono-tag text-[var(--color-ink-soft)] opacity-65">
              parking · SFpark-style price
            </div>
            <ul className="mt-1.5 space-y-1.5 text-[13px]">
              {PARKING.map((p) => (
                <li
                  key={p.zone}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-lg bg-[var(--color-cream)] px-3 py-2"
                  style={{
                    border:
                      "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{p.zone}</span>
                  <span
                    className="mono-tag rounded-full px-2 py-0.5"
                    style={{
                      background:
                        p.state === "FULL"
                          ? "var(--color-red)"
                          : "var(--color-green-good)",
                      color: "var(--color-cream)",
                    }}
                  >
                    {p.state}
                  </span>
                  <span className="mono-tag opacity-65">{p.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-xl bg-[var(--color-cream)] p-3 text-sm">
            <div className="mono-tag text-[var(--color-ink-soft)] opacity-65">
              traffic
            </div>
            <p className="mt-1.5">
              Trumbićeva moderate. Domovinskog rata clear. HAK marks Klis pass
              cleared after 09:00 incident.
            </p>
          </div>
        )}
      </div>
    </TileShell>
  );
}
