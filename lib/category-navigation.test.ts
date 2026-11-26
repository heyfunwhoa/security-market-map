import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CategoryIndex from "../app/categories/page";
import CategoryPage from "../app/categories/[slug]/page";
import { catalog } from "./catalog";

const indexMarkup = async (q?: string) =>
  renderToStaticMarkup(await CategoryIndex({ searchParams: Promise.resolve({ q }) }));

describe("category navigation", () => {
  it("indexes each catalog category once under its display name", async () => {
    const html = await indexMarkup();
    for (const category of catalog.categories) {
      expect(html.split(`href="/categories/${category.slug}"`)).toHaveLength(2);
    }
  });

  it("finds the same entry by acronym and by full name, and offers a reset for zero matches", async () => {
    for (const q of ["siem", "SECURITY INFORMATION AND EVENT MANAGEMENT"]) {
      const html = await indexMarkup(q);
      expect(html).toContain('href="/categories/siem"');
      expect(html).not.toContain('href="/categories/soar"');
    }
    const empty = await indexMarkup("missing-example-123");
    expect(empty).toContain("Show all categories");
    expect(empty).not.toContain('aria-label="Jump to a letter"');
  });

  it("links the recorded parent domains and places the buyer question and roster before workflow", async () => {
    for (const slug of ["ciam", "secrets-detection"]) {
      const category = catalog.categories.find((item) => item.slug === slug)!;
      const html = renderToStaticMarkup(await CategoryPage({ params: Promise.resolve({ slug }) }));
      const breadcrumb = html.match(/<nav aria-label="Breadcrumb"[^]*?<\/nav>/)?.[0] ?? "";
      for (const domain of catalog.domains) {
        expect(breadcrumb.includes(`href="/domains/${domain.slug}"`)).toBe(category.domainIds.includes(domain.id));
      }
      const sections = ["category-buyer", "category-products", "category-workflow", "category-adjacent", "category-evidence"];
      const positions = sections.map((id) => html.indexOf(`id="${id}"`));
      expect(positions.every((pos) => pos >= 0)).toBe(true);
      expect(positions).toEqual([...positions].sort((a, b) => a - b));
    }
  });
});
