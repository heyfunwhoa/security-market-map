import { z } from "zod";
import { claimPolaritySchema, claimSubjectTypeSchema, sourceTypeSchema } from "../schema";

/**
 * Research-ledger models. These sit beside the published catalog.
 * A proposed claim cannot use the catalog verification enum, because that
 * enum includes `verified`. Publication into `lib/data/claims.ts` stays manual.
 */

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const sourceClassificationSchema = z.enum([
  "industry_analyst",
  "vendor_first",
  "independent_industry",
]);

export const permissionStatusSchema = z.enum([
  "public_permitted",
  "metadata_only",
  "restricted",
  "authorized",
]);

export const monitoringFrequencySchema = z.enum(["daily", "weekly", "monthly", "quarterly"]);

export const lastCheckStatusSchema = z.enum([
  "never_checked",
  "unchanged",
  "changed",
  "skipped_permissions",
  "duplicate",
  "error",
]);

export const retrievalScopeSchema = z.enum(["none", "metadata", "excerpt", "full_text"]);

export const retrievalAdapterNameSchema = z.enum(["fixture", "firecrawl", "exa", "none"]);

export const retrievalModeSchema = z.enum(["offline_fixture", "mocked", "not_run"]);

export const retrievalOutcomeSchema = z.enum([
  "recorded",
  "unchanged",
  "duplicate",
  "denied",
  "not_due",
  "skipped_disabled",
  "error",
]);

export const changeKindSchema = z.enum(["initial", "content", "reversion"]);

export const changeQueueStatusSchema = z.enum(["queued", "proposal_opened", "dismissed"]);

export const proposalReviewStatusSchema = z.enum([
  "pending",
  "changes_requested",
  "deferred",
  "accepted",
  "rejected",
]);

export const reviewDecisionKindSchema = z.enum([
  "accept",
  "reject",
  "request_changes",
  "defer",
  "resubmit",
]);

export const proposalOriginSchema = z.enum(["offline_fixture", "mocked_adapter", "human_entry"]);

export const evidenceClassSchema = z.enum(["sourced_fact", "vendor_claim", "ai_hypothesis"]);

export const workflowStatusSchema = z.enum(["completed", "failed"]);

const EXCERPT_LIMIT = 420;

function issue(ctx: z.RefinementCtx, path: string, message: string) {
  ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message });
}

export const sourcePolicySchema = z
  .object({
    id: z.string().min(1),
    monitoredSourceId: z.string().min(1),
    classification: sourceClassificationSchema,
    permissionStatus: permissionStatusSchema,
    retrievalScope: retrievalScopeSchema,
    licenseNote: z.string().min(1),
    authorizationRef: z.string().min(1).nullable(),
    updatedAt: isoDate,
  })
  .superRefine((policy, ctx) => {
    if (policy.permissionStatus === "restricted" && policy.retrievalScope !== "none") {
      issue(ctx, "retrievalScope", "Restricted sources cannot be retrieved.");
    }
    if (policy.permissionStatus === "metadata_only" && policy.retrievalScope !== "metadata") {
      issue(ctx, "retrievalScope", "Metadata-only sources cannot store page text.");
    }
    if (policy.permissionStatus === "authorized" && !policy.authorizationRef) {
      issue(ctx, "authorizationRef", "Authorized retrieval requires an authorization reference.");
    }
    if (policy.permissionStatus !== "authorized" && policy.authorizationRef) {
      issue(ctx, "authorizationRef", "Authorization references belong only on authorized policies.");
    }
    if (
      policy.classification === "industry_analyst" &&
      policy.retrievalScope === "full_text" &&
      policy.permissionStatus !== "authorized"
    ) {
      issue(ctx, "retrievalScope", "Analyst full text requires an authorization reference.");
    }
    if (
      (policy.retrievalScope === "excerpt" || policy.retrievalScope === "full_text") &&
      policy.permissionStatus !== "public_permitted" &&
      policy.permissionStatus !== "authorized"
    ) {
      issue(ctx, "retrievalScope", "Page text requires a public or authorized policy.");
    }
  });

export const monitoredSourceSchema = z.object({
  id: z.string().min(1),
  catalogSourceId: z.string().min(1).nullable(),
  title: z.string().min(1),
  canonicalUrl: z.string().url(),
  publisher: z.string().min(1),
  author: z.string().min(1).nullable(),
  sourceType: sourceTypeSchema,
  classification: sourceClassificationSchema,
  publishedAt: isoDate.nullable(),
  monitoringFrequency: monitoringFrequencySchema,
  permissionStatus: permissionStatusSchema,
  lastCheckStatus: lastCheckStatusSchema,
  lastCheckedAt: isoDate.nullable(),
  policyId: z.string().min(1),
  enabled: z.boolean(),
});

