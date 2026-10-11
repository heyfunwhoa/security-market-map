import { addDays } from "../format";
import type { MonitoredSource, RetrievalScope, SourcePolicy } from "./schema";
import { sourcePolicySchema } from "./schema";

const INTERVALS = { daily: 1, weekly: 7, monthly: 30, quarterly: 90 } as const;

export type RetrievalGate =
  | { allowed: true; scope: Exclude<RetrievalScope, "none"> }
  | { allowed: false; reason: string };

export function retrievalAllowed(policy: SourcePolicy): RetrievalGate {
  const parsed = sourcePolicySchema.safeParse(policy);
  if (!parsed.success) {
    return { allowed: false, reason: "Source policy is not valid for retrieval." };
  }
  if (policy.permissionStatus === "restricted" || policy.retrievalScope === "none") {
    return { allowed: false, reason: "Source policy does not permit retrieval." };
  }
  if (policy.permissionStatus === "metadata_only" || policy.retrievalScope === "metadata") {
    return { allowed: true, scope: "metadata" };
  }
  if (policy.retrievalScope === "full_text") {
    return { allowed: true, scope: "full_text" };
  }
  if (
    policy.retrievalScope === "excerpt" &&
    (policy.permissionStatus === "public_permitted" || policy.permissionStatus === "authorized")
  ) {
    return { allowed: true, scope: "excerpt" };
  }
  return { allowed: false, reason: "Source policy does not permit retrieval." };
}

export function isCheckDue(source: MonitoredSource, asOf: string): boolean {
  if (!source.enabled) return false;
  if (!source.lastCheckedAt || source.lastCheckStatus === "never_checked" || source.lastCheckStatus === "error") {
    return true;
  }
  return addDays(source.lastCheckedAt, INTERVALS[source.monitoringFrequency]) <= asOf;
}
