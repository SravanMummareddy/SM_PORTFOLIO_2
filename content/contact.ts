/**
 * Single source of truth for identity + contact + résumé pathways. Consumed
 * by the homepage closing CTA, the footer, the experience page, and the about
 * page so the email, social links, location/availability, and résumé location
 * never drift.
 */
export const CONTACT = {
  email: "mummareddysravankumar@gmail.com",
  /** Ready-to-use mailto href for "Get in touch" CTAs. */
  mailto: "mailto:mummareddysravankumar@gmail.com",
  github: "https://github.com/SravanMummareddy",
  linkedin: "https://www.linkedin.com/in/smummareddy",
  /**
   * Résumé download. The PDF lives in /public, so this resolves to a
   * static asset. To refresh it, replace the file at
   * public/Sravan-Mummareddy-Resume.pdf with the same name.
   */
  resume: "/Sravan-Mummareddy-Resume.pdf",
  /** Recruiter-facing identity signals, surfaced on the about page + footer. */
  location: "United States",
  /** Availability line shown next to a live status dot. */
  availability: "Open to systems & backend roles",
  /** Drives whether the "available" status dot/eyebrow renders. */
  openToWork: true,
  /** Current position, shown in the about identity card. */
  currentRole: "Software Engineer @ MLGW",
} as const;
