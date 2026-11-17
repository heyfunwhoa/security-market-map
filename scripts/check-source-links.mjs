#!/usr/bin/env node
/**
 * Checks that every incident source URL still loads (docs/security-intelligence/source-registry.md).
 * Read-only: it never edits data. Broken links (404/410, DNS or TLS failure) fail the run;
 * bot walls and rate limits (401/403/429/503) are reported as "could not check", not broken,
 * because many publishers block automated requests.
 * It confirms a page loads, not that it still says what we cite: re-read flagged pages by hand.
 */
import { readFileSync, appendFileSync } from "node:fs";

// Optional path argument is for testing the checker against a local fixture.
const file = process.argv[2] ?? new URL("../data/security-intelligence/sources.seed.json", import.meta.url);
const sources = JSON.parse(readFileSync(file));
const BLOCKED = new Set([401, 403, 429, 503]);
const BROKEN = new Set([404, 410]);

async function check(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const response = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(20_000),
        headers: { "user-agent": "security-market-map-link-check/1.0", accept: "text/html,application/pdf,*/*" },
      });
      if (response.ok) return { result: "ok", status: response.status, finalUrl: response.url };
      if (method === "HEAD" && (response.status === 405 || response.status === 403 || response.status === 404)) continue;
      if (BROKEN.has(response.status)) return { result: "broken", status: response.status };
      if (BLOCKED.has(response.status)) return { result: "unchecked", status: response.status };
      return { result: response.status >= 500 ? "unchecked" : "broken", status: response.status };
    } catch (error) {
      if (method === "HEAD") continue;
      return { result: "broken", status: error.cause?.code ?? error.name };
    }
  }
}

const rows = [];
for (const source of sources) rows.push({ source, ...(await check(source.url)) });

const broken = rows.filter((row) => row.result === "broken");
const unchecked = rows.filter((row) => row.result === "unchecked");
const moved = rows.filter((row) => row.result === "ok" && row.finalUrl && new URL(row.finalUrl).pathname !== new URL(row.source.url).pathname);
const line = (row) => `- \`${row.source.id}\` (${row.source.publisher}) ${row.status}: ${row.source.url}${row.finalUrl && row.result === "ok" ? ` → ${row.finalUrl}` : ""}`;
const report = [
  "## Incident source link check",
  `${rows.length} sources: ${rows.length - broken.length - unchecked.length} loaded, ${broken.length} broken, ${unchecked.length} could not be checked.`,
  broken.length ? `\n### Broken (fix or replace the source)\n${broken.map(line).join("\n")}` : "",
  moved.length ? `\n### Redirected (consider updating the URL)\n${moved.map(line).join("\n")}` : "",
  unchecked.length ? `\n### Could not check (publisher blocked the request; check by hand)\n${unchecked.map(line).join("\n")}` : "",
].filter(Boolean).join("\n");

console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${report}\n`);
process.exitCode = broken.length ? 1 : 0;
