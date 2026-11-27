import type { Metadata } from "next";
import { SITE_URL } from "./site";

const MAX = 160;

/** Trims to a share-friendly length on a word boundary. */
export function shareDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= MAX) return clean;
  return `${clean.slice(0, MAX - 1).replace(/\s+\S*$/, "")}…`;
}

/**
 * Per-page title, description and canonical link for search and link previews. The share
 * image comes from app/opengraph-image.tsx, which file-based metadata applies to every page.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const text = shareDescription(description);
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description: text,
    alternates: { canonical: url },
    openGraph: { title, description: text, url, type: "article", siteName: "Security Market Map" },
    twitter: { card: "summary_large_image", title, description: text },
  };
}
