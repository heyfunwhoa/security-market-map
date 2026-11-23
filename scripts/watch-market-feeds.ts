/**
 * Reads each feed in data/market-feeds/feeds.json and adds unseen items to
 * data/market-feeds/candidates/<feed id>.json for human review.
 * Usage: npm run feeds:watch
 * Prints FEED_CANDIDATES_ADDED=<n> so the workflow knows whether to open a PR.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { FeedCandidatesFile, MarketFeed } from "../lib/market-feeds";

// Node's type stripping needs the .ts extension at runtime; tsc type-checks via the type-only import above.
const { parseFeed, mergeCandidates }: typeof import("../lib/market-feeds") = await import(
  "../lib/market-feeds" + ".ts"
);

const dir = join(process.cwd(), "data/market-feeds");
const feeds = JSON.parse(readFileSync(join(dir, "feeds.json"), "utf8")) as MarketFeed[];
const today = new Date().toISOString().slice(0, 10);

let total = 0;
let failed = 0;
for (const feed of feeds) {
  const path = join(dir, "candidates", `${feed.id}.json`);
  try {
    const response = await fetch(feed.url, {
      headers: { "user-agent": "security-market-map feed watcher (+https://github.com/heyfunwhoa/security-market-map)" },
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const items = parseFeed(await response.text(), feed.format);
    const stored = existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as FeedCandidatesFile) : null;
    const { file, added } = mergeCandidates(feed, stored, items, today);
    writeFileSync(path, `${JSON.stringify(file, null, 2)}\n`);
    total += added.length;
    console.log(`${feed.id}: ${items.length} items in feed, ${added.length} new`);
    for (const item of added) console.log(`  ${item.date}  ${item.title}  ${item.url}`);
  } catch (error) {
    failed += 1;
    console.error(`${feed.id}: failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

console.log(`FEED_CANDIDATES_ADDED=${total}`);
console.log(`FEED_FAILURES=${failed}`);
// One unreachable vendor site shouldn't block every other feed's candidates.
// Fail the run only when nothing could be read; otherwise the workflow warns.
if (failed > 0 && failed === feeds.length) process.exitCode = 1;