export const retrievalRunSchema = z
  .object({
    id: z.string().min(1),
    monitoredSourceId: z.string().min(1),
    sequence: z.number().int().positive(),
    startedAt: isoDate,
    finishedAt: isoDate,
    adapter: retrievalAdapterNameSchema,
    mode: retrievalModeSchema,
    outcome: retrievalOutcomeSchema,
    denialReason: z.string().min(1).nullable(),
    snapshotId: z.string().min(1).nullable(),
    changeId: z.string().min(1).nullable(),
  })
  .superRefine((run, ctx) => {
    const needsReason = run.outcome === "denied" || run.outcome === "error";
    if (needsReason && !run.denialReason) {
      issue(ctx, "denialReason", "Denied and failed runs record a reason.");
    }
    if (!needsReason && run.denialReason) {
      issue(ctx, "denialReason", "A successful or skipped run does not carry a denial reason.");
    }
    if ((run.outcome === "recorded" || run.outcome === "unchanged" || run.outcome === "duplicate") && !run.snapshotId) {
      issue(ctx, "snapshotId", "Stored outcomes point at a snapshot.");
    }
  });

export const sourceSnapshotSchema = z
  .object({
    id: z.string().min(1),
    monitoredSourceId: z.string().min(1),
    retrievalRunId: z.string().min(1),
    canonicalUrl: z.string().url(),
    retrievedAt: isoDate,
    contentHash: z.string().min(1),
    normalizedText: z.string(),
    excerpt: z.string().max(EXCERPT_LIMIT),
    title: z.string().min(1).nullable(),
    publishedAt: isoDate.nullable(),
    scope: z.enum(["metadata", "excerpt", "full_text"]),
    storedLength: z.number().int().nonnegative(),
    truncated: z.boolean(),
  })
  .superRefine((snapshot, ctx) => {
    if (snapshot.scope === "metadata" && snapshot.normalizedText.length > 0) {
      issue(ctx, "normalizedText", "Metadata snapshots cannot store body text.");
    }
    if (snapshot.scope === "excerpt" && snapshot.normalizedText.length > EXCERPT_LIMIT) {
      issue(ctx, "normalizedText", "Excerpt snapshots cannot store more than an excerpt.");
    }
    if (snapshot.storedLength !== snapshot.normalizedText.length) {
      issue(ctx, "storedLength", "Stored length must match the retained text.");
    }
  });

export const detectedChangeSchema = z.object({
  id: z.string().min(1),
  monitoredSourceId: z.string().min(1),
  snapshotId: z.string().min(1),
  previousSnapshotId: z.string().min(1).nullable(),
  kind: changeKindSchema,
  summary: z.string().min(1),
  previousHash: z.string().min(1).nullable(),
  nextHash: z.string().min(1),
  detectedAt: isoDate,
  queueStatus: changeQueueStatusSchema,
});

export const fixtureStatementSchema = z.object({
  statement: z.string().min(1),
  subjectType: claimSubjectTypeSchema,
  subjectId: z.string().min(1),
  capabilityId: z.string().min(1).nullable(),
  polarity: claimPolaritySchema,
  sourceType: sourceTypeSchema,
  priorClaimId: z.string().min(1).nullable(),
});

export const proposedClaimSchema = z
  .object({
    id: z.string().min(1),
    dedupeKey: z.string().min(1),
    changeId: z.string().min(1),
    snapshotId: z.string().min(1),
    monitoredSourceId: z.string().min(1),
    statement: z.string().min(1),
    subjectType: claimSubjectTypeSchema.nullable(),
    subjectId: z.string().min(1).nullable(),
    capabilityId: z.string().min(1).nullable(),
    polarity: claimPolaritySchema,
    sourceId: z.string().min(1).nullable(),
    priorClaimId: z.string().min(1).nullable(),
    sourceUrl: z.string().url(),
    sourceType: sourceTypeSchema,
    publishedAt: isoDate.nullable(),
    observedAt: isoDate,
    confidence: z.literal("low"),
    verificationStatus: z.literal("needs_review"),
    reviewStatus: proposalReviewStatusSchema,
    attribution: z.string().min(1),
    origin: proposalOriginSchema,
    notes: z.string().min(1).nullable(),
    autoPublished: z.literal(false),
  })
  .superRefine((claim, ctx) => {
    if (claim.subjectType && !claim.subjectId) {
      issue(ctx, "subjectId", "A proposed claim with a subject type needs a subject id.");
    }
    if (!claim.subjectType && claim.subjectId) {
      issue(ctx, "subjectType", "A subject id needs a subject type.");
    }
  });

