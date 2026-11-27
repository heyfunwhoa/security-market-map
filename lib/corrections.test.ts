import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { correctionUrl } from "./corrections";
import { pageMetadata, shareDescription } from "./page-metadata";

describe("correction links", () => {
  it("pre-fills the issue form with the page, record and claim", () => {
    const url = new URL(correctionUrl({ path: "/vendors/entro", title: "Entro Security", record: "vendor:entro", claimId: "c-1" }));
    expect(url.origin + url.pathname).toBe("https://github.com/heyfunwhoa/security-market-map/issues/new");
    expect(url.searchParams.get("template")).toBe("correction.yml");
    expect(url.searchParams.get("title")).toBe("Correction: Entro Security");
    expect(url.searchParams.get("page")).toBe("https://security-market-map.vercel.app/vendors/entro");
    expect(url.searchParams.get("record")).toBe("vendor:entro");
    expect(url.searchParams.get("claim")).toBe("c-1");
  });

  it("uses field ids that exist in the issue form", () => {
    const form = readFileSync(".github/ISSUE_TEMPLATE/correction.yml", "utf8");
    for (const id of ["page", "record", "claim", "correction", "source"]) expect(form).toContain(`id: ${id}`);
  });
});

describe("page metadata", () => {
  it("keeps share descriptions to 160 characters on a word boundary", () => {
    const text = shareDescription("word ".repeat(80));
    expect(text.length).toBeLessThanOrEqual(160);
    expect(text.endsWith("…")).toBe(true);
  });

  it("sets a canonical URL and link-preview text", () => {
    const meta = pageMetadata({ title: "Entro Security", description: "Short.", path: "/vendors/entro" });
    expect(meta.alternates?.canonical).toBe("https://security-market-map.vercel.app/vendors/entro");
    expect(meta.openGraph?.description).toBe("Short.");
  });
});
