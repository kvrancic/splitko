"use client";

import { motion } from "framer-motion";
import { ease, sectionViewport } from "@/lib/motion";

const CHAINS: Array<{
  id: string;
  title: string;
  beat: string;
  nodes: Array<{ label: string; sub: string }>;
}> = [
  {
    id: "beach-bus-civic",
    title: "Beach → Bus → Civic",
    beat:
      "You accepted Splitko's Žnjan rec; that accept trained the model. You tapped “bus full” on the way; that tap trains the next prediction. Walking home you saw a broken streetlight, the same Splitko is one tap away.",
    nodes: [
      { label: "Beach concierge", sub: "you accepted Žnjan" },
      { label: "Bus reality", sub: "you tapped “full”" },
      { label: "Civic action", sub: "you reported the lamp" },
    ],
  },
  {
    id: "bureaucracy-marketplace",
    title: "Bureaucracy → Marketplace",
    beat:
      "Your cousin asks Splitko how to register her new address in Lučac. Two weeks later she asks the same Splitko whether her old room can be sublet for July. The marketplace block matches her with a family from Frankfurt.",
    nodes: [
      { label: "Bureaucracy RAG", sub: "prijava prebivališta" },
      { label: "Agentic marketplace", sub: "subletting Lučac room" },
    ],
  },
  {
    id: "voice-safety",
    title: "Voice → Safety",
    beat:
      "An 80-year-old in Mejaši calls the number. Voice helps. A month later the bura hits. The same number reaches her with a warning in the voice she recognises. One voice line solves three problems and reaches a population no civic app ever has.",
    nodes: [
      { label: "Voice agent", sub: "she trusted it once" },
      { label: "Civil safety", sub: "personalised bura warning" },
    ],
  },
];

export default function Flywheel() {
  return (
    <section
      id="flywheel"
      className="relative"
      style={{ background: "var(--color-cream)", color: "var(--color-ink)" }}
    >
      <div className="mx-auto max-w-screen-xl px-5 py-24 sm:px-8 sm:py-32">
        <Header />
        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {CHAINS.map((c, i) => (
            <Chain key={c.id} chain={c} index={i} />
          ))}
        </div>
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
          The flywheel · 06
        </div>
        <h2
          className="display mt-5"
          style={{
            fontSize: "clamp(2rem, 0.6rem + 5.0vw, 4.4rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.022em",
          }}
        >
          Block A makes block B work better. Three chains, no abstractions.
        </h2>
      </div>
      <p className="max-w-[42ch] text-[var(--color-ink-soft)] body-lg">
        Building each block separately would never have produced this.
        Building one orchestrator with many ports does.
      </p>
    </div>
  );
}

function Chain({
  chain,
  index,
}: {
  chain: (typeof CHAINS)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={sectionViewport}
      transition={{ duration: 0.6, ease: ease.outQuart, delay: index * 0.08 }}
      className="relative flex flex-col gap-5"
    >
      <div className="mono-tag text-[var(--color-red)]">{`Chain · ${String(index + 1).padStart(2, "0")}`}</div>
      <h3
        className="display"
        style={{ fontSize: "clamp(1.4rem, 0.6rem + 1.2vw, 1.7rem)", lineHeight: 1.05 }}
      >
        {chain.title}
      </h3>

      <div className="flex flex-col gap-2">
        {chain.nodes.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={sectionViewport}
            transition={{
              duration: 0.45,
              ease: ease.outQuart,
              delay: 0.05 * i,
            }}
            className="grid grid-cols-[28px_1fr] items-center gap-3"
          >
            <span
              aria-hidden
              className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold"
              style={{
                background: "var(--color-navy)",
                color: "var(--color-cream)",
              }}
            >
              {i + 1}
            </span>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {n.label}
              </div>
              <div className="mono-tag text-[var(--color-ink-soft)] opacity-70">
                {n.sub}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="body-lg text-[var(--color-ink-soft)]">{chain.beat}</p>
    </motion.article>
  );
}
