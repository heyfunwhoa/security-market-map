import type { previewResearchEvidenceBatch } from "@/lib/integrations/research-evidence";
import type { UpstreamAssessment } from "./model";

type PreviewResult = ReturnType<typeof previewResearchEvidenceBatch>;

/**
 * Turns one run of the existing research-evidence-v1 reader into K1 upstream assessments.
 * The reader keeps ownership of every package check; this only reads its output.
 *
 * - accepted: the package is in the reader's current previews.
 * - blocked: the package was previewed earlier in the batch and later invalidated, superseded
 *   or caught in an identity conflict, so it is no longer current.
 * - Rejected packages carry no evidence ID in their receipt, so they get no assessment at all,
 *   and the validator fails closed with upstream_assessment_missing.
 *
 * "accepted" means the reader's checks passed. It is not publication approval: every preview
 * still has publicationAllowed set to false.
 */
export function assessmentsFromPreview(result: PreviewResult, checkedOn: string): UpstreamAssessment[] {
  const current = new Map(result.views.map((view) => [view.evidenceId, view]));
  const assessments: UpstreamAssessment[] = result.views.map((view) => ({
    evidenceId: view.evidenceId,
    contract: "research-evidence-v1",
    status: "accepted",
    evidenceKind: view.kind,
    subjectRefs: subjectRefs(view),
    checkedOn,
  }));
  const previewedEarlier = new Set(
    result.receipts.flatMap((receipt) => (receipt.status === "preview" ? [receipt.evidenceId] : [])),
  );
  for (const evidenceId of previewedEarlier) {
    if (current.has(evidenceId)) continue;
    // The reader drops the view, so kind and subjects are gone. Neither matters: blocked never passes.
    assessments.push({ evidenceId, contract: "research-evidence-v1", status: "blocked", evidenceKind: "sourced_fact", subjectRefs: [], checkedOn });
  }
  return assessments;
}

function subjectRefs(view: PreviewResult["views"][number]): string[] {
  const refs = view.marketMapRefs;
  return [
    ...new Set([
      `${view.subject.type}:${view.subject.id}`,
      ...(refs.vendorIds ?? []).map((id) => `vendor:${id}`),
      ...(refs.productIds ?? []).map((id) => `product:${id}`),
      ...(refs.categoryIds ?? []).map((id) => `category:${id}`),
      ...(refs.capabilityIds ?? []).map((id) => `capability:${id}`),
    ]),
  ];
}
