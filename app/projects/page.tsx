import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Display, Heading, Lead, Text, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectGlyph } from "@/components/sections/ProjectGlyph";
import { PROJECTS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering systems by Sravan Mummareddy — workflow platforms, enterprise modernization, operational software, and AI-assisted retrieval.",
};

function StatusTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-control border border-border px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-tertiary">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export default function ProjectsIndex() {
  return (
    <>
      <Section spacing="large" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-fade opacity-[0.5]"
        />
        <Reveal mode="rise">
          <MonoLabel className="text-accent-strong">Work</MonoLabel>
        </Reveal>
        <Reveal mode="resolve" delay={0.05}>
          <Display className="mt-5 max-w-3xl">Engineering systems.</Display>
        </Reveal>
        <Reveal mode="rise" delay={0.15}>
          <Lead className="mt-7 max-w-2xl">
            Each project is a different systems problem — workflow intelligence,
            platform modernization, operational software, and decision
            analytics. Every one has a full case study breaking down its
            architecture, tradeoffs, and how it would scale.
          </Lead>
        </Reveal>
      </Section>

      <Section divider width="default" className="pt-0">
        <ul className="border-t border-border">
          {PROJECTS.map((project) => {
            const inner = (
              <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
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

                  <span
                    className={
                      project.hasCaseStudy
                        ? "mt-7 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors group-hover:text-text-primary"
                        : "mt-7 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-faint"
                    }
                  >
                    {project.hasCaseStudy ? (
                      <>
                        Read the case study
                        <span
                          aria-hidden
                          className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </>
                    ) : (
                      "Case study in progress"
                    )}
                  </span>
                </div>

                <Card
                  variant="glass"
                  padding="none"
                  className="w-full overflow-hidden transition-colors duration-[var(--duration-base)] group-hover:border-border-accent"
                >
                  <div className="aspect-[16/11] h-full w-full p-4">
                    <ProjectGlyph variant={project.glyph} />
                  </div>
                </Card>
              </div>
            );

            return (
              <li key={project.slug} className="border-b border-border py-12">
                <Reveal mode="rise">
                  {project.hasCaseStudy ? (
                    <a
                      href={`/projects/${project.slug}`}
                      className="group block"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group">{inner}</div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
