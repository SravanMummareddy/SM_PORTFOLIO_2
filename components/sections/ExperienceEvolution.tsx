import { Section } from "@/components/ui/Section";
import { Heading, Lead, Text, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

interface Stage {
  index: string;
  name: string;
  detail: string;
}

// Evolution of the systems worked on — what was learned, not where.
const STAGES: Stage[] = [
  {
    index: "01",
    name: "Healthcare Systems",
    detail:
      "Imaging and clinical systems where correctness and reliability were non-negotiable.",
  },
  {
    index: "02",
    name: "Enterprise Infrastructure",
    detail:
      "High-volume document and billing platforms — modernization without breaking production.",
  },
  {
    index: "03",
    name: "Operational Platforms",
    detail:
      "ERP and workflow systems that turn real-world operations into structured software.",
  },
  {
    index: "04",
    name: "AI-Assisted Systems",
    detail:
      "Retrieval, agents, and intelligent workflows layered onto operational platforms.",
  },
];

/**
 * Section 5 — experience as an evolution of systems, not a resume.
 * Four domains read left→right as a progression: each is a step deeper
 * into operational and AI-assisted architecture. Stages assemble in
 * sequence on scroll.
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

      <Stagger className="mt-16 grid gap-x-6 gap-y-10 md:grid-cols-4" gap={0.12}>
        {STAGES.map((stage, i) => (
          <StaggerItem key={stage.index}>
            <div className="relative border-t border-border pt-7">
              <span
                aria-hidden
                className="absolute -top-[6px] left-0 size-[11px] rounded-full border border-border-strong bg-surface"
              >
                <span className="absolute inset-[3px] rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
              </span>
              <div className="flex items-center gap-3">
                <MonoLabel className="text-text-faint">{stage.index}</MonoLabel>
                {i < STAGES.length - 1 ? (
                  <span
                    aria-hidden
                    className="hidden text-text-faint md:inline"
                  >
                    →
                  </span>
                ) : null}
              </div>
              <Heading level={3} className="mt-3 text-h3">
                {stage.name}
              </Heading>
              <Text className="mt-3 text-sm">{stage.detail}</Text>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
