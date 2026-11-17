import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { marketAreas } from "./market-areas";

// Sales notes (consumerAnnotations.gtm) must stay tied to the candidate's own claims.
// See docs/security-intelligence/incident-classification-framework.md.
type Gtm = {
  status: string;
  whyItMatters: string;
  marketAreaIds: string[];
  angles: { theme: string; talkTrack: string; sourceClaimIds: string[] }[];
  doNotSay: string[];
};
type Candidate = { incidentId: string; claims: { id: string }[]; consumerAnnotations?: { gtm?: Gtm } };

const dir = join(process.cwd(), "data/security-intelligence/candidates");
const withGtm = readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .flatMap((f) => (JSON.parse(readFileSync(join(dir, f), "utf8")).candidates as Candidate[]))
  .filter((c) => c.consumerAnnotations?.gtm);
const areaIds = new Set(marketAreas.map((a) => a.id));

describe("GTM sales notes on incident candidates", () => {
  it("has at least one annotated candidate", () => expect(withGtm.length).toBeGreaterThan(0));

  it.each(withGtm)("$incidentId sales note is evidence-bound", (c) => {
    const gtm = c.consumerAnnotations!.gtm!;
    const claimIds = new Set(c.claims.map((cl) => cl.id));
    expect(gtm.status).toBe("draft");
    expect(gtm.whyItMatters.trim()).not.toBe("");
    for (const id of gtm.marketAreaIds) expect(areaIds.has(id)).toBe(true);
    expect(gtm.angles.length).toBeGreaterThan(0);
    for (const a of gtm.angles) {
      expect(a.talkTrack.trim()).not.toBe("");
      expect(a.sourceClaimIds.length).toBeGreaterThan(0);
      for (const id of a.sourceClaimIds) expect(claimIds.has(id)).toBe(true);
    }
    expect(gtm.doNotSay.length).toBeGreaterThan(0);
  });
});
