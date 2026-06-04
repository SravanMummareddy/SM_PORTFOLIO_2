"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Heading, Text, MonoLabel } from "@/components/ui/Typography";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";

interface Layer {
  index: string;
  name: string;
  detail: string;
}

const LAYERS: Layer[] = [
  {
    index: "01",
    name: "Architecture",
    detail: "Clear boundaries, typed contracts, and predictable data flow.",
  },
  {
    index: "02",
    name: "Reliability",
    detail: "Transactions, idempotency, and failure handled by design.",
  },
  {
    index: "03",
    name: "Workflows",
    detail: "State machines and events that model real operations.",
  },
  {
    index: "04",
    name: "Data",
    detail: "Relational modeling that keeps the system's invariants honest.",
  },
  {
    index: "05",
    name: "Experience",
    detail: "Interfaces that make a complex system legible.",
  },
];

/**
 * The architecture timeline, assembled by scroll. A connector grows
 * top→down in time with the page, each node activates as it is reached,
 * and the layer rows resolve in sequence — reading as a system coming
 * together from its parts. Falls back to a fully-assembled static state
 * under reduced motion.
 */
export function SystemLayers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return;
    const root = containerRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Connector grows with scroll.
      gsap.set(".layer-fill", { scaleY: 0, transformOrigin: "top" });
      gsap.to(".layer-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          end: "bottom 62%",
          scrub: true,
        },
      });

      // Nodes activate as the connector reaches them.
      gsap.utils.toArray<HTMLElement>(".layer-node").forEach((node) => {
        gsap.set(node, { scale: 0 });
        gsap.to(node, {
          scale: 1,
          duration: 0.45,
          ease: "back.out(2)",
          scrollTrigger: { trigger: node, start: "top 74%", once: true },
        });
      });

      // Rows resolve into place.
      const rows = gsap.utils.toArray<HTMLElement>(".layer-row");
      gsap.set(rows, { autoAlpha: 0, y: 18 });
      ScrollTrigger.batch(rows, {
        start: "top 82%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          }),
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div ref={containerRef} className="relative">
      {/* Static connector track */}
      <span
        aria-hidden
        className="absolute bottom-3 left-[5px] top-3 w-px bg-border"
      />
      {/* Animated connector fill */}
      <span
        aria-hidden
        className="layer-fill absolute bottom-3 left-[5px] top-3 w-px bg-accent/70"
      />

      <ul className="flex flex-col">
        {LAYERS.map((layer) => (
          <li
            key={layer.index}
            className="layer-row relative grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-1 border-b border-border py-6 last:border-b-0"
          >
            <span
              aria-hidden
              className="relative z-10 mt-2 size-[11px] rounded-full border border-border-strong bg-surface"
            >
              <span className="layer-node absolute inset-[3px] rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
            </span>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <MonoLabel className="text-text-faint">{layer.index}</MonoLabel>
              <Heading level={3} as="h3" className="text-text-primary">
                {layer.name}
              </Heading>
            </div>
            <Text className="col-start-2 max-w-md text-sm">{layer.detail}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
