import { Section } from "@/components/ui/Section";
import { Heading, Text, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { ARTICLES } from "@/content/writing";

/**
 * Section 6 — engineering writing preview. A quiet, editorial list of
 * published notes that signals how Sravan thinks about systems. Driven
 * by the shared writing source so titles and slugs match /writing.
 */
export function WritingPreview() {
  return (
    <Section id="writing" eyebrow="Engineering Writing" divider>
      <Reveal mode="rise" className="max-w-2xl">
        <Heading level={2}>Notes on building systems.</Heading>
      </Reveal>

      <ul className="mt-12 border-t border-border">
        {ARTICLES.map((note) => (
          <li key={note.slug}>
            <Reveal mode="rise">
              <a
                href={`/writing/${note.slug}`}
                className="group grid gap-3 border-b border-border py-8 md:grid-cols-[10rem_1fr] md:gap-10"
              >
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                  <MonoLabel className="text-accent-strong">
                    {note.category}
                  </MonoLabel>
                  <MonoLabel className="text-text-faint">
                    {note.readingTime}
                  </MonoLabel>
                </div>
                <div>
                  <Heading
                    level={3}
                    className="text-h3 transition-colors duration-[var(--duration-base)] group-hover:text-white"
                  >
                    {note.title}
                  </Heading>
                  <Text className="mt-2 max-w-xl text-sm">{note.teaser}</Text>
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
  );
}
