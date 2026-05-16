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
          className="mt-14 grid gap-5 sm:grid-cols-3 sm:gap-6"
        >
          <Tile
            tone="navy"
            kicker="Surface · 01"
            title="Web dashboard"
            body="A control panel for your city. The default view shows everything Splitko knows right now — beaches, parking, where the buses are, the civic queue on your block. Ask a question, the tiles reshape around the answer."
            cta={{ href: "/dashboard", label: "Open the dashboard" }}
            visual={<DashboardSketch />}
          />
          <Tile
            tone="green"
            kicker="Surface · 02"
            title="WhatsApp"
            body="The most-used phone interface in Split. Same brain. Same memory. Send a photo, get a ticket. Ask, get an answer. Boti runs Buenos Aires this way."
            cta={{ href: "/whatsapp", label: "See a scripted demo" }}
            visual={<WhatsAppSketch />}
          />
          <Tile
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
  tone,
  kicker,
  title,
  body,
  cta,
  visual,
}: {
  tone: Tone;
  kicker: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
  visual: React.ReactNode;
}) {
  const fg = TONE_FG[tone];
  const ctaBg =
    tone === "amber" ? "var(--color-navy)" : "var(--color-cream)";
  const ctaFg =
    tone === "amber" ? "var(--color-cream)" : "var(--color-navy)";
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
        borderRadius: 22,
        padding: 26,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        position: "relative",
        minHeight: 380,
        overflow: "hidden",
      }}
    >
      <div className="mono-tag" style={{ opacity: 0.7 }}>
        {kicker}
      </div>
      <h3
        className="display"
        style={{
          fontSize: "clamp(1.55rem, 0.9rem + 1vw, 2rem)",
          lineHeight: 1.02,
          letterSpacing: "-0.018em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          lineHeight: 1.5,
          fontSize: "0.95rem",
          opacity: tone === "amber" ? 0.86 : 0.8,
          maxWidth: "44ch",
        }}
      >
        {body}
      </p>
      <div
        style={{
          marginTop: "auto",
          position: "relative",
          minHeight: 110,
          paddingTop: 8,
        }}
      >
        {visual}
      </div>
      <Link
        href={cta.href}
        className="inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98]"
        style={{
          background: ctaBg,
          color: ctaFg,
        }}
      >
        {cta.label}
        <span aria-hidden>→</span>
      </Link>
    </motion.article>
  );
}

function DashboardSketch() {
  return (
    <svg
      role="img"
      aria-label="A small sketch of the dashboard tiles"
      viewBox="0 0 280 130"
      style={{ width: "100%", maxWidth: 360 }}
    >
      <defs>
        <linearGradient id="ds" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.32 0.08 257)" />
          <stop offset="100%" stopColor="oklch(0.22 0.07 257)" />
        </linearGradient>
      </defs>
      <rect width="280" height="130" rx="12" fill="url(#ds)" />
      <rect x="10" y="10" width="138" height="46" rx="8" fill="oklch(0.96 0.012 75)" opacity="0.94" />
      <rect x="10" y="62" width="66" height="58" rx="8" fill="oklch(0.55 0.10 195)" opacity="0.85" />
      <rect x="82" y="62" width="66" height="58" rx="8" fill="oklch(0.55 0.205 25)" opacity="0.92" />
      <rect x="156" y="10" width="114" height="110" rx="8" fill="oklch(0.96 0.012 75)" opacity="0.94" />
      <circle cx="174" cy="32" r="5" fill="oklch(0.55 0.205 25)" />
      <rect x="186" y="28" width="64" height="6" rx="3" fill="oklch(0.22 0.04 257)" opacity="0.7" />
      <rect x="166" y="50" width="92" height="5" rx="2.5" fill="oklch(0.22 0.04 257)" opacity="0.3" />
      <rect x="166" y="62" width="76" height="5" rx="2.5" fill="oklch(0.22 0.04 257)" opacity="0.3" />
      <rect x="166" y="78" width="48" height="34" rx="6" fill="oklch(0.55 0.10 195)" opacity="0.5" />
      <rect x="220" y="78" width="42" height="34" rx="6" fill="oklch(0.66 0.16 145)" opacity="0.45" />
    </svg>
  );
}

function WhatsAppSketch() {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="self-start rounded-2xl rounded-bl-sm px-3 py-2 text-[13px]"
        style={{ background: "rgba(255,255,255,0.18)", maxWidth: "84%" }}
      >
        idemo na Žnjan poslije posla?
      </span>
      <span
        className="self-end rounded-2xl rounded-br-sm px-3 py-2 text-[13px]"
        style={{
          background: "oklch(0.96 0.012 75)",
          color: "var(--color-ink)",
          maxWidth: "92%",
        }}
      >
        bolje Kašjuni u 17:30 — more izvrsno, parking se puni, bus 12 za 4 min
      </span>
    </div>
  );
}

function PhoneSketch() {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="mono-tag text-[var(--color-ink)]/55">Toll-free, Croatian</div>
      <div
        className="display flex items-baseline gap-3"
        style={{ color: "var(--color-ink)" }}
      >
        <span style={{ fontSize: "2.1rem", letterSpacing: "-0.01em" }}>0800</span>
        <span
          style={{
            fontSize: "2.1rem",
            color: "var(--color-red)",
            letterSpacing: "0.02em",
          }}
        >
          21 21 21
        </span>
      </div>
      <div className="mono-tag text-[var(--color-ink)]/55">
        021 = Split area code
      </div>
    </div>
  );
}
