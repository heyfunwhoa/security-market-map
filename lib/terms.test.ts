import { describe, expect, it } from "vitest";
import { DEFINED_TERMS, splitTerms, termDefinition } from "./terms";

describe("hover definitions", () => {
  it("resolves every listed acronym to existing data", () => {
    for (const acronym of DEFINED_TERMS) {
      const definition = termDefinition(acronym);
      expect(definition, acronym).not.toBeNull();
      expect(definition?.definition.length).toBeGreaterThan(20);
      expect(definition?.definition).not.toContain("\u2014");
    }
    expect(termDefinition("NHI")?.title).toBe("Non-human identity");
    expect(termDefinition("IGA")?.href).toBe("/categories/iga");
    expect(termDefinition("ZTNA")).toBeNull();
  });

  it("defines SACR from the source ledger, not from new text", () => {
    const sacr = termDefinition("SACR");
    expect(sacr?.title).toBe("Software Analyst Cyber Research");
    expect(sacr?.href).toBe("/sources");
    expect(sacr?.definition).toMatch(/^An analyst publisher this map cites\. \d+ of its pages are on the source ledger\./);
  });

  it("marks only the first use on a page", () => {
    const seen = new Set<string>();
    const first = splitTerms("IGA, PAM, and NHI. Then IGA again.", seen);
    expect(first.filter((part) => typeof part !== "string").map((part) => (part as { term: string }).term)).toEqual(["IGA", "PAM", "NHI"]);
    expect(splitTerms("NHI and IGA", seen)).toEqual(["NHI and IGA"]);
  });
});
