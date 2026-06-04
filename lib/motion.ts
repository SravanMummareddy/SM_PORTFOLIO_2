import type { Variants, Transition } from "framer-motion";

/*
  ─────────────────────────────────────────────────────────────
  Animation foundation.
  A single source of truth for timing, easing, and reusable
  variants. Mirrors the CSS motion tokens in globals.css so
  Framer Motion and CSS transitions speak the same language.

  Philosophy (MOTION_SYSTEM.md): slow confidence, intentional,
  "systems activating" — never flashy. Distances stay small;
  the easing does the work.
  ─────────────────────────────────────────────────────────────
*/

/** Easing curves, kept in sync with --ease-* CSS variables. */
export const EASE = {
  /** Decelerate — the default for reveals and entrances. */
  out: [0.22, 1, 0.36, 1],
  /** Symmetric — for state changes and layout shifts. */
  inOut: [0.65, 0, 0.35, 1],
} as const;

/** Durations in seconds (Framer Motion unit), synced with --duration-*. */
export const DURATION = {
  fast: 0.18,
  base: 0.32,
  slow: 0.64,
} as const;

/** Default vertical travel for reveal entrances (px). Kept short. */
export const REVEAL_DISTANCE = 16;

/** Stagger gap between children in a sequence (seconds). */
export const STAGGER = 0.08;

/** Canonical entrance transition. */
export const transitionOut: Transition = {
  duration: DURATION.slow,
  ease: EASE.out,
};

/* ───────────────────────────── Variants ─────────────────────────────── */

/** Fade only — no movement. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionOut },
};

/** Fade + rise. The workhorse reveal. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: { opacity: 1, y: 0, transition: transitionOut },
};

/** Fade + rise + de-blur — text "resolving" into focus. For hero lines. */
export const resolveVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transitionOut,
  },
};

/** Fade + scale settle — for cards / panels assembling into place. */
export const settleVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitionOut,
  },
};

/**
 * Stagger container. Pair with a child variant ("hidden"/"visible")
 * to sequence a group like services initializing in order.
 */
export const staggerContainer = (
  stagger: number = STAGGER,
  delayChildren: number = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Shared viewport config so scroll-reveals trigger consistently. */
export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
