import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Eyebrow, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { PROJECTS } from "@/content/projects";

/**
 * Closing navigation for a case study. Replaces the old generic
 * "all projects" CTA with a real continue-reading affordance: the
 * previous and next system (in index order, wrapping around) plus a
 * route into the engineering journey behind them. No case study is a
 * dead end.
 */
export function CaseStudyNav({ currentSlug }: { currentSlug: string }) {
  const index = PROJECTS.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return null;

  const count = PROJECTS.length;
  const prev = PROJECTS[(index - 1 + count) % count];
  const next = PROJECTS[(index + 1) % count];

  return (
    <Section divider>
      <Reveal mode="rise">
        <Eyebrow marker>Continue exploring</Eyebrow>
      </Reveal>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        <Reveal mode="rise">
          <Card
            as="a"
            href={`/projects/${prev.slug}`}
            variant="surface"
            padding="lg"
            interactive
            aria-label={`Previous project — ${prev.name}`}
            className="flex h-full flex-col"
          >
            <MonoLabel className="text-text-faint">
              <span aria-hidden className="mr-2 inline-block transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:-translate-x-1">
                ←
              </span>
              Previous · {prev.index}
            </MonoLabel>
            <span className="mt-3 text-lg font-medium text-text-primary transition-colors group-hover:text-white">
              {prev.name}
            </span>
            <MonoLabel className="mt-1 text-accent-strong">{prev.kind}</MonoLabel>
          </Card>
        </Reveal>

        <Reveal mode="rise">
          <Card
            as="a"
            href={`/projects/${next.slug}`}
            variant="surface"
            padding="lg"
            interactive
            aria-label={`Next project — ${next.name}`}
            className="flex h-full flex-col md:items-end md:text-right"
          >
            <MonoLabel className="text-text-faint">
              Next · {next.index}
              <span aria-hidden className="ml-2 inline-block transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1">
                →
              </span>
            </MonoLabel>
            <span className="mt-3 text-lg font-medium text-text-primary transition-colors group-hover:text-white">
              {next.name}
            </span>
            <MonoLabel className="mt-1 text-accent-strong">{next.kind}</MonoLabel>
          </Card>
        </Reveal>
      </div>

      <Reveal
        mode="rise"
        className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm"
      >
        <a
          href="/experience"
          className="group inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-text-primary"
        >
          See the engineering journey behind these systems
          <span
            aria-hidden
            className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
          >
            →
          </span>
        </a>
        <a
          href="/projects"
          className="font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-text-tertiary transition-colors hover:text-text-secondary"
        >
          All projects
        </a>
      </Reveal>
    </Section>
  );
}
