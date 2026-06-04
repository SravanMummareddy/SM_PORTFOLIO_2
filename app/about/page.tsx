import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import {
  Display,
  Lead,
  Heading,
  Text,
  MonoLabel,
  Eyebrow,
} from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { DefinitionList, type DefinitionItem } from "@/components/case-study";
import { CONTACT } from "@/content/contact";

export const metadata: Metadata = {
  title: "About — Sravan Mummareddy",
  description:
    "Sravan Mummareddy is a Systems Product Engineer building scalable backend systems and intelligent operational platforms — with experience across healthcare systems, enterprise SaaS, utility-scale enterprise systems, and AI-assisted workflows.",
};

/** How the work gets approached — traits framed as engineering principles. */
const PRINCIPLES: DefinitionItem[] = [
  {
    term: "Architecture before code",
    body: "The hard part is rarely the syntax — it's the model. I start from entities, states, and contracts, so the implementation has something solid to hang on and the system stays coherent as it grows.",
  },
  {
    term: "Curiosity that goes a layer down",
    body: "I want to know why a system behaves the way it does, not just that it works. That habit is what turns a one-off fix into an understanding that prevents the next ten bugs.",
  },
  {
    term: "Learning speed as a core skill",
    body: "New domain, new stack, new standard — DICOM imaging, utility billing, object-storage migration. The constant isn't the technology; it's getting productive in unfamiliar systems quickly and safely.",
  },
  {
    term: "Execution over intention",
    body: "Designs are worth nothing until they ship and hold up in production. I bias toward working software, reversible steps, and migrations that don't take the business down.",
  },
  {
    term: "Persistence on the unglamorous parts",
    body: "Reliability lives in the edge cases, the retries, the data-quality checks nobody sees. I'm willing to stay with the boring, load-bearing details that make a system trustworthy.",
  },
];

