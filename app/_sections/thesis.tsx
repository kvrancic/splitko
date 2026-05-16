"use client";

import { motion } from "framer-motion";
import { ease, sectionViewport } from "@/lib/motion";

export default function Thesis() {
  return (
    <section
      id="thesis"
      className="relative overflow-hidden"
      style={{
        background: "var(--color-cream)",
        color: "var(--color-ink)",
      }}
    >
      <div className="mx-auto grid max-w-screen-xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -16 },
              show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: ease.outQuart },
              },
            }}
            className="mono-tag mb-6 flex items-center gap-3 text-[var(--color-navy-mist)]"
          >
            <span
              aria-hidden
              className="block h-[1px] w-10"
              style={{ background: "var(--color-red)" }}
            />
            Thesis · 01
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: ease.outExpo },
              },
            }}
            className="display"
            style={{
              fontSize: "clamp(2.3rem, 0.7rem + 5.8vw, 5.2rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.022em",
            }}
          >
            In <span style={{ color: "var(--color-red)" }}>2026</span> you don’t
            build a vertical. You build an{" "}
            <span style={{ color: "var(--color-red)" }}>orchestrator</span>.
          </motion.h2>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: ease.outQuart },
              },
            }}
            className="mt-10 max-w-[58ch] space-y-5 text-[var(--color-ink-soft)] body-lg"
          >
            <p>
              Every civic app we’ve ever built was a vertical. A bus app, a
              parking app, a beach app, a bureaucracy portal. Each one had to win
              its users from scratch. Each one fought the chicken-and-egg
              problem alone. Each one died at the seam between “small audience”
              and “enough data to be useful.”
            </p>
            <p>
              The vertical era is over. It died the moment LLMs became good
              enough to act as a general orchestrator over arbitrary data. In
              2026 the product is no longer the feature. The product is the
              layer that turns any data port into a capability, and any
              capability into a conversation.
            </p>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          transition={{ duration: 0.7, ease: ease.outQuart }}
          className="self-end"
        >
          <PullQuote />
          <Stack />
        </motion.aside>
      </div>

      <div
        aria-hidden
        className="absolute -left-12 bottom-0 h-px w-1/3 bg-[var(--color-red)]/30"
      />
    </section>
  );
}

function PullQuote() {
  return (
    <blockquote
      className="display border-l-0 pl-0"
      style={{
        fontSize: "clamp(1.5rem, 0.4rem + 3.4vw, 2.6rem)",
        lineHeight: 1.05,
        letterSpacing: "-0.018em",
        color: "var(--color-navy)",
      }}
    >
      “Data is the modern day gold. Whoever solves problem A for a Splićanin
      has already solved acquisition for B, C and D.”
    </blockquote>
  );
}

function Stack() {
  const stack = [
    {
      label: "1. Data ports",
      body:
        "DHMZ. IZOR. Promet. Webcams over Riva, Bačvice, Žnjan, Marjan. Gov.hr. e-Građani. HAK. KBC. Census housing per kvart. Each port is a connector. None of them is the product.",
    },
    {
      label: "2. The orchestrator",
      body:
        "A fully agentic LLM layer with tools, MCPs, and a memory of every interaction it has ever had with you and with the city. This is the actual product.",
    },
    {
      label: "3. The HCI surfaces",
      body:
        "The web dashboard. WhatsApp. A phone number your grandmother can dial. Same brain, three doors.",
    },
  ];

  return (
    <ol className="mt-10 space-y-5">
      {stack.map((s) => (
        <li
          key={s.label}
          className="grid grid-cols-[88px_1fr] items-baseline gap-5 border-t border-[var(--color-ink)]/15 pt-4"
        >
          <span className="mono-tag text-[var(--color-red)]">{s.label}</span>
          <span className="body-lg text-[var(--color-ink-soft)]">{s.body}</span>
        </li>
      ))}
    </ol>
  );
}
