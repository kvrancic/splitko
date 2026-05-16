import type { Transition, Variants } from "framer-motion";

/** Easing curves — match the CSS custom properties in globals.css. */
export const ease = {
  outQuart: [0.25, 1, 0.5, 1] as const,
  outQuint: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.outQuart },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: ease.outQuart },
  },
};

export const stagger = (
  staggerChildren = 0.08,
  delayChildren = 0.05,
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: ease.outQuint },
  },
};

export const bubbleIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: ease.outExpo },
  },
};

export const sectionViewport = { once: true, amount: 0.18 };

export const t = {
  fast: { duration: 0.18, ease: ease.outQuart } satisfies Transition,
  base: { duration: 0.32, ease: ease.outQuart } satisfies Transition,
  slow: { duration: 0.6, ease: ease.outQuart } satisfies Transition,
};
