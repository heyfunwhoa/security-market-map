import { categories } from "./data/categories";
import { glossary } from "./data/learn";

/**
 * Acronyms that get a hover definition on first use. Definitions come only from existing
 * glossary entries, or from the category record when the glossary has none.
 * SACR has no definition in the data yet, so it is not listed.
 */
const SOURCES: Record<string, { glossaryId?: string; categoryId?: string }> = {
  NHI: { glossaryId: "nhi" },
  ITDR: { glossaryId: "itdr" },
  CIEM: { glossaryId: "ciem" },
  IGA: { categoryId: "iga" },
};

export type TermDefinition = { term: string; title: string; definition: string; href: string };

export function termDefinition(acronym: string): TermDefinition | null {
  const source = SOURCES[acronym];
  if (!source) return null;
  if (source.glossaryId) {
    const entry = glossary.find((item) => item.id === source.glossaryId);
    if (entry) return { term: acronym, title: entry.term, definition: entry.definition, href: `/learn#${entry.id}` };
  }
  if (source.categoryId) {
    const entry = categories.find((item) => item.id === source.categoryId);
    if (entry) return { term: acronym, title: entry.name, definition: entry.definition, href: `/categories/${entry.slug}` };
  }
  return null;
}

export const DEFINED_TERMS = Object.keys(SOURCES);

/**
 * Split text into plain strings and the first occurrence of each defined acronym not yet in
 * `seen`. Pass one Set per page so only the first use on the page is marked.
 */
export function splitTerms(text: string, seen: Set<string>): (string | TermDefinition)[] {
  const pattern = new RegExp(`\\b(${DEFINED_TERMS.join("|")})\\b`, "g");
  const parts: (string | TermDefinition)[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const acronym = match[1];
    if (seen.has(acronym)) continue;
    const definition = termDefinition(acronym);
    if (!definition) continue;
    seen.add(acronym);
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(definition);
    last = match.index + acronym.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
