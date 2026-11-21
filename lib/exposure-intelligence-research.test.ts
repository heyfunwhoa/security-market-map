import { describe, expect, it } from "vitest";
import { categoryBySlug, vendorById } from "./catalog";
import research from "../research/easm-cti.json";

describe("November 2026 EASM and threat intelligence research", () => {
  const directories = Object.values(research.markets).map((market) =>
    market.groups.flatMap((group) => group.offerings),
  );

  it("keeps both directories complete and resolves existing catalog references", () => {
    for (const slug of Object.keys(research.markets)) expect(categoryBySlug(slug)?.id).toBe(slug);
    expect(directories.map((directory) => directory.length)).toEqual([25, 22]);
    for (const directory of directories) {
      expect(new Set(directory.map((row) => [row.company, row.offering].join("/"))).size).toBe(directory.length);
      for (const row of directory) {
        expect(row.sources.length).toBeGreaterThan(0);
        for (const url of row.sources) expect(new URL(url).protocol).toBe("https:");
        if ("catalogVendorId" in row && typeof row.catalogVendorId === "string") {
          expect(vendorById(row.catalogVendorId)?.id).toBe(row.catalogVendorId);
        }
      }
    }
  });

  it("pairs the documented offerings and their sources for each overlapping brand", () => {
    const [easm, cti] = directories;
    const shared = easm.filter((row) => cti.some((other) => other.company === row.company));
    expect(shared).toHaveLength(10);
    expect(research.overlap.map((row) => row.company).sort()).toEqual(shared.map((row) => row.company).sort());
    for (const pair of research.overlap) {
      const external = easm.find((row) => row.company === pair.company);
      const intel = cti.find((row) => row.company === pair.company);
      expect([pair.easm, pair.cti]).toEqual([external?.offering, intel?.offering]);
      expect(pair.sources).toEqual([external?.sources[0], intel?.sources[0]]);
    }
  });
});
