import { catalog, type Catalog } from "./catalog";
import type { CompanySize, DealStage, PersonaEdge, PersonaProfile, SegmentOverlay } from "./schema";

/**
 * Read helpers that join seats (personas + stakeholders) to edges, use cases, categories, vendors,
 * company sizes, deal stages, and segment overlays. Pure functions over the catalog.
 */

export type Seat = {
  id: string;
  name: string;
  kind: "persona" | "stakeholder";
  categoryIds: string[];
  profile: PersonaProfile;
};

export type SeatLink = { seatId: string; direction: "out" | "in"; edge: PersonaEdge };

export function seats(source: Catalog = catalog): Seat[] {
  const profileById = new Map(source.personaProfiles.map((profile) => [profile.personaId, profile]));
  const result: Seat[] = [];
  for (const persona of source.personas) {
    const profile = profileById.get(persona.id);
    if (profile) result.push({ id: persona.id, name: persona.name, kind: "persona", categoryIds: persona.categoryIds, profile });
  }
  for (const stakeholder of source.stakeholders) {
    const profile = profileById.get(stakeholder.id);
    if (profile) result.push({ id: stakeholder.id, name: stakeholder.name, kind: "stakeholder", categoryIds: [], profile });
  }
  return result;
}

export function seatById(id: string, source: Catalog = catalog): Seat | undefined {
  return seats(source).find((seat) => seat.id === id);
}

/** Edges leaving the seat and edges pointing at it. */
export function seatLinks(id: string, source: Catalog = catalog): SeatLink[] {
  const links: SeatLink[] = [];
  for (const profile of source.personaProfiles) {
    for (const edge of profile.edges) {
      if (profile.personaId === id) links.push({ seatId: edge.toPersonaId, direction: "out", edge });
      else if (edge.toPersonaId === id) links.push({ seatId: profile.personaId, direction: "in", edge });
    }
  }
  return links;
}

export function seatsForCategory(categoryId: string, source: Catalog = catalog): Seat[] {
  return seats(source).filter((seat) => seat.categoryIds.includes(categoryId));
}

export function linkedUseCasesForSeat(id: string, source: Catalog = catalog) {
  const linked = source.useCaseSeats.filter((link) => link.seatIds.includes(id) || link.likelyBudgetSeatIds.includes(id));
  return linked.flatMap((link) => {
    const useCase = source.useCases.find((item) => item.id === link.useCaseId);
    return useCase ? [{ useCase, likelyBudget: link.likelyBudgetSeatIds.includes(id) }] : [];
  });
}

export function seatsForUseCase(useCaseId: string, source: Catalog = catalog) {
  const link = source.useCaseSeats.find((item) => item.useCaseId === useCaseId);
  if (!link) return { seats: [] as Seat[], likelyBudget: [] as Seat[], unmodeled: [] as string[] };
  const all = seats(source);
  const pick = (ids: string[]) => ids.flatMap((id) => all.filter((seat) => seat.id === id));
  return { seats: pick(link.seatIds), likelyBudget: pick(link.likelyBudgetSeatIds), unmodeled: link.unmodeledStakeholders };
}

/** Vendors whose primary categories overlap the seat's categories, most overlap first. */
export function vendorsForSeat(id: string, source: Catalog = catalog) {
  const seat = seatById(id, source);
  if (!seat || seat.categoryIds.length === 0) return [];
  const wanted = new Set(seat.categoryIds);
  return source.vendors
    .map((vendor) => ({ vendor, overlap: vendor.primaryCategoryIds.filter((categoryId) => wanted.has(categoryId)) }))
    .filter((item) => item.overlap.length > 0)
    .sort((a, b) => b.overlap.length - a.overlap.length || a.vendor.name.localeCompare(b.vendor.name));
}

/** Seats that usually appear at a stage. Optional size drops seats usually absent at that size. */
export function committeeForStage(stage: DealStage, size?: CompanySize, source: Catalog = catalog): Seat[] {
  return seats(source).filter((seat) => {
    if (!seat.profile.dealStages.includes(stage)) return false;
    if (!size) return true;
    const presence = seat.profile.bySize[size].presence;
    return presence !== "usually-absent";
  });
}

/** Who actually does a seat's work at a given size: the seat itself, or the seats that cover it. */
export function whoCovers(id: string, size: CompanySize, source: Catalog = catalog): Seat[] {
  const seat = seatById(id, source);
  if (!seat) return [];
  const presence = seat.profile.bySize[size];
  if (presence.presence === "dedicated" || presence.presence === "external") return [seat];
  const covering = presence.coveredBy.flatMap((coverId) => seats(source).filter((item) => item.id === coverId));
  return presence.presence === "shared" ? [seat, ...covering] : covering;
}

export function overlaysForSeat(id: string, source: Catalog = catalog): { overlay: SegmentOverlay; mandated: boolean }[] {
  return source.segmentOverlays
    .filter((overlay) => overlay.elevatedPersonaIds.includes(id) || overlay.mandatedSeats.some((seat) => seat.personaId === id))
    .map((overlay) => ({ overlay, mandated: overlay.mandatedSeats.some((seat) => seat.personaId === id) }));
}

/** One-call summary for a seat — useful for a future persona page or account prep. */
export function seatContext(id: string, source: Catalog = catalog) {
  const seat = seatById(id, source);
  if (!seat) return undefined;
  return {
    seat,
    links: seatLinks(id, source),
    useCases: linkedUseCasesForSeat(id, source),
    vendors: vendorsForSeat(id, source),
    overlays: overlaysForSeat(id, source),
    whoCoversBySize: {
      small: whoCovers(id, "small", source).map((item) => item.id),
      "mid-market": whoCovers(id, "mid-market", source).map((item) => item.id),
      enterprise: whoCovers(id, "enterprise", source).map((item) => item.id),
    },
  };
}

/** Seats whose pains a category addresses: "who feels the problem this category solves". */
export function painsForCategory(categoryId: string, source: Catalog = catalog) {
  return seats(source).flatMap((seat) =>
    seat.profile.pains
      .filter((pain) => pain.relatedCategoryIds.includes(categoryId))
      .map((pain) => ({ seat, pain })),
  );
}

/** Seats whose pains a use case addresses. */
export function painsForUseCase(useCaseId: string, source: Catalog = catalog) {
  return seats(source).flatMap((seat) =>
    seat.profile.pains.filter((pain) => pain.relatedUseCaseIds.includes(useCaseId)).map((pain) => ({ seat, pain })),
  );
}
