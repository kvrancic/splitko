"use client";

import Image from "next/image";
import TileShell, { type TilePhoto } from "./tile-shell";

type ReportAction = {
  id: string;
  label: string;
  description: string;
  emoji: string;
};

const ACTIONS: ReportAction[] = [
  {
    id: "streetlight",
    label: "Broken street lamp",
    description: "Send a photo. We route it to EVN within minutes.",
    emoji: "💡",
  },
  {
    id: "pothole",
    label: "Pothole or bad road",
    description: "We classify and pass it to Hrvatske ceste.",
    emoji: "🛣️",
  },
  {
    id: "garbage",
    label: "Garbage overflow",
    description: "Photo + your kvart goes straight to Čistoća.",
    emoji: "🗑️",
  },
  {
    id: "lost-found",
    label: "Lost & found",
    description: "Post what you lost or found. We match neighbours.",
    emoji: "🔑",
  },
  {
    id: "noise",
    label: "Noise after 22:00",
    description: "Logged with the patrol. No phone tag, no forms.",
    emoji: "🔇",
  },
  {
    id: "stray",
    label: "Stray animal",
    description: "Routed to Animal Friends Split and a nearby vet.",
    emoji: "🐈",
  },
];

export default function TileCivicReport({
  photo,
}: {
  photo?: TilePhoto | null;
}) {
  return (
    <TileShell
      tone="cream"
      kicker="Report something"
      title="Tap the thing that happened"
    >
      <div className="grid gap-4 md:grid-cols-[minmax(0,200px)_1fr]">
        <div
          className="relative hidden w-full overflow-hidden rounded-xl md:block"
          style={{
            aspectRatio: "3 / 4",
            background: "var(--color-cream-deep)",
          }}
        >
          {photo && (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 200px, 0px"
              className="object-cover"
            />
          )}
          <div
            className="absolute inset-x-0 bottom-0 p-3 text-[var(--color-cream)]"
            style={{
              background:
                "linear-gradient(0deg, color-mix(in oklch, var(--color-ink) 80%, transparent), transparent)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "-0.005em",
              }}
            >
              We file it.
            </div>
            <div className="text-[12px] opacity-90">
              You don’t need to know which office.
            </div>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              type="button"
              className="group flex items-start gap-3 rounded-xl bg-[var(--color-cream)] p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{
                border:
                  "1px solid color-mix(in oklch, var(--color-ink) 10%, transparent)",
              }}
            >
              <span
                aria-hidden
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg"
                style={{
                  background:
                    "color-mix(in oklch, var(--color-red) 10%, var(--color-cream-shadow))",
                }}
              >
                {a.emoji}
              </span>
              <span className="min-w-0">
                <span
                  className="block"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.98rem",
                    letterSpacing: "-0.008em",
                  }}
                >
                  {a.label}
                </span>
                <span className="block text-[12.5px] text-[var(--color-ink-soft)] leading-snug">
                  {a.description}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="mono-tag mt-4 text-[var(--color-ink-soft)] opacity-70">
        Splitko never logs in as you. It routes the report to the office that
        actually fixes it.
      </p>
    </TileShell>
  );
}
