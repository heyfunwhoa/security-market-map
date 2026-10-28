import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BuyerProblemDiscovery, type BuyerProblem } from "../components/buyer-problem-discovery";

const problems: BuyerProblem[] = [
  { id: "uc-vault", slug: "vault", name: "Secrets management", buyerQuestion: "How can workloads retrieve credentials?", problem: "Secure machine secrets", categories: [{ id: "secrets", name: "Secrets management" }] },
];

describe("buyer problem discovery", () => {
  it("exposes problem-first controls and a scoped use-case path", () => {
    const html = renderToStaticMarkup(createElement(BuyerProblemDiscovery, { problems }));
    expect(html).toContain("What problem are you trying to solve?");
    expect(html).toContain("How can workloads retrieve credentials?");
    expect(html).toContain('href="/use-cases/vault"');
    expect(html).toContain('id="problem-query"');
    expect(html).toContain('id="problem-category"');
    expect(html).toContain("Zoom out to all problems");
  });

  it("does not represent an empty inventory as a lack of real buyer problems", () => {
    const html = renderToStaticMarkup(createElement(BuyerProblemDiscovery, { problems: [] }));
    expect(html).toContain("Missing results are not proof");
    expect(html).toContain("No matching mapped buyer problem");
  });
});
