"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Quiet "scroll to continue" affordance at the foot of the hero. */
export function ScrollCue({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`flex flex-col items-center gap-3 text-text-tertiary ${className ?? ""}`}
    >
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em]">
        Scroll
      </span>
      <span className="relative block h-9 w-px overflow-hidden bg-border-strong">
        <motion.span
          className="absolute inset-x-0 top-0 h-3 bg-accent"
          initial={{ y: -12 }}
          animate={reduceMotion ? { y: 0 } : { y: 36 }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 1.8, ease: EASE.inOut, repeat: Infinity, repeatDelay: 0.3 }
          }
        />
      </span>
    </div>
  );
}
