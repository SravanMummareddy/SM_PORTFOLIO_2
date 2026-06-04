import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "surface" | "glass" | "outline";
type CardPadding = "none" | "sm" | "md" | "lg";

const VARIANTS: Record<CardVariant, string> = {
  // Layered graphite panel with soft elevation.
  surface: "bg-surface border border-border shadow-card",
  // Translucent sheen — for panels over motion/3D backdrops.
  glass: "surface-glass border border-border shadow-card",
  // Hairline only, no fill — quiet grouping.
  outline: "bg-transparent border border-border",
};

const PADDING: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: CardPadding;
  /**
   * Hover affordance for clickable cards: the panel lifts and its
   * border warms to accent — reads as "inspecting a system node".
   */
  interactive?: boolean;
  as?: ElementType;
}

/**
 * Surface primitive. The base for architecture cards, system nodes,
 * metadata panels — never a generic content box. Composes with any
 * children; bring your own internal layout.
 */
export function Card({
  children,
  className,
  variant = "surface",
  padding = "md",
  interactive = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card",
        VARIANTS[variant],
        PADDING[padding],
        interactive &&
          "group transition-[transform,border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-border-accent hover:shadow-raised",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
