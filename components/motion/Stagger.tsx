"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  staggerContainer,
  revealVariants,
  settleVariants,
  resolveVariants,
  fadeVariants,
  viewportOnce,
  STAGGER,
} from "@/lib/motion";

type StaggerMode = "rise" | "settle" | "fade" | "resolve";

const ITEM_VARIANTS = {
  rise: revealVariants,
  settle: settleVariants,
  fade: fadeVariants,
  resolve: resolveVariants,
} as const;

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Gap between each child's entrance (seconds). */
  gap?: number;
  /** Delay before the first child enters (seconds). */
  delay?: number;
  trigger?: "inView" | "mount";
}

/**
 * Orchestrates a group entrance — children animate in sequence,
 * like services initializing one after another. Wrap each child in
 * <StaggerItem>.
 */
export function Stagger({
  children,
  className,
  gap = STAGGER,
  delay = 0,
  trigger = "inView",
}: StaggerProps) {
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
      variants={staggerContainer(gap, delay)}
      {...animation}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  mode?: StaggerMode;
}

/** A single member of a <Stagger> sequence. */
export function StaggerItem({
  children,
  className,
  mode = "rise",
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={ITEM_VARIANTS[mode]}>
      {children}
    </motion.div>
  );
}
