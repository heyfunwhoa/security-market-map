import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import { acronymGlossary, titleForms, titleRules } from "./data/titles";
import { seats } from "./persona-graph";
import { detectSeniority, matchTitle, normalizeTitle, seatsByFunction, typicalTitles } from "./title-match";

const top = (title: string) => matchTitle(title).candidates[0]?.seatId;

describe("title data", () => {
  const seatIds = new Set(seats().map((seat) => seat.id));

  it("references only real seats", () => {
    for (const entry of acronymGlossary) for (const id of entry.seatIds) expect(seatIds.has(id), `${entry.acronym} → ${id}`).toBe(true);
    for (const rule of titleRules) for (const id of rule.seatIds) expect(seatIds.has(id), `${rule.id} → ${id}`).toBe(true);
    for (const id of Object.keys(titleForms)) expect(seatIds.has(id), id).toBe(true);
  });

  it("has a title form for every seat and unique acronyms", () => {
    for (const id of seatIds) expect(titleForms[id], id).toBeDefined();
    const acronyms = acronymGlossary.map((entry) => entry.acronym.toLowerCase());
    expect(new Set(acronyms).size).toBe(acronyms.length);
  });

  it("gives every seat a function and pains", () => {
    for (const profile of catalog.personaProfiles) {
      expect(profile.function).toBeTruthy();
      expect(profile.pains.length).toBeGreaterThanOrEqual(2);
    }
    const grouped = seatsByFunction();
    expect(grouped.security.length).toBeGreaterThan(20);
    expect(grouped.engineering.map((seat) => seat.id)).toContain("cto");
    expect(grouped.security.find((seat) => seat.id === "appsec")?.acronyms).toEqual(expect.arrayContaining(["AppSec", "ASE"]));
  });
});

describe("seniority", () => {
  it.each([
    ["CISO", "c-level"],
    ["Founder & CEO", "c-level"],
    ["VP, Security Operations", "vp"],
    ["Head of AppSec", "director"],
    ["Senior Director of AppSec", "director"],
    ["Sr. Manager, Product Security", "manager"],
    ["Staff Software Engineer", "senior-ic"],
    ["Principal Security Architect", "senior-ic"],
    ["Detection Engineer", "ic"],
  ])("%s → %s", (title, level) => {
    expect(detectSeniority(normalizeTitle(title))).toBe(level);
  });
});

describe("matchTitle", () => {
  it.each([
    ["Sr. Manager, Product Security", "product-security"],
    ["Head of Security", "ciso"],
    ["VP of Security", "ciso"],
    ["Senior Cloud Security Engineer", "cloud-sec"],
    ["SOC 2 Compliance Manager", "grc-owner"],
    ["Sr. SOC Analyst", "soc-analyst"],
    ["VP, Security Operations", "soc-lead"],
    ["Director of Security Operations", "soc-lead"],
    ["VP Engineering", "cto"],
    ["Engineering Manager", "engineering-manager"],
    ["Staff Software Engineer", "developer"],
    ["Principal Security Architect", "security-architect"],
    ["Detection Engineer", "detection-engineer"],
    ["Threat Intelligence Analyst", "threat-intel"],
    ["Red Team Lead", "offensive-security"],
    ["AppSec Engineer", "appsec"],
    ["Systems Administrator", "it-operations"],
    ["Procurement Manager", "procurement"],
    ["General Counsel", "legal"],
    ["CFO", "cfo"],
    ["Chief Privacy Officer", "privacy"],
    ["Founder & CEO", "ceo-founder"],
    ["Board Member", "board-audit-committee"],
  ])("%s → %s", (title, seatId) => {
    expect(top(title)).toBe(seatId);
  });

  it.each(["Security Engineer", "DevSecOps Engineer", "Information Security Manager", "Security Analyst", "BISO", "IT Director"])(
    "flags %s as ambiguous",
    (title) => {
      const match = matchTitle(title);
      expect(match.ambiguous).toBe(true);
      expect(match.candidates.length).toBeGreaterThan(1);
      expect(match.notes.length).toBeGreaterThan(0);
    },
  );

  it("does not read SOC 2 as the security operations center", () => {
    const ids = matchTitle("SOC 2 Compliance Manager").candidates.map((candidate) => candidate.seatId);
    expect(ids).not.toContain("soc-lead");
    expect(ids).not.toContain("soc-analyst");
  });

  it("returns buying roles that fit the seniority", () => {
    expect(matchTitle("CISO").likelyBuyingRoles).toEqual(expect.arrayContaining(["economic-buyer"]));
    expect(matchTitle("Staff Software Engineer").likelyBuyingRoles).not.toContain("economic-buyer");
  });
});

describe("typicalTitles", () => {
  it("generates titles only for levels a seat reaches", () => {
    const appsec = typicalTitles("appsec");
    expect(appsec.ic).toContain("Application Security Engineer");
    expect(appsec.director).toContain("Director of Application Security");
    expect(appsec["c-level"]).toBeUndefined();
    expect(typicalTitles("ciso")["c-level"]).toEqual(expect.arrayContaining(["Chief Information Security Officer"]));
    expect(typicalTitles("soc-analyst").director).toBeUndefined();
  });

  it("round-trips generated titles back to their seat", () => {
    for (const id of ["appsec", "product-security", "cloud-sec", "detection-engineer", "threat-intel", "procurement"]) {
      for (const titles of Object.values(typicalTitles(id))) {
        for (const title of titles ?? []) {
          const ids = matchTitle(title).candidates.slice(0, 2).map((candidate) => candidate.seatId);
          expect(ids, `${title}`).toContain(id);
        }
      }
    }
  });
});
