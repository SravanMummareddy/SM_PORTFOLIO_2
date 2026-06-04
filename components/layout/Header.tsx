"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Navigation } from "./Navigation";
import { DURATION, EASE } from "@/lib/motion";

function Wordmark() {
  return (
    <a
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="Sravan Mummareddy — home"
    >
      <span
        aria-hidden
        className="size-2 rounded-[3px] bg-accent shadow-[0_0_10px_var(--accent-glow)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:rotate-45"
      />
      <span className="text-sm font-medium tracking-tight text-text-primary">
        Sravan Mummareddy
      </span>
    </a>
  );
}

/**
 * Top app bar. Transparent over the hero, then settles into a glass
 * panel with a hairline once the page scrolls — a quiet "system
 * coming online" cue. Collapses to a mobile sheet under md.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-out)]",
          scrolled || menuOpen
            ? "border-b border-border surface-glass"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Wordmark />

            <div className="hidden items-center gap-2 md:flex">
              <Navigation />
              <span aria-hidden className="mx-2 h-5 w-px bg-border" />
              <Button href="/contact" variant="secondary" size="sm">
                Contact
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-control text-text-secondary hover:bg-surface hover:text-text-primary md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-sheet"
            className="md:hidden surface-glass border-b border-border"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: DURATION.base, ease: EASE.out }}
          >
            <Container>
              <div className="flex flex-col gap-2 py-6">
                <Navigation
                  orientation="vertical"
                  onNavigate={() => setMenuOpen(false)}
                />
                <Button
                  href="/contact"
                  variant="secondary"
                  size="md"
                  className="mt-2 w-full"
                >
                  Contact
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span
        className={cn(
          "absolute left-0 h-px w-full bg-current transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
          open ? "top-1/2 rotate-45" : "top-1",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 h-px w-full bg-current transition-opacity duration-[var(--duration-fast)]",
          open ? "opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-px w-full bg-current transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
          open ? "top-1/2 -rotate-45" : "bottom-1",
        )}
      />
    </span>
  );
}
