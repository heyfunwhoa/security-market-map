import { describe, expect, it } from "vitest";
import { DEFINED_TERMS, splitTerms, termDefinition } from "./terms";

describe("hover definitions", () => {
  it("defines NHI, ITDR, CIEM, and IGA from existing data, and not SACR", () => {
    expect(DEFINED_TERMS.sort()).toEqual(["CIEM", "IGA", "ITDR", "NHI"]);
    expect(termDefinition("NHI")?.title).toBe("Non-human identity");
    expect(termDefinition("IGA")?.href).toBe("/categories/iga");
    expect(termDefinition("SACR")).toBeNull();
  });

  it("marks only the first use on a page", () => {
    const seen = new Set<string>();
    const first = splitTerms("IGA, PAM, and NHI. Then IGA again.", seen);
    expect(first.filter((part) => typeof part !== "string").map((part) => (part as { term: string }).term)).toEqual(["IGA", "NHI"]);
    expect(splitTerms("NHI and IGA", seen)).toEqual(["NHI and IGA"]);
  });
});
