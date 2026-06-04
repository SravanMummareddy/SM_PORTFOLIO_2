import { Section } from "@/components/ui/Section";
import { Heading, Lead } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { EvolutionTimeline } from "./EvolutionTimeline";

/**
 * Section 5 — experience as an evolution of systems, not a resume. The
 * {@link EvolutionTimeline} fills a connector and resolves each domain as
 * the section scrolls, reading as a progression deeper into operational
 * and AI-assisted architecture.
 */
export function ExperienceEvolution() {
  return (
    <Section id="evolution" eyebrow="Experience Evolution" divider>
      <Reveal mode="rise" className="max-w-2xl">
        <Heading level={2}>How the work evolved.</Heading>
        <Lead className="mt-6">
          Each domain shaped how the next was built — from reliability-critical
          systems to operational platforms to AI-assisted workflows.
        </Lead>
      </Reveal>

      <EvolutionTimeline />
    </Section>
  );
}
