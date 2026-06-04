"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px. */
  y?: number;
  /** Tween duration (s). */
  duration?: number;
  /** ScrollTrigger start position. */
  start?: string;
  /**
   * If set, animates matching descendants in sequence instead of the
   * wrapper itself — for lists that should assemble member by member.
   */
  childSelector?: string;
  /** Gap between staggered children (s). */
  stagger?: number;
}

/**
 * GSAP + ScrollTrigger entrance, synced to Lenis. The scroll-driven
 * counterpart to the Framer <Reveal>. Hidden state is applied before
 * paint, so there's no flash; under reduced motion nothing is hidden and
 * the content renders statically.
 */
export function ScrollReveal({
  children,
  className,
  y = 20,
  duration = 0.8,
  start = "top 82%",
  childSelector,
  stagger = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = childSelector
        ? el.querySelectorAll(childSelector)
        : el;
      gsap.from(targets, {
        autoAlpha: 0,
        y,
        duration,
        ease: "power3.out",
        stagger: childSelector ? stagger : 0,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduceMotion, y, duration, start, childSelector, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
