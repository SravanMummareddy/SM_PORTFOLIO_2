import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Heading, Text, MonoLabel, Eyebrow } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { PillarGlyph } from "./PillarGlyph";
import { PROJECTS, projectHref, type ProjectMeta } from "@/content/projects";
import { EXPERIENCE, type ExperienceEntry } from "@/content/experience";
import { getArticle, type ArticleMeta } from "@/content/writing";
import type { SystemPillar } from "@/content/systems";

const chip =
  "rounded-control border border-border px-2.5 py-1 font-mono text-[0.8125rem] text-text-tertiary";

/**
 * One pillar on the /systems philosophy page: glyph + philosophy, then
 * architecture concepts and technical patterns, then the related work
 * resolved from the project / experience / writing sources by id.
 */
export function PillarSection({ pillar }: { pillar: SystemPillar }) {
  const projects = pillar.projects
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p): p is ProjectMeta => p !== undefined);
  const experience = pillar.experience
    .map((company) => EXPERIENCE.find((e) => e.company === company))
    .filter((e): e is ExperienceEntry => e !== undefined);
  const articles = pillar.articles
    .map((slug) => getArticle(slug))
    .filter((a): a is ArticleMeta => a !== undefined);

  return (
    <Section id={pillar.slug} divider className="scroll-mt-24">
      <Reveal mode="rise" className="max-w-2xl">
        <div className="flex items-center gap-4">
          <div className="rounded-card border border-border bg-surface p-3">
            <PillarGlyph kind={pillar.kind} className="h-9 w-9" />
          </div>
          <MonoLabel className="text-text-faint">{pillar.code}</MonoLabel>
        </div>
        <Heading level={2} className="mt-6">
          {pillar.name}
        </Heading>
        <Text className="mt-5 md:text-[1.0625rem] md:leading-8">
          {pillar.philosophy}
        </Text>
      </Reveal>

      {/* Architecture concepts + technical patterns */}
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Reveal mode="rise">
          <Eyebrow marker>Architecture concepts</Eyebrow>
          <ul className="mt-5 flex flex-wrap gap-2">
            {pillar.concepts.map((c) => (
              <li key={c}>
                <span className={chip}>{c}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal mode="rise">
          <Eyebrow marker>Technical patterns</Eyebrow>
          <ul className="mt-5 space-y-3">
            {pillar.patterns.map((p) => (
              <li key={p} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]"
                />
                <Text className="text-sm md:text-base">{p}</Text>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Related work */}
      <div className="mt-14">
        <Eyebrow marker>Related work</Eyebrow>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Reveal mode="rise">
                <Card
                  as="a"
                  href={projectHref(project)}
                  variant="surface"
                  padding="md"
                  interactive
                  className="flex h-full flex-col"
                >
                  <MonoLabel className="text-text-faint">{project.index}</MonoLabel>
                  <span className="mt-2 text-base font-medium text-text-primary transition-colors group-hover:text-white">
                    {project.name}
                  </span>
                  <MonoLabel className="mt-1 text-accent-strong">
                    {project.kind}
                  </MonoLabel>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-text-tertiary transition-colors group-hover:text-text-secondary">
                    {project.hasCaseStudy ? "Read the case study" : "View project"}
                    <span
                      aria-hidden
                      className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>

        {experience.length > 0 || articles.length > 0 ? (
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {experience.length > 0 ? (
              <Reveal mode="rise">
                <MonoLabel className="text-text-faint uppercase tracking-[0.12em] text-[0.7rem]">
                  Related experience
                </MonoLabel>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {experience.map((entry) => (
                    <li key={entry.company}>
                      <a
                        href="/experience"
                        className={`${chip} inline-block transition-colors hover:border-border-strong hover:text-text-secondary`}
                      >
                        {entry.company}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {articles.length > 0 ? (
              <Reveal mode="rise">
                <MonoLabel className="text-text-faint uppercase tracking-[0.12em] text-[0.7rem]">
                  Related writing
                </MonoLabel>
                <ul className="mt-4 space-y-2">
                  {articles.map((article) => (
                    <li key={article.slug}>
                      <a
                        href={`/writing/${article.slug}`}
                        className="group inline-flex items-baseline gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {article.title}
                        <span
                          aria-hidden
                          className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
