"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ease } from "@/lib/motion";

type PanelData = {
  id: string;
  city: string;
  headline: string;
  body: string;
  stat: { value: string; label: string };
  citation: string;
  surface: "navy" | "red";
  image: { src: string; alt: string; photographer: string } | null;
};

export default function FunnelClient({ panels }: { panels: PanelData[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Slide across (panels.length - 1) viewports of width.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`0vw`, `-${(panels.length - 1) * 100}vw`],
  );

  if (reduce) {
    return (
      <section
        id="funnel"
        className="px-5 py-24 sm:px-8"
        style={{ background: "var(--color-navy)", color: "var(--color-cream)" }}
      >
        <div className="mx-auto max-w-screen-md space-y-16">
          <Header />
          {panels.map((p) => (
            <StaticPanel key={p.id} panel={p} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="funnel"
      ref={sectionRef}
      style={{
        height: `${panels.length * 100}vh`,
        background: "var(--color-navy)",
        color: "var(--color-cream)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflow: "hidden",
        }}
      >
        <Header />

        <motion.div
          style={{
            x,
            display: "flex",
            height: "100%",
            paddingTop: 96,
          }}
        >
          {panels.map((p, i) => (
            <Panel key={p.id} panel={p} index={i} total={panels.length} />
          ))}
        </motion.div>

        <Pager total={panels.length} progress={scrollYProgress} />
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-10 flex items-center gap-4 sm:left-10 sm:top-7">
      <div className="mono-tag flex items-center gap-3 text-[var(--color-cream)]/75">
        <span
          aria-hidden
          className="block h-[1px] w-10"
          style={{ background: "var(--color-red)" }}
        />
        World · 02
      </div>
      <span
        aria-hidden
        className="hidden h-3 w-px md:inline-block"
        style={{ background: "color-mix(in oklch, var(--color-cream) 30%, transparent)" }}
      />
      <span className="hidden text-[12px] tracking-[0.04em] text-[var(--color-cream)]/70 md:inline-block">
        Five cities. Fifteen years. One unfinished layer.
      </span>
    </div>
  );
}

function Panel({
  panel,
  index,
  total,
}: {
  panel: PanelData;
  index: number;
  total: number;
}) {
  const isSplit = panel.surface === "red";
  return (
    <article
      style={{
        width: "100vw",
        flex: "0 0 100vw",
        height: "100%",
        padding: "min(7vh, 60px) clamp(20px, 6vw, 80px) 80px",
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1.05fr)",
        gridTemplateRows: "1fr",
        gap: "clamp(20px, 3vw, 56px)",
        background: isSplit ? "var(--color-red)" : "transparent",
        color: "var(--color-cream)",
        boxSizing: "border-box",
      }}
      className="funnel-panel"
    >
      <div className="flex flex-col justify-between gap-8">
        <div>
          <div
            className="mono-tag flex items-center gap-3"
            style={{
              color: isSplit
                ? "var(--color-cream)"
                : "var(--color-cream)/65",
              opacity: 0.75,
            }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            <span aria-hidden>—</span>
            {panel.city}
          </div>
          <h3
            className="display mt-5"
            style={{
              fontSize: "clamp(1.85rem, 0.6rem + 4.2vw, 4.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            {panel.headline}
          </h3>
          <p
            className="body-lg mt-5 max-w-[42ch]"
            style={{
              color: isSplit
                ? "color-mix(in oklch, var(--color-cream) 90%, transparent)"
                : "color-mix(in oklch, var(--color-cream) 75%, transparent)",
            }}
          >
            {panel.body}
          </p>
        </div>

        <div
          className="flex items-end justify-between gap-6"
          style={{
            borderTop:
              "1px solid color-mix(in oklch, var(--color-cream) 22%, transparent)",
            paddingTop: 16,
          }}
        >
          <div className="display" style={{ lineHeight: 1 }}>
            <div
              style={{
                fontSize: "clamp(2.2rem, 0.5rem + 5vw, 4.5rem)",
                letterSpacing: "-0.025em",
              }}
            >
              {panel.stat.value}
            </div>
            <div className="mono-tag mt-2 opacity-70">{panel.stat.label}</div>
          </div>
          <div className="mono-tag max-w-[24ch] text-right opacity-60">
            {panel.citation}
          </div>
        </div>
      </div>

      <div className="relative h-full overflow-hidden rounded-[18px]">
        {panel.image ? (
          <Image
            src={panel.image.src}
            alt={panel.image.alt}
            fill
            sizes="50vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              filter: isSplit
                ? "saturate(1.05) contrast(1.02)"
                : "saturate(0.92) brightness(0.95) contrast(1.02)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: isSplit
                ? "color-mix(in oklch, var(--color-red-hot) 80%, var(--color-cream))"
                : "color-mix(in oklch, var(--color-navy-soft) 80%, transparent)",
            }}
          />
        )}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: isSplit
              ? "linear-gradient(180deg, transparent 40%, color-mix(in oklch, var(--color-red) 55%, transparent) 100%)"
              : "linear-gradient(180deg, transparent 60%, color-mix(in oklch, var(--color-navy) 55%, transparent) 100%)",
          }}
        />
      </div>
    </article>
  );
}

function StaticPanel({ panel }: { panel: PanelData }) {
  return (
    <article className="space-y-4">
      <div className="mono-tag opacity-65">{panel.city}</div>
      <h3 className="display text-3xl sm:text-5xl">{panel.headline}</h3>
      <p className="body-lg opacity-85">{panel.body}</p>
      <div className="display text-4xl">{panel.stat.value}</div>
      <div className="mono-tag opacity-65">{panel.stat.label}</div>
    </article>
  );
}

function Pager({
  total,
  progress,
}: {
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const active = useTransform(progress, (v) =>
    Math.min(total - 1, Math.floor(v * total)),
  );
  return (
    <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} index={i} activeMv={active} />
      ))}
    </div>
  );
}

function Dot({
  index,
  activeMv,
}: {
  index: number;
  activeMv: MotionValue<number>;
}) {
  const opacity = useTransform(activeMv, (v) => (v >= index ? 1 : 0.32));
  const width = useTransform(activeMv, (v) => (v === index ? 28 : 8));
  return (
    <motion.span
      style={{
        width,
        height: 4,
        borderRadius: 999,
        background: "var(--color-cream)",
        opacity,
        transition: `width 320ms ${ease.outQuart.join(",")}`,
      }}
    />
  );
}
