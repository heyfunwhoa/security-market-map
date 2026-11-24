import type { CatalogEvent, CustomerStory, PricingSignal, Source } from "../schema";
import type { MarketProfile } from "./ciam-profiles";
import { registerProductEvidence, type ProductEvidence } from "./public-monitoring";

// SecOps product profiles for the alert-investigation use case (uc-alert-investigation).
// Same shape as the CIAM profiles. Every URL and statement was read from a search
// excerpt and then re-read in full on 2026-11-24. Buyer, action, control, evidence,
// limitation and questions are editorial and untested.
export const secopsProfiles = {
  "stairwell-platform": {
    vendorId: "stairwell",
    publisher: "Stairwell",
    buyer: "A SOC, threat-intel or incident-response lead at a company that already runs an EDR. The question it answers is whether anything the EDR let through is still in the environment, so the budget usually sits beside the EDR rather than replacing it.",
    action: "An EDR alert, a new threat report or a new YARA rule names a file or a family of files.",
    control: "Stairwell already holds every executable its forwarder collected. It re-analyzes that history against the new intelligence and returns matches, variants and the machines that held them.",
    evidence: "In a pilot, take a hash from a recent public report. Record whether Stairwell finds it or a variant, which hosts it lists, and how far back the file history goes.",
    limitation: "A file history only covers machines running the forwarder and file types it was set to collect. Finding a file does not show that it executed or what it did. Response still runs through the EDR or SOAR.",
    questions: [
      "Which of our machines and file types would the forwarder cover, and which would it miss (appliances, build servers, unmanaged devices)?",
      "When a new report lands, how long until we get a yes or no for our environment, and who receives it: the SIEM, the SOAR, or a person?",
    ],
    owner: {
      statement: "Stairwell is an independent company. It announced a $45M Series B led by Section 32 on October 11, 2022, with Sequoia Capital and Accel also investing.",
      title: "Stairwell Announces $45M Series B Funding Round",
      publisher: "Stairwell",
      url: "https://stairwell.com/coverage/stairwell-announces-45m-series-b-funding-round/",
      publishedAt: "2022-10-11",
    },
    workflow: {
      title: "How Stairwell Works",
      url: "https://docs.stairwell.com/docs/how-stairwell-works",
      section: "What is the core loop?",
      statement: "Stairwell says a forwarder collects executables and scripts from Windows, macOS and Linux machines, and Stairwell keeps them and re-analyzes them as detection improves.",
      caveat: "Collection scope depends on the file formats chosen and the machines enrolled. Check coverage before treating a no-match as an all-clear.",
    },
    pricing: {
      url: "https://stairwell.com/store/",
      section: "How it works",
      statement: "Stairwell says its file storage requires no additional log storage costs or ingestion fees.",
      caveat: "That says what is not billed, not what is. The per-asset model on Stairwell's pricing page was not re-read here. Get a quote on asset count and any high-load servers.",
    },
    customer: {
      title: "Case study: FOX Corporation",
      url: "https://stairwell.com/resources/case-study-fox-corporation/",
      summary: "Stairwell says the FOX team credits it with finding threats that their firewall, EDR and SIEM did not detect.",
    },
  },
  "google-secops": {
    vendorId: "google",
    publisher: "Google Cloud",
    buyer: "A SOC lead consolidating SIEM and SOAR, often on Google Cloud already. Security engineering runs ingestion and parsers. Analysts work cases. Finance watches ingestion volume, because that is what the bill tracks.",
    action: "Logs from EDR, identity, network and cloud sources arrive and a detection rule opens a case.",
    control: "Google SecOps correlates the data and can run SOAR playbooks against the case, enriching it from connected tools and orchestrating response actions.",
    evidence: "In a pilot, ingest one EDR source and one identity source. Trigger a test detection and record the time from event to case, which enrichment ran, and what the playbook changed.",
    limitation: "Ingestion and a case do not mean the right data was parsed or that a playbook action succeeded downstream. Verify parsers for your log types and check each response action in the target tool.",
    questions: [
      "What is our daily ingestion today, and which sources would we drop or filter to stay inside the package?",
      "Which of our response actions would run through SecOps playbooks, and which stay in the EDR console?",
    ],
    owner: {
      statement: "Google Security Operations is a Google Cloud product, sold in packages through Google Cloud.",
      title: "Google Security Operations",
      publisher: "Google Cloud",
      url: "https://cloud.google.com/security/products/security-operations",
    },
    workflow: {
      title: "Google Security Operations — Respond",
      url: "https://cloud.google.com/security/products/security-orchestration-automation-response",
      section: "Respond with speed and precision",
      statement: "Google says SecOps playbooks orchestrate hundreds of tools and automate common scenarios such as phishing and ransomware, and that analysts coordinate on a case wall. Its pricing table lists 300+ SOAR integrations.",
      caveat: "The integration count is publisher-reported. Check the specific integrations and actions your playbooks need.",
    },
    pricing: {
      url: "https://docs.cloud.google.com/chronicle/docs/secops/secops-packages",
      section: "Google SecOps packages overview",
      statement: "Google offers SecOps in Standard, Enterprise and Enterprise Plus packages, priced on ingestion volume. Standard includes 12 months of hot data retention.",
      caveat: "Google's billing docs describe a credit balance that metered ingestion draws down. Model peak and growth volume, not just today's average.",
    },
    customer: {
      title: "Pasco Sheriff's Office case study",
      url: "https://cloud.google.com/customers/pascosheriffsoffice",
      summary: "Google says Pasco Sheriff's Office cut resolution time for simple alerts from an hour to 10 minutes and reduced false positives with Gemini in SecOps.",
    },
  },
  "cortex-xsoar": {
    vendorId: "palo-alto-networks",
    publisher: "Palo Alto Networks",
    buyer: "A SOC manager or MSSP operations lead with more alerts than analysts. Security engineers build and maintain the playbooks. The bill grows with the number of users, so the team that writes content and the team that works cases both count.",
    action: "A SIEM, EDR, threat intel feed or mailbox sends an alert or indicator into XSOAR as an incident.",
    control: "XSOAR runs a playbook that enriches the incident from other tools and either closes it, escalates it to an analyst, or takes a response action.",
    evidence: "In a pilot, pick one high-volume alert type. Record how many incidents the playbook closes without a person, how many it escalates, and one response action verified in the target tool.",
    limitation: "A playbook is only as good as its integrations and the person maintaining it. An auto-closed incident is a decision someone encoded, not proof the alert was benign.",
    questions: [
      "Who will own playbook maintenance after the first year, and how many licensed users does that add?",
      "Which of our top five alert types can a playbook close safely, and which must always reach a person?",
    ],
    owner: {
      statement: "Palo Alto Networks introduced Cortex XSOAR on February 24, 2020, as an extended security orchestration, automation and response platform.",
      title: "Palo Alto Networks Introduces Cortex XSOAR",
      publisher: "Palo Alto Networks",
      url: "https://investors.paloaltonetworks.com/news-releases/news-release-details/palo-alto-networks-introduces-cortex-xsoar-redefines-security",
      publishedAt: "2020-02-24",
    },
    workflow: {
      title: "What is Cortex XSOAR?",
      url: "https://cortex-docs.paloaltonetworks.com/cortex-xsoar-8-on-prem/8.8/learn-about-cortex-xsoar/get-started-with-cortex-xsoar/what-is-cortex-xsoar",
      section: "What is Cortex XSOAR?",
      statement: "Palo Alto Networks says XSOAR ingests alerts and indicators from SIEMs, network tools, threat intel feeds and mailboxes, then runs playbooks to enrich and respond.",
      caveat: "Integration depth varies by content pack. Test the specific enrichment and response actions you need.",
    },
    pricing: {
      url: "https://cortex-docs.paloaltonetworks.com/cortex-xsoar-8-saas/learn-about-cortex-xsoar/understand-cortex-xsoar-licenses",
      section: "Understand Cortex XSOAR licenses",
      statement: "Palo Alto Networks says Cortex XSOAR requires a yearly license per user, with multi-year licenses available. Editions include Enterprise, Threat Intel Management and Starter.",
      caveat: "Edition quotas differ, for example on incident-triggered automations. Count every builder and analyst who needs a seat.",
    },
    customer: {
      title: "Sitecore achieves 90% SOC automation with Cortex XSOAR",
      url: "https://www.paloaltonetworks.com/customers/sitecore-achieves-90-percentage-soc-automation-with-cortex-xsoar",
      summary: "Palo Alto Networks says Sitecore automated 90% of SOC security events, with up to 45,000 events a week handled by two analysts.",
    },
  },
  "tines-platform": {
    vendorId: "tines",
    publisher: "Tines",
    buyer: "A security engineering or SecOps lead who wants automation without a dedicated SOAR team. Tines also sells to IT teams, so the budget may sit outside security. A free Community Edition often comes before a purchase.",
    action: "An alert, ticket or chat request arrives from a connected tool, such as a CrowdStrike incident.",
    control: "A Tines workflow enriches it, applies AI or deterministic steps, routes approvals to a person where needed, and takes the response action.",
    evidence: "In a pilot, rebuild one existing manual triage process in Community Edition. Record run time before and after, and which step still needs a human approval.",
    limitation: "Tines runs the workflow the team designs. It does not supply the detection, the file verdict or the threat intelligence; those come from connected tools.",
    questions: [
      "Which teams outside security would build on Tines, and does that change who owns the budget and the platform?",
      "Will we hit Community Edition limits on builders, workflows or daily events during the pilot, and what does the paid tier change?",
    ],
    owner: {
      statement: "Tines publishes the self-serve subscription terms that govern its Community Edition and paid self-serve plans.",
      title: "Tines self-serve subscription terms",
      publisher: "Tines",
      url: "https://www.tines.com/self-serve-subscription-terms/",
      publishedAt: "2026-07-14",
    },
    workflow: {
      title: "Solutions for Security",
      url: "https://www.tines.com/solutions/security/",
      section: "Security solutions",
      statement: "Tines says teams can connect any vendor and use AI to enrich alerts, cut alert fatigue, and let AI agents create, triage and resolve cases at the level of autonomy they choose.",
      caveat: "The page doesn't describe containment or remediation steps. Check which response actions your workflows would take and which run with or without AI.",
    },
    pricing: {
      url: "https://explained.tines.com/en/articles/9620399-understanding-tines-pricing-and-packaging",
      section: "Understanding Tines pricing and packaging",
      statement: "Tines offers a free Community Edition for learning and proofs of concept, plus paid Business and Enterprise editions, both also available self-hosted. Its terms say some features, including AI credits, may carry usage-based charges.",
      caveat: "Community Edition limits builders, workflows and daily events. Size the paid tier on production workflow volume and AI usage.",
    },
    customer: {
      title: "R3's security team saves 220+ hours a month with Tines",
      url: "https://www.tines.com/case-studies/r3/",
      summary: "Tines says R3's three-person security operations team saves about 223 hours a month, 219 of them on a Microsoft Sentinel workflow.",
    },
  },
} satisfies Record<string, MarketProfile>;

