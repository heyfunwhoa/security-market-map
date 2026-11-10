import { catalog, type Catalog } from "@/lib/catalog";

export type SeatTargetingCount = { seatId: string; count: number };
export type CategoryTargeting = { categoryId: string; vendorCount: number; seats: SeatTargetingCount[] };

/** Recorded vendors needed before a category's seat targeting is treated as a pattern. */
export const TARGETING_MIN_VENDORS = 3;

/** "N of M vendors target this seat" for one category, most-targeted seat first. */
export function targetingForCategory(categoryId: string, source: Catalog = catalog): CategoryTargeting {
  const rows = source.vendorSeatTargeting.filter((row) => row.categoryId === categoryId);
  const counts = new Map<string, number>();
  for (const row of rows) for (const id of new Set(row.seatIds)) counts.set(id, (counts.get(id) ?? 0) + 1);
  const seats = [...counts.entries()]
    .map(([seatId, count]) => ({ seatId, count }))
    .sort((a, b) => b.count - a.count || a.seatId.localeCompare(b.seatId));
  return { categoryId, vendorCount: rows.length, seats };
}

/** Seats that most recorded vendors (over half) target. */
export function majorityTargetedSeats(targeting: CategoryTargeting): string[] {
  return targeting.seats.filter((seat) => seat.count * 2 > targeting.vendorCount).map((seat) => seat.seatId);
}
