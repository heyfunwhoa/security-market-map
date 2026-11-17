import { describe, expect, it } from "vitest";
import { evidenceBasis, noteWithoutCaveat } from "./claim-basis";

describe("claim card caveats", () => {
  it("drops the repeated publisher caveat and keeps the rest of the note", () => {
    expect(
      noteWithoutCaveat("Confirm the edition. Publisher-reported, not independently tested; no direct-competitor claim."),
    ).toBe("Confirm the edition. No direct-competitor claim.");
    expect(noteWithoutCaveat("Publisher-reported, not independently tested.")).toBe("");
    expect(noteWithoutCaveat("Plain note.")).toBe("Plain note.");
    expect(noteWithoutCaveat(null)).toBe("");
  });

  it("explains vendor-published claims in one short line for the badge tooltip", () => {
    expect(evidenceBasis({ verificationStatus: "vendor_published", sourceType: "vendor_marketing" })).toBe(
      "Vendor published. Not independently tested.",
    );
  });
});
