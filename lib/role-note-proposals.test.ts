import { describe, expect, it } from "vitest";
import incidentsSeed from "@/data/security-intelligence/incidents.seed.json";
import proposalsFile from "@/data/security-intelligence/role-note-proposals.json";
import salesNotesSeed from "@/data/security-intelligence/sales-notes.json";
import { catalog } from "./catalog";

// Role-specific talk-track angles proposed for owner review. Interpretation only: they may not
// add figures beyond the reviewed record, and they only attach to existing buyer roles.
type RoleNote = {
  incidentId: string;
  roleId: string;
  note: string;
  decision: "approved" | "edited" | "rejected" | null;
  editedNote: string | null;
  reviewedBy: string | null;
  reviewedOn: string | null;
  proposedRevision?: string;
  revisionReason?: string;
  revisionDecision?: "approved" | "rejected" | null;
};
const notes = proposalsFile.notes as RoleNote[];
const incidents = new Map((incidentsSeed as { id: string; summary: string }[]).map((i) => [i.id, i]));
type Note = { incidentId: string; roleNotes?: { roleId: string; note: string }[] };
const salesNotes = new Map((salesNotesSeed as Note[]).map((n) => [n.incidentId, n]));
const withSalesNote = new Set(salesNotes.keys());
const personaIds = new Set(catalog.personas.map((p) => p.id));
const numbers = (text: string) => (text.match(/\d[\d,.]*/g) ?? []).map((n) => n.replace(/[,.]$/, "").replaceAll(",", ""));

describe("role note proposals", () => {
  it("declares only buyer roles that exist in the catalog", () => {
    for (const role of proposalsFile.roles) expect(personaIds.has(role.id), role.id).toBe(true);
  });

  it("has one note per incident and role, only for incidents with a sales note", () => {
    const keys = notes.map((n) => `${n.incidentId}|${n.roleId}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const n of notes) expect(withSalesNote.has(n.incidentId), n.incidentId).toBe(true);
    for (const id of withSalesNote) expect(notes.some((n) => n.incidentId === id), id).toBe(true);
  });

  it.each(notes)("$incidentId / $roleId stays within the reviewed record", (n) => {
    expect(proposalsFile.roles.map((r) => r.id)).toContain(n.roleId);
    const text = n.decision === "edited" ? n.editedNote! : n.note;
    expect(text.trim()).not.toBe("");
    expect(text.split(/\s+/).length).toBeLessThanOrEqual(22);
    const summaryNumbers = new Set(numbers(incidents.get(n.incidentId)!.summary));
    for (const value of numbers(text)) expect(summaryNumbers.has(value), `${value} not in summary`).toBe(true);
    if (n.decision === null) {
      expect(n.reviewedBy).toBeNull();
      expect(n.editedNote).toBeNull();
    } else {
      expect(n.reviewedBy?.trim()).toBeTruthy();
      expect(n.reviewedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    // Only approved (or owner-edited) lines reach sales-notes.json, word for word.
    const applied = salesNotes.get(n.incidentId)?.roleNotes?.find((r) => r.roleId === n.roleId);
    // An approved revision (round 2) replaces the round-1 text.
    const live = n.revisionDecision === "approved" ? n.proposedRevision! : text;
    if (n.decision === "approved" || n.decision === "edited") expect(applied?.note).toBe(live);
    else expect(applied).toBeUndefined();
  });
});

describe("role note revisions", () => {
  const revised = notes.filter((n) => n.proposedRevision);
  it.each(revised)("$incidentId / $roleId revision stays within the record", (n) => {
    expect(n.decision).toBe("approved");
    expect(n.revisionReason?.trim()).toBeTruthy();
    const text = n.proposedRevision!;
    expect(text).not.toBe(n.note);
    expect(text.split(/\s+/).length).toBeLessThanOrEqual(22);
    const summaryNumbers = new Set(numbers(incidents.get(n.incidentId)!.summary));
    for (const value of numbers(text)) expect(summaryNumbers.has(value), `${value} not in summary`).toBe(true);
    // The approved text stays live until the owner approves the revision.
    const applied = salesNotes.get(n.incidentId)?.roleNotes?.find((r) => r.roleId === n.roleId)?.note;
    expect(applied).toBe(n.revisionDecision === "approved" ? text : n.note);
  });
});
