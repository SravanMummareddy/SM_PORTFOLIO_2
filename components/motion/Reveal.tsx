"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  revealVariants,
  settleVariants,
  resolveVariants,
  fadeVariants,
  viewportOnce,
  DURATION,
  EASE,
} from "@/lib/motion";

type RevealMode = "rise" | "settle" | "fade" | "resolve";
type RevealTrigger = "inView" | "mount";

const VARIANTS = {
  rise: revealVariants,
  settle: settleVariants,
  fade: fadeVariants,
  resolve: resolveVariants,
} as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Visual character of the entrance. */
  mode?: RevealMode;
  /** Fire on scroll into view (default) or immediately on mount. */
  trigger?: RevealTrigger;
  /** Seconds of delay before the entrance runs. */
  delay?: number;
}

/**
 * Single-element entrance. Scroll-reveals by default ("systems coming
 * into view"). Honors prefers-reduced-motion by rendering statically.
 */
export function Reveal({
  children,
  className,
  mode = "rise",
  trigger = "inView",
  delay = 0,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const variants = VARIANTS[mode];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const animation =
    trigger === "mount"
      ? { animate: "visible" as const }
      : { whileInView: "visible" as const, viewport: viewportOnce };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={variants}
      transition={{ duration: DURATION.slow, ease: EASE.out, delay }}
      {...animation}
    >
      {children}
    </motion.div>
  );
}
