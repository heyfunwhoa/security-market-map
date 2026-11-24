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
    lede: "Start with what happened on one device. A prevention verdict, a timeline of activity and a record of what someone did inside an application answer different questions.",
    body: [
      {
        heading: "EPP · Endpoint protection platform",
        text: "Which policy blocked or quarantined the installer? Check the verdict and whether the policy covered this device.",
        href: "/categories/endpoint-security",
      },
      {
        heading: "EDR · Endpoint detection and response",
        text: "If the installer ran, what did it launch and who can isolate the device? Ask how far back the process history goes and whether the original file is available.",
        href: "/categories/endpoint-security",
      },
      {
        heading: "ECP · Endpoint control and prevention",
        text: "SACR uses ECP for visibility and policy inside tools people use on the device. For example, could a team see or stop a coding assistant sending sensitive text to a service?",
        href: "/categories/endpoint-control",
      },
      {
        heading: "XDR · Extended detection and response",
        text: "Can the endpoint alert be connected to the same user's sign-in and email activity? Check which sources the buyer has connected.",
        href: "/categories/xdr",
      },
      {
        heading: "Detection by environment",
        text: "NDR looks at network traffic, ITDR at identity abuse and CDR at cloud activity. Each can contribute a different part of the same investigation.",
        href: "/domains/secops",
      },
      {
        heading: "Operating the investigation",
        text: "An SDPP routes events, a SIEM searches and correlates them, and SOAR runs response playbooks. AISOC describes AI-assisted SOC work. With MDR, a provider takes responsibility for agreed monitoring and response tasks.",
        href: "/categories/mdr",
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
