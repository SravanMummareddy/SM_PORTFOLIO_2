import "server-only";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

/**
 * Single source of truth for engineering writing. Posts live as MDX files
 * in content/writing/*.mdx — a frontmatter block plus a markdown body. This
 * module reads that folder at build time and exposes the same API every
 * surface already consumes (homepage preview, /writing index, prev/next nav,
 * sitemap, OG), so adding a post is just dropping in one .mdx file.
 *
 * Server-only: it touches the filesystem. Every importer is a server
 * component, so this is safe (and enforced by the import below).
 */

export interface ArticleMeta {
  slug: string;
  category: string;
  title: string;
  teaser: string;
  /** ISO date the note was published (YYYY-MM-DD). */
  date: string;
  readingTime: string;
  /** The larger intro sentence under the title, shown in the article hero. */
  lead: string;
  /** Optional SEO description; falls back to the teaser. */
  description?: string;
  /**
   * The case study this note most directly relates to — a slug in
   * content/projects.ts. Drives the "related system" cross-link in the
   * article footer nav.
   */
  relatedProject?: string;
}

interface LoadedArticle extends ArticleMeta {
  /** Raw MDX body (frontmatter stripped) for the renderer. */
  body: string;
}

const WRITING_DIR = join(process.cwd(), "content/writing");

/** Coerce a frontmatter date (string or YAML Date) to a YYYY-MM-DD string. */
function toISODate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

/** Estimate reading time from the body at ~200 words/minute. */
function readingTimeFromBody(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function loadArticles(): LoadedArticle[] {
  const files = readdirSync(WRITING_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file): LoadedArticle => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = readFileSync(join(WRITING_DIR, file), "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      category: String(data.category ?? ""),
      title: String(data.title ?? slug),
      teaser: String(data.teaser ?? ""),
      date: toISODate(data.date),
      lead: String(data.lead ?? ""),
      description: data.description ? String(data.description) : undefined,
      relatedProject: data.relatedProject ? String(data.relatedProject) : undefined,
      readingTime: data.readingTime
        ? String(data.readingTime)
        : readingTimeFromBody(content),
      body: content,
    };
  });

  // Newest first.
  return articles.sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );
}

const LOADED = loadArticles();

/** All articles, newest first. */
export const ARTICLES: ArticleMeta[] = LOADED.map((a) => ({
  slug: a.slug,
  category: a.category,
  title: a.title,
  teaser: a.teaser,
  date: a.date,
  readingTime: a.readingTime,
  lead: a.lead,
  description: a.description,
  relatedProject: a.relatedProject,
}));

export function getArticle(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Raw MDX body for a post, used by the [slug] route to render it. */
export function getArticleSource(slug: string): string | undefined {
  return LOADED.find((a) => a.slug === slug)?.body;
}

/** Human-readable publication date, e.g. "February 18, 2026". */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
