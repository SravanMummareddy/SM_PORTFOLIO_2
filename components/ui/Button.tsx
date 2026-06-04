import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-control font-medium " +
  "whitespace-nowrap select-none transition-[background-color,border-color,color,transform,box-shadow] " +
  "duration-[var(--duration-fast)] ease-[var(--ease-out)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45";

const VARIANTS: Record<ButtonVariant, string> = {
  // Near-white, high-contrast — the primary call to action.
  primary:
    "bg-text-primary text-bg hover:bg-white",
  // Electric blue — reserved for the single "systems" emphasis CTA.
  accent:
    "bg-accent text-white hover:bg-accent-strong shadow-[0_8px_28px_-12px_var(--accent-glow)]",
  // Surface panel with hairline — the default neutral action.
  secondary:
    "bg-surface text-text-primary border border-border-strong hover:bg-surface-raised hover:border-border-strong",
  // Quiet text action.
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

interface CommonProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  /** Opens in a new tab with safe rel. */
  external?: boolean;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Action primitive. Renders a semantic <button> by default, or an
 * <a> when `href` is provided, so navigation and actions share one
 * visual language.
 */
export function Button(props: ButtonProps) {
  const { children, className, variant = "primary", size = "md" } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
