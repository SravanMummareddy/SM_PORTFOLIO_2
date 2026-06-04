"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";

interface ScrollSequenceProps {
  /** Number of discrete stages in the story. */
  steps: number;
  /** Render the current stage. Receives the active index (0..steps-1). */
  children: (active: number) => ReactNode;
  className?: string;
  /** ScrollTrigger start, mapped to progress 0. */
  start?: string;
  /** ScrollTrigger end, mapped to progress 1. */
  end?: string;
}

/**
 * Maps scroll progress across an element into a discrete stage index,
 * so a single visual can narrate a multi-stage story as the reader
 * scrolls past it. No pinning and no extra page height — it reads the
 * element's own transit through the viewport, so there's zero layout
 * shift. Under reduced motion it snaps to the final, fully-assembled
 * stage.
 */
export function ScrollSequence({
  steps,
  children,
  className,
  start = "top 75%",
  end = "bottom 35%",
}: ScrollSequenceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(reduceMotion ? steps - 1 : 0);

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) {
      setActive(steps - 1);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const setStage = (next: number) =>
      setActive((prev) => (prev === next ? prev : next));

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      onUpdate: (self) =>
        setStage(Math.min(steps - 1, Math.floor(self.progress * steps))),
      // Guarantee the boundary stages even if a fast scroll skips updates.
      onLeave: () => setStage(steps - 1),
      onLeaveBack: () => setStage(0),
    });

    return () => trigger.kill();
  }, [reduceMotion, steps, start, end]);

  return (
    <div ref={ref} className={className}>
      {children(active)}
    </div>
  );
}
