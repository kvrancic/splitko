"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type HorizontalPinProps = {
  /** Total number of horizontal panels; controls the section height (panels * 100vh). */
  panelCount: number;
  /** Width of each horizontal panel — defaults to 100vw. */
  panelWidth?: string;
  /** Background color for the pinned shell. */
  background?: string;
  /** Children render inside the horizontal track. */
  children: ReactNode;
  /** Hint text displayed at the bottom on first paint. */
  hint?: string;
};

/**
 * Pins a section and translates its inner track horizontally as the user
 * scrolls vertically through it. Falls back to a stacked vertical layout
 * when the user prefers reduced motion.
 */
export default function HorizontalPin({
  panelCount,
  panelWidth = "100vw",
  background = "var(--color-navy)",
  children,
  hint,
}: HorizontalPinProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Move across (panelCount - 1) viewports.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`0vw`, `-${(panelCount - 1) * 100}vw`],
  );

  if (reduce) {
    return (
      <section style={{ background }} className="px-6 py-16">
        <div className="mx-auto flex max-w-screen-md flex-col gap-12">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background,
        height: `${panelCount * 100}vh`,
        position: "relative",
      }}
    >
      <div className="h-pin">
        <motion.div className="h-pin__track" style={{ x }}>
          <PanelGutter panelWidth={panelWidth}>{children}</PanelGutter>
        </motion.div>
        {hint && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--color-cream)]/70 mono-tag">
            {hint}
          </div>
        )}
      </div>
    </section>
  );
}

function PanelGutter({
  children,
  panelWidth,
}: {
  children: ReactNode;
  panelWidth: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        // each panel constrained to its width
        ["--panel-width" as string]: panelWidth,
      }}
    >
      {children}
    </div>
  );
}

/** Single panel used inside HorizontalPin's children. */
export function HorizontalPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: "var(--panel-width, 100vw)",
        flex: "0 0 var(--panel-width, 100vw)",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
