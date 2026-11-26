import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DecisionGuide } from "@/components/decision-guide";
import { decisionGuides, resolveDecisionGuide } from "./decision-guide";

describe("agentic endpoint decision guide", () => {
  const guide = resolveDecisionGuide("uc-agentic-endpoint")!;

  it("resolves every listed product, alphabetical within each approach", () => {
    const listed = decisionGuides["uc-agentic-endpoint"].groups.flatMap((group) => group.productIds);
    expect(guide.groups.flatMap((group) => group.rows.map((row) => row.product.id)).sort()).toEqual([...listed].sort());
    for (const group of guide.groups) {
      const names = group.rows.map((row) => row.product.name);
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    }
  });

  it("takes each cell from recorded evidence, not editorial judgment", () => {
    const status = (productId: string, capabilityId: string) =>
      guide.groups.flatMap((group) => group.rows).find((row) => row.product.id === productId)!
        .cells.find((cell) => cell.capability.id === capabilityId)!.status;
    expect(status("palo-alto-koi", "cap-agent-preexec-control")).toBe("evidenced");
    expect(status("island-agentic-endpoint-posture", "cap-agent-preexec-control")).not.toBe("evidenced");
    expect(status("backslash-agentic-endpoint", "cap-agent-session-context")).toBe("unknown");
  });

  it("renders an accessible table and nothing for other use cases", () => {
    const html = renderToStaticMarkup(createElement(DecisionGuide, { useCaseId: "uc-agentic-endpoint" }));
    expect(html).toContain("<caption");
    expect(html).toContain('scope="colgroup"');
    expect(html).toContain('href="/products/zenity-platform"');
    expect(html).toContain("not that the product lacks it");
    expect(renderToStaticMarkup(createElement(DecisionGuide, { useCaseId: "uc-detect" }))).toBe("");
  });
});
