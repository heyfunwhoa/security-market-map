import { exaAdapter, firecrawlAdapter } from "../ingestion/adapters";
import { normalizeMonitoredUrl, retainText } from "./normalize";
import type { FixtureStatement } from "./schema";

export type RetrievedDocument = {
  url: string;
  title: string | null;
  publishedAt: string | null;
  text: string;
  statements: FixtureStatement[];
};

export type RetrievalRequest = {
  canonicalUrl: string;
  scope: "metadata" | "excerpt" | "full_text";
};

export type RetrievalResponse =
  | {
      ok: true;
      mode: "offline_fixture" | "mocked";
      document: RetrievedDocument;
    }
  | {
      ok: false;
      reason: "not_configured" | "live_not_enabled" | "fixture_missing";
    };

export type RetrievalAdapter = {
  readonly name: "fixture" | "firecrawl" | "exa";
  configured(): boolean;
  retrieve(request: RetrievalRequest): Promise<RetrievalResponse>;
};

export function applyScope(document: RetrievedDocument, scope: RetrievalRequest["scope"]): RetrievedDocument {
  const retained = retainText(document.text, scope);
  if (scope === "metadata") {
    return {
      url: document.url,
      title: document.title,
      publishedAt: document.publishedAt,
      text: "",
      statements: [],
    };
  }
  return {
    ...document,
    text: retained.normalizedText,
    statements: document.statements,
  };
}

export function fixtureRetrievalAdapter(fixtures: RetrievedDocument[]): RetrievalAdapter {
  const byUrl = new Map(fixtures.map((document) => [normalizeMonitoredUrl(document.url), document]));
  return {
    name: "fixture",
    configured: () => true,
    async retrieve(request) {
      const document = byUrl.get(normalizeMonitoredUrl(request.canonicalUrl));
      if (!document) return { ok: false, reason: "fixture_missing" };
      return {
        ok: true,
        mode: "offline_fixture",
        document: applyScope(document, request.scope),
      };
    },
  };
}

function guardedVendorAdapter(
  name: "firecrawl" | "exa",
  configured: () => boolean,
  fixture?: RetrievedDocument,
): RetrievalAdapter {
  return {
    name,
    configured,
    async retrieve(request) {
      if (fixture) {
        return {
          ok: true,
          mode: "mocked",
          document: applyScope(fixture, request.scope),
        };
      }
      if (!configured()) return { ok: false, reason: "not_configured" };
      return { ok: false, reason: "live_not_enabled" };
    },
  };
}

export function firecrawlRetrievalAdapter(fixture?: RetrievedDocument): RetrievalAdapter {
  return guardedVendorAdapter("firecrawl", () => firecrawlAdapter.configured(), fixture);
}

export function exaRetrievalAdapter(fixture?: RetrievedDocument): RetrievalAdapter {
  return guardedVendorAdapter("exa", () => exaAdapter.configured(), fixture);
}
