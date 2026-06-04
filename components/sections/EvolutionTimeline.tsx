"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Heading, Text, MonoLabel } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { EXPERIENCE } from "@/content/experience";

const STAGES = EXPERIENCE.map((entry) => ({
  index: entry.index,
  company: entry.company,
  domain: entry.domain,
  detail: entry.short,
}));

/**
 * Experience as a scrolled progression. A connector fills left→right with
 * scroll while each role resolves in sequence — moving through the
 * engineering domains rather than listing jobs. Static, fully-revealed
 * fallback under reduced motion.
 */
export function EvolutionTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.set(".evo-fill", { scaleX: 0, transformOrigin: "left" });
      gsap.to(".evo-fill", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 75%",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div ref={rootRef} className="relative mt-16">
      {/* Progress connector (desktop) — fills over the columns' top border */}
      <span
        aria-hidden
        className="evo-fill absolute left-0 top-0 z-10 hidden h-px w-full origin-left bg-accent/70 lg:block"
      />

      <ScrollReveal
        className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5"
        childSelector=".evo-stage"
        y={20}
        stagger={0.12}
      >
        {STAGES.map((stage, i) => (
          <div key={stage.index} className="evo-stage relative border-t border-border pt-7">
            <span
              aria-hidden
              className="absolute -top-[6px] left-0 size-[11px] rounded-full border border-border-strong bg-surface"
            >
              <span className="absolute inset-[3px] rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
            </span>
            <div className="flex items-center gap-3">
              <MonoLabel className="text-text-faint">{stage.index}</MonoLabel>
              {i < STAGES.length - 1 ? (
                <span aria-hidden className="hidden text-text-faint lg:inline">
                  →
                </span>
              ) : null}
            </div>
            <Heading level={3} className="mt-3 text-h3 lg:text-[1.15rem]">
              {stage.company}
            </Heading>
            <MonoLabel className="mt-2 block text-[0.72rem] leading-snug text-accent-strong">
              {stage.domain}
            </MonoLabel>
            <Text className="mt-3 text-sm">{stage.detail}</Text>
          </div>
        ))}
      </ScrollReveal>
    </div>
  );
}
