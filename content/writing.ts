/**
 * Single source of truth for engineering writing. Consumed by the
 * homepage writing preview, the /writing index, and each article page
 * so titles, slugs, and metadata never drift across surfaces. Article
 * bodies live in their route's page.tsx; this module holds only metadata.
 */
export interface ArticleMeta {
  slug: string;
  category: string;
  title: string;
  teaser: string;
  /** ISO date the note was published. */
  date: string;
  readingTime: string;
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "state-machines-workflows",
    category: "Systems",
    title: "Designing State Machines for Real Workflow Systems",
    teaser:
      "Why explicit states and strict transitions beat boolean flags once a workflow has more than three steps.",
    date: "2026-02-18",
    readingTime: "7 min read",
  },
  {
    slug: "legacy-modernization",
    category: "Engineering",
    title: "Modernizing Legacy Enterprise Systems Without Breaking Production",
    teaser:
      "Strangler patterns, idempotent writes, and shipping migrations behind a system that can't go down.",
    date: "2026-03-26",
    readingTime: "8 min read",
  },
  {
    slug: "ai-agents-internal-tools",
    category: "AI Workflows",
    title: "How AI Agents Change Internal Software Workflows",
    teaser:
      "Where retrieval and agents genuinely reduce operational toil — and where they quietly don't.",
    date: "2026-05-07",
    readingTime: "6 min read",
  },
];

export function getArticle(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Human-readable publication date, e.g. "February 18, 2026". */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
