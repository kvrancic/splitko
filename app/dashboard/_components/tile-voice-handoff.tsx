"use client";

import Link from "next/link";
import TileShell from "./tile-shell";

export default function TileVoiceHandoff() {
  return (
    <TileShell
      tone="amber"
      kicker="Voice handoff · KBC Split"
      title="Splitko called the human"
    >
      <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
        <div className="text-[var(--color-ink-soft)] body-lg">
          Splitko transcribed baka Anka’s prescription, looked up the dosage
          against KBC public docs, drafted a one-line briefing for the
          receptionist, and placed the call. She’s on the line; the human can
          pick up.
        </div>
        <div
          className="rounded-xl p-4"
          style={{
            background: "var(--color-cream)",
            border:
              "1px solid color-mix(in oklch, var(--color-ink) 10%, transparent)",
          }}
        >
          <div className="mono-tag opacity-70">briefing card</div>
          <p className="mt-1.5 text-sm">
            <strong>For:</strong> KBC ambulanta · Anka K. (DOB 1950-04-12) ·
            chronic asthma · prescription clarification only. No new symptoms.
            Please confirm refill on August 14.
          </p>
          <Link
            href="/voice"
            className="mt-3 inline-flex rounded-full bg-[var(--color-red)] px-3 py-1.5 text-xs font-semibold text-[var(--color-cream)]"
          >
            Watch the call →
          </Link>
        </div>
      </div>
    </TileShell>
  );
}
