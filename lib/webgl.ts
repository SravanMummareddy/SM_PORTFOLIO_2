/**
 * Cheap, cached WebGL capability probe. Runs once, client-only.
 * Used to decide whether the 3D hero scene can mount at all, so a
 * non-WebGL device gets the static fallback instead of a blank canvas.
 */
let cached: boolean | null = null;

export function isWebGLAvailable(): boolean {
  if (cached !== null) return cached;
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cached = Boolean(gl);
  } catch {
    cached = false;
  }
  return cached;
}
