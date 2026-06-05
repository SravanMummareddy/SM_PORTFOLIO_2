# Maintaining & Editing This Portfolio

A practical guide to changing anything on the site. **Golden rule: content lives in
`content/`, design tokens live in `app/globals.css`, and you rarely need to touch page files.**
Edit the source-of-truth module → the homepage, index pages, navigation, sitemap, and share
images all update themselves.

To publish any change: save → commit → push. Vercel rebuilds and deploys automatically.

---

## "I want to…" quick reference

| I want to… | Edit this |
|---|---|
| Write a new blog post | Add `content/writing/<slug>.mdx` |
| Edit an existing post | The matching `content/writing/<slug>.mdx` |
| Add a project to the list | `content/projects.ts` |
| Add a full project case study | `content/projects.ts` **+** a new `app/projects/<slug>/page.tsx` |
| Update work history / timeline | `content/experience.ts` |
| Edit the 3 "Systems" pillars + homepage cards | `content/systems.ts` |
| Change email / GitHub / LinkedIn / résumé | `content/contact.ts` |
| Replace the résumé PDF | Overwrite `public/Sravan-Mummareddy-Resume.pdf` (same name) |
| Change the hero headline / name / role | `components/sections/Hero.tsx` |
| Edit nav links | `components/layout/Navigation.tsx` (`NAV_LINKS`) |
| Change colors / fonts / spacing tokens | `app/globals.css` (`:root` + `@theme`) |
| Edit the share-card (OpenGraph) look | `lib/og.tsx` |
| Set the production domain | env var `NEXT_PUBLIC_SITE_URL` (see `lib/site.ts`) |
| Change page `<title>` / SEO description | `metadata` in the relevant `app/.../page.tsx` |

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000  (hot reload)
npm run build    # verify a real production build before pushing
npm run lint
```

Always run `npm run lint` and `npm run build` before committing — the site is fully static,
so the build catches almost every mistake.

---

## ✍️ Write a blog post (the easy path)

Create one file: `content/writing/my-post-slug.mdx`. The filename (minus `.mdx`) is the URL:
`/writing/my-post-slug`.

```mdx
---
title: "My New Post"
category: "Engineering"          # short label shown on the index
date: "2026-07-01"               # YYYY-MM-DD (keep the quotes)
teaser: "One line shown on the index and homepage."
lead: "The larger intro sentence shown under the title in the post hero."
relatedProject: "lumintrack"     # optional — adds a 'related system' link (a project slug)
description: "Optional SEO description; falls back to the teaser."
---

## A section heading

A normal paragraph. **Bold**, *italic*, and `inline code` all work.

- a bullet
- another bullet

<Callout label="Takeaway">A highlighted note box.</Callout>
```

That's it. The post automatically appears on `/writing`, the homepage Writing preview, the
previous/next nav, the sitemap, and gets its own share image — **no other file to touch**.

Notes:
- **Reading time** is auto-computed from the body (≈200 wpm); add `readingTime: "5 min read"`
  to the frontmatter only if you want to override it.
- Posts are sorted **newest first** by `date`.
- Available components/markdown: `##` headings, paragraphs, `**bold**`, `*italic*`,
  `` `code` ``, links, `-` bullet lists, and `<Callout label="…">…</Callout>`. The mapping
  from markdown to the site's styling lives in `components/writing/mdx-components.tsx` — add
  to it if you want new elements.
- How it works under the hood: `content/writing.ts` reads the `.mdx` folder at build time and
  `app/writing/[slug]/page.tsx` renders each post. You won't normally edit either.

---

## 🧱 Add a project

There are two levels.

### A. Listing only (quick)
Add an entry to the `PROJECTS` array in **`content/projects.ts`** with `hasCaseStudy: false`.
It will show on `/projects` and the homepage but link to the index (no detail page). One edit,
done.

### B. Full case study (real work)
Case studies are **hand-built pages with bespoke SVG system diagrams** — that craft is the
portfolio's differentiator, so they're intentionally code, not a template.

1. Add the entry to `content/projects.ts` with `hasCaseStudy: true`.
2. Create `app/projects/<slug>/page.tsx`. Copy an existing one
   (`app/projects/lumintrack/page.tsx`) as the template — it uses the case-study primitives
   from `components/case-study/` (`CaseStudyHero`, `CaseStudySection`, `Figure`,
   `DefinitionList`, `CaseStudyNav`).
3. Build the diagrams in `components/projects/<slug>/` using the shared **diagram-kit**
   (`components/case-study/diagram-kit.tsx`: `DiagramFrame`, `Box`, `Wire`, `Caption`). Look
   at `components/projects/lumintrack/*` for examples.
4. The prev/next case-study nav, sitemap, and share image update automatically.

