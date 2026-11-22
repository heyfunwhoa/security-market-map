import { catalogKindSchema, consumerAcceptanceSchema, mappingSchema, type KnowledgeKind, type Mapping, type RefKind } from "./model";

/**
 * Correction impact (K4, KRU-215): given one change, list the mappings that use the changed thing
 * directly and the consumer decisions that now need a disposition.
 *
 * It never changes anything. It does not re-approve, re-point or withdraw mappings, and it does
 * not decide for a consumer: every affected accept or defer becomes "needs_review" for that
 * consumer's owner. Only direct uses are listed; there is no transitive walk.
 */
export type Change =
  /** Evidence (upstream evidence ID or catalog claim ID) was revoked, retracted or withdrawn. */
  | { kind: "evidence_revoked"; evidenceId: string }
  /** A knowledge record has a new revision; mappings pinned to the old one need review. */
  | { kind: "record_revised"; ref: { kind: KnowledgeKind; id: string }; newRevision: string }
  /** A knowledge or catalog record was withdrawn. */
  | { kind: "record_withdrawn"; ref: { kind: RefKind; id: string } }
  /** The catalog snapshot moved; every mapping with a catalog end pinned to another snapshot needs review. */
  | { kind: "catalog_snapshot"; newRevision: string };

export type ImpactReport = {
  change: Change;
  affectedMappings: { id: string; revision: string; reason: string }[];
  consumerDispositions: {
    consumerId: string;
    mappingId: string;
    mappingRevision: string;
    previousDecision: "accept" | "defer";
    disposition: "needs_review";
  }[];
};

// Derived from the model so a new catalog kind is covered automatically.
const CATALOG_KINDS = new Set<RefKind>(catalogKindSchema.options);

function reasonFor(mapping: Mapping, change: Change): string | null {
  const ends = [mapping.from, mapping.to];
  switch (change.kind) {
    case "evidence_revoked": {
      const uses = mapping.evidence.some((e) => (e.kind === "catalog_claim" ? e.claimId : e.evidenceId) === change.evidenceId);
      return uses ? `Uses revoked evidence ${change.evidenceId}.` : null;
    }
    case "record_revised": {
      const end = ends.find((ref) => ref.kind === change.ref.kind && ref.id === change.ref.id && ref.revision !== change.newRevision);
      return end ? `Pinned to ${end.kind}:${end.id}@${end.revision}; current revision is ${change.newRevision}. Review before re-pinning.` : null;
    }
    case "record_withdrawn": {
      const end = ends.find((ref) => ref.kind === change.ref.kind && ref.id === change.ref.id);
      return end ? `References withdrawn ${end.kind}:${end.id}.` : null;
    }
    case "catalog_snapshot": {
      const end = ends.find((ref) => CATALOG_KINDS.has(ref.kind) && ref.revision !== change.newRevision);
      return end ? `Pinned to ${end.revision}; the catalog is now ${change.newRevision}.` : null;
    }
  }
}

export function correctionImpact(input: { mappings: readonly unknown[]; consumers?: readonly unknown[] }, change: Change): ImpactReport {
  const affectedMappings: ImpactReport["affectedMappings"] = [];
  const seen = new Set<string>();
  for (const raw of input.mappings) {
    const parsed = mappingSchema.safeParse(raw);
    if (!parsed.success) continue;
    const mapping = parsed.data;
    const key = `${mapping.id}@${mapping.revision}`;
    if (seen.has(key) || mapping.lifecycle === "withdrawn" || mapping.lifecycle === "superseded") continue;
    const reason = reasonFor(mapping, change);
    if (reason) {
      seen.add(key);
      affectedMappings.push({ id: mapping.id, revision: mapping.revision, reason });
    }
  }

  const consumerDispositions: ImpactReport["consumerDispositions"] = [];
  for (const raw of input.consumers ?? []) {
    const parsed = consumerAcceptanceSchema.safeParse(raw);
    if (!parsed.success) continue;
    const decision = parsed.data;
    if (decision.decision === "reject") continue;
    if (!seen.has(`${decision.mappingId}@${decision.mappingRevision}`)) continue;
    consumerDispositions.push({
      consumerId: decision.consumerId,
      mappingId: decision.mappingId,
      mappingRevision: decision.mappingRevision,
      previousDecision: decision.decision,
      disposition: "needs_review",
    });
  }

  return { change, affectedMappings, consumerDispositions };
}
