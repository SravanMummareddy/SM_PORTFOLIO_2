import { Section } from "@/components/ui/Section";
import { Heading, Lead } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
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
          Each role was a different class of system — from real-time product
          systems to enterprise SaaS, healthcare infrastructure, utility-scale
          modernization, and AI-assisted operational platforms. Each shaped how
          the next was built.
        </Lead>
      </Reveal>

      <EvolutionTimeline />

      <Reveal mode="rise" className="mt-14">
        <Button href="/experience" variant="secondary">
          Explore the full journey
          <span aria-hidden>→</span>
        </Button>
      </Reveal>
    </Section>
  );
}
