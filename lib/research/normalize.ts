import { canonicalUrl, contentHash } from "../ingestion/manual";

export const EXCERPT_LIMIT = 420;
export const FULL_TEXT_LIMIT = 8000;

const TRACKING_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "fbclid",
  "mc_cid",
  "mc_eid",
]);

export function normalizeMonitoredUrl(input: string): string {
  const url = new URL(canonicalUrl(input));
  const pairs = [...url.searchParams.entries()].filter(([key]) => !TRACKING_PARAMS.has(key.toLowerCase()));
  pairs.sort((left, right) => left[0].localeCompare(right[0]) || left[1].localeCompare(right[1]));
  url.search = "";
  for (const [key, value] of pairs) {
    url.searchParams.append(key, value);
  }
  return url.toString();
}

export function normalizeContent(text: string): string {
  return text
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function excerptOf(normalized: string): string {
  if (normalized.length <= EXCERPT_LIMIT) return normalized;
  const sliced = normalized.slice(0, EXCERPT_LIMIT);
  const lastSpace = sliced.lastIndexOf(" ");
  if (lastSpace > 300) return sliced.slice(0, lastSpace).trimEnd();
  return sliced.trimEnd();
}

export function retainText(text: string, scope: "metadata" | "excerpt" | "full_text"): {
  normalizedText: string;
  excerpt: string;
  truncated: boolean;
} {
  if (scope === "metadata") {
    return { normalizedText: "", excerpt: "", truncated: false };
  }
  const normalized = normalizeContent(text);
  if (scope === "excerpt") {
    const excerpt = excerptOf(normalized);
    return {
      normalizedText: excerpt,
      excerpt,
      truncated: excerpt.length < normalized.length,
    };
  }
  const truncated = normalized.length > FULL_TEXT_LIMIT;
  const normalizedText = truncated ? normalized.slice(0, FULL_TEXT_LIMIT) : normalized;
  return {
    normalizedText,
    excerpt: excerptOf(normalizedText),
    truncated,
  };
}

export function fingerprint(parts: string[]): string {
  return contentHash(parts.join("\n"));
}
