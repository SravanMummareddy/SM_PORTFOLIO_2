# Technical Architecture

## Purpose

Define the engineering standards for building this portfolio.

The portfolio itself should demonstrate the same engineering quality it claims:

- maintainable architecture
- performance awareness
- clean abstractions
- thoughtful tradeoffs

Do not build a fragile animation demo.

Build a premium software product.

---

# Core Stack

Framework:

Next.js App Router

Purpose:

- routing
- server components
- performance optimization
- SEO
- production deployment

Language:

TypeScript

Rules:

- strict typing
- avoid any
- typed component APIs
- clear interfaces

---

# Styling

Tailwind CSS

Use for:

- design system
- responsive layouts
- tokens
- spacing consistency

Avoid:

- random one-off styles
- inconsistent values

---

# Component Philosophy

Components should be:

- reusable
- composable
- isolated
- understandable

Structure:

components/

examples:

ui/

- Button
- Card
- Typography

layout/

- Header
- Navigation
- Section

motion/

- Reveal
- ScrollScene
- Transitions

three/

- SystemGraph
- ArchitectureScene

projects/

- CaseStudy
- ArchitectureDiagram

---

# Animation Stack

## Framer Motion

Use for:

- component animations
- transitions
- hover interactions
- micro animations

Examples:

- cards
- buttons
- reveal effects
- page transitions

---

## GSAP

Use for:

- complex animation timelines
- scroll storytelling
- pinned cinematic sections

Examples:

- hero sequence
- project storytelling
- architecture assembly

---

## Lenis

Use for:

- smooth scrolling

Must integrate carefully with:

- GSAP ScrollTrigger

---

# 3D Stack

## Three.js / React Three Fiber

Purpose:

Represent:

- systems
- architecture
- data flows
- networks

Do not create meaningless 3D scenes.

---

## Drei

Status: REMOVED.

`@react-three/drei` was dropped to trim the bundle — the system graph uses plain
React Three Fiber + Three.js directly. Note: `three` therefore needs its own
`@types/three` devDependency (drei used to provide it transitively).

---

# 3D Performance Rules

Always:

- lazy load WebGL scenes
- dynamically import heavy components
- optimize geometry
- pause offscreen rendering
- respect reduced motion

Never:

- block initial page load
- load all 3D immediately

---

# Content System

Status: BUILT.

MDX-based writing system is implemented.

- Blog posts / notes: one `.mdx` file each in `content/writing/` (frontmatter +
  markdown). `content/writing.ts` reads the folder at build time; the single
  dynamic route `app/writing/[slug]/page.tsx` renders them.
- Case studies: deliberately remain hand-built React pages (bespoke SVG diagrams).
- All other content lives in source-of-truth modules under `content/`
  (`projects.ts`, `experience.ts`, `systems.ts`, `contact.ts`).

Content lives separately from UI. See `MAINTAINING.md` for how to edit each.

---

# Recommended Structure

app/

(project routes)

components/

reusable UI

content/

blogs + case studies

lib/

utilities

hooks/

custom hooks

brain/

project intelligence docs

---

# SEO

Portfolio should include:

- metadata
- OpenGraph images
- structured descriptions

Search identity:

Sravan Mummareddy

Software Engineer

Backend Systems

AI Workflows

Architecture

---

# Accessibility

Required:

- semantic HTML
- keyboard support
- reduced motion support
- proper contrast

Premium design cannot ignore accessibility.

---

# Performance Targets

Aim:

Lighthouse:

Performance:
90+

Accessibility:
95+

SEO:
95+

---

# Image Strategy

Use:

- optimized images
- Next Image
- compressed assets

Avoid:

large unoptimized screenshots.

---

# Code Quality Rules

Before accepting implementation:

Ask:

Would this code survive:

- senior engineer review?
- production maintenance?
- scaling?

If not:

refactor.

---

# Agent Rules

AI coding agents should:

1. Understand requirements first
2. Read brain docs
3. Create plans before coding
4. Implement incrementally
5. Avoid unnecessary complexity
6. Explain tradeoffs

---

# Final Engineering Goal

The portfolio codebase should itself prove:

"This engineer builds thoughtful systems."
