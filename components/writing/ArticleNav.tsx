import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Eyebrow, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { ARTICLES } from "@/content/writing";
import { PROJECTS } from "@/content/projects";

/**
 * Closing navigation for an article. Offers the previous and next note
 * (in publication order, wrapping around) and, when the note maps to one,
 * a cross-link to the system it describes — so writing connects back to
 * the work rather than sitting in its own silo.
 */
export function ArticleNav({ currentSlug }: { currentSlug: string }) {
  const index = ARTICLES.findIndex((a) => a.slug === currentSlug);
  if (index === -1) return null;

  const count = ARTICLES.length;
  const prev = ARTICLES[(index - 1 + count) % count];
  const next = ARTICLES[(index + 1) % count];

  const current = ARTICLES[index];
  const related = current.relatedProject
    ? PROJECTS.find((p) => p.slug === current.relatedProject)
    : undefined;

  return (
    <Section divider width="narrow">
      <Reveal mode="rise">
        <Eyebrow marker>Keep reading</Eyebrow>
      </Reveal>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Reveal mode="rise">
          <Card
            as="a"
            href={`/writing/${prev.slug}`}
            variant="surface"
            padding="lg"
            interactive
            aria-label={`Previous note — ${prev.title}`}
            className="flex h-full flex-col"
          >
            <MonoLabel className="text-text-faint">
              <span aria-hidden className="mr-2 inline-block transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:-translate-x-1">
                ←
              </span>
              Previous
            </MonoLabel>
            <span className="mt-3 text-base font-medium text-text-primary transition-colors group-hover:text-white">
              {prev.title}
            </span>
          </Card>
        </Reveal>

        <Reveal mode="rise">
          <Card
            as="a"
            href={`/writing/${next.slug}`}
            variant="surface"
            padding="lg"
            interactive
            aria-label={`Next note — ${next.title}`}
            className="flex h-full flex-col sm:items-end sm:text-right"
          >
            <MonoLabel className="text-text-faint">
              Next
              <span aria-hidden className="ml-2 inline-block transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1">
                →
              </span>
            </MonoLabel>
            <span className="mt-3 text-base font-medium text-text-primary transition-colors group-hover:text-white">
              {next.title}
            </span>
          </Card>
        </Reveal>
      </div>

      <Reveal
        mode="rise"
        className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm"
      >
        {related ? (
          <a
            href={`/projects/${related.slug}`}
            className="group inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-text-primary"
          >
            See it in practice — the {related.name} case study
            <span
              aria-hidden
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        ) : null}
        <Link
          href="/writing"
          className="font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-text-tertiary transition-colors hover:text-text-secondary"
        >
          All writing
        </Link>
      </Reveal>
    </Section>
  );
}
