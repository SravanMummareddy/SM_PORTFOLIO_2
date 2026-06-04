import type { ReactNode } from "react";
import { Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

export interface DefinitionItem {
  /** The decision, tradeoff, or change being explained. */
  term: ReactNode;
  /** The rationale. */
  body: ReactNode;
}

interface DefinitionListProps {
  items: DefinitionItem[];
}

/**
 * Editorial definition list: term on the left, rationale on the right.
 * The shared structure for Technical Decisions, Tradeoffs, and Scaling
 * — each reads as "what, and why", signalling deliberate judgment.
 */
export function DefinitionList({ items }: DefinitionListProps) {
  return (
    <dl className="border-t border-border">
      {items.map((item, i) => (
        <Reveal key={i} mode="rise">
          <div className="grid gap-3 border-b border-border py-7 md:grid-cols-[1fr_1.7fr] md:gap-12">
            <dt className="flex gap-3 text-base font-medium text-text-primary">
              <span
                aria-hidden
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]"
              />
              <span className="text-pretty">{item.term}</span>
            </dt>
            <dd>
              <Text className="text-sm md:text-base">{item.body}</Text>
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}
