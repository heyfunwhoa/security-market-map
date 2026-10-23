/** Pure checks shared by the catalog and dependency-free regression tests. */
export function identityProblems(collections: Record<string, readonly { id: string }[]>): string[] {
  const problems: string[] = [];
  for (const [kind, items] of Object.entries(collections)) {
    const seen = new Set<string>();
    for (const item of items) {
      if (seen.has(item.id)) problems.push(`Duplicate ${kind} id ${item.id}`);
      seen.add(item.id);
    }
  }
  return problems;
}

export function provenanceProblems(
  sources: readonly { id: string; sourceType: string }[],
  claims: readonly { id: string; sourceId: string; sourceType: string; subjectType: string; subjectId: string }[],
  capabilityIds: readonly string[],
): string[] {
  const problems: string[] = [];
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const capabilities = new Set(capabilityIds);
  for (const claim of claims) {
    const source = sourceById.get(claim.sourceId);
    if (source && source.sourceType !== claim.sourceType) {
      problems.push(`Claim ${claim.id} source type does not match its source`);
    }
    if (claim.subjectType === "capability" && !capabilities.has(claim.subjectId)) {
      problems.push(`Claim ${claim.id} capability subject missing`);
    }
  }
  return problems;
}
