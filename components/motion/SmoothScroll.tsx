"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Global scroll foundation. Drives Lenis smooth scrolling from the GSAP
 * ticker and feeds its scroll events into ScrollTrigger so every
 * scroll-driven animation shares one synchronized clock.
 *
 * Renders nothing — Lenis hijacks the document scroll directly. When the
 * user prefers reduced motion, it never initializes: native scrolling
 * stays, and the scroll-reveal components fall back to static content.
 */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    // Keep ScrollTrigger in lockstep with Lenis' virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Smooth in-page anchor navigation (e.g. the hero's "#systems" link).
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    // Recompute trigger positions once layout settles (font swap, the
    // idle-mounted 3D scene, images) so scroll ranges aren't stale.
    ScrollTrigger.refresh();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 700);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
