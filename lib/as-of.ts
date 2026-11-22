import type { Claim } from "./schema";

/**
 * The site's "as of" date is the newest date recorded on any claim, so the header never
 * trails the claim cards. Effective dates are excluded because they can be in the future.
 */
export function latestClaimDate(claims: readonly Pick<Claim, "lastCheckedAt" | "observedAt" | "publishedAt">[]): string | null {
  let latest: string | null = null;
  for (const claim of claims) {
    for (const date of [claim.lastCheckedAt, claim.observedAt, claim.publishedAt]) {
      if (date && (latest === null || date > latest)) latest = date;
    }
  }
  return latest;
}
