type ClassValue = string | number | null | false | undefined;

/**
 * Minimal class-name joiner. Filters falsy values and joins with spaces.
 * Zero-dependency by design — component variants are authored to avoid
 * Tailwind class conflicts, so no merge resolution is needed.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
