/** Optional local-only proof. Requires an explicit, pinned ASE checkout; never used by the app or CI. */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { previewResearchEvidenceBatch } from "../lib/integrations/research-evidence";

const ASE_SHA = "93e81bf7bad2df249a163502feabb33ab9baa56a";

async function main() {
  if (!process.argv[2]) throw new Error("Pass the local ASE checkout root explicitly.");
  const root = resolve(process.argv[2]);
  const sha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  assert.equal(sha, ASE_SHA, "Re-review fixture provenance before changing the ASE source pin.");
  const dirty = execFileSync("git", ["status", "--porcelain", "--untracked-files=no"], { cwd: root, encoding: "utf8" });
  assert.equal(dirty, "", "Producer proof requires unchanged tracked ASE source.");
  const input = JSON.parse(readFileSync(new URL("../lib/integrations/fixtures/ase-synthetic-product.input.json", import.meta.url), "utf8"));
  const expected = JSON.parse(readFileSync(new URL("../lib/integrations/fixtures/ase-synthetic-product.v1.json", import.meta.url), "utf8"));
  const previousFetch = globalThis.fetch;
  let networkCalls = 0;
  globalThis.fetch = async () => { networkCalls++; throw new Error("Offline proof forbids network calls."); };
  try {
    const producer = await import(pathToFileURL(join(root, "lib/research-hub/export-approved.ts")).href);
    const result = producer.exportApprovedResearchEvidence(input);
    assert.equal(result.ok, true);
    assert.deepEqual(result.evidence, expected);
    const previews = previewResearchEvidenceBatch([result.evidence, result.evidence]);
    assert.equal(previews.views.length, 1);
    assert.equal(previews.receipts[1].status, "duplicate");
    assert.deepEqual(previews.views[0].sources, expected.sources);
    assert.equal(previews.views[0].publicationAllowed, false);
    assert.equal(previewResearchEvidenceBatch([result.evidence,
      { ...result.evidence, invalidatedBySourceCorrection: true }, result.evidence]).views.length, 0);
    assert.equal(networkCalls, 0);
    console.log(JSON.stringify({ proof: "ASE exporter -> SMM offline consumer", aseSha: sha,
      fixtureMatches: true, replayDeduplicated: true, correctionBlocksReplay: true,
      publicationAllowed: false, networkCalls }));
  } finally { globalThis.fetch = previousFetch; }
}

main().catch(() => {
  // Do not print source input, capture text, environment values or dynamic import errors.
  console.error("Offline producer proof failed. Check the explicit checkout/pin, dependencies and fixture provenance.");
  process.exitCode = 1;
});
