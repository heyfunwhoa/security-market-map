import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import {
  FIRST_RUN_LOOKBACK_DAYS,
  mergeCandidates,
  parseFeed,
  type FeedCandidatesFile,
  type MarketFeed,
} from "./market-feeds";

const feed: MarketFeed = {
  id: "example-saas",
  vendorId: "example",
  label: "Example",
  url: "https://example.com/rss.xml",
  format: "rss",
  note: "test",
};

const rss = `<?xml version="1.0"?><rss><channel><title>Example</title>
<item><title><![CDATA[Scan &amp; clean up]]></title><link>https://example.com/b</link><pubDate>Fri, 20 Nov 2026 10:00:00 GMT</pubDate><description>Vendor prose that must not be kept.</description></item>
<item><title>Older</title><link>https://example.com/a</link><pubDate>Thu, 12 Nov 2026 10:00:00 GMT</pubDate></item>
</channel></rss>`;

describe("parseFeed", () => {
  it("reads RSS title, link and date only, newest first", () => {
    expect(parseFeed(rss, "rss")).toEqual([
      { title: "Scan & clean up", date: "2026-11-20", url: "https://example.com/b" },
      { title: "Older", date: "2026-11-12", url: "https://example.com/a" },
    ]);
  });

  it("reads Atom alternate links", () => {
    const atom = `<feed><entry><title>v1.56.1</title><link rel="alternate" href="https://example.com/r/1"/><updated>2026-10-26T09:00:00Z</updated><content>x</content></entry></feed>`;
    expect(parseFeed(atom, "atom")).toEqual([{ title: "v1.56.1", date: "2026-10-26", url: "https://example.com/r/1" }]);
  });

  it("fails loudly when the layout changes", () => {
    expect(() => parseFeed("<html>moved</html>", "rss")).toThrow(/No <item>/);
    expect(() => parseFeed("<rss><item><title>x</title></item></rss>", "rss")).toThrow(/missing/);
  });
});

describe("mergeCandidates", () => {
  const items = parseFeed(rss, "rss");

  it("on the first run keeps only recent items", () => {
    const { added } = mergeCandidates(feed, null, items, "2026-12-15");
    expect(FIRST_RUN_LOOKBACK_DAYS).toBe(30);
    expect(added.map((c) => c.url)).toEqual(["https://example.com/b"]);
    expect(added[0]).toMatchObject({ firstSeen: "2026-12-15", status: "new" });
  });

  it("adds only unseen URLs and keeps reviewer statuses", () => {
    const stored: FeedCandidatesFile = {
      feedId: feed.id,
      vendorId: feed.vendorId,
      feedUrl: feed.url,
      checkedAt: "2026-11-13",
      candidates: [{ title: "Older", date: "2026-11-12", url: "https://example.com/a", firstSeen: "2026-11-13", status: "dismissed" }],
    };
    const { file, added } = mergeCandidates(feed, stored, items, "2026-11-23");
    expect(added.map((c) => c.url)).toEqual(["https://example.com/b"]);
    expect(file.candidates.map((c) => [c.url, c.status])).toEqual([
      ["https://example.com/b", "new"],
      ["https://example.com/a", "dismissed"],
    ]);
    expect(mergeCandidates(feed, file, items, "2026-11-30").added).toEqual([]);
  });
});

describe("watched feeds", () => {
  const dir = join(process.cwd(), "data/market-feeds");
  const feeds = JSON.parse(readFileSync(join(dir, "feeds.json"), "utf8")) as MarketFeed[];
  const vendorIds = new Set(catalog.vendors.map((v) => v.id));

  it("point at catalog vendors over https, with unique ids", () => {
    expect(new Set(feeds.map((f) => f.id)).size).toBe(feeds.length);
    for (const f of feeds) {
      expect(vendorIds.has(f.vendorId), f.vendorId).toBe(true);
      expect(f.url).toMatch(/^https:\/\//);
      expect(["rss", "atom"]).toContain(f.format);
    }
  });

  it("have candidate files that keep only title, date and link", () => {
    const ids = new Set(feeds.map((f) => f.id));
    for (const name of readdirSync(join(dir, "candidates")).filter((n) => n.endsWith(".json"))) {
      const file = JSON.parse(readFileSync(join(dir, "candidates", name), "utf8")) as FeedCandidatesFile;
      expect(ids.has(file.feedId), name).toBe(true);
      for (const c of file.candidates) {
        expect(Object.keys(c).sort()).toEqual(["date", "firstSeen", "status", "title", "url"]);
        expect(["new", "promoted", "dismissed"]).toContain(c.status);
      }
    }
  });
});
