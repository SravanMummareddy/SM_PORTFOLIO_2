import { Section } from "@/components/ui/Section";
import { Display, Lead, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

interface MetaItem {
  label: string;
  value: string;
}

interface CaseStudyHeroProps {
  name: string;
  kind: string;
  status: string;
  positioning: string;
  focus: string[];
  /** Compact engineering metadata row (role, domain, stack, …). */
  meta?: MetaItem[];
}

function StatusTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-control border border-border px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-tertiary">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

/**
 * Opening of a case-study page. Establishes the system's name,
 * positioning, status, and technical focus over a faint engineering
 * grid — the deep-page counterpart to the homepage hero.
 */
export function CaseStudyHero({
  name,
  kind,
  status,
  positioning,
  focus,
  meta,
}: CaseStudyHeroProps) {
  return (
    <Section spacing="large" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-fade opacity-[0.5]"
      />
      <Reveal mode="rise">
        <a
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-text-tertiary transition-colors hover:text-text-secondary"
        >
          <span
            aria-hidden
            className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:-translate-x-1"
          >
            ←
          </span>
          All projects
        </a>
      </Reveal>

      <Reveal mode="rise" delay={0.05} className="mt-10 flex flex-wrap items-center gap-3">
        <StatusTag>{status}</StatusTag>
        <MonoLabel className="text-accent-strong">{kind}</MonoLabel>
      </Reveal>

      <Reveal mode="resolve" delay={0.1}>
        <Display className="mt-6 max-w-4xl">{name}</Display>
      </Reveal>

      <Reveal mode="rise" delay={0.2}>
        <Lead className="mt-8 max-w-2xl">{positioning}</Lead>
      </Reveal>

      <Reveal mode="rise" delay={0.3}>
        <ul className="mt-10 flex flex-wrap gap-2">
          {focus.map((item) => (
            <li key={item}>
              <MonoLabel className="rounded-control border border-border px-2.5 py-1 text-text-tertiary">
                {item}
              </MonoLabel>
            </li>
          ))}
        </ul>
      </Reveal>

      {meta && meta.length > 0 ? (
        <Reveal mode="rise" delay={0.35}>
          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-faint">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm text-text-secondary">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ) : null}
    </Section>
  );
}
