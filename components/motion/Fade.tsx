"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeVariants, viewportOnce, DURATION, EASE } from "@/lib/motion";

interface FadeProps {
  children: ReactNode;
  className?: string;
  /** Fire on scroll into view (default) or immediately on mount. */
  trigger?: "inView" | "mount";
  delay?: number;
  /** Override the fade duration (seconds). */
  duration?: number;
}

/**
 * Opacity-only entrance. For elements where movement would distract
 * (backdrops, fine print, ambient layers).
 */
export function Fade({
  children,
  className,
  trigger = "inView",
  delay = 0,
  duration = DURATION.slow,
}: FadeProps) {
  const reduceMotion = useReducedMotion();

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
      variants={fadeVariants}
      transition={{ duration, ease: EASE.out, delay }}
      {...animation}
    >
      {children}
    </motion.div>
  );
}
