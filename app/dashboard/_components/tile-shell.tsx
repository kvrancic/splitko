"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Tone = "cream" | "navy" | "teal" | "red" | "amber" | "green";

const BG: Record<Tone, string> = {
  cream: "var(--color-cream-shadow)",
  navy: "var(--color-navy)",
  teal:
    "color-mix(in oklch, var(--color-teal) 18%, var(--color-cream-shadow))",
  red:
    "color-mix(in oklch, var(--color-red) 14%, var(--color-cream-shadow))",
  amber:
    "color-mix(in oklch, var(--color-amber-warn) 22%, var(--color-cream-shadow))",
  green:
    "color-mix(in oklch, var(--color-green-good) 14%, var(--color-cream-shadow))",
};
const FG: Record<Tone, string> = {
  cream: "var(--color-ink)",
  navy: "var(--color-cream)",
  teal: "var(--color-ink)",
  red: "var(--color-ink)",
  amber: "var(--color-ink)",
  green: "var(--color-ink)",
};

export default function TileShell({
  tone = "cream",
  kicker,
  title,
  children,
  pad = 20,
  className,
  hot,
}: {
  tone?: Tone;
  kicker?: string;
  title?: string;
  children: ReactNode;
  pad?: number;
  className?: string;
  hot?: boolean;
}) {
  return (
    <motion.article
      layout
      whileHover={{ y: -2 }}
      className={`relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl ${className ?? ""}`}
      style={{
        background: BG[tone],
        color: FG[tone],
        padding: pad,
        border: hot
          ? "1px solid color-mix(in oklch, var(--color-red) 50%, transparent)"
          : "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)",
      }}
    >
      {(kicker || title) && (
        <header className="flex items-baseline justify-between gap-2">
          {kicker && (
            <span
              className="mono-tag"
              style={{ opacity: tone === "navy" ? 0.7 : 0.6 }}
            >
              {kicker}
            </span>
          )}
          {hot && (
            <span
              className="mono-tag rounded-full px-2 py-0.5"
              style={{
                background: "var(--color-red)",
                color: "var(--color-cream)",
                fontSize: "0.6rem",
              }}
            >
              live
            </span>
          )}
        </header>
      )}
      {title && (
        <h3
          className="display"
          style={{
            fontSize: "clamp(1.15rem, 0.6rem + 0.9vw, 1.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
          }}
        >
          {title}
        </h3>
      )}
      <div className="flex-1">{children}</div>
    </motion.article>
  );
}
