"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ease, sectionViewport } from "@/lib/motion";

export default function ThreeSurfaces() {
  return (
    <section
      id="surfaces"
      className="relative overflow-hidden"
      style={{ background: "var(--color-cream)", color: "var(--color-ink)" }}
    >
      <div className="mx-auto max-w-screen-xl px-5 py-24 sm:px-8 sm:py-32">
        <Header />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="mt-12 grid gap-5 sm:grid-cols-12 sm:gap-6"
        >
          <Tile
            span="sm:col-span-7 sm:row-span-2"
            tone="navy"
            kicker="Surface · 01"
            title="Web dashboard"
            body="A control panel for your city. The default view shows everything Splitko knows right now — beaches with current sea quality, parking per zone, where the buses are, what the wind is doing, the civic queue on your block. Ask a question and the tiles reshape around the answer."
            cta={{ href: "/dashboard", label: "Open the dashboard" }}
            visual={<DashboardSketch />}
          />
          <Tile
            span="sm:col-span-5"
            tone="green"
            kicker="Surface · 02"
            title="WhatsApp"
            body="The most-used phone interface in Split. Same brain. Same memory. Send a photo, get a ticket. Ask, get an answer. Boti runs Buenos Aires this way."
            cta={{ href: "/whatsapp", label: "See a scripted demo" }}
            visual={<WhatsAppSketch />}
          />
          <Tile
            span="sm:col-span-5"
            tone="amber"
            kicker="Surface · 03"
            title="A phone number"
            body="The kind of number a 78-year-old reads off a magnet on her fridge. She dials. The agent picks up in the Dalmatian she actually speaks. When the question needs a human, the call transfers with a one-line briefing."
            cta={{ href: "/voice", label: "Listen to baka Anka" }}
            visual={<PhoneSketch />}
          />
        </motion.div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-end">
      <div>
        <div className="mono-tag flex items-center gap-3 text-[var(--color-navy-mist)]">
          <span
            aria-hidden
            className="block h-[1px] w-10"
            style={{ background: "var(--color-red)" }}
          />
          Three doors, one brain · 04
        </div>
        <h2
          className="display mt-5"
          style={{
            fontSize: "clamp(2.1rem, 0.7rem + 5.4vw, 4.6rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.022em",
          }}
        >
          Splitko is not an app. It is a city-scale agent you reach through
          whichever surface fits your life.
        </h2>
      </div>
      <p className="max-w-[42ch] text-[var(--color-ink-soft)] body-lg">
        The same agent answers on every surface, with the same memory of who
        you are and what you have asked before. Voice is the surface that makes
        “Splitko is for everyone” literally true rather than aspirationally
        true.
      </p>
    </div>
  );
}

type Tone = "navy" | "green" | "amber";

const TONE_BG: Record<Tone, string> = {
  navy: "var(--color-navy)",
  green: "oklch(0.39 0.12 145)",
  amber: "oklch(0.93 0.04 75)",
};
const TONE_FG: Record<Tone, string> = {
  navy: "var(--color-cream)",
  green: "var(--color-cream)",
  amber: "var(--color-ink)",
};

function Tile({
  span,
  tone,
  kicker,
  title,
  body,
  cta,
  visual,
}: {
  span: string;
  tone: Tone;
  kicker: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
  visual: React.ReactNode;
}) {
  const fg = TONE_FG[tone];
  const ctaFg =
    tone === "amber" ? "var(--color-ink)" : "var(--color-ink)";
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: ease.outQuart },
        },
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: ease.outQuart }}
      style={{
        background: TONE_BG[tone],
        color: fg,
        borderRadius: 24,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        position: "relative",
        minHeight: 320,
        overflow: "hidden",
      }}
      className={span}
    >
      <div className="mono-tag" style={{ opacity: 0.65 }}>
        {kicker}
      </div>
      <div style={{ flex: 1 }}>
        <h3
          className="display"
          style={{
            fontSize: "clamp(1.6rem, 0.6rem + 2.6vw, 2.6rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.018em",
          }}
        >
          {title}
        </h3>
        <p
          className="mt-4 max-w-[44ch]"
          style={{
            fontFamily: "var(--font-body)",
            lineHeight: 1.5,
            fontSize: "0.99rem",
            opacity: tone === "amber" ? 0.85 : 0.78,
          }}
        >
          {body}
        </p>
      </div>
      <div style={{ position: "relative", minHeight: 120 }}>{visual}</div>
      <Link
        href={cta.href}
        className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all"
        style={{
          background:
            tone === "amber" ? "var(--color-navy)" : "var(--color-cream)",
          color:
            tone === "amber" ? "var(--color-cream)" : ctaFg,
        }}
      >
        {cta.label} →
      </Link>
    </motion.article>
  );
}

function DashboardSketch() {
  return (
    <svg
      role="img"
      aria-label="A small sketch of the dashboard tiles"
      viewBox="0 0 360 160"
      style={{ width: "100%", maxWidth: 420 }}
    >
      <defs>
        <linearGradient id="ds" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.32 0.08 257)" />
          <stop offset="100%" stopColor="oklch(0.22 0.07 257)" />
        </linearGradient>
      </defs>
      <rect width="360" height="160" rx="14" fill="url(#ds)" />
      <rect x="14" y="14" width="170" height="58" rx="10" fill="oklch(0.96 0.012 75)" opacity="0.92" />
      <rect x="14" y="80" width="80" height="66" rx="10" fill="oklch(0.55 0.10 195)" opacity="0.85" />
      <rect x="100" y="80" width="84" height="66" rx="10" fill="oklch(0.55 0.205 25)" opacity="0.92" />
      <rect x="200" y="14" width="146" height="132" rx="10" fill="oklch(0.96 0.012 75)" opacity="0.92" />
      <circle cx="222" cy="38" r="6" fill="oklch(0.55 0.205 25)" />
      <rect x="234" y="34" width="80" height="8" rx="4" fill="oklch(0.22 0.04 257)" opacity="0.7" />
      <rect x="212" y="60" width="120" height="6" rx="3" fill="oklch(0.22 0.04 257)" opacity="0.3" />
      <rect x="212" y="74" width="100" height="6" rx="3" fill="oklch(0.22 0.04 257)" opacity="0.3" />
      <rect x="212" y="92" width="60" height="40" rx="6" fill="oklch(0.55 0.10 195)" opacity="0.45" />
      <rect x="280" y="92" width="52" height="40" rx="6" fill="oklch(0.66 0.16 145)" opacity="0.4" />
    </svg>
  );
}

function WhatsAppSketch() {
  return (
    <div className="flex flex-col gap-2 self-end">
      <span
        className="self-start rounded-2xl rounded-bl-sm px-3 py-2 text-sm"
        style={{ background: "rgba(255,255,255,0.18)" }}
      >
        idemo na żnjan poslije posla?
      </span>
      <span
        className="self-end rounded-2xl rounded-br-sm px-3 py-2 text-sm"
        style={{ background: "oklch(0.96 0.012 75)", color: "var(--color-ink)" }}
      >
        bolje Kašjuni u 17:30 — sea izvrsna, lot će se napuniti, bus 12 za 4 min
      </span>
    </div>
  );
}

function PhoneSketch() {
  return (
    <div className="flex items-center gap-3">
      <span
        className="display"
        style={{ fontSize: "2.6rem", color: "var(--color-ink)" }}
      >
        0800
      </span>
      <span
        className="display"
        style={{
          fontSize: "2.6rem",
          color: "var(--color-red)",
          letterSpacing: "-0.02em",
        }}
      >
        SPLIT
      </span>
    </div>
  );
}
