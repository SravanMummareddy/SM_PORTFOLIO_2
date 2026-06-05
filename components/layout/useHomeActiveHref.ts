"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Maps each homepage section (by id) to the nav destination it previews.
 * Two sections feed "Systems" — both light the same tab. Order matches
 * the document order in app/page.tsx so the scroll-spy can pick the last
 * section whose top has crossed the trigger line.
 */
const HOME_SECTIONS: readonly { id: string; href: string }[] = [
  { id: "systems", href: "/systems" },
  { id: "systems-i-build", href: "/systems" },
  { id: "work", href: "/projects" },
  { id: "evolution", href: "/experience" },
  { id: "writing", href: "/writing" },
  { id: "contact", href: "/about" },
] as const;

/**
 * Homepage scroll-spy. As the homepage scrolls, returns the nav href whose
 * section is currently in view, so the header underline tracks the section
 * the visitor is reading. Returns `undefined` when not on the homepage, or
 * when above the first mapped section (hero) — in both cases the nav falls
 * back to its normal pathname-based active state, which highlights nothing
 * on "/". Purely visual wayfinding: no animation, rAF-throttled, and it
 * leans on native scroll events (which fire under Lenis and reduced motion).
 */
export function useHomeActiveHref(): string | undefined {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    // Off the homepage the hook returns undefined regardless of state
    // (guarded below), so there's nothing to observe or reset here.
    if (pathname !== "/") return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const section of HOME_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= line) {
          current = section.href;
        }
      }
      setActiveHref(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return pathname === "/" ? (activeHref ?? undefined) : undefined;
}
