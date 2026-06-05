import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ProseHeading, ProseText, Callout } from "./article-kit";

/**
 * Maps the markdown a post author writes onto the site's existing premium
 * typography, so an MDX post looks identical to the hand-built articles.
 * Passed to next-mdx-remote's compileMDX in app/writing/[slug]/page.tsx.
 *
 * Lists are kept "tight" (no blank lines between items) so `li` children
 * stay inline — matching the accent-tick style of the old ProseList.
 */
export const mdxComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <ProseHeading>{children}</ProseHeading>
  ),
  p: ({ children }: { children?: ReactNode }) => <ProseText>{children}</ProseText>,
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="space-y-3">{children}</ul>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="flex gap-3">
      <span
        aria-hidden
        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]"
      />
      <span className="text-text-secondary md:text-[1.0625rem] md:leading-8">
        {children}
      </span>
    </li>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <code className="font-mono text-[0.9em] text-text-secondary">{children}</code>
  ),
  a: ({ href, children }: ComponentPropsWithoutRef<"a">) => (
    <a
      href={href}
      className="text-accent-strong underline underline-offset-2 transition-colors hover:text-accent"
    >
      {children}
    </a>
  ),
  // Available as a tag inside posts: <Callout label="…">…</Callout>
  Callout,
};
