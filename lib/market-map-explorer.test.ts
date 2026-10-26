import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MarketMapExplorer } from "../components/market-map-explorer";
import { marketAreas } from "./market-areas";

const render = () => renderToStaticMarkup(createElement(MarketMapExplorer));

describe("market map explorer", () => {
  it("keeps the illustrative incident path separate from the market-area picker", () => {
    const html = render();
    expect(html).toContain("Illustrative path through an environment");
    expect(html).toContain("A sequence, not a coverage claim");
    expect(html).toContain('href="/attack-path"');
    expect(html).toContain("Market areas");
    expect(html).toContain("All areas have equal visual weight");
  });

  it("renders every market area as an equal-weight, keyboard-operable selection", () => {
    const html = render();
    const selectedButtons = html.match(/<button[^>]*aria-pressed=/g) ?? [];

    expect(selectedButtons).toHaveLength(marketAreas.length);
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('aria-pressed="false"');
    expect(html).toContain('aria-live="polite"');

    for (const area of marketAreas) {
      expect(html).toContain(area.name);
      expect(html).toContain(area.question);
      expect(area.href.startsWith("/")).toBe(true);
    }
  });

  it("labels example vendors as illustrative and keeps an explicit detail link", () => {
    const html = render();
    expect(html).toContain("Illustrative vendors");
    expect(html).toContain("Open this area");
    expect(html).toContain('href="/domains/identity"');
  });
});
