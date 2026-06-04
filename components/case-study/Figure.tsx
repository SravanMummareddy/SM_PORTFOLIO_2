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
          <div className={cn("w-full p-6 sm:p-8", aspect)}>{children}</div>
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
