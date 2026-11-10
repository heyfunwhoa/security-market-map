import { describe, expect, it } from "vitest";
import { catalog, catalogProblems } from "@/lib/catalog";
import { gapReport } from "@/lib/gap-report";
import { majorityTargetedSeats, targetingForCategory, TARGETING_MIN_VENDORS } from "@/lib/vendor-targeting";

describe("vendor seat targeting", () => {
  it("covers eight contested categories with enough vendors", () => {
    const covered = ["secrets-detection", "secrets-management", "aspm", "sast", "sca", "itdr", "cnapp", "nhi"].filter(
      (id) => targetingForCategory(id).vendorCount >= TARGETING_MIN_VENDORS,
    );
    expect(covered).toHaveLength(8);
  });

  it("counts each vendor once per seat", () => {
    const t = targetingForCategory("secrets-detection");
    expect(t.vendorCount).toBe(4);
    expect(t.seats.find((s) => s.seatId === "appsec")?.count).toBe(4);
    expect(majorityTargetedSeats(t)).toEqual(["appsec", "developer"]);
  });

  it("only uses vendor-owned sources and real dates", () => {
    for (const row of catalog.vendorSeatTargeting) {
      expect(row.checkedAt <= "2026-11-09").toBe(true);
      expect(row.basis.startsWith("vendor-")).toBe(true);
    }
  });

  it("drops the contested-ownership gap once vendor targeting is recorded", () => {
    const contested = gapReport(catalog, new Date("2026-11-09")).filter((gap) => gap.kind === "contested-ownership").map((gap) => gap.subjectId);
    expect(contested).not.toContain("secrets-detection");
    expect(contested).not.toContain("secrets-management");
    expect(contested).not.toContain("aspm");
    expect(contested).not.toContain("itdr");
    expect(contested).toContain("siem");
  });

  it("rejects targeting for a vendor outside the category", () => {
    const broken = { ...catalog, vendorSeatTargeting: [{ ...catalog.vendorSeatTargeting[0], categoryId: "siem" }] };
    expect(catalogProblems(broken).some((p) => p.includes("not mapped to that category"))).toBe(true);
  });
});
