"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ease } from "@/lib/motion";

export default function HeroMotion() {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-screen-xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
        }}
        className="w-full max-w-[60rem]"
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
          className="mono-tag mb-6 inline-flex items-center gap-2 text-[var(--color-cream)]/75"
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
            fontSize: "clamp(2.4rem, 0.4rem + 5.5vw, 5.25rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
          }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: ease.outExpo },
              },
            }}
            style={{ display: "block" }}
          >
            The{" "}
            <span style={{ color: "var(--color-red-soft)" }}>orchestrator</span>{" "}
            layer
          </motion.span>
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: ease.outExpo },
              },
            }}
            style={{ display: "block" }}
          >
            for the city of Split.
          </motion.span>
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
          className="body-lg mt-8 max-w-[58ch] text-[var(--color-cream)]/82"
          style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.55vw, 1.28rem)", lineHeight: 1.55 }}
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
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold transition-transform hover:scale-[1.025] active:scale-[0.98]"
            style={{
              background: "var(--color-cream)",
              color: "var(--color-navy)",
              boxShadow:
                "0 14px 30px -16px color-mix(in oklch, var(--color-ink) 65%, transparent), 0 2px 0 color-mix(in oklch, var(--color-ink) 18%, transparent) inset",
            }}
          >
            See it work
            <span aria-hidden>→</span>
          </Link>
          <a
            href="#thesis"
            className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold transition-colors"
            style={{
              border: "1px solid color-mix(in oklch, var(--color-cream) 45%, transparent)",
              color: "var(--color-cream)",
              background: "color-mix(in oklch, var(--color-cream) 4%, transparent)",
            }}
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
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-[var(--color-cream)]/65"
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
