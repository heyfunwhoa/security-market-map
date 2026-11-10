import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import { renderContext } from "./context-md";

const ROOT = join(__dirname, "..");

describe("context markdown export", () => {
  const files = renderContext();

  it("writes one file per seat and per category, plus the index and gaps", () => {
    const seatFiles = files.filter((f) => f.path.startsWith("context/seats/"));
    const categoryFiles = files.filter((f) => f.path.startsWith("context/categories/"));
    expect(seatFiles).toHaveLength(catalog.personas.length + catalog.stakeholders.length);
    expect(categoryFiles).toHaveLength(catalog.categories.length);
    expect(files.some((f) => f.path === "context/index.json")).toBe(true);
    const cloud = seatFiles.find((f) => f.path.endsWith("/cloud-sec.md"))!;
    expect(cloud.content).toMatch(/^---\nid: "cloud-sec"\ntype: "seat"/);
    expect(cloud.content).toContain("## Qualification questions");
  });

  it("matches the files on disk (run npm run context:md to update)", () => {
    if (process.env.UPDATE_CONTEXT_MD) {
      rmSync(join(ROOT, "context"), { recursive: true, force: true });
      for (const file of files) {
        mkdirSync(dirname(join(ROOT, file.path)), { recursive: true });
        writeFileSync(join(ROOT, file.path), file.content);
      }
    }
    for (const file of files) {
      const path = join(ROOT, file.path);
      expect(existsSync(path), file.path).toBe(true);
      expect(readFileSync(path, "utf8"), file.path).toBe(file.content);
    }
    const onDisk = ["seats", "categories"].flatMap((dir) => readdirSync(join(ROOT, "context", dir)).map((name) => `context/${dir}/${name}`));
    expect(onDisk.sort()).toEqual(files.filter((f) => /context\/(seats|categories)\//.test(f.path)).map((f) => f.path).sort());
  });
});
