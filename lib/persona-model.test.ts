import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import { PERSONA_MODEL_VERSION, personaModel, renderTitlesAndPains } from "./persona-model";

const DOC = join(__dirname, "..", "docs", "market-research", "security-titles-and-pains.md");

describe("persona model export", () => {
  it("includes every seat with profile, titles, and acronyms", () => {
    const model = personaModel();
    expect(model.version).toBe(PERSONA_MODEL_VERSION);
    expect(model.seats).toHaveLength(catalog.personas.length + catalog.stakeholders.length);
    const appsec = model.seats.find((seat) => seat.id === "appsec");
    expect(appsec?.acronyms).toContain("AppSec");
    expect(appsec?.typicalTitles.manager).toContain("Application Security Manager");
    expect(appsec?.profile.pains.length).toBeGreaterThan(0);
    const sourceIds = new Set(catalog.sources.map((source) => source.id));
    for (const id of model.sourceIds) expect(sourceIds.has(id), id).toBe(true);
  });

  it("serializes to JSON", () => {
    expect(() => JSON.parse(JSON.stringify(personaModel()))).not.toThrow();
  });

  it("keeps the titles-and-pains doc in sync with the data", () => {
    const rendered = renderTitlesAndPains();
    if (process.env.UPDATE_PERSONA_DOCS) writeFileSync(DOC, rendered);
    expect(readFileSync(DOC, "utf8")).toBe(rendered);
  });
});
