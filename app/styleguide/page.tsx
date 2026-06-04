import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Display,
  Heading,
  Lead,
  Text,
  Eyebrow,
  MonoLabel,
} from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { Fade } from "@/components/motion/Fade";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Design System",
  description: "Foundational design system reference.",
};

export default function StyleguidePage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <Section spacing="compact" width="default">
        <Reveal trigger="mount">
          <Eyebrow marker className="mb-6 block">
            Design Foundation · Reference
          </Eyebrow>
          <Display>The system behind the system.</Display>
          <Lead className="mt-6 max-w-2xl">
            Tokens, primitives, and motion that every page is composed from.
            Dark-first, quiet, architectural.
          </Lead>
        </Reveal>
      </Section>

      {/* Typography */}
      <Section eyebrow="Typography" divider width="default">
        <div className="grid gap-10">
          <div>
            <MonoLabel className="text-text-faint">display</MonoLabel>
            <Display className="mt-2">Systems, not applications.</Display>
          </div>
          <div>
            <MonoLabel className="text-text-faint">heading / 1–3</MonoLabel>
            <Heading level={1} className="mt-2">
              Architecture heading one
            </Heading>
            <Heading level={2} className="mt-3">
              Architecture heading two
            </Heading>
            <Heading level={3} className="mt-3">
              Architecture heading three
            </Heading>
          </div>
          <div className="max-w-2xl">
            <MonoLabel className="text-text-faint">lead</MonoLabel>
            <Lead className="mt-2">
              A larger introductory paragraph that sets context beneath a
              heading without competing with it.
            </Lead>
          </div>
          <div className="max-w-2xl space-y-3">
            <MonoLabel className="text-text-faint">text / tones</MonoLabel>
            <Text tone="primary">
              Primary body — used where copy carries weight.
            </Text>
            <Text tone="secondary">
              Secondary body — the default reading tone, calm and restrained.
            </Text>
            <Text tone="tertiary">
              Tertiary body — metadata and supporting fine print.
            </Text>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span>
              <MonoLabel className="text-text-faint">eyebrow</MonoLabel>
              <Eyebrow marker className="ml-4">
                Operational Intelligence
              </Eyebrow>
            </span>
            <span>
              <MonoLabel className="text-text-faint">mono</MonoLabel>
              <MonoLabel className="ml-4 text-accent-strong">
                PostgreSQL · 99.95% · p99 42ms
              </MonoLabel>
            </span>
          </div>
        </div>
      </Section>

      {/* Color & surfaces */}
      <Section eyebrow="Surfaces & Color" divider width="default">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { name: "bg", className: "bg-bg" },
            { name: "bg-subtle", className: "bg-bg-subtle" },
            { name: "surface", className: "bg-surface" },
            { name: "surface-raised", className: "bg-surface-raised" },
            { name: "surface-overlay", className: "bg-surface-overlay" },
            { name: "accent", className: "bg-accent" },
          ].map((s) => (
            <div key={s.name}>
              <div
                className={`h-20 rounded-card border border-border ${s.className}`}
              />
              <MonoLabel className="mt-2 block text-text-tertiary">
                {s.name}
              </MonoLabel>
            </div>
          ))}
        </div>
      </Section>

      {/* Buttons */}
      <Section eyebrow="Buttons" divider width="default">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" variant="secondary">
              Small
            </Button>
            <Button size="md" variant="secondary">
              Medium
            </Button>
            <Button size="lg" variant="secondary">
              Large
            </Button>
          </div>
        </div>
      </Section>

      {/* Cards */}
      <Section eyebrow="Cards" divider width="default">
        <Stagger className="grid gap-4 md:grid-cols-3">
          {(["surface", "glass", "outline"] as const).map((variant) => (
            <StaggerItem key={variant} mode="settle">
              <Card variant={variant} interactive padding="lg">
                <Eyebrow className="mb-4 block">{variant}</Eyebrow>
                <Heading level={3}>System node</Heading>
                <Text className="mt-2 text-sm">
                  Layered surface with a hairline border. Hover to inspect — the
                  panel lifts and its edge warms to accent.
                </Text>
                <div className="mt-5 flex gap-2">
                  <MonoLabel className="rounded-control border border-border px-2 py-1 text-text-tertiary">
                    api
                  </MonoLabel>
                  <MonoLabel className="rounded-control border border-border px-2 py-1 text-text-tertiary">
                    events
                  </MonoLabel>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Motion */}
      <Section eyebrow="Motion" divider width="default">
        <Text className="mb-8 max-w-2xl">
          Scroll the primitives below into view. Each honors{" "}
          <MonoLabel className="text-text-secondary">
            prefers-reduced-motion
          </MonoLabel>
          .
        </Text>
        <div className="grid gap-4 md:grid-cols-3">
          <Reveal mode="rise">
            <Card padding="lg">
              <Eyebrow className="mb-3 block">Reveal · rise</Eyebrow>
              <Text className="text-sm">Fade and rise on enter.</Text>
            </Card>
          </Reveal>
          <Fade>
            <Card padding="lg">
              <Eyebrow className="mb-3 block">Fade</Eyebrow>
              <Text className="text-sm">Opacity only — no movement.</Text>
            </Card>
          </Fade>
          <Reveal mode="settle">
            <Card padding="lg">
              <Eyebrow className="mb-3 block">Reveal · settle</Eyebrow>
              <Text className="text-sm">Scale settle into place.</Text>
            </Card>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