/** Compact experience signal — domains, not a résumé. Full story at /experience. */
const SIGNAL: { domain: string; detail: string }[] = [
  {
    domain: "Healthcare systems",
    detail:
      "Standards-based imaging infrastructure (PACS / DICOM) where correctness was non-negotiable and an edge case meant a patient.",
  },
  {
    domain: "Enterprise SaaS",
    detail:
      "Workforce-management ERP on cloud infrastructure with continuous delivery — how large platforms ship safely every day.",
  },
  {
    domain: "Utility-scale enterprise systems",
    detail:
      "High-volume document platforms modernized off legacy storage without downtime — idempotent, event-driven, verified.",
  },
  {
    domain: "AI-assisted workflows",
    detail:
      "Retrieval and automation layered onto operational systems that already model real work — platforms, not features.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1 — Hero */}
      <Section spacing="large" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-fade opacity-[0.5]"
        />
        <Reveal mode="rise">
          <MonoLabel className="text-accent-strong">
            Systems Product Engineer
          </MonoLabel>
        </Reveal>
        <Reveal mode="resolve" delay={0.05}>
          <Display className="mt-5 max-w-4xl">Sravan Mummareddy</Display>
        </Reveal>
        <Reveal mode="rise" delay={0.15}>
          <Lead className="mt-8 max-w-2xl">
            I build scalable backend systems and intelligent operational
            platforms — the kind that model real work and stay reliable under
            it. Backend depth, product taste, and AI used only where it earns
            its place.
          </Lead>
        </Reveal>
      </Section>

      {/* 2 — Engineering identity */}
      <Section divider>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal mode="rise">
            <Eyebrow marker>Engineering identity</Eyebrow>
            <Heading level={2} className="mt-6 text-h2">
              A backend engineer with a product mind.
            </Heading>
          </Reveal>
          <Reveal mode="rise" delay={0.1} className="max-w-2xl space-y-5">
            <Text>
              I work primarily in Java / Spring Boot on data-intensive backend
              systems, and full-stack in TypeScript / Next.js — with a
              PostgreSQL and AWS focus. I&apos;m an AWS Certified Solutions
              Architect (Associate) and hold an MS in Computer Science from
              Arizona State University.
            </Text>
            <Text>
              The work that interests me sits where backend depth meets real
              operations: APIs and data models that have to be correct, systems
              that can&apos;t go down while you modernize them, and the quiet
              reliability machinery — idempotency, event pipelines, caching,
              data-quality automation — that keeps platforms trustworthy at
              scale.
            </Text>
          </Reveal>
        </div>
      </Section>

      {/* 3 — How I think about systems */}
      <Section divider>
        <Reveal mode="rise" className="max-w-2xl">
          <Eyebrow marker>How I think about systems</Eyebrow>
          <Heading level={2} className="mt-6 text-h2">
            Five things that shape how I build.
          </Heading>
          <Text className="mt-5">
            Less a list of skills than a way of working — the traits that show
            up across every system I&apos;ve touched.
          </Text>
        </Reveal>
        <div className="mt-12">
          <DefinitionList items={PRINCIPLES} />
        </div>
      </Section>

      {/* 4 — Experience signal */}
      <Section divider>
        <Reveal mode="rise" className="max-w-2xl">
          <Eyebrow marker>Experience signal</Eyebrow>
          <Heading level={2} className="mt-6 text-h2">
            Systems across four very different domains.
          </Heading>
          <Text className="mt-5">
            Each domain demanded something different — and each one shaped how
            the next system was built.
          </Text>
        </Reveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {SIGNAL.map((item) => (
            <li key={item.domain}>
              <Reveal mode="rise">
                <Card variant="outline" padding="lg" className="h-full">
                  <MonoLabel className="text-accent-strong">
                    {item.domain}
                  </MonoLabel>
                  <Text className="mt-3 text-sm">{item.detail}</Text>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal mode="rise" className="mt-10">
          <a
            href="/experience"
            className="group inline-flex items-center gap-2 text-sm text-text-tertiary transition-colors hover:text-text-secondary"
          >
            See the full engineering journey
            <span
              aria-hidden
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </Reveal>
      </Section>

      {/* 5 — Current direction */}
      <Section divider>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal mode="rise">
            <Eyebrow marker>Current direction</Eyebrow>
            <Heading level={2} className="mt-6 text-h2">
              Toward AI-assisted operational platforms.
            </Heading>
          </Reveal>
          <Reveal mode="rise" delay={0.1} className="max-w-2xl space-y-5">
            <Text>
              The throughline of my work is operational software — systems that
              model how an organization actually runs. That&apos;s where AI
              earns its place: retrieval, automation, and assistance layered
              onto platforms that already have a real data model underneath,
              rather than intelligence bolted on for its own sake.
            </Text>
            <Text>
              It&apos;s the same instinct as the rest of my engineering —
              build the system properly first, then make it smarter where it
              genuinely helps.
            </Text>
            <div className="pt-2">
              <Button href="/projects" variant="secondary">
                Explore the work
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 6 — Contact / résumé CTA */}
      <Section
        id="contact"
        spacing="large"
        divider
        className="relative overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-fade opacity-40"
        />
        <Reveal mode="rise" className="max-w-3xl">
          <Eyebrow marker className="mb-7 block">
            Let&apos;s build
          </Eyebrow>
          <Display as="h2">Let&apos;s build systems that scale.</Display>
          <Lead className="mt-7 max-w-xl">
            Open to systems engineering roles and ambitious backend, platform,
            and AI-assisted product work.
          </Lead>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={CONTACT.mailto} variant="primary" size="lg">
              Get in touch
            </Button>
            <Button href={CONTACT.resume} variant="secondary" size="lg" external>
              Résumé ↗
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
            >
              GitHub
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
            >
              LinkedIn
            </a>
            <a
              href={CONTACT.mailto}
              className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
            >
              {CONTACT.email}
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
