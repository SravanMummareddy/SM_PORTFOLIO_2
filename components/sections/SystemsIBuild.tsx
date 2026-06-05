import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Heading, Lead, Text, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PillarGlyph } from "@/components/systems/PillarGlyph";
import { PILLARS } from "@/content/systems";

/**
 * Section 3 — the three system domains Sravan builds in. Restrained
 * three-up of system panels (not feature cards): each pairs a small
 * schematic glyph with a domain and its concrete capabilities, and links
 * to its deeper explanation on /systems. Driven by content/systems.ts.
 */
export function SystemsIBuild() {
  return (
    <Section id="systems-i-build" eyebrow="Systems I Build" divider>
      <Reveal mode="rise" className="max-w-2xl">
        <Heading level={2}>
          Three kinds of systems, one way of thinking.
        </Heading>
        <Lead className="mt-6">
          The domain changes; the discipline doesn&apos;t — clear boundaries,
          honest data, and reliability designed in from the start.
        </Lead>
      </Reveal>

      <Stagger className="mt-14 grid gap-4 md:grid-cols-3" gap={0.1}>
        {PILLARS.map((pillar) => (
          <StaggerItem key={pillar.code} mode="settle">
            <Card
              as="a"
              href={`/systems#${pillar.slug}`}
              variant="surface"
              padding="lg"
              interactive
              aria-label={`${pillar.name} — explore system`}
              className="pillar-card flex h-full flex-col"
            >
              <div className="flex items-center justify-between">
                <PillarGlyph kind={pillar.kind} />
                <MonoLabel className="text-text-faint">{pillar.code}</MonoLabel>
              </div>
              <Heading level={3} className="mt-6">
                {pillar.name}
              </Heading>
              <Text className="mt-3 text-sm">{pillar.summary}</Text>
              <ul className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
                {pillar.capabilities.map((cap) => (
                  <li key={cap}>
                    <MonoLabel className="rounded-control border border-border px-2 py-1 text-text-tertiary transition-colors group-hover:border-border-strong">
                      {cap}
                    </MonoLabel>
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors group-hover:text-text-primary">
                Explore system
                <span
                  aria-hidden
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
