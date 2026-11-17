/**
 * Sub-areas that used to live at /markets/*. They now render as anchored sections on
 * their canonical domain page, and the old routes redirect there (see next.config.ts).
 * Text is unchanged from the market-view pages.
 */
export type DomainSubArea = {
  title: string;
  lede: string;
  body: { heading: string; text: string; href?: string }[];
};

/** Keyed by the anchor id used on the domain page. */
export const domainSubAreas: Record<string, { domainId: string } & DomainSubArea> = {
  endpoint: {
    domainId: "corporate",
    title: "Endpoint security",
    lede: "EPP and EDR remain the device record. SACR's 22 Jul 2026 report, re-read 27 Oct 2026, defines endpoint control as visibility beyond the file and the process. That sentence does not replace endpoint detection. The five labels below are not capability cells.",
    body: [
      {
        heading: "EPP",
        text: "Endpoint protection tries to stop known-bad files and enforce device policy. It does not reconstruct an agent's tool calls.",
        href: "/categories/endpoint-security",
      },
      {
        heading: "EDR",
        text: "Endpoint detection records processes, files, and related activity, then helps an analyst respond. SACR's 22 Jul 2026 report expands visibility beyond that record into developer environments, SaaS applications, AI tools, and agent frameworks. It does not say the endpoint record is unnecessary, and it does not fill a detection cell.",
        href: "/categories/endpoint-security",
      },
      {
        heading: "XDR",
        text: "Extended detection correlates endpoint with other signals. It is a different purchase from a specialist that only watches local AI use.",
        href: "/categories/xdr",
      },
    ],
  },
  network: {
    domainId: "corporate",
    title: "Network and access security",
    lede: "The network decides which connection is allowed. It still depends on an identity, and it does not govern an agent tool call that never crosses the gateway.",
    body: [
      {
        heading: "Edge",
        text: "Firewalls, secure web gateways, ZTNA, and SASE are often one deal and several controls.",
        href: "/categories/network-edge",
      },
      {
        heading: "Microsegmentation",
        text: "Workload-to-workload policy is not the perimeter firewall and not an identity provider.",
        href: "/categories/microsegmentation",
      },
      {
        heading: "Identity",
        text: "Zero trust still needs a directory. The network does not certify access.",
        href: "/domains/identity",
      },
    ],
  },
  exposure: {
    domainId: "corporate",
    title: "Exposure management",
    lede: "Finding a weakness, finding an unknown internet-facing asset, and testing whether a control fires are three different jobs.",
    body: [
      {
        heading: "Vulnerability management",
        text: "Known assets and missing fixes. Not an AppSec scanner and not an external-discovery product by default.",
        href: "/categories/it-vulnerability-management",
      },
      {
        heading: "External attack surface",
        text: "Assets the inventory did not list. Discovery is not a patch priority.",
        href: "/categories/external-attack-surface",
      },
      {
        heading: "Validation",
        text: "Breach simulation checks whether a control noticed a technique. A missed technique is a detection gap to investigate, not a verdict on a product.",
        href: "/categories/breach-simulation",
      },
    ],
  },
};

export function subAreasForDomain(domainId: string) {
  return Object.entries(domainSubAreas)
    .filter(([, area]) => area.domainId === domainId)
    .map(([id, area]) => ({ id, ...area }));
}
