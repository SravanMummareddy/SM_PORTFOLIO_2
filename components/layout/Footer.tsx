import { Container } from "@/components/ui/Container";
import { Eyebrow, Text } from "@/components/ui/Typography";
import { CONTACT } from "@/content/contact";
import { Navigation } from "./Navigation";

const SOCIAL_LINKS = [
  { label: "GitHub", href: CONTACT.github },
  { label: "LinkedIn", href: CONTACT.linkedin },
  { label: "Résumé", href: CONTACT.resume },
  { label: "Email", href: CONTACT.mailto },
] as const;

/**
 * Page footer. Quiet close: identity, navigation, and a system-status
 * line. No link-dump — restraint is the point.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-subtle">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="size-2 rounded-[3px] bg-accent shadow-[0_0_10px_var(--accent-glow)]"
              />
              <span className="text-sm font-medium tracking-tight text-text-primary">
                Sravan Mummareddy
              </span>
            </div>
            <Text tone="tertiary" className="mt-4 text-sm">
              Building scalable backend systems and intelligent operational
              platforms.
            </Text>
          </div>

          <div>
            <Eyebrow className="mb-4 block">Navigate</Eyebrow>
            <Navigation orientation="vertical" className="-ml-3" />
          </div>

          <div>
            <Eyebrow className="mb-4 block">Connect</Eyebrow>
            <ul className="flex flex-col gap-1">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-control px-3 py-2.5 -ml-3 text-base text-text-secondary transition-colors duration-[var(--duration-fast)] hover:text-text-primary hover:bg-surface"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
          <Eyebrow marker>Available for systems work</Eyebrow>
          <Text tone="tertiary" className="text-xs font-mono" as="span">
            © {year} Sravan Mummareddy
          </Text>
        </div>
      </Container>
    </footer>
  );
}
