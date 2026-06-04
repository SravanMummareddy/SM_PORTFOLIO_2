"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { isWebGLAvailable } from "@/lib/webgl";
import { SystemGraphFallback } from "./SystemGraphFallback";
import { DURATION, EASE } from "@/lib/motion";

// Heavy three/R3F bundle is split out and never server-rendered.
const SystemGraphScene = dynamic(() => import("./SystemGraphScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Decorative hero backdrop. Progressive enhancement in layers:
 *   1. SSR / first paint  → static SVG fallback (instant, no JS).
 *   2. Capable + idle     → lazy-load the 3D scene, fade it in.
 *   3. Reduced motion / no WebGL → stay on the static fallback.
 * Render loop parks itself when the hero scrolls out of view.
 */
export function SystemGraph({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "0px 0px -10% 0px" });

  // `ready` is the single gate for the 3D scene. It only flips true
  // from the idle/timeout callback, and only after the reduced-motion
  // and WebGL checks have already passed — so no synchronous setState
  // runs inside the effect.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    if (!isWebGLAvailable()) return;

    // Defer mounting the scene until the main thread is idle so it
    // never competes with the hero's initial render/paint.
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
    } else {
      timeoutId = setTimeout(() => setReady(true), 700);
    }

    return () => {
      if (idleId !== undefined && w.cancelIdleCallback) w.cancelIdleCallback(idleId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  const showScene = ready;

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden
      style={{ pointerEvents: "none" }}
    >
      {/* Base layer: static graph. Fades out once the live scene is up. */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: showScene ? 0 : 1 }}
        transition={{ duration: DURATION.slow, ease: EASE.out }}
      >
        <SystemGraphFallback />
      </motion.div>

      {/* Enhanced layer: lazy 3D scene. */}
      <AnimatePresence>
        {showScene ? (
          <motion.div
            key="scene"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE.out }}
          >
            <SystemGraphScene active={inView} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
