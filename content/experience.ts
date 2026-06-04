import type { ExperienceGlyphVariant } from "@/components/experience/ExperienceGlyph";

/**
 * Single source of truth for the professional experience journey.
 * Consumed by the homepage Experience Evolution anchors (via `short`)
 * and the full /experience page. Framed as systems and engineering
 * thinking — not a résumé. Enterprise work is kept abstract and safe.
 */
export interface ExperienceEntry {
  index: string;
  company: string;
  /** System domain — the kind of systems this role was about. */
  domain: string;
  /** One-line summary used by the concise homepage timeline. */
  short: string;
  /** The problem space the work lived in. */
  problem: string;
  /** Concrete systems built or worked on. */
  systems: string[];
  /** Engineering concepts the work exercised. */
  concepts: string[];
  /** Technologies used. */
  tech: string[];
  /** What the role taught — the evolution of engineering thinking. */
  lesson: string;
  glyph: ExperienceGlyphVariant;
  /** Optional outbound link (e.g. a related case study). */
  link?: { label: string; href: string };
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    index: "01",
    company: "Hindustan Times",
    domain: "Digital product systems",
    short:
      "Real-time public-health data and reusable product systems at newsroom scale.",
    problem:
      "During COVID-19, public-health data had to reach millions of readers quickly and accurately, under traffic that spiked without warning. The work was turning fast-moving data into something a large audience could trust at a glance.",
    systems: [
      "Real-time COVID-19 tracker",
      "Reusable charting & visualization components",
      "Content recommendation surfaces",
    ],
    concepts: [
      "Real-time data delivery",
      "Reusable UI primitives",
      "High-traffic frontends",
      "Data visualization",
    ],
    tech: ["Java", "React", "MongoDB"],
    lesson:
      "Data people depend on has to be both fast and correct — and reusable visualization primitives compound across an entire product instead of being rebuilt per page.",
    glyph: "product",
  },
  {
    index: "02",
    company: "Infor",
    domain: "Enterprise SaaS · Workforce management",
    short:
      "Enterprise workforce SaaS on cloud infrastructure with continuous delivery.",
    problem:
      "Large organizations run workforce operations — scheduling, time, and labor — as mission-critical SaaS. The platform had to stay reliable across cloud infrastructure while shipping changes continuously.",
    systems: [
      "Workforce Management (WFM) ERP modules",
      "Mobile companion application",
      "CI/CD delivery pipeline",
    ],
    concepts: [
      "Cloud architecture",
      "Serverless functions",
      "NoSQL data modeling",
      "CI/CD automation",
      "Multi-tenant SaaS",
    ],
    tech: ["Java", "AWS EC2", "AWS Lambda", "DynamoDB", "Jenkins"],
    lesson:
      "How enterprise SaaS actually ships: cloud services, serverless, and automated pipelines turn a large platform into something you can evolve safely every single day.",
    glyph: "saas",
  },
  {
    index: "03",
    company: "Lumin Inc",
    domain: "Healthcare imaging infrastructure",
    short:
      "Healthcare imaging infrastructure where correctness was non-negotiable.",
    problem:
      "Medical imaging runs on decades-old standards and PACS systems where correctness is non-negotiable. Images and their metadata have to move between systems without loss or ambiguity.",
    systems: [
      "PACS / DICOM integrations",
      "Imaging REST APIs",
      "Image retrieval & processing services",
    ],
    concepts: [
      "Standards-based integration (DICOM)",
      "System interoperability",
      "SQL query optimization",
      "Test-driven reliability",
      "API design",
    ],
    tech: ["Spring Boot", "dcm4che", "PixelMed", "REST", "SQL", "JUnit", "Mockito"],
    lesson:
      "In healthcare, an edge case isn't a backlog ticket — it's a patient. Standards, rigorous tests, and careful data handling aren't overhead; they are the architecture.",
    glyph: "imaging",
  },
  {
    index: "04",
    company: "MLGW",
    domain: "Utility-scale enterprise systems",
    short:
      "Modernizing high-volume enterprise document systems without downtime.",
    problem:
      "A large utility's document and records systems had outgrown legacy storage and manual data handling. The work was modernizing high-volume document workflows without disrupting day-to-day operations.",
    systems: [
      "Enterprise document platform",
      "Legacy storage → object-storage migration",
      "Batch processing & data-quality automation",
      "Cross-system integrations",
    ],
    concepts: [
      "Legacy modernization",
      "Object-storage migration",
      "Batch processing",
      "Data-quality automation",
      "Enterprise integration",
      "REST API design",
    ],
    tech: ["Java", "Spring Boot", "Oracle", "Object storage", "REST", "Python", "Pandas", "NumPy"],
    lesson:
      "Modernizing systems that can't go down means the business never feels the seam: abstract the legacy, integrate the new behind stable contracts, and verify the data every step.",
    glyph: "utility",
  },
  {
    index: "05",
    company: "Current direction",
    domain: "AI-assisted operational platforms",
    short:
      "AI-assisted operational platforms — systems that model real work.",
    problem:
      "Operational software is where AI earns its place: retrieval, automation, and assistance layered onto systems that already model real work — not intelligence bolted on for its own sake.",
    systems: [
      "LuminTrack — workflow intelligence platform",
      "RAG document retrieval",
      "Event-sourced operational systems",
    ],
    concepts: [
      "State machines",
      "Event sourcing",
      "RAG / retrieval",
      "Operational analytics",
      "Agentic workflows",
    ],
    tech: ["Next.js", "PostgreSQL", "pgvector", "WebSockets", "TypeScript"],
    lesson:
      "The throughline: backend depth, operational modeling, and AI used only where it improves the system — building platforms, not features.",
    glyph: "ai",
    link: { label: "Read the LuminTrack case study", href: "/projects/lumintrack" },
  },
];
