import { SITE_URL } from "./site";

const REPO_ISSUES = "https://github.com/heyfunwhoa/security-market-map/issues/new";

/**
 * Link to the public "Suggest a correction" issue form, pre-filled with where the reader
 * was. Field names match the ids in .github/ISSUE_TEMPLATE/correction.yml.
 */
export function correctionUrl({ path, title, record, claimId }: { path: string; title: string; record?: string; claimId?: string }): string {
  const params = new URLSearchParams({ template: "correction.yml", title: `Correction: ${title}`, page: `${SITE_URL}${path}` });
  if (record) params.set("record", record);
  if (claimId) params.set("claim", claimId);
  return `${REPO_ISSUES}?${params.toString()}`;
}
