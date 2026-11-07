import type { SizePresenceInput } from "../schema";

type Presence = SizePresenceInput;

const withNote = (value: Presence, note?: string): Presence => (note ? { ...value, note } : value);

export const dedicated = (note?: string): Presence => withNote({ presence: "dedicated" }, note);
export const shared = (coveredBy: string[], note?: string): Presence => withNote({ presence: "shared", coveredBy }, note);
export const absent = (coveredBy: string[], note?: string): Presence =>
  withNote({ presence: "usually-absent", coveredBy }, note);
export const external = (note?: string): Presence => withNote({ presence: "external" }, note);

export const sizes = (small: Presence, midMarket: Presence, enterprise: Presence) => ({
  small,
  "mid-market": midMarket,
  enterprise,
});
