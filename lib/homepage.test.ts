import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "../app/page";
import { ATTACK_PATH, DomainExplorer } from "../components/domain-explorer";
import { catalog } from "./catalog";
import { domainClaimCounts } from "./domain-evidence";

const home = () => renderToStaticMarkup(createElement(HomePage));

describe("homepage", () => {
  it("shows one hero with at most two calls to action", () => {
    const html = home();
    expect(html.match(/<h1/g)).toHaveLength(1);
    const nav = html.match(/<nav aria-label="Start exploring"[^]*?<\/nav>/)?.[0] ?? "";
    expect(nav.match(/<a /g)).toHaveLength(2);
    expect(nav).toContain(">Browse by domain<");
    expect(nav).toContain('href="/landscape"');
    expect(html).toContain('action="/landscape"');
  });

  it("links every domain on the homepage before the existing buyer questions", () => {
    const html = home();
    expect(html).toContain('href="/domains/secops#secops-buyer-guide"');
    expect(html).toContain('href="/use-cases/customer-auth"');
    for (const domain of catalog.domains) expect(html).toContain(`href="/domains/${domain.slug}"`);
    expect(html.indexOf('id="market-domains"')).toBeLessThan(html.indexOf('id="questions-heading"'));
    expect(html).not.toContain("Market areas");
    expect(html).not.toContain("Nine buyer views");
    expect(html).not.toContain("/markets/");
  });

  it("links the methodology once instead of repeating disclaimers", () => {
    const html = home();
    expect(html).toContain('href="/methodology"');
    expect(html).not.toContain("Every tile is the same size");
    expect(html).not.toContain("does not indicate rank");
  });

  it("keeps a teaser to the glossary instead of the full distinctions", () => {
    const html = home();
    expect(html).toContain('href="/learn"');
    expect(html).not.toContain('id="distinctions"');
  });

  it("contains no em dashes in visible copy", () => {
    expect(home()).not.toContain("—");
  });
});

describe("attack path flow", () => {
  it("maps each step to real catalog domains and renders a keyboard-operable button per step", () => {
    const ids = new Set(catalog.domains.map((domain) => domain.id));
    for (const step of ATTACK_PATH) for (const id of step.domainIds) expect(ids.has(id)).toBe(true);
    const html = renderToStaticMarkup(
      createElement(DomainExplorer, { domains: catalog.domains, claimCounts: domainClaimCounts(catalog) }),
    );
    expect(html.match(/<button[^>]*aria-pressed="false"/g)).toHaveLength(ATTACK_PATH.length);
    expect(html).toContain('aria-live="polite"');
  });
});
