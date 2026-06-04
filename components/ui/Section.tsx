import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Eyebrow } from "./Typography";

type SectionSpacing = "default" | "large" | "compact" | "none";

const SPACING: Record<SectionSpacing, string> = {
  default: "py-section",
  large: "py-section-lg",
  compact: "py-20",
  none: "",
};

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Vertical rhythm preset. */
  spacing?: SectionSpacing;
  /** Small mono eyebrow label rendered above the section content. */
  eyebrow?: string;
  /** Container width for the inner content. Set false to opt out. */
  width?: "default" | "narrow" | "wide" | "full" | false;
  /** Hairline divider along the top edge. */
  divider?: boolean;
  id?: string;
}

/**
 * Vertical layout primitive: a semantic <section> with consistent
 * page rhythm, an optional engineering eyebrow, and an optional
 * top hairline. Wraps content in a <Container> unless width={false}.
 */
export function Section({
  children,
  className,
  spacing = "default",
  eyebrow,
  width = "default",
  divider = false,
  id,
}: SectionProps) {
  const body = (
    <>
      {eyebrow ? <Eyebrow className="mb-6 block">{eyebrow}</Eyebrow> : null}
      {children}
    </>
  );

  return (
    <section
      id={id}
      className={cn(
        SPACING[spacing],
        divider && "border-t border-border",
        className,
      )}
    >
      {width === false ? body : <Container width={width}>{body}</Container>}
    </section>
  );
}