> Diagrams are made mobile-legible automatically by `components/case-study/Figure.tsx`
> (horizontal-scroll at a minimum width on phones) — you don't need to handle that per diagram.

---

## 🧭 Edit the Systems pillars (and homepage "Systems I Build" cards)

`content/systems.ts` is the single source for the three pillars (Backend Platforms /
Operational Intelligence / AI-Assisted Systems). Each pillar references its related work **by
id** — `projects` are slugs in `content/projects.ts`, `experience` are company names in
`content/experience.ts`, `articles` are slugs in `content/writing`. Editing this updates both
the homepage cards and the `/systems` page.

## 💼 Edit experience

`content/experience.ts` — the work-history timeline shown on `/experience` and the homepage
Experience section.

## 📇 Contact, social links, résumé

`content/contact.ts` — `email`, `mailto`, `github`, `linkedin`, `resume`. Changing the email
here updates the header, footer, about page, and every "Get in touch" CTA at once. To refresh
the résumé, replace `public/Sravan-Mummareddy-Resume.pdf` (keep the filename).

> ⚠️ The LinkedIn URL in `contact.ts` should be double-checked against your real profile.

---

## 🏠 Homepage, hero, sections

The homepage is assembled in `app/page.tsx` from components in `components/sections/`:
`Hero` → `SystemsIntro` → `SystemsIBuild` → `FeaturedWork` → `ExperienceEvolution` →
`WritingPreview` → `ContactClosing`. Edit the relevant section component for copy/layout.
The hero name, role, and headline are in `components/sections/Hero.tsx`.

## 🧭 Navigation

`components/layout/Navigation.tsx` — `NAV_LINKS` is the menu. The active tab shows an accent
**underline** (header) / **left-bar** (footer & mobile). On the **homepage**, the underline
follows the section you're scrolling (scroll-spy in `components/layout/useHomeActiveHref.ts`,
which maps homepage section ids → nav links). Header/footer markup: `components/layout/`.

## 🖼️ Share images (OpenGraph) & SEO

- **Look** of every share card: `lib/og.tsx` (`renderOgImage`, hardcoded colors/fonts —
  `ImageResponse` supports only a CSS subset). Fonts are committed in `app/_og/`.
- **Per-route cards:** `app/opengraph-image.tsx` (site-wide), `app/projects/<slug>/opengraph-image.tsx`,
  `app/writing/[slug]/opengraph-image.tsx`.
- **Page titles / descriptions:** the `metadata` export in each `app/.../page.tsx`.
- **Site origin:** set `NEXT_PUBLIC_SITE_URL` in Vercel to the real domain (`lib/site.ts`).

## 🎨 Design tokens (colors, fonts, spacing)

All tokens live in **`app/globals.css`** — `:root` hex values (e.g. `--accent: #5e8bff`,
`--text-primary: #f2f4f6`) mapped into Tailwind via `@theme inline`, plus custom utilities
(`bg-grid`, `mask-radial-fade`, `surface-glass`, `rounded-card`). Change a value here and it
propagates site-wide. Honor the design intent in `brain/DESIGN_SYSTEM.md` and
`brain/MOTION_SYSTEM.md`.

---

## 🚀 Deploy

Push to the connected branch → Vercel builds and deploys. **One-time:** set
`NEXT_PUBLIC_SITE_URL` to the production domain in Vercel's environment variables.

---

## 🩹 Gotchas & troubleshooting

- **`three` needs its own types.** If a build fails with *"Could not find a declaration file
  for module 'three'"*, ensure `@types/three` is in `devDependencies` (it was previously
  provided transitively by `@react-three/drei`, which has been removed).
- **Port 3000 busy** during local dev: `lsof -ti :3000 | xargs kill -9`.
- **npm audit shows 2 moderate (postcss).** Expected and safe to ignore — it's bundled inside
  Next.js; `npm audit fix --force` would downgrade Next to v9. Do not run it. (See README.)
- **Smooth scroll (Lenis)** is set up in `components/motion/SmoothScroll.tsx` and is disabled
  under `prefers-reduced-motion`. All motion respects reduced motion — keep it that way.
- **OG fonts:** `ImageResponse` can't use `next/font`; weights are raw TTFs in `app/_og/`.
- After any change, **`npm run build`** is the fastest way to catch problems (static build).

---

## Where the design intent lives

`brain/` holds the non-negotiable design philosophy — read before changing look or voice:
`IDENTITY`, `VISION`, `DESIGN_SYSTEM`, `MOTION_SYSTEM`, `STORYTELLING`,
`PORTFOLIO_ARCHITECTURE`, `TECH_STACK`, `RECRUITER_PSYCHOLOGY`, `PROJECTS`.
