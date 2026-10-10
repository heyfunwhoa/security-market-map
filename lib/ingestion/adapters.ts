/**
 * Optional discovery adapters. Nothing in the app calls these at startup.
 * A future job may call `discover` only after a person submits a source,
 * then park the result in the human review queue.
 *
 * Phase 1 research checks do not call `discover`. Offline fixtures and mocked
 * responses live in `lib/research/adapters.ts`. Live Exa and Firecrawl
 * retrieval is not implemented.
 */

export type DiscoveredPage = {
  url: string;
  title: string;
  adapter: "firecrawl" | "exa" | "manual";
};

export interface DiscoveryAdapter {
  readonly name: "firecrawl" | "exa" | "manual";
  configured(): boolean;
  discover(input: { url?: string; query?: string }): Promise<DiscoveredPage[]>;
}

function missing(name: string): never {
  throw new Error(
    `${name} is not configured for this run. Add the key to the environment and review every extracted claim before it is published. This adapter is never called when the app starts.`,
  );
}

export const firecrawlAdapter: DiscoveryAdapter = {
  name: "firecrawl",
  configured: () => Boolean(process.env.FIRECRAWL_API_KEY),
  async discover() {
    if (!process.env.FIRECRAWL_API_KEY) missing("Firecrawl");
    missing("Firecrawl execution");
  },
};

export const exaAdapter: DiscoveryAdapter = {
  name: "exa",
  configured: () => Boolean(process.env.EXA_API_KEY),
  async discover() {
    if (!process.env.EXA_API_KEY) missing("Exa");
    missing("Exa execution");
  },
};
