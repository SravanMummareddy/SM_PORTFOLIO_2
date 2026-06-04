import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Display, Heading, Lead, Text, MonoLabel } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ExperienceJourney } from "@/components/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "An engineering journey across digital product systems, enterprise SaaS, healthcare imaging infrastructure, utility-scale modernization, and AI-assisted operational platforms.",
};

export default function ExperiencePage() {
  return (
    <>
      <Section spacing="large" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-fade opacity-[0.5]"
        />
        <Reveal mode="rise">
          <MonoLabel className="text-accent-strong">Experience</MonoLabel>
        </Reveal>
        <Reveal mode="resolve" delay={0.05}>
          <Display className="mt-5 max-w-4xl">
            A journey through systems.
          </Display>
        </Reveal>
        <Reveal mode="rise" delay={0.15}>
          <Lead className="mt-8 max-w-2xl">
            Not a résumé — a progression of engineering thinking. Each role was
            a different class of system, and each one shaped how the next was
            built: from real-time product systems to enterprise SaaS, healthcare
            infrastructure, utility-scale modernization, and AI-assisted
            operational platforms.
          </Lead>
        </Reveal>
      </Section>

      <Section divider className="pt-0">
        <ExperienceJourney />
      </Section>

      <Section divider className="text-center">
        <Reveal mode="rise" className="mx-auto max-w-xl">
          <Heading level={2}>The work these systems led to.</Heading>
          <Text className="mx-auto mt-5 max-w-md">
            The engineering above is where the projects come from. Explore the
            systems in detail, or get in touch.
          </Text>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/projects" variant="secondary">
              View projects
            </Button>
            <Button href="/contact" variant="ghost">
              Get in touch
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
