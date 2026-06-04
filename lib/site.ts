/**
 * Canonical site origin. Set NEXT_PUBLIC_SITE_URL in the deployment
 * environment to the production domain so canonical, OpenGraph, and
 * sitemap URLs resolve absolutely. Shared by the root metadata, robots,
 * and sitemap so the origin is defined in exactly one place.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sravan-mummareddy.vercel.app";
