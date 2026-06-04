import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Allow crawling of the public portfolio, but keep the internal design
 * system reference out of search indexes. Points crawlers at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/styleguide",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
