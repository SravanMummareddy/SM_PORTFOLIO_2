import {
  createElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/*
  Polymorphic text primitives. Each is generic over the rendered
  element so element-specific props are typed and forwarded via rest,
  and each renders through createElement to stay compatible with React
  Three Fiber's global JSX augmentation.
*/

type TextOwnProps<E extends ElementType> = {
  children: ReactNode;
  className?: string;
  as?: E;
};

type PolymorphicTextProps<E extends ElementType, Extra extends string = never> =
  TextOwnProps<E> &
    Omit<ComponentPropsWithoutRef<E>, "as" | "children" | "className" | Extra>;

/**
 * Display — the oversized hero statement. One per view, maximum.
 * Pairs the fluid `text-display` scale with balanced wrapping.
 */
export function Display<E extends ElementType = "h1">({
  children,
  className,
  as,
  ...rest
}: PolymorphicTextProps<E>) {
  const Tag: ElementType = as ?? "h1";
  return createElement(
    Tag,
    {
      className: cn(
        "text-display font-sans text-text-primary text-balance",
        className,
      ),
      ...rest,
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

/** Section and subsection headings. */
export function Heading<E extends ElementType = "h2">({
  children,
  className,
  level = 2,
  as,
  ...rest
}: PolymorphicTextProps<E, "level"> & {
  /** Visual + semantic level. Override the tag with `as` if needed. */
  level?: HeadingLevel;
}) {
  const Tag: ElementType = as ?? (`h${level}` as ElementType);
  return createElement(
    Tag,
    {
      className: cn(
        HEADING_SIZE[level],
        "font-sans text-text-primary text-balance",
        className,
      ),
      ...rest,
    },
    children,
  );
}

const TEXT_TONE = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  tertiary: "text-text-tertiary",
} as const;

/** Body copy. Default tone is secondary — calm, readable, restrained. */
export function Text<E extends ElementType = "p">({
  children,
  className,
  tone = "secondary",
  as,
  ...rest
}: PolymorphicTextProps<E, "tone"> & {
  /** Muted secondary for supporting copy, faint for metadata. */
  tone?: "primary" | "secondary" | "tertiary";
}) {
  const Tag: ElementType = as ?? "p";
  return createElement(
    Tag,
    {
      className: cn(
        "font-sans text-base leading-7 text-pretty",
        TEXT_TONE[tone],
        className,
      ),
      ...rest,
    },
    children,
  );
}

/** Lead — the larger intro paragraph that sits under a Display/Heading. */
export function Lead<E extends ElementType = "p">({
  children,
  className,
  as,
  ...rest
}: PolymorphicTextProps<E>) {
  const Tag: ElementType = as ?? "p";
  return createElement(
    Tag,
    {
      className: cn(
        "text-lead font-sans text-text-secondary text-pretty",
        className,
      ),
      ...rest,
    },
    children,
  );
}

/**
 * Eyebrow — uppercase mono micro-label. The recurring "engineering
 * metadata" voice: section tags, statuses, kicker labels.
 */
export function Eyebrow<E extends ElementType = "span">({
  children,
  className,
  marker = false,
  as,
  ...rest
}: PolymorphicTextProps<E, "marker"> & {
  /** Show the leading accent tick — reads as a "system label". */
  marker?: boolean;
}) {
  const Tag: ElementType = as ?? "span";
  return createElement(
    Tag,
    {
      className: cn(
        "inline-flex items-center gap-2 text-eyebrow font-mono uppercase text-text-tertiary",
        className,
      ),
      ...rest,
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
export function MonoLabel<E extends ElementType = "span">({
  children,
  className,
  as,
  ...rest
}: PolymorphicTextProps<E>) {
  const Tag: ElementType = as ?? "span";
  return createElement(
    Tag,
    {
      className: cn(
        "font-mono text-[0.8125rem] tracking-tight text-text-secondary",
        className,
      ),
      ...rest,
    },
    children,
  );
}
