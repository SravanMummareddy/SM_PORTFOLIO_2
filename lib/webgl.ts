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

    // Probing allocates a real GL context. Release it immediately so we
    // don't hold one of the browser's limited contexts just to detect.
    if (gl && "getExtension" in gl) {
      (gl as WebGLRenderingContext)
        .getExtension("WEBGL_lose_context")
        ?.loseContext();
    }
  } catch {
    cached = false;
  }
  return cached;
}
