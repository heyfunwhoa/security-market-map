export type AcademyPreview = {
  id: string;
  title: string;
  summary: string;
  href: string;
  categoryIds: string[];
};

// Preview metadata only. Academy owns lesson content and learner progress.
export const academyPreviews: AcademyPreview[] = [
  {
    id: "credential-risk",
    title: "Follow a leaked credential",
    summary: "Practice investigating a fictional credential: who owns it, what it can access, and what remediation requires.",
    href: "https://byjoyaing.com/builder-academy/credential-risk",
    categoryIds: ["secrets-detection", "secrets-management", "nhi", "aspm"],
  },
  {
    id: "identity-journey",
    title: "Trace an identity through its lifecycle",
    summary: "Explore how identity, access decisions, and lifecycle controls fit together.",
    href: "https://byjoyaing.com/builder-academy/identity-journey",
    categoryIds: ["workforce-identity", "nhi", "secrets-management"],
  },
  {
    id: "source-verification",
    title: "Check the evidence behind a claim",
    summary: "Practice separating a source, an interpretation, and an unanswered question before comparing tools.",
    href: "https://byjoyaing.com/ai-academy/journeys/source-verification",
    categoryIds: ["dspm", "sast", "sca", "dast", "aspm"],
  },
];

export function academyPreviewsForCategory(categoryId: string) {
  return academyPreviews.filter((preview) => preview.categoryIds.includes(categoryId));
}