export type SecopsProductSlug = keyof typeof secopsProfiles;

export function isSecopsProduct(slug: string): slug is SecopsProductSlug {
  return Object.hasOwn(secopsProfiles, slug);
}

export const SECOPS_PROFILE_CHECKED = "2026-11-24";
const workflowEntries: ProductEvidence[] = [];
export const secopsProfileSources: Source[] = [];
export const secopsPricing: PricingSignal[] = [];
export const secopsStories: CustomerStory[] = [];
export const secopsEvents: CatalogEvent[] = [];

for (const [productId, profile] of Object.entries<MarketProfile>(secopsProfiles)) {
  const { vendorId, publisher, workflow, owner, pricing, customer } = profile;
  const isDocs = /docs\.|cortex-docs|explained\./.test(workflow.url);
  workflowEntries.push({ ...workflow, productId, key: productId, publisher, type: isDocs ? "official_docs" : "vendor_marketing" });

  const ownerId = `src-secops-owner-${productId}`;
  const priceId = `src-secops-pricing-${productId}`;
  const storyId = `src-secops-customer-${productId}`;
  secopsProfileSources.push(
    {
      id: ownerId, title: owner.title, publisher: owner.publisher,
      url: owner.url, canonicalUrl: owner.url, sourceType: /coverage|investors|news/.test(owner.url) ? "press_release" : owner.url.includes("terms") ? "legal_summary" : "vendor_marketing",
      publishedAt: owner.publishedAt ?? null, retrievedAt: SECOPS_PROFILE_CHECKED,
      volatility: "moderate", excerpt: owner.statement,
    },
    {
      id: priceId, title: `${publisher} pricing · ${pricing.section}`, publisher,
      url: pricing.url, canonicalUrl: pricing.url, sourceType: "vendor_marketing",
      publishedAt: null, retrievedAt: SECOPS_PROFILE_CHECKED, volatility: "fast", excerpt: pricing.statement,
    },
    {
      id: storyId, title: customer.title, publisher,
      url: customer.url, canonicalUrl: customer.url, sourceType: "customer_story",
      publishedAt: customer.publishedAt ?? null, retrievedAt: SECOPS_PROFILE_CHECKED,
      volatility: "moderate", excerpt: customer.summary,
    },
  );
  secopsPricing.push({
    id: `price-secops-${productId}`, productId, signalType: "public_list",
    statement: pricing.statement, amountLabel: null, asOf: SECOPS_PROFILE_CHECKED,
    sourceId: priceId, caveats: pricing.caveat,
  });
  secopsStories.push({
    id: `story-secops-${productId}`, vendorId, title: customer.title,
    summary: customer.summary, sourceId: storyId, proofType: "vendor_published",
  });
}

export const secopsWorkflowEvidence = registerProductEvidence({
  prefix: "secops-workflow", checked: SECOPS_PROFILE_CHECKED, entries: workflowEntries,
});
