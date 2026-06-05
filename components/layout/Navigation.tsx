"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavLink {
  label: string;
  href: string;
}

/** Minimal nav, per PORTFOLIO_ARCHITECTURE.md. No mega-menus. */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Work", href: "/projects" },
  { label: "Systems", href: "/systems" },
  { label: "Experience", href: "/experience" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
] as const;

interface NavigationProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  links?: readonly NavLink[];
  onNavigate?: () => void;
  /**
   * Override which link is marked active. When provided (e.g. the homepage
   * scroll-spy), the link whose href equals this value is active and the
   * pathname is ignored; `undefined` falls back to pathname-based matching.
   */
  activeHref?: string;
}

/**
 * Is `href` the section the current route belongs to? Exact match for
 * the root, prefix match otherwise so a deep route like
 * /projects/lumintrack still lights up "Work".
 */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Presentational nav list. Shared between the desktop header bar, the
 * mobile sheet, and the footer so link styling stays identical. Reads
 * the current path to mark the active section — answering "where am I?"
 * on every page.
 */
export function Navigation({
  className,
  orientation = "horizontal",
  links = NAV_LINKS,
  onNavigate,
  activeHref,
}: NavigationProps) {
  const pathname = usePathname() ?? "/";

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
      {links.map((link) => {
        const active =
          activeHref !== undefined
            ? link.href === activeHref
            : isActive(pathname, link.href);
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative rounded-control px-3 py-2 text-sm",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
              "hover:text-text-primary hover:bg-surface",
              active
                ? "text-text-primary font-medium"
                : "text-text-secondary",
              orientation === "vertical" && "px-3 py-2.5 text-base",
            )}
          >
            {link.label}
            {active ? (
              <span
                aria-hidden
                className={cn(
                  "absolute rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]",
                  orientation === "horizontal"
                    ? "inset-x-3 bottom-1 h-[2px]"
                    : "inset-y-1.5 left-0 w-[2px]",
                )}
              />
            ) : null}
          </a>
        );
      })}
    </nav>
  );
}
