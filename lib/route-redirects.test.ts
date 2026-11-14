import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";

describe("moved routes", () => {
  it("permanently redirects the old incident lab address to the reviewer area", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    expect(redirects).toContainEqual({
      source: "/frameworks/incident-lab",
      destination: "/review/incident-lab",
      permanent: true,
    });
    expect(existsSync(join(process.cwd(), "app/review/incident-lab/page.tsx"))).toBe(true);
    // A page left at the old path would never render, because redirects run before the filesystem.
    expect(existsSync(join(process.cwd(), "app/frameworks/incident-lab"))).toBe(false);
  });
});