export const researchFindingSchema = z
  .object({
    id: z.string().min(1),
    proposalId: z.string().min(1),
    snapshotId: z.string().min(1),
    changeId: z.string().min(1),
    vendorId: z.string().min(1),
    productId: z.string().min(1).nullable(),
    categoryId: z.string().min(1),
    classification: sourceClassificationSchema,
    evidenceClass: evidenceClassSchema,
    title: z.string().min(1),
    publisher: z.string().min(1),
    sourceUrl: z.string().url(),
    excerpt: z.string().max(EXCERPT_LIMIT),
    retrievedAt: isoDate,
    eventDate: isoDate.nullable(),
    previousExcerpt: z.string().max(EXCERPT_LIMIT).nullable(),
    previousHash: z.string().min(1).nullable(),
    verificationStatus: z.literal("needs_review"),
    generatedByModel: z.literal(false),
  })
  .superRefine((finding, ctx) => {
    if (finding.evidenceClass === "ai_hypothesis") {
      issue(ctx, "evidenceClass", "This workflow does not store AI-generated hypotheses.");
    }
    if (finding.evidenceClass === "vendor_claim" && finding.verificationStatus !== "needs_review") {
      issue(ctx, "verificationStatus", "A vendor claim stays in review until a person publishes it.");
    }
  });

export const materialAlertSchema = z.object({
  id: z.string().min(1),
  vendorId: z.string().min(1),
  productId: z.string().min(1).nullable(),
  changeId: z.string().min(1),
  findingId: z.string().min(1).nullable(),
  summary: z.string().min(1),
  detectedAt: isoDate,
  previousExcerpt: z.string().max(EXCERPT_LIMIT).nullable(),
  nextExcerpt: z.string().max(EXCERPT_LIMIT),
  status: z.enum(["open", "dismissed"]),
});

export const workflowRunSchema = z
  .object({
    id: z.string().min(1),
    vendorId: z.string().min(1).nullable(),
    functionId: z.string().min(1),
    status: workflowStatusSchema,
    attempt: z.number().int().nonnegative(),
    startedAt: isoDate,
    finishedAt: isoDate.nullable(),
    failureReason: z.string().min(1).nullable(),
  })
  .superRefine((run, ctx) => {
    if (run.status === "failed" && !run.failureReason) {
      issue(ctx, "failureReason", "A failed workflow run records a reason.");
    }
    if (run.status === "completed" && run.failureReason) {
      issue(ctx, "failureReason", "A completed workflow run does not carry a failure reason.");
    }
  });

export const reviewDecisionSchema = z.object({
  id: z.string().min(1),
  proposedClaimId: z.string().min(1),
  decision: reviewDecisionKindSchema,
  reviewer: z.string().min(1),
  decidedAt: isoDate,
  rationale: z.string().min(1),
  publishesAutomatically: z.literal(false),
  resultingClaimId: z.null(),
});

export type SourceClassification = z.infer<typeof sourceClassificationSchema>;
export type PermissionStatus = z.infer<typeof permissionStatusSchema>;
export type MonitoringFrequency = z.infer<typeof monitoringFrequencySchema>;
export type LastCheckStatus = z.infer<typeof lastCheckStatusSchema>;
export type RetrievalScope = z.infer<typeof retrievalScopeSchema>;
export type SourcePolicy = z.infer<typeof sourcePolicySchema>;
export type MonitoredSource = z.infer<typeof monitoredSourceSchema>;
export type RetrievalRun = z.infer<typeof retrievalRunSchema>;
export type SourceSnapshot = z.infer<typeof sourceSnapshotSchema>;
export type DetectedChange = z.infer<typeof detectedChangeSchema>;
export type FixtureStatement = z.infer<typeof fixtureStatementSchema>;
export type ProposedClaim = z.infer<typeof proposedClaimSchema>;
export type ProposalReviewStatus = z.infer<typeof proposalReviewStatusSchema>;
export type ReviewDecisionKind = z.infer<typeof reviewDecisionKindSchema>;
export type ReviewDecision = z.infer<typeof reviewDecisionSchema>;
export type ProposalOrigin = z.infer<typeof proposalOriginSchema>;
export type EvidenceClass = z.infer<typeof evidenceClassSchema>;
export type ResearchFinding = z.infer<typeof researchFindingSchema>;
export type MaterialAlert = z.infer<typeof materialAlertSchema>;
export type WorkflowRun = z.infer<typeof workflowRunSchema>;
