import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contrastRatio, parseTokenBlock, TEXT_PAIRS } from "./theme-contrast";

const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
const themes = { light: parseTokenBlock(css, ":root"), dark: parseTokenBlock(css, ".dark") };

describe("theme tokens meet WCAG AA", () => {
  for (const [theme, tokens] of Object.entries(themes)) {
    for (const pair of TEXT_PAIRS) {
      it(`${theme}: ${pair.use} (${pair.fg} on ${pair.bg}) ≥ ${pair.min}:1`, () => {
        const ratio = contrastRatio(tokens[pair.fg], tokens[pair.bg]);
        expect(ratio, `${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(pair.min);
      });
    }
  }

  it("the OS-preference dark block matches the .dark class block exactly", () => {
    const start = css.indexOf("@media (prefers-color-scheme: dark)", css.indexOf(".dark {"));
    const media = parseTokenBlock(css.slice(start), ":root:not(.light)");
    expect(media).toEqual(themes.dark);
  });

  it("converts known reference colours correctly", () => {
    expect(contrastRatio("oklch(1 0 0)", "oklch(0 0 0)")).toBeCloseTo(21, 0);
    expect(contrastRatio("oklch(0.5 0 0)", "oklch(0.5 0 0)")).toBeCloseTo(1, 5);
  });

  it("parses the minified oklch form as well as the authored one", () => {
    expect(contrastRatio("oklch(93% .012 85)", "oklch(0.19 0.012 70)")).toBeCloseTo(
      contrastRatio("oklch(0.93 0.012 85)", "oklch(0.19 0.012 70)"),
      5,
    );
  });
});
