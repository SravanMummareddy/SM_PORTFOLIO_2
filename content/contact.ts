/**
 * Single source of truth for contact + résumé pathways. Consumed by the
 * homepage closing CTA, the footer, the experience page, and the about
 * page so the email, social links, and résumé location never drift.
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
} as const;
