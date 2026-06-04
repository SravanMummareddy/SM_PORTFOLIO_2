import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Display, Lead, Heading, Text, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { formatArticleDate, type ArticleMeta } from "@/content/writing";

/**
 * Opening of an article: a back link to the index, an editorial
 * metadata row (category · date · reading time), the title, and a lead.
 * Mirrors the case-study hero's voice over the same faint grid.
 */
export function ArticleHero({
  meta,
  lead,
}: {
  meta: ArticleMeta;
  lead: string;
}) {
  return (
    <Section spacing="large" width="narrow" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-fade opacity-[0.5]"
      />
      <Reveal mode="rise">
        <a
          href="/writing"
          className="group inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-text-tertiary transition-colors hover:text-text-secondary"
        >
          <span
            aria-hidden
            className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:-translate-x-1"
          >
            ←
          </span>
          All writing
        </a>
      </Reveal>

      <Reveal mode="rise" delay={0.05} className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
        <MonoLabel className="text-accent-strong">{meta.category}</MonoLabel>
        <span aria-hidden className="text-text-faint">·</span>
        <MonoLabel className="text-text-faint">{formatArticleDate(meta.date)}</MonoLabel>
        <span aria-hidden className="text-text-faint">·</span>
        <MonoLabel className="text-text-faint">{meta.readingTime}</MonoLabel>
      </Reveal>

      <Reveal mode="resolve" delay={0.1}>
        <Display className="mt-6 text-h1">{meta.title}</Display>
      </Reveal>

      <Reveal mode="rise" delay={0.2}>
        <Lead className="mt-8">{lead}</Lead>
      </Reveal>
    </Section>
  );
}

/**
 * Long-form reading column. Wraps an article body at a comfortable
 * measure with consistent vertical rhythm between blocks.
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <Section spacing="default" width={false} className="pt-0">
      <Container width="narrow">
        <Reveal mode="rise" className="space-y-6">
          {children}
        </Reveal>
      </Container>
    </Section>
  );
}

/** Section heading within an article body. */
export function ProseHeading({ children }: { children: ReactNode }) {
  return (
    <Heading level={3} className="text-h3 pt-6">
      {children}
    </Heading>
  );
}

/** Body paragraph at the article's reading tone. */
export function ProseText({ children }: { children: ReactNode }) {
  return <Text className="md:text-[1.0625rem] md:leading-8">{children}</Text>;
}

/** Bulleted list with accent ticks, for enumerations within an article. */
export function ProseList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]"
          />
          <Text className="md:text-[1.0625rem] md:leading-8">{item}</Text>
        </li>
      ))}
    </ul>
  );
}

/**
 * A lightweight pull-aside: an accent-bordered note for a key takeaway
 * or caveat. Deliberately plain — no diagrams, just emphasis.
 */
export function Callout({
  label = "Takeaway",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside className="rounded-card border border-border border-l-2 border-l-accent bg-surface-raised/40 px-6 py-5">
      <MonoLabel className="text-accent-strong uppercase tracking-[0.12em] text-[0.7rem]">
        {label}
      </MonoLabel>
      <Text className="mt-3 text-text-secondary">{children}</Text>
    </aside>
  );
}
