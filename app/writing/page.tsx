import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Display, Lead, Heading, Text, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { ARTICLES, formatArticleDate } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing — Notes on building systems",
  description:
    "Engineering notes on state machines, legacy modernization, and AI-assisted internal workflows — architecture-focused, honest, and practical.",
};

export default function WritingIndex() {
  return (
    <>
      <Section spacing="large" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-fade opacity-[0.5]"
        />
        <Reveal mode="rise">
          <MonoLabel className="text-accent-strong">Engineering Writing</MonoLabel>
        </Reveal>
        <Reveal mode="resolve" delay={0.1}>
          <Display className="mt-6 max-w-3xl">Notes on building systems.</Display>
        </Reveal>
        <Reveal mode="rise" delay={0.2}>
          <Lead className="mt-8 max-w-2xl">
            Short, technical notes on the architecture decisions behind real
            systems — state machines, legacy modernization, and where AI
            actually helps. No hype, no fake scale.
          </Lead>
        </Reveal>
      </Section>

      <Section divider>
        <ul className="border-t border-border">
          {ARTICLES.map((article) => (
            <li key={article.slug}>
              <Reveal mode="rise">
                <a
                  href={`/writing/${article.slug}`}
                  className="group grid gap-3 border-b border-border py-8 md:grid-cols-[12rem_1fr] md:gap-10"
                >
                  <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                    <MonoLabel className="text-accent-strong">
                      {article.category}
                    </MonoLabel>
                    <MonoLabel className="text-text-faint">
                      {formatArticleDate(article.date)}
                    </MonoLabel>
                    <MonoLabel className="text-text-faint">
                      {article.readingTime}
                    </MonoLabel>
                  </div>
                  <div>
                    <Heading
                      level={3}
                      className="text-h3 transition-colors duration-[var(--duration-base)] group-hover:text-white"
                    >
                      {article.title}
                    </Heading>
                    <Text className="mt-2 max-w-xl text-sm">
                      {article.teaser}
                    </Text>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-text-tertiary transition-colors group-hover:text-text-secondary">
                      Read the note
                      <span
                        aria-hidden
                        className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
