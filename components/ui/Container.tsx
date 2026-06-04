import {
  createElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ContainerWidth = "default" | "narrow" | "wide" | "full";

const WIDTHS: Record<ContainerWidth, string> = {
  narrow: "max-w-3xl", // long-form reading (case studies, writing)
  default: "max-w-[var(--container-page)]", // primary page width
  wide: "max-w-[1440px]", // cinematic / full-bleed-ish sections
  full: "max-w-none",
};

type ContainerProps<E extends ElementType> = {
  children: ReactNode;
  className?: string;
  width?: ContainerWidth;
  /** Render as a different element (e.g. "main", "header"). */
  as?: E;
} & Omit<
  ComponentPropsWithoutRef<E>,
  "as" | "children" | "className" | "width"
>;

/**
 * Horizontal layout primitive: centers content and applies the
 * consistent page gutter. Owns max-width; never set it ad hoc.
 *
 * Generic over the rendered element so element-specific props (e.g.
 * an <a>'s href, an aria attribute) are typed and forwarded via rest.
 * Rendered through createElement to stay compatible with React Three
 * Fiber's global JSX augmentation.
 */
export function Container<E extends ElementType = "div">({
  children,
  className,
  width = "default",
  as,
  ...rest
}: ContainerProps<E>) {
  const Tag: ElementType = as ?? "div";
  return createElement(
    Tag,
    {
      className: cn("mx-auto w-full px-6 sm:px-8", WIDTHS[width], className),
      ...rest,
    },
    children,
  );
}
