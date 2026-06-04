import { Section } from "@/components/ui/Section";
import { Display, Lead, Eyebrow } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CONTACT } from "@/content/contact";

/**
 * Section 7 — the closing statement. Minimal and confident: one line of
 * intent and a single direct way to start a conversation. The global
 * footer handles navigation and details below this.
 */
export function ContactClosing() {
  return (
    <Section id="contact" spacing="large" divider className="relative overflow-hidden">
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
          Open to systems engineering roles and ambitious backend, platform, and
          AI-assisted product work.
        </Lead>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href={CONTACT.mailto} variant="primary" size="lg">
            Get in touch
          </Button>
          <Button href="/projects" variant="secondary" size="lg">
            View the work
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
