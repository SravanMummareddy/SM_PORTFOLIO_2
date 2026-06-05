/**
 * Canonical site origin, defined in exactly one place. Shared by the root
 * metadata (metadataBase), robots, and sitemap so canonical, OpenGraph, and
 * sitemap URLs resolve absolutely. Server-only usage (no client importers),
 * so non-public env vars are safe here.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this once you have a custom domain.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel auto-provides the project's
 *      stable production domain at build time, so the deployed site always
 *      uses its real *.vercel.app URL with zero configuration.
 *   3. localhost — local dev / non-Vercel builds.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
