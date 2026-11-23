/**
 * Vendor release-feed watcher: turns official vendor RSS/Atom feeds into review candidates.
 *
 * Kept per item: title, date and link only. Not kept: the item's description or body
 * (the vendor's prose; rights unknown). Nothing here publishes a claim or a vendor event:
 * a person reviews each candidate and, for the notable ones, writes an event in
 * lib/data/market.ts with a registered source and a summary in their own words.
 */

export type MarketFeed = {
  /** Stable id, also the candidates file name. */
  id: string;
  /** Vendor id in the composed catalog (lib/catalog.ts). */
  vendorId: string;
  label: string;
  url: string;
  format: "rss" | "atom";
  /** Why this feed is watched and why at this cadence. */
  note: string;
};

export type FeedItem = {
  title: string;
  /** YYYY-MM-DD */
  date: string;
  url: string;
};

export type CandidateStatus = "new" | "promoted" | "dismissed";

export type FeedCandidate = FeedItem & {
  /** YYYY-MM-DD the watcher first saw it. */
  firstSeen: string;
  /** Set by the reviewer: "promoted" once an event is written, "dismissed" if not notable. */
  status: CandidateStatus;
};

export type FeedCandidatesFile = {
  feedId: string;
  vendorId: string;
  feedUrl: string;
  /** Last time the feed was read successfully. */
  checkedAt: string;
  /** Newest first. */
  candidates: FeedCandidate[];
};

/** On the first run, only items this recent become candidates, so the backlog isn't dumped into review. */
export const FIRST_RUN_LOOKBACK_DAYS = 30;

function decode(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number.parseInt(dec, 10)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

const clean = (value: string) => decode(value).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

function tag(block: string, name: string): string | null {
  const match = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i").exec(block);
  return match ? match[1] : null;
}

function isoDate(value: string | null): string | null {
  if (!value) return null;
  const parsed = new Date(clean(value));
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
}

/**
 * Parse an RSS 2.0 or Atom feed into title/date/link items, newest first.
 * Throws if the document has no items, so a layout change fails loudly instead of
 * reporting "nothing new".
 */
export function parseFeed(xml: string, format: MarketFeed["format"]): FeedItem[] {
  const blockTag = format === "rss" ? "item" : "entry";
  const blocks = [...xml.matchAll(new RegExp(`<${blockTag}(?:\\s[^>]*)?>([\\s\\S]*?)</${blockTag}>`, "gi"))].map(
    (m) => m[1],
  );
  if (blocks.length === 0) throw new Error(`No <${blockTag}> elements found; the feed format may have changed.`);

  const items: FeedItem[] = [];
  for (const block of blocks) {
    const title = clean(tag(block, "title") ?? "");
    let url: string | null;
    let date: string | null;
    if (format === "rss") {
      url = clean(tag(block, "link") ?? tag(block, "guid") ?? "") || null;
      date = isoDate(tag(block, "pubDate"));
    } else {
      const link =
        /<link\b[^>]*rel=["']alternate["'][^>]*>/i.exec(block)?.[0] ?? /<link\b[^>]*href=[^>]*>/i.exec(block)?.[0];
      url = link ? decode(/href=["']([^"']+)["']/i.exec(link)?.[1] ?? "") || null : null;
      date = isoDate(tag(block, "updated") ?? tag(block, "published"));
    }
    if (!title || !url || !date) throw new Error(`Feed item is missing a title, link or date: ${title || "(untitled)"}`);
    if (!/^https:\/\//.test(url)) throw new Error(`Feed item link is not https: ${url}`);
    items.push({ title, date, url });
  }
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

function daysBefore(today: string, days: number): string {
  const d = new Date(`${today}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

/**
 * Add fetched items the stored file hasn't seen (by URL). Reviewer statuses are kept.
 * Returns the merged file and the items added this run.
 */
export function mergeCandidates(
  feed: MarketFeed,
  stored: FeedCandidatesFile | null,
  fetched: FeedItem[],
  today: string,
): { file: FeedCandidatesFile; added: FeedCandidate[] } {
  const known = new Set((stored?.candidates ?? []).map((c) => c.url));
  const cutoff = stored ? null : daysBefore(today, FIRST_RUN_LOOKBACK_DAYS);
  const added: FeedCandidate[] = fetched
    .filter((item) => !known.has(item.url) && (cutoff === null || item.date >= cutoff))
    .map((item) => ({ ...item, firstSeen: today, status: "new" }));
  const candidates = [...added, ...(stored?.candidates ?? [])].sort(
    (a, b) => b.date.localeCompare(a.date) || a.url.localeCompare(b.url),
  );
  return {
    file: { feedId: feed.id, vendorId: feed.vendorId, feedUrl: feed.url, checkedAt: today, candidates },
    added,
  };
}
