import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Heading, Lead, Text, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectGlyph } from "./ProjectGlyph";
import { LuminTrackSequence } from "./LuminTrackSequence";
import { PROJECTS, projectHref } from "@/content/projects";

function StatusTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-control border border-border px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-tertiary">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

/**
 * Section 4 — featured engineering stories as system previews, not a
 * card grid. Each project is a full-width editorial row pairing a
 * concise positioning with an architecture-hint schematic. Deep detail
 * lives on the (later) case-study pages these link toward.
 */
export function FeaturedWork() {
  return (
    <Section id="work" eyebrow="Featured Engineering Stories" divider>
      <Reveal mode="rise" className="max-w-2xl">
        <Heading level={2}>Each project is a different systems problem.</Heading>
        <Lead className="mt-6">
          Not a portfolio of apps — a set of operational systems, each solving
          a distinct architecture, data, or workflow challenge.
        </Lead>
      </Reveal>

      <ul className="mt-12 border-t border-border">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <Reveal mode="rise">
              <a
                href={projectHref(project)}
                className="group grid items-center gap-8 border-b border-border py-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <MonoLabel className="text-text-faint">
                      {project.index}
                    </MonoLabel>
                    <StatusTag>{project.status}</StatusTag>
                  </div>

                  <Heading
                    level={3}
                    className="mt-5 transition-colors duration-[var(--duration-base)] group-hover:text-white"
                  >
                    {project.name}
                  </Heading>
                  <MonoLabel className="mt-1 block text-accent-strong">
                    {project.kind}
                  </MonoLabel>

                  <Text className="mt-4 max-w-xl text-sm">
                    {project.positioning}
                  </Text>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.focus.map((item) => (
                      <li key={item}>
                        <MonoLabel className="rounded-control border border-border px-2 py-1 text-text-tertiary">
                          {item}
                        </MonoLabel>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors group-hover:text-text-primary">
                    {project.hasCaseStudy ? "Read the case study" : "View project"}
                    <span
                      aria-hidden
                      className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>

                {/* Architecture hint — LuminTrack gets the scroll story. */}
                <Card
                  variant="glass"
                  padding="none"
                  className="w-full overflow-hidden transition-colors duration-[var(--duration-base)] group-hover:border-border-accent"
                >
                  {project.slug === "lumintrack" ? (
                    <LuminTrackSequence />
                  ) : (
                    <div className="aspect-[16/11] h-full w-full p-4">
                      <ProjectGlyph variant={project.glyph} />
                    </div>
                  )}
                </Card>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
