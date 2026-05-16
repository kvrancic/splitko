"use client";

import Image from "next/image";
import TileShell, { type TilePhoto } from "./tile-shell";

const HEADLINE_EVENT = {
  time: "21:00",
  title: "Klape Skalinada",
  venue: "Diocletian's cellars",
  note: "doors 20:30 · €10 · 7+ welcome",
};

const SUPPORT_EVENTS = [
  {
    time: "19:30",
    title: "Hajduk – Lokomotiva",
    venue: "Any kafić with a TV",
  },
  {
    time: "till 22:00",
    title: "Manuš summer market",
    venue: "Manuš trg · kids ok",
  },
];

export default function TileTonight({
  photo,
}: {
  photo?: TilePhoto | null;
}) {
  return (
    <TileShell
      tone="amber"
      kicker="Tonight in Split"
      title=""
      className="overflow-hidden"
    >
      <div className="flex h-full flex-col gap-4">
        <div
          className="relative w-full overflow-hidden rounded-xl"
          style={{
            aspectRatio: "16 / 10",
            background: "var(--color-cream-deep)",
          }}
        >
          {photo && (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 32vw, 92vw"
              className="object-cover"
            />
          )}
          <div
            className="absolute inset-x-0 bottom-0 p-4 text-[var(--color-cream)]"
            style={{
              background:
                "linear-gradient(0deg, color-mix(in oklch, var(--color-ink) 82%, transparent) 0%, transparent 78%)",
            }}
          >
            <div className="mono-tag opacity-80">{HEADLINE_EVENT.time} · headline</div>
            <div
              className="display"
              style={{
                fontSize: "clamp(1.6rem, 0.8rem + 1.4vw, 2.2rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.018em",
              }}
            >
              {HEADLINE_EVENT.title}
            </div>
            <div className="text-[13px] opacity-90">
              {HEADLINE_EVENT.venue} · {HEADLINE_EVENT.note}
            </div>
          </div>
        </div>

        <ul className="flex flex-col gap-2">
          {SUPPORT_EVENTS.map((e) => (
            <li
              key={e.title}
              className="grid grid-cols-[72px_1fr] items-center gap-3 rounded-xl bg-[var(--color-cream)] px-3 py-2.5"
              style={{
                border:
                  "1px solid color-mix(in oklch, var(--color-ink) 10%, transparent)",
              }}
            >
              <span
                className="display"
                style={{
                  color: "var(--color-red)",
                  fontSize: "1rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {e.time}
              </span>
              <span>
                <span style={{ fontWeight: 600 }}>{e.title}</span>
                <span className="ml-1 text-[13px] text-[var(--color-ink-soft)]">
                  · {e.venue}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mono-tag mt-auto text-[var(--color-ink-soft)] opacity-65">
          Filtered for your kvart and the people in your profile.
        </p>
      </div>
    </TileShell>
  );
}
