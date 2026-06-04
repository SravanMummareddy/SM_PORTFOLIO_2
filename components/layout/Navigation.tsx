import { cn } from "@/lib/utils";

export interface NavLink {
  label: string;
  href: string;
}

/** Minimal nav, per PORTFOLIO_ARCHITECTURE.md. No mega-menus. */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
] as const;

interface NavigationProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  links?: readonly NavLink[];
  onNavigate?: () => void;
}

/**
 * Presentational nav list. Shared between the desktop header bar and
 * the mobile sheet so link styling stays identical.
 */
export function Navigation({
  className,
  orientation = "horizontal",
  links = NAV_LINKS,
  onNavigate,
}: NavigationProps) {
  return (
    <nav
      aria-label="Primary"
      className={cn(
        "flex",
        orientation === "horizontal"
          ? "items-center gap-1"
          : "flex-col gap-1",
        className,
      )}
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={cn(
            "rounded-control px-3 py-2 text-sm text-text-secondary",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
            "hover:text-text-primary hover:bg-surface",
            orientation === "vertical" && "px-3 py-2.5 text-base",
          )}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
