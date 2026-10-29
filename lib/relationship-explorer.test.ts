import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RelationshipExplorer, type RelationshipEntry } from "../components/relationship-explorer";

const sample: RelationshipEntry[] = [{
  id: "rel-example", fromId: "vault", toId: "dsv", fromName: "Vault",
  toName: "DevOps Secrets Vault", fromSlug: "hashicorp", toSlug: "delinea",
  type: "complement", useCaseId: "uc-vault", useCaseName: "Machine secrets",
  rationale: "Editorial scenario scoped to machine secret delivery.",
  sourceUrl: null, sourceTitle: null,
}];

describe("relationship explorer", () => {
  it("shows source gaps and scoped relationship rationale without implying parity", () => {
    const html = renderToStaticMarkup(createElement(RelationshipExplorer, { entries: sample }));
    expect(html).toContain("Explore product relationships");
    expect(html).toContain("Machine secrets");
    expect(html).toContain("Editorial scenario scoped");
    expect(html).toContain("No linked source");
    expect(html).toContain("not a universal competitor");
    expect(html).toContain('href="/vendors/delinea"');
  });

  it("has native keyboard-operable filters and a reset control", () => {
    const html = renderToStaticMarkup(createElement(RelationshipExplorer, { entries: sample }));
    expect(html).toContain('id="edge-product"');
    expect(html).toContain('id="edge-use"');
    expect(html).toContain('id="edge-kind"');
    expect(html).toContain("Show all relationships");
  });

  it("represents an empty map as unknown, not disproof", () => {
    const html = renderToStaticMarkup(createElement(RelationshipExplorer, { entries: [] }));
    expect(html).toContain("This means unknown");
  });
});
