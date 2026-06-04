"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Heading, Text, MonoLabel } from "@/components/ui/Typography";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { EXPERIENCE, type ExperienceEntry } from "@/content/experience";
import { ExperienceGlyph } from "./ExperienceGlyph";

function Chips({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <MonoLabel className="text-[0.7rem] uppercase tracking-[0.14em] text-text-faint">
        {label}
      </MonoLabel>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item}>
            <MonoLabel className="rounded-control border border-border px-2 py-1 text-text-tertiary">
              {item}
            </MonoLabel>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Station({ entry }: { entry: ExperienceEntry }) {
  return (
    <article className="exp-station relative grid grid-cols-[auto_1fr] gap-x-6 pb-16 last:pb-0 md:gap-x-10">
      {/* Rail node */}
      <span
        aria-hidden
        className="relative z-10 mt-2 size-[15px] rounded-full border border-border-strong bg-surface"
      >
        <span className="exp-node absolute inset-[3px] rounded-full bg-accent shadow-[0_0_12px_var(--accent-glow)]" />
      </span>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <MonoLabel className="text-sm text-text-faint">{entry.index}</MonoLabel>
              <Heading level={2} className="text-h3 sm:text-h2">
                {entry.company}
              </Heading>
            </div>
            <MonoLabel className="mt-2 block text-accent-strong">
              {entry.domain}
            </MonoLabel>
          </div>
          <Card
            variant="glass"
            padding="none"
            className="hidden aspect-[16/11] w-28 shrink-0 overflow-hidden p-2 sm:block lg:w-36"
          >
            <ExperienceGlyph variant={entry.glyph} />
          </Card>
        </div>

        <Text className="mt-6 max-w-2xl">{entry.problem}</Text>

        <div className="mt-8 grid max-w-3xl gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
          <div>
            <MonoLabel className="text-[0.7rem] uppercase tracking-[0.14em] text-text-faint">
              Systems
            </MonoLabel>
            <ul className="mt-3 space-y-2.5">
              {entry.systems.map((system) => (
                <li key={system} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70"
                  />
                  <Text className="text-sm">{system}</Text>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <Chips label="Engineering" items={entry.concepts} />
            <Chips label="Technologies" items={entry.tech} />
          </div>
        </div>

        <div className="mt-8 max-w-2xl border-l-2 border-accent/50 pl-5">
          <MonoLabel className="text-[0.7rem] uppercase tracking-[0.14em] text-accent-strong">
            What it taught me
          </MonoLabel>
          <Text className="mt-2">{entry.lesson}</Text>
        </div>

        {entry.link ? (
          <a
            href={entry.link.href}
            className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            {entry.link.label}
            <span
              aria-hidden
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

/**
 * The professional experience journey. A connector grows top→down with
 * scroll while each role-station activates and resolves in sequence —
 * reading as a path through engineering domains rather than a résumé.
 * Falls back to a fully-assembled static state under reduced motion.
 */
export function ExperienceJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.set(".exp-fill", { scaleY: 0, transformOrigin: "top" });
      gsap.to(".exp-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 60%",
          end: "bottom 72%",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".exp-node").forEach((node) => {
        gsap.set(node, { scale: 0 });
        gsap.to(node, {
          scale: 1,
          duration: 0.45,
          ease: "back.out(2)",
          scrollTrigger: { trigger: node, start: "top 82%", once: true },
        });
      });

      const stations = gsap.utils.toArray<HTMLElement>(".exp-station");
      gsap.set(stations, { autoAlpha: 0, y: 24 });
      ScrollTrigger.batch(stations, {
        start: "top 84%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
          }),
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div ref={rootRef} className="relative">
      {/* Static connector track */}
      <span
        aria-hidden
        className="absolute bottom-2 left-[7px] top-2 w-px bg-border"
      />
      {/* Animated connector fill */}
      <span
        aria-hidden
        className="exp-fill absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent/70"
      />

      <div className="flex flex-col">
        {EXPERIENCE.map((entry) => (
          <Station key={entry.company} entry={entry} />
        ))}
      </div>
    </div>
  );
}
