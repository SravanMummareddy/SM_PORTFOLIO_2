import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerWidth = "default" | "narrow" | "wide" | "full";

const WIDTHS: Record<ContainerWidth, string> = {
  narrow: "max-w-3xl", // long-form reading (case studies, writing)
  default: "max-w-[var(--container-page)]", // primary page width
  wide: "max-w-[1440px]", // cinematic / full-bleed-ish sections
  full: "max-w-none",
};

interface ContainerProps {
  children: ReactNode;
  className?: string;
  width?: ContainerWidth;
  /** Render as a different element (e.g. "main", "header"). */
  as?: ElementType;
}

/**
 * Horizontal layout primitive: centers content and applies the
 * consistent page gutter. Owns max-width; never set it ad hoc.
 *
 * Rendered via createElement so the polymorphic `as` prop stays
 * typeable alongside React Three Fiber's global JSX augmentation.
 */
export function Container({
  children,
  className,
  width = "default",
  as = "div",
}: ContainerProps) {
  return createElement(
    as,
    { className: cn("mx-auto w-full px-6 sm:px-8", WIDTHS[width], className) },
    children,
  );
}
