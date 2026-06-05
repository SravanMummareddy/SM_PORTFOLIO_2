import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { MonoLabel } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

interface FigureProps {
  /** Mono kicker naming the diagram, e.g. "State machine". */
  label?: string;
  caption?: ReactNode;
  children: ReactNode;
  /** Aspect ratio of the diagram area. Defaults to 16/9. */
  aspect?: string;
  className?: string;
}

/**
 * Frames an abstract system diagram as a glass panel with an optional
 * label and caption, revealed on scroll. The shared container for every
 * architecture / state-machine / flow visual in a case study.
 */
export function Figure({
  label,
  caption,
  children,
  aspect = "aspect-[16/9]",
  className,
}: FigureProps) {
  return (
    <ScrollReveal className={className}>
      <figure>
        <Card variant="glass" padding="none" className="overflow-hidden">
          {/* On phones the diagram is rendered at a minimum legible width
              inside a horizontal scroller, so the fixed-viewBox SVG labels
              stay readable instead of shrinking to ~4px. At sm+ the min-width
              resets and the affordances hide — desktop is unchanged. */}
          <div className="relative">
            <div
              tabIndex={0}
              aria-label={
                label
                  ? `${label} diagram — scroll horizontally to explore`
                  : "Diagram — scroll horizontally to explore"
              }
              className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className={cn("w-full min-w-[36rem] p-6 sm:min-w-0 sm:p-8", aspect)}>
                {children}
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-surface to-transparent sm:hidden"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-border bg-bg/70 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-tertiary sm:hidden"
            >
              Drag →
            </span>
          </div>
          {label || caption ? (
            <figcaption className="flex flex-col gap-1.5 border-t border-border px-6 py-4 sm:px-8">
              {label ? (
                <MonoLabel className="text-[0.7rem] uppercase tracking-[0.14em] text-accent-strong">
                  {label}
                </MonoLabel>
              ) : null}
              {caption ? (
                <span className="text-sm text-text-tertiary">{caption}</span>
              ) : null}
            </figcaption>
          ) : null}
        </Card>
      </figure>
    </ScrollReveal>
  );
}
