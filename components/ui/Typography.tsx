import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  Polymorphic text primitives. Rendered through createElement so the
  `as` prop stays well-typed even with React Three Fiber's global JSX
  augmentation active elsewhere in the app.
*/

interface BaseTextProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Display — the oversized hero statement. One per view, maximum.
 * Pairs the fluid `text-display` scale with balanced wrapping.
 */
export function Display({ children, className, as = "h1" }: BaseTextProps) {
  return createElement(
    as,
    {
      className: cn(
        "text-display font-sans text-text-primary text-balance",
        className,
      ),
    },
    children,
  );
}

type HeadingLevel = 1 | 2 | 3;

const HEADING_SIZE: Record<HeadingLevel, string> = {
  1: "text-h1",
  2: "text-h2",
  3: "text-h3",
};

interface HeadingProps extends BaseTextProps {
  /** Visual + semantic level. Override the tag with `as` if needed. */
  level?: HeadingLevel;
}

/** Section and subsection headings. */
export function Heading({ children, className, level = 2, as }: HeadingProps) {
  const tag = as ?? (`h${level}` as ElementType);
  return createElement(
    tag,
    {
      className: cn(
        HEADING_SIZE[level],
        "font-sans text-text-primary text-balance",
        className,
      ),
    },
    children,
  );
}

interface TextProps extends BaseTextProps {
  /** Muted secondary for supporting copy, faint for metadata. */
  tone?: "primary" | "secondary" | "tertiary";
}

const TEXT_TONE = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  tertiary: "text-text-tertiary",
} as const;

/** Body copy. Default tone is secondary — calm, readable, restrained. */
export function Text({
  children,
  className,
  tone = "secondary",
  as = "p",
}: TextProps) {
  return createElement(
    as,
    {
      className: cn(
        "font-sans text-base leading-7 text-pretty",
        TEXT_TONE[tone],
        className,
      ),
    },
    children,
  );
}

/** Lead — the larger intro paragraph that sits under a Display/Heading. */
export function Lead({ children, className, as = "p" }: BaseTextProps) {
  return createElement(
    as,
    {
      className: cn(
        "text-lead font-sans text-text-secondary text-pretty",
        className,
      ),
    },
    children,
  );
}

interface EyebrowProps extends BaseTextProps {
  /** Show the leading accent tick — reads as a "system label". */
  marker?: boolean;
}

/**
 * Eyebrow — uppercase mono micro-label. The recurring "engineering
 * metadata" voice: section tags, statuses, kicker labels.
 */
export function Eyebrow({
  children,
  className,
  marker = false,
  as = "span",
}: EyebrowProps) {
  return createElement(
    as,
    {
      className: cn(
        "inline-flex items-center gap-2 text-eyebrow font-mono uppercase text-text-tertiary",
        className,
      ),
    },
    marker
      ? createElement("span", {
          key: "marker",
          "aria-hidden": true,
          className:
            "size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]",
        })
      : null,
    children,
  );
}

/** MonoLabel — inline technical token (tech names, keys, values). */
export function MonoLabel({ children, className, as = "span" }: BaseTextProps) {
  return createElement(
    as,
    {
      className: cn(
        "font-mono text-[0.8125rem] tracking-tight text-text-secondary",
        className,
      ),
    },
    children,
  );
}
