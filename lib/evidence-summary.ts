import type { Capability, Claim } from "./schema";
import { verificationLabel } from "./format";

export type EvidenceSummary = {
  total: number;
  labelCounts: [label: string, count: number][];
  lastChecked: string | undefined;
  capabilityNames: string[];
};

/** Counts current (non-superseded) claims by trust label, with the latest check and capabilities covered. */
export function evidenceSummary(claims: Claim[], capabilities: Capability[]): EvidenceSummary {
  const current = claims.filter((claim) => claim.verificationStatus !== "superseded");
  const counts = new Map<string, number>();
  for (const claim of current) {
    const label = verificationLabel(claim.verificationStatus);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  const capabilityNames = [
    ...new Set(
      current.flatMap((claim) =>
        claim.capabilityId
          ? [capabilities.find((cap) => cap.id === claim.capabilityId)?.name ?? claim.capabilityId]
          : [],
      ),
    ),
  ].sort();
  return {
    total: current.length,
    labelCounts: [...counts],
    lastChecked: current.map((claim) => claim.lastCheckedAt).sort().at(-1),
    capabilityNames,
  };
}
