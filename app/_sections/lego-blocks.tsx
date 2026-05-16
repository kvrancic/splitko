"use client";

import { motion } from "framer-motion";
import { ease, sectionViewport } from "@/lib/motion";
import { LEGO_BLOCKS, type LegoBlock } from "@/content/lego-blocks";

export default function LegoBlocks() {
  return (
    <section
      id="blocks"
      className="relative overflow-hidden"
      style={{ background: "var(--color-navy)", color: "var(--color-cream)" }}
    >
      <div className="mx-auto max-w-screen-xl px-5 py-24 sm:px-8 sm:py-32">
        <Header />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="mt-14 grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {LEGO_BLOCKS.map((b) => (
            <BlockTile key={b.id} block={b} />
          ))}
        </motion.div>

        <p className="mt-12 max-w-[58ch] text-[var(--color-cream)]/70 body-lg">
          Each tile is a capability you reach by plugging in one or two more
          data ports. None of them is an app. All of them are reachable from
          any of the three surfaces, and all of them feed signal back into the
          same brain.
        </p>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-end">
      <div>
        <div className="mono-tag flex items-center gap-3 text-[var(--color-cream)]/65">
          <span
            aria-hidden
            className="block h-[1px] w-10"
            style={{ background: "var(--color-red)" }}
          />
          Lego blocks · 05
        </div>
        <h2
          className="display mt-5"
          style={{
            fontSize: "clamp(2.1rem, 0.7rem + 5.4vw, 4.6rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.022em",
          }}
        >
          A growing library of capabilities — none of them an app.
        </h2>
      </div>
      <p className="max-w-[42ch] text-[var(--color-cream)]/70 body-lg">
        New data port, new capability. The product isn’t the tile, it’s the
        connector beneath it.
      </p>
    </div>
  );
}

function BlockTile({ block }: { block: LegoBlock }) {
  const span = [
    block.spanCols === 2 ? "sm:col-span-2" : "",
    block.spanRows === 2 ? "sm:row-span-2" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: ease.outQuart },
        },
      }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: ease.outQuart }}
      className={`group relative flex flex-col gap-3 p-5 ${span}`}
      style={{
        background: block.hot
          ? "color-mix(in oklch, var(--color-red) 12%, var(--color-navy))"
          : "color-mix(in oklch, var(--color-cream) 8%, var(--color-navy))",
        borderRadius: 16,
        border: block.hot
          ? "1px solid color-mix(in oklch, var(--color-red) 60%, transparent)"
          : "1px solid color-mix(in oklch, var(--color-cream) 14%, transparent)",
        minHeight: 160,
        overflow: "hidden",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className="display"
          style={{
            fontSize: "clamp(1.1rem, 0.6rem + 0.9vw, 1.45rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
          }}
        >
          {block.name}
        </h3>
        {block.hot && (
          <span
            className="mono-tag rounded-full px-2 py-0.5"
            style={{
              background: "var(--color-red)",
              color: "var(--color-cream)",
              fontSize: "0.62rem",
            }}
          >
            hot
          </span>
        )}
      </div>

      <p
        className="text-[var(--color-cream)]/80"
        style={{ fontSize: "0.94rem", lineHeight: 1.45 }}
      >
        {block.oneLine}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-1.5">
        {block.ports.slice(0, 4).map((p) => (
          <span
            key={p}
            className="mono-tag rounded-full px-2 py-0.5"
            style={{
              background: "color-mix(in oklch, var(--color-cream) 8%, transparent)",
              color: "var(--color-cream)",
              fontSize: "0.62rem",
              border: "1px solid color-mix(in oklch, var(--color-cream) 18%, transparent)",
            }}
          >
            {p}
          </span>
        ))}
      </div>

      {block.callout && (
        <div
          className="mono-tag pointer-events-none absolute right-4 top-4 text-[var(--color-red-soft)]"
          style={{ fontSize: "0.6rem" }}
        >
          ↳ {block.callout}
        </div>
      )}
    </motion.article>
  );
}
