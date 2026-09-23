export type DraftClaim = {
  statement: string;
  sourceUrl: string;
  sourceType: "official_docs" | "vendor_marketing" | "press_release" | "internal_note";
  reviewStatus: "pending_human_review";
};

export type ExtractionPreview = {
  canonicalUrl: string;
  contentHash: string;
  excerpt: string;
  proposedClaims: DraftClaim[];
  reviewStatus: "pending_human_review";
  published: false;
};

export function canonicalUrl(input: string): string {
  const url = new URL(input.trim());
  url.hash = "";
  url.hostname = url.hostname.toLowerCase();
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }
  return url.toString();
}

export function contentHash(text: string): string {
  let hash = 5381;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 33) ^ text.charCodeAt(index);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function previewExtraction(input: {
  url: string;
  excerpt: string;
  statement: string;
  sourceType: DraftClaim["sourceType"];
}): ExtractionPreview {
  const excerpt = input.excerpt.trim().slice(0, 320);
  const canonical = canonicalUrl(input.url);
  return {
    canonicalUrl: canonical,
    contentHash: contentHash(`${canonical}\n${excerpt}\n${input.statement.trim()}`),
    excerpt,
    proposedClaims: input.statement.trim()
      ? [
          {
            statement: input.statement.trim(),
            sourceUrl: canonical,
            sourceType: input.sourceType,
            reviewStatus: "pending_human_review",
          },
        ]
      : [],
    reviewStatus: "pending_human_review",
    published: false,
  };
}
