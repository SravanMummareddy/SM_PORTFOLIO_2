# Sravan Mummareddy — Engineering Portfolio

A premium engineering portfolio for **Sravan Mummareddy, Systems Product Engineer** —
backend architecture, operational platforms, and AI-assisted systems. It is built as a
product, not a template: source-of-truth content modules, reusable primitives, purposeful
motion, and bespoke system diagrams.

> **Coming back after a break? Read [`MAINTAINING.md`](./MAINTAINING.md).** It's the
> practical "I want to change X → edit this file" guide (add a blog post, add a project,
> update contact info, etc.). This README is the high-level map.

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens in `app/globals.css`) |
| Motion | Framer Motion, GSAP + ScrollTrigger, Lenis (smooth scroll) |
| 3D | React Three Fiber + Three.js (the homepage system graph) |
| Writing | **MDX** posts (`next-mdx-remote` + `gray-matter`) |
| Share cards | `next/og` (`ImageResponse`) — generated at build |
| Hosting | Vercel (static / SSG) |

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerender static)
npm run lint     # eslint
```

Node 20+ recommended.

## Project structure

```
app/                     # routes (App Router)
  page.tsx               # homepage (composed from components/sections/*)
  layout.tsx             # root layout + site metadata
  globals.css            # design tokens (@theme) + Tailwind + custom utilities
  sitemap.ts, robots.ts  # SEO, derived from content modules
  opengraph-image.tsx    # site-wide share card
  _og/                   # Geist TTFs used by the OG renderer
  about/  experience/  systems/  styleguide/
  projects/              # index + 5 case studies (each w/ its own opengraph-image)
  writing/               # index + [slug] (renders MDX) + [slug]/opengraph-image

content/                 # ★ SOURCE OF TRUTH — edit content here, not in pages
  projects.ts            # project list + metadata
  experience.ts          # work history timeline
  systems.ts             # the 3 engineering "pillars"
  contact.ts             # email, GitHub, LinkedIn, résumé
  writing.ts             # MDX loader (builds the article list from files)
  writing/*.mdx          # ★ blog posts — one file per post

components/
  ui/                    # primitives: Typography, Button, Card, Section, Container
  layout/                # Header, Footer, Navigation (active-tab + homepage scroll-spy)
  sections/              # homepage sections (Hero, FeaturedWork, …)
  motion/                # Reveal, Stagger, ScrollReveal, SmoothScroll (Lenis), …
  three/                 # SystemGraph (lazy WebGL) + SVG fallback
  case-study/            # case-study primitives + the SVG diagram-kit
  projects/<slug>/       # bespoke diagrams per case study
  experience/  systems/  writing/   # feature-specific components

lib/                     # site.ts (SITE_URL), og.tsx (share renderer), motion/gsap helpers, utils
public/                  # résumé PDF + static assets
brain/                   # design source-of-truth (philosophy, identity, motion, recruiter psych)
```

## How content flows (the important idea)

Everything you'd want to change lives in **`content/`**. The listings, navigation, sitemap,
and share images all derive from those modules, so editing one entry propagates everywhere:

- **Projects** → `content/projects.ts` drives the homepage previews, `/projects` index, the
  `/systems` "related work", and the case-study pages.
- **Writing** → drop a `content/writing/<slug>.mdx` file; `content/writing.ts` reads the
  folder at build time and the index/homepage/prev-next/sitemap/OG update themselves.
- **Experience / Systems / Contact** → `experience.ts` / `systems.ts` / `contact.ts`.

Full step-by-step instructions for each: **[`MAINTAINING.md`](./MAINTAINING.md)**.

## Routes

`/` · `/projects` (+ 5 case studies) · `/systems` · `/experience` · `/writing` (+ MDX posts)
· `/about` · `/styleguide` (internal, `noindex`).

## Design docs

The `brain/` folder is the **design source of truth** — identity, vision, design system,
motion system, storytelling, recruiter psychology. Read these before changing the look or
voice. `AGENTS.md` / `CLAUDE.md` are instructions for AI coding agents working in this repo.

## Deployment

Hosted on Vercel; pushing to the connected branch triggers a rebuild. The canonical origin
(`lib/site.ts`) **auto-detects the Vercel production URL** via `VERCEL_PROJECT_PRODUCTION_URL`,
so no config is needed for the `*.vercel.app` URL. **When you add a custom domain,** set
**`NEXT_PUBLIC_SITE_URL`** to it in Vercel's env vars to override.

## Dependency audit note

`npm audit` reports **2 moderate** advisories for `postcss < 8.5.10`. This is a transitive
dependency **bundled inside Next.js itself** (`next → postcss@8.4.31`); our own
`@tailwindcss/postcss` already uses a patched 8.5.x. The only offered "fix"
(`npm audit fix --force`) downgrades Next to v9 — do **not** run it. The advisory is a
build-time CSS-stringifier XSS that requires processing untrusted CSS, which never happens in
this static build, so real-world risk is negligible. It clears itself when Next bumps its
bundled postcss. **Action: none.**
