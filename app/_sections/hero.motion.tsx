"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ease } from "@/lib/motion";

const HEAD_PARTS = [
  { text: "The", color: "var(--color-cream)" },
  { text: "orchestrator", color: "var(--color-red-soft)" },
  { text: "layer", color: "var(--color-cream)" },
  { text: "for the city", color: "var(--color-cream)" },
  { text: "of Split.", color: "var(--color-cream)" },
];

export default function HeroMotion() {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-screen-xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        }}
        className="max-w-[20ch] sm:max-w-[18ch]"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: ease.outQuart },
            },
          }}
          className="mono-tag mb-6 inline-flex items-center gap-2 text-[var(--color-cream)]/65"
        >
          <span
            aria-hidden
            className="block h-[1px] w-8"
            style={{ background: "var(--color-red)" }}
          />
          For the city of Split
        </motion.div>

        <h1
          className="display"
          style={{
            fontSize: "clamp(2.85rem, 0.7rem + 8.5vw, 7.5rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.028em",
          }}
        >
          {HEAD_PARTS.map((part, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: ease.outExpo },
                },
              }}
              className="mr-[0.22em] inline-block"
              style={{ color: part.color }}
            >
              {part.text}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: ease.outQuart,
                delay: 0.4,
              },
            },
          }}
          className="body-lg mt-7 max-w-[44ch] text-[var(--color-cream)]/80"
        >
          One agentic brain wired to every public data port in Split, exposed
          through three human surfaces: a dashboard that reconfigures around
          your intent, WhatsApp, and a phone number your grandmother can dial.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: ease.outQuart,
                delay: 0.55,
              },
            },
          }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-cream)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition-all hover:scale-[1.025] hover:bg-white active:scale-[0.98]"
          >
            See it work →
          </Link>
          <a
            href="#thesis"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-cream)]/30 px-6 py-3 text-sm font-semibold text-[var(--color-cream)] transition-all hover:border-[var(--color-cream)] hover:bg-[var(--color-cream)]/5"
          >
            Read the thesis
          </a>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { duration: 0.6, delay: 1.1 },
            },
          }}
          className="mt-16 flex items-center gap-6 text-[var(--color-cream)]/55"
        >
          <span className="mono-tag">live</span>
          <DataDot label="DHMZ" color="var(--color-red-soft)" />
          <DataDot label="IZOR" color="var(--color-teal)" />
          <DataDot label="+ 12 mocked ports" color="var(--color-cream)" />
        </motion.div>
      </motion.div>

      <ScrollHint />
    </div>
  );
}

function DataDot({ label, color }: { label: string; color: string }) {
  return (
    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.16em]">
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: color,
          boxShadow: `0 0 12px ${color}`,
        }}
      />
      {label}
    </span>
  );
}

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="pointer-events-none absolute bottom-6 right-5 hidden text-[10px] uppercase tracking-[0.18em] text-[var(--color-cream)]/70 sm:right-8 sm:block"
    >
      <span className="inline-flex items-center gap-2">
        scroll
        <motion.span
          aria-hidden
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "inline-block" }}
        >
          ↓
        </motion.span>
      </span>
    </motion.div>
  );
}
