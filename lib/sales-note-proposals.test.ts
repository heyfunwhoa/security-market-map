import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import incidentsSeed from "@/data/security-intelligence/incidents.seed.json";
import proposalsFile from "@/data/security-intelligence/sales-note-proposals.json";
import salesNotesSeed from "@/data/security-intelligence/sales-notes.json";

// Seller caveats and hook headlines proposed for owner review. They must stay grounded in each
// incident's reviewed record and must not reach the feed or exports until approved.
type Proposal = {
  incidentId: string;
  sellerCaveat: string;
  approvedSellerCaveat?: string;
  proposedHeadline: string | null;
  headlineDecision?: "approved" | "rejected" | null;
  reason: string | null;
  basedOnSourceIds: string[];
  decision: "approved" | "edited" | "rejected" | null;
  reviewedBy: string | null;
  reviewedOn: string | null;
};
const incidents = new Map((incidentsSeed as { id: string; summary: string; sourceIds: string[] }[]).map((i) => [i.id, i]));
const notes = new Map((salesNotesSeed as { incidentId: string; headline: string; sellerCaveat?: string }[]).map((n) => [n.incidentId, n]));
const proposals = proposalsFile.proposals as Proposal[];
const numbers = (text: string) => (text.match(/\d[\d,.]*/g) ?? []).map((n) => n.replace(/[,.]$/, "").replaceAll(",", ""));

describe("sales note proposals", () => {
  it("is a proposal file covering every incident with a sales note, once each", () => {
    expect(["proposed", "decided"]).toContain(proposalsFile.status);
    const ids = proposals.map((p) => p.incidentId);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(ids)).toEqual(new Set(notes.keys()));
  });

  it.each(proposals)("$incidentId stays grounded in the reviewed record", (p) => {
    const incident = incidents.get(p.incidentId)!;
    expect(incident).toBeDefined();
    expect(p.basedOnSourceIds.length).toBeGreaterThan(0);
    for (const id of p.basedOnSourceIds) expect(incident.sourceIds).toContain(id);

    expect(p.sellerCaveat.trim()).not.toBe("");
    expect(p.sellerCaveat.split(/\s+/).length).toBeLessThanOrEqual(12);

    if (p.proposedHeadline !== null) {
      expect(p.reason?.trim()).toBeTruthy();
      // Applied only when approved; otherwise the reviewed headline stays as it was.
      const current = notes.get(p.incidentId)!.headline;
      if (p.headlineDecision === "approved") expect(current).toBe(p.proposedHeadline);
      else expect(current).not.toBe(p.proposedHeadline);
      expect(p.proposedHeadline.split(/\s+/).length).toBeLessThanOrEqual(30);
      const summaryNumbers = new Set(numbers(incident.summary));
      for (const n of numbers(p.proposedHeadline)) expect(summaryNumbers.has(n), `${n} not in summary`).toBe(true);
    }

    if (p.decision === null) {
      expect(p.reviewedBy).toBeNull();
      expect(p.reviewedOn).toBeNull();
      expect(notes.get(p.incidentId)!.sellerCaveat).toBeUndefined();
    } else {
      // The approved caveat (possibly edited by the owner) is what reaches sales-notes.json.
      expect(p.approvedSellerCaveat?.split(/\s+/).length).toBeLessThanOrEqual(12);
      expect(notes.get(p.incidentId)!.sellerCaveat).toBe(p.approvedSellerCaveat);
      expect(p.reviewedBy?.trim()).toBeTruthy();
      expect(p.reviewedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  const exportPath = join(process.cwd(), "data/security-intelligence/exports/incident-feed.v1.json");
  // The export arrives with PR #188; until then there is nothing to leak into.
  it.skipIf(!existsSync(exportPath))("doesn't leak unapproved text into the committed exports", () => {
    const exported = readFileSync(exportPath, "utf8");
    for (const p of proposals.filter((x) => x.decision === null)) {
      expect(exported).not.toContain(p.sellerCaveat);
      if (p.proposedHeadline) expect(exported).not.toContain(p.proposedHeadline);
    }
  });
});
