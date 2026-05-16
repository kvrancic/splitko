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
            show: { transition: { staggerChildren: 0.05 } },
          }}
          className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {LEGO_BLOCKS.map((b, i) => (
            <BlockTile key={b.id} block={b} index={i} />
          ))}
        </motion.div>

        <p className="mt-14 max-w-[64ch] text-[var(--color-cream)]/82 body-lg">
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
        <div className="mono-tag flex items-center gap-3 text-[var(--color-cream)]/70">
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
      <p className="max-w-[42ch] text-[var(--color-cream)]/78 body-lg">
        New data port, new capability. The product isn’t the tile, it’s the
        connector beneath it.
      </p>
    </div>
  );
}

function BlockTile({ block, index }: { block: LegoBlock; index: number }) {
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
          ? "color-mix(in oklch, var(--color-red) 14%, var(--color-navy-soft))"
          : "var(--color-navy-soft)",
        borderRadius: 18,
        border: block.hot
          ? "1px solid color-mix(in oklch, var(--color-red) 55%, transparent)"
          : "1px solid color-mix(in oklch, var(--color-cream) 18%, transparent)",
        boxShadow: block.hot
          ? "0 22px 36px -28px color-mix(in oklch, var(--color-red) 60%, transparent), inset 0 1px 0 color-mix(in oklch, var(--color-cream) 14%, transparent)"
          : "0 18px 36px -28px color-mix(in oklch, var(--color-navy) 95%, transparent), inset 0 1px 0 color-mix(in oklch, var(--color-cream) 10%, transparent)",
        minHeight: 180,
        overflow: "hidden",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-baseline gap-2.5">
          <span
            className="mono-tag"
            style={{
              color: block.hot
                ? "var(--color-red-soft)"
                : "color-mix(in oklch, var(--color-cream) 55%, transparent)",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="display"
            style={{
              fontSize: "clamp(1.15rem, 0.6rem + 0.95vw, 1.55rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              color: "var(--color-cream)",
            }}
          >
            {block.name}
          </h3>
        </div>
        {block.hot && (
          <span
            className="mono-tag rounded-full px-2 py-0.5"
            style={{
              background: "var(--color-red)",
              color: "var(--color-cream)",
              fontSize: "0.62rem",
              flexShrink: 0,
            }}
          >
            hot
          </span>
        )}
      </div>

      <p
        style={{
          color: "color-mix(in oklch, var(--color-cream) 88%, transparent)",
          fontSize: "0.95rem",
          lineHeight: 1.5,
        }}
      >
        {block.oneLine}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
        {block.ports.slice(0, 4).map((p) => (
          <span
            key={p}
            className="mono-tag rounded-full px-2 py-0.5"
            style={{
              background: "color-mix(in oklch, var(--color-cream) 10%, transparent)",
              color: "color-mix(in oklch, var(--color-cream) 92%, transparent)",
              fontSize: "0.62rem",
              border:
                "1px solid color-mix(in oklch, var(--color-cream) 22%, transparent)",
            }}
          >
            {p}
          </span>
        ))}
      </div>

      {block.callout && (
        <div
          className="mono-tag pointer-events-none mt-1"
          style={{
            fontSize: "0.62rem",
            color: "var(--color-red-soft)",
          }}
        >
          ↳ {block.callout}
        </div>
      )}
    </motion.article>
  );
}
