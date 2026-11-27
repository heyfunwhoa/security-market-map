import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AgentCoverage } from "@/components/agent-coverage";
import { catalog } from "./catalog";
import { AGENTS, agentCoverage, agentCoverageNotPublished } from "./agent-coverage";

describe("agent coverage", () => {
  it("only lists agents that the cited claim actually names, for that product", () => {
    for (const row of agentCoverage) {
      const claim = catalog.claims.find((item) => item.id === row.claimId);
      expect(claim, row.claimId).toBeDefined();
      expect(claim!.subjectId).toBe(row.productId);
      for (const key of row.agents) {
        const agent = AGENTS.find((item) => item.key === key)!;
        expect(agent.aliases.some((alias) => claim!.statement.includes(alias)), `${row.claimId} names ${agent.label}`).toBe(true);
      }
    }
  });

  it("names products without a public agent list instead of leaving them out", () => {
    for (const id of agentCoverageNotPublished) expect(catalog.products.some((p) => p.id === id)).toBe(true);
    const html = renderToStaticMarkup(createElement(AgentCoverage));
    expect(html).toContain("No public agent list recorded for:");
    expect(html).toContain("Bay platform");
    expect(html).toContain("not proof of no support");
    expect(html).toContain("<caption");
  });
});
