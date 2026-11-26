import { describe, expect, it } from "vitest";
import { aliasesFromGlossary, groupSearchHits, searchHits, type SearchHit } from "./search";
import { catalog, searchHits as catalogSearch, searchIndex } from "./catalog";

const hit = (kind: string, title: string, text = ""): SearchHit => ({ kind, title, text, href: `/${kind}/${title}` });

describe("ranked search", () => {
  const hits = [
    hit("Claim", "Acme says it finds entro-style secrets", "entro"),
    hit("Product", "Something", "works with Entro"),
    hit("Vendor", "Entro Security"),
    hit("Product", "Entro"),
  ];

  it("puts an exact title first, then titles that start with the word, then descriptions", () => {
    expect(searchHits("entro", hits).map((h) => h.title)).toEqual([
      "Entro",
      "Entro Security",
      "Acme says it finds entro-style secrets",
      "Something",
    ]);
  });

  it("caps claims so they cannot crowd out named records", () => {
    const many = Array.from({ length: 10 }, (_, i) => hit("Claim", `entro claim ${i}`));
    const results = searchHits("entro", [...many, hit("Vendor", "Entro Security")]);
    expect(results.filter((h) => h.kind === "Claim")).toHaveLength(2);
    expect(results[0].kind).toBe("Vendor");
  });

  it("ignores one-letter queries", () => {
    expect(searchHits("e", hits)).toEqual([]);
  });
});

describe("aliases from the glossary", () => {
  const aliases = aliasesFromGlossary(catalog.glossary);

  it("pairs acronyms with their full names", () => {
    expect(aliases.find((group) => group.includes("nhi"))).toContain("non-human identity");
    expect(aliases.find((group) => group.includes("edr"))).toContain("endpoint detection and response");
    expect(aliases.find((group) => group.includes("ciem"))).toContain("cloud infrastructure entitlement management");
  });

  it("finds the NHI category from either wording", () => {
    for (const query of ["NHI", "non-human identity"]) {
      expect(catalogSearch(query).some((h) => h.kind === "Category" && h.href === "/categories/nhi")).toBe(true);
    }
  });
});

describe("catalog search", () => {
  it("indexes buyer seats with working links", () => {
    const seats = searchIndex().filter((h) => h.kind === "Buyer seat");
    expect(seats.length).toBe(catalog.personas.length);
    expect(seats.every((h) => h.href.startsWith("/personas/"))).toBe(true);
    expect(catalogSearch("CISO").some((h) => h.kind === "Buyer seat")).toBe(true);
  });

  it("shows a named vendor before claims that mention it", () => {
    const results = catalogSearch("Entro");
    expect(["Vendor", "Product"]).toContain(results[0].kind);
  });

  it("groups results in the order of their best match", () => {
    const groups = groupSearchHits(catalogSearch("Entro"));
    expect(groups[0].label).toBe("Vendors and products");
    expect(groups.every((g) => g.hits.length <= 5)).toBe(true);
  });
});

describe("multi-word and common aliases", () => {
  it("matches every word in any order", () => {
    const results = searchHits("leaked key", [hit("Incident", "Key leaked in a public repo")]);
    expect(results).toHaveLength(1);
  });

  it("finds the PAM category from 'privileged access'", () => {
    expect(catalogSearch("privileged access").some((h) => h.kind === "Category" && /PAM/.test(h.title))).toBe(true);
  });
});
