import { describe, expect, it } from "vitest";
import { catalog, catalogProblems } from "@/lib/catalog";
import { gapReport } from "@/lib/gap-report";
import { majorityTargetedSeats, targetingForCategory, TARGETING_MIN_VENDORS } from "@/lib/vendor-targeting";

describe("vendor seat targeting", () => {
  it("covers fourteen contested categories with enough vendors", () => {
    const covered = [
      "secrets-detection", "secrets-management", "aspm", "sast", "sca", "itdr", "cnapp", "nhi",
      "workforce-identity", "endpoint-security", "cloud-detection", "container-security", "dlp", "siem",
    ].filter(
      (id) => targetingForCategory(id).vendorCount >= TARGETING_MIN_VENDORS,
    );
    expect(covered).toHaveLength(14);
  });

  it("counts each vendor once per seat", () => {
    const t = targetingForCategory("secrets-detection");
    expect(t.vendorCount).toBe(4);
    expect(t.seats.find((s) => s.seatId === "appsec")?.count).toBe(4);
    expect(majorityTargetedSeats(t)).toEqual(["appsec", "developer"]);
  });

  it("only uses vendor-owned sources and real dates", () => {
    for (const row of catalog.vendorSeatTargeting) {
      expect(row.checkedAt <= "2026-11-10").toBe(true);
      expect(row.basis.startsWith("vendor-")).toBe(true);
    }
  });

  it("keeps the contested-ownership gap open and adds vendor counts as context", () => {
    const gaps = gapReport(catalog, new Date("2026-11-09")).filter((gap) => gap.kind === "contested-ownership");
    const secrets = gaps.find((gap) => gap.subjectId === "secrets-detection");
    expect(secrets?.message).toContain("Vendors mostly pitch appsec, developer");
    expect(gaps.find((gap) => gap.subjectId === "soar")?.message).not.toContain("Vendors mostly pitch");
  });

  it("shows mentioned seats without counting them", () => {
    const t = targetingForCategory("dlp");
    expect(t.seats.find((s) => s.seatId === "privacy")).toBeUndefined();
    const code42 = catalog.vendorSeatTargeting.find((r) => r.vendorId === "code42");
    expect(code42?.mentionedSeatIds).toEqual(["ciso", "privacy"]);
  });

  it("rejects a seat listed as both pitched and mentioned", () => {
    const row = { ...catalog.vendorSeatTargeting[0], mentionedSeatIds: [catalog.vendorSeatTargeting[0].seatIds[0]] };
    expect(catalogProblems({ ...catalog, vendorSeatTargeting: [row] }).some((p) => p.includes("both pitched and mentioned"))).toBe(true);
  });

  it("rejects targeting for a vendor outside the category", () => {
    const broken = { ...catalog, vendorSeatTargeting: [{ ...catalog.vendorSeatTargeting[0], categoryId: "siem" }] };
    expect(catalogProblems(broken).some((p) => p.includes("not mapped to that category"))).toBe(true);
  });
});
