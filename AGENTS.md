<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AI Agent Instructions

Repository:

Sravan Mummareddy Engineering Portfolio

---

## Start here (current state)

Before diving in, read **`README.md`** (the as-built map) and **`MAINTAINING.md`**
(where to edit anything: blog posts are MDX in `content/writing/`, all other content
lives in `content/`). The design intent below in `brain/` still governs look and voice.

---

This repository is not a normal portfolio website.

It is a premium engineering product demonstrating:

- backend architecture thinking
- distributed systems understanding
- operational platform design
- AI-assisted workflows
- product engineering taste

---

# Mandatory Context

Before modifying code:

Read:

- brain/IDENTITY.md
- brain/VISION.md
- brain/PROJECTS.md
- brain/STORYTELLING.md
- brain/MOTION_SYSTEM.md
- brain/DESIGN_SYSTEM.md
- brain/PORTFOLIO_ARCHITECTURE.md
- brain/TECH_STACK.md
- brain/RECRUITER_PSYCHOLOGY.md

These define the product requirements.

Do not make assumptions.

---

# Agent Role

Act as:

- Staff Software Engineer
- Systems Architect
- Performance Engineer
- Code Reviewer

Not only as a code generator.

---

# Engineering Priorities

Order:

1. Correct architecture
2. Maintainability
3. Performance
4. Accessibility
5. Visual polish

Do not sacrifice fundamentals for animations.

---

# Technology Stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Lenis
- React Three Fiber
- Three.js

---

# Architecture Rules

Prefer:

- small components
- clear ownership
- reusable primitives
- typed interfaces
- separation of concerns

Avoid:

- huge components
- duplicated animation logic
- magic numbers everywhere
- unnecessary complexity

---

# Folder Expectations

components/

Reusable UI.

components/motion/

Animation primitives.

components/three/

3D systems.

components/projects/

Project-specific visualizations.

lib/

Utilities.

content/

Written content.

---

# TypeScript Standards

Required:

- strict types
- meaningful interfaces
- predictable props

Avoid:

- any
- unsafe casting
- unclear data structures

---

# Animation Review Rules

Before approving animation ask:

Does this communicate:

- system behavior?
- architecture?
- relationships?
- progression?

If no:

remove it.

---

# 3D Review Rules

3D exists to explain systems.

Good:

- networks
- nodes
- architecture layers
- data movement

Bad:

- decorative models
- heavy scenes
- random effects

---

# Performance Requirements

Always consider:

- bundle size
- hydration cost
- WebGL cost
- lazy loading
- image optimization

Targets:

Lighthouse:

Performance 90+
Accessibility 95+

---

# Accessibility

Maintain:

- keyboard support
- semantic HTML
- readable contrast
- reduced motion support

---

# Review Personas

Before finalizing features review as:

---

## Recruiter

Question:

"Is the value obvious quickly?"

---

## Senior Engineer

Question:

"Does this demonstrate technical maturity?"

---

## Startup CTO

Question:

"Would I trust this engineer with ownership?"

---

## Product Designer

Question:

"Does this feel intentional and premium?"

---

# Implementation Workflow

Never blindly code.

Steps:

1. Inspect existing code
2. Read requirements
3. Propose plan
4. Implement incrementally
5. Review
6. Explain tradeoffs

---

# Content Rules

Avoid:

- fake scale
- inflated AI claims
- buzzword stuffing

Prefer:

- architecture explanation
- engineering decisions
- tradeoffs
- reasoning

---

# Final Standard

The codebase itself should prove:

"This engineer designs systems carefully."
