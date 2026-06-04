import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect that degrades to useEffect during SSR to avoid React's
 * server warning. Used for GSAP setup so initial hidden states are applied
 * before paint (no flash of unstyled / un-hidden content).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
