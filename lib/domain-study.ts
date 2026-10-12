import { marketCircles } from "./market-circles";
import type { GlossaryTerm } from "./schema";

export type DomainQuestion = {
  id: string;
  name: string;
  question: string;
};

export function questionsForDomain(slug: string): DomainQuestion[] {
  return marketCircles
    .filter((circle) => circle.href === `/domains/${slug}`)
    .map((circle) => ({ id: circle.id, name: circle.name, question: circle.question }));
}

export function glossaryForDomain(categoryIds: readonly string[], glossary: readonly GlossaryTerm[]) {
  return glossary.filter((term) => term.categoryId != null && categoryIds.includes(term.categoryId));
}
