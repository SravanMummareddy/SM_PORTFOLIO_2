import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Display, Lead, Heading, Text, MonoLabel } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PillarSection } from "@/components/systems/PillarSection";
import { PILLARS } from "@/content/systems";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "The three engineering pillars behind the work — backend platforms, operational intelligence, and AI-assisted systems — each with its philosophy, architecture concepts, technical patterns, and the projects and experience it draws on.",
};

export default function SystemsPage() {
  return (
    <>
      <Section spacing="large" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-fade opacity-[0.5]"
        />
        <Reveal mode="rise">
          <MonoLabel className="text-accent-strong">Systems Philosophy</MonoLabel>
        </Reveal>
        <Reveal mode="resolve" delay={0.05}>
          <Display className="mt-5 max-w-4xl">
            Three pillars, one way of thinking.
          </Display>
        </Reveal>
        <Reveal mode="rise" delay={0.15}>
          <Lead className="mt-8 max-w-2xl">
            Every system I build falls into one of three domains — backend
            platforms, operational intelligence, and AI-assisted systems. The
            domain changes; the discipline doesn&apos;t: clear boundaries,
            honest data, and reliability designed in from the start.
          </Lead>
        </Reveal>

        <Reveal mode="rise" delay={0.25}>
          <ul className="mt-10 flex flex-wrap gap-2">
            {PILLARS.map((pillar) => (
              <li key={pillar.slug}>
                <a
                  href={`#${pillar.slug}`}
                  className="inline-flex items-center gap-2 rounded-control border border-border px-3 py-1.5 font-mono text-[0.8125rem] text-text-tertiary transition-colors hover:border-border-strong hover:text-text-secondary"
                >
                  <span className="text-text-faint">{pillar.code}</span>
                  {pillar.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {PILLARS.map((pillar) => (
        <PillarSection key={pillar.slug} pillar={pillar} />
      ))}

      <Section divider className="text-center">
        <Reveal mode="rise" className="mx-auto max-w-xl">
          <Heading level={2}>See the systems in practice.</Heading>
          <Text className="mx-auto mt-5 max-w-md">
            The philosophy above shows up in the work — full case studies of
            each system, and the experience behind them.
          </Text>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/projects" variant="secondary">
              View the work
            </Button>
            <Button href="/experience" variant="ghost">
              The experience
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
