import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import { orphanCategoryOwners } from "./data/persona-connections";
import {
  committeeForStage,
  overlaysForSeat,
  seatContext,
  seatLinks,
  seats,
  seatsForCategory,
  seatsForUseCase,
  vendorsForSeat,
  whoCovers,
} from "./persona-graph";

describe("persona graph", () => {
  it("joins personas and stakeholders into one seat list", () => {
    const all = seats();
    expect(all).toHaveLength(catalog.personas.length + catalog.stakeholders.length);
    expect(all.find((seat) => seat.id === "procurement")?.kind).toBe("stakeholder");
  });

  it("gives every category at least one owning persona", () => {
    for (const category of catalog.categories) {
      expect(seatsForCategory(category.id).length, category.id).toBeGreaterThan(0);
    }
    for (const [categoryId, owners] of Object.entries(orphanCategoryOwners)) {
      const ids = seatsForCategory(categoryId).map((seat) => seat.id);
      expect(ids).toEqual(expect.arrayContaining(owners));
    }
  });

  it("links every use case to typed seats", () => {
    for (const useCase of catalog.useCases) {
      expect(seatsForUseCase(useCase.id).seats.length, useCase.id).toBeGreaterThan(0);
    }
    expect(seatsForUseCase("uc-detect").likelyBudget.map((seat) => seat.id)).toEqual(["appsec"]);
  });

  it("reads edges in both directions", () => {
    const cioLinks = seatLinks("cio");
    expect(cioLinks.some((link) => link.direction === "in" && link.seatId === "ciso" && link.edge.type === "reports-to")).toBe(true);
    expect(cioLinks.some((link) => link.direction === "out" && link.seatId === "it-security")).toBe(true);
  });

  it("builds a stage committee that shrinks at small companies", () => {
    const enterprise = committeeForStage("procurement-legal", "enterprise").map((seat) => seat.id);
    const small = committeeForStage("procurement-legal", "small").map((seat) => seat.id);
    expect(enterprise).toEqual(expect.arrayContaining(["procurement", "legal", "grc-owner"]));
    expect(small).not.toContain("procurement");
  });

  it("says who covers a seat that is missing at a size", () => {
    expect(whoCovers("ciso", "small").map((seat) => seat.id)).toEqual(["ceo-founder", "cto"]);
    expect(whoCovers("ciso", "enterprise").map((seat) => seat.id)).toEqual(["ciso"]);
    expect(whoCovers("appsec", "small").map((seat) => seat.id)).toEqual(["appsec", "developer", "cto"]);
  });

  it("finds vendors and overlays for a seat", () => {
    expect(vendorsForSeat("appsec").length).toBeGreaterThan(10);
    expect(vendorsForSeat("procurement")).toEqual([]);
    const cisoOverlays = overlaysForSeat("ciso");
    expect(cisoOverlays.find((item) => item.overlay.id === "financial-services-ny")?.mandated).toBe(true);
  });

  it("summarizes a seat in one call", () => {
    const context = seatContext("identity-security");
    expect(context?.useCases.length).toBeGreaterThan(2);
    expect(context?.whoCoversBySize.small).toEqual(["it-operations"]);
  });
});
