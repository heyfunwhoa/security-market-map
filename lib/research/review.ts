import { assertResearchLedger, type ResearchLedger } from "./ledger";
import {
  proposedClaimSchema,
  reviewDecisionSchema,
  type ProposalReviewStatus,
  type ProposedClaim,
  type ReviewDecision,
  type ReviewDecisionKind,
} from "./schema";

const NEXT: Record<ProposalReviewStatus, Partial<Record<ReviewDecisionKind, ProposalReviewStatus>>> = {
  pending: {
    accept: "accepted",
    reject: "rejected",
    request_changes: "changes_requested",
    defer: "deferred",
  },
  changes_requested: {
    accept: "accepted",
    reject: "rejected",
    defer: "deferred",
    resubmit: "pending",
  },
  deferred: {
    accept: "accepted",
    reject: "rejected",
    request_changes: "changes_requested",
  },
  accepted: {},
  rejected: {},
};

export type AppliedReview = {
  decision: ReviewDecision;
  proposal: ProposedClaim;
  published: false;
};

export function applyReviewDecision(
  ledger: ResearchLedger,
  input: {
    proposedClaimId: string;
    decision: ReviewDecisionKind;
    reviewer: string;
    decidedAt: string;
    rationale: string;
  },
): AppliedReview {
  const index = ledger.proposals.findIndex((proposal) => proposal.id === input.proposedClaimId);
  if (index < 0) {
    throw new Error(`Proposed claim ${input.proposedClaimId} is not in the ledger.`);
  }
  const current = ledger.proposals[index];
  const reviewStatus = NEXT[current.reviewStatus][input.decision];
  if (!reviewStatus) {
    throw new Error(`Invalid review transition: ${current.reviewStatus} cannot ${input.decision}.`);
  }
  const proposal = proposedClaimSchema.parse({
    ...current,
    reviewStatus,
    verificationStatus: "needs_review",
    autoPublished: false,
    confidence: "low",
  });
  const decision = reviewDecisionSchema.parse({
    id: `decision-${proposal.id}-${ledger.decisions.length + 1}`,
    proposedClaimId: proposal.id,
    decision: input.decision,
    reviewer: input.reviewer,
    decidedAt: input.decidedAt,
    rationale: input.rationale,
    publishesAutomatically: false,
    resultingClaimId: null,
  });
  ledger.proposals[index] = proposal;
  ledger.decisions.push(decision);
  assertResearchLedger(ledger);
  return { decision, proposal, published: false };
}
