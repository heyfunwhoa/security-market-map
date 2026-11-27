import { describe, expect, it } from "vitest";
import { sourceKind, sourceMix, withoutAttribution } from "./source-kind";

describe("source kind", () => {
  it("groups source types by who said it", () => {
    expect(sourceKind("customer_story")).toBe("vendor");
    expect(sourceKind("analyst")).toBe("analyst");
    expect(sourceKind("news")).toBe("third-party");
    expect(sourceMix([{ sourceType: "vendor_marketing" }, { sourceType: "analyst" }])).toBe("1 vendor · 1 analyst · 0 third-party");
  });

  it("drops only a leading 'says' attribution", () => {
    expect(withoutAttribution("Palo Alto Networks says Koi's deployment portal rolls out the endpoint component.")).toBe("Koi's deployment portal rolls out the endpoint component.");
    expect(withoutAttribution("Island says each asset gets a risk score.")).toBe("Each asset gets a risk score.");
    expect(withoutAttribution("Bay says it was deployed across 150,000 endpoints.")).toBe("Bay says it was deployed across 150,000 endpoints.");
    expect(withoutAttribution("SACR describes Koi as a network supply-chain gateway.")).toBe("SACR describes Koi as a network supply-chain gateway.");
    expect(withoutAttribution("In a Palo Alto Networks customer story, Cogentrix reports 5,000 assets.")).toBe("In a Palo Alto Networks customer story, Cogentrix reports 5,000 assets.");
  });
});
