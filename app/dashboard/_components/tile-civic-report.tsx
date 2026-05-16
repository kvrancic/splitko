"use client";

import Image from "next/image";
import TileShell, { type TilePhoto } from "./tile-shell";

export default function TileCivicReport({
  photo,
}: {
  photo?: TilePhoto | null;
}) {
  return (
    <TileShell tone="cream" kicker="Something broken in the city?" title="">
      <div className="relative isolate h-full min-h-[260px] overflow-hidden rounded-xl">
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 92vw"
            className="object-cover"
            style={{ zIndex: 0 }}
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(180deg, color-mix(in oklch, var(--color-ink) 25%, transparent) 0%, color-mix(in oklch, var(--color-ink) 78%, transparent) 100%)",
          }}
        />
        <div
          className="relative flex h-full flex-col justify-end gap-4 p-6 text-[var(--color-cream)]"
          style={{ zIndex: 2 }}
        >
          <div>
            <div
              className="display"
              style={{
                fontSize: "clamp(1.6rem, 0.7rem + 1.5vw, 2.4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                maxWidth: "22ch",
              }}
            >
              Snap a photo. Splitko sends it to the right office.
            </div>
            <p
              className="mt-2 max-w-[36ch] text-[14px] leading-relaxed"
              style={{ color: "color-mix(in oklch, var(--color-cream) 88%, transparent)" }}
            >
              Pothole, broken lamp, garbage overflow, noise after 22:00 — one
              button. You don't need to know which office.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.02] active:scale-[0.99]"
            style={{
              background: "var(--color-red)",
              color: "var(--color-cream)",
              boxShadow:
                "0 16px 30px -16px color-mix(in oklch, var(--color-red) 70%, transparent)",
            }}
          >
            <span aria-hidden style={{ fontSize: "1.1em" }}>
              ＋
            </span>
            Report a problem
          </button>
        </div>
      </div>
    </TileShell>
  );
}
