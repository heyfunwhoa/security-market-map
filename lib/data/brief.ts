export const REVIEWED = "2026-09-24";

export type EvidenceLabel =
  | "verified"
  | "vendor claimed"
  | "analyst assessed"
  | "disputed"
  | "unknown"
  | "planned";

export const marketViews: {
  slug: string;
  name: string;
  problem: string;
  href: string;
  categories: string;
}[] = [
  {
    slug: "identity",
    name: "Identity and access",
    problem: "Who or what may authenticate, and is that access still justified?",
    href: "/domains/identity",
    categories: "Workforce IAM, IGA, PAM, CIEM, NHI, agent identity",
  },
  {
    slug: "appsec",
    name: "Application and software supply chain",
    problem: "Is the software we build and ship safe to run?",
    href: "/domains/appsec",
    categories: "SAST, SCA, secrets detection, API security, ASPM",
  },
  {
    slug: "cloud",
    name: "Cloud and workload security",
    problem: "What is exposed in the cloud account, and what is the workload doing?",
    href: "/domains/cloud",
    categories: "CSPM, CWPP, CNAPP, CIEM, cloud detection",
  },
  {
    slug: "data",
    name: "Data security",
    problem: "Where is sensitive data, and what is allowed to leave?",
    href: "/domains/data",
    categories: "DSPM, DLP, privacy, AI data boundaries",
  },
  {
    slug: "endpoint",
    name: "Endpoint security",
    problem: "What is happening on the device, including above the process tree?",
    href: "/markets/endpoint",
    categories: "EPP, EDR, and SACR's endpoint-control framework",
  },
  {
    slug: "network",
    name: "Network and access security",
    problem: "Which connection is allowed, from where, to which application?",
    href: "/markets/network",
    categories: "Firewall, SSE, ZTNA, microsegmentation",
  },
  {
    slug: "secops",
    name: "Security operations",
    problem: "What happened, and who can contain it?",
    href: "/domains/secops",
    categories: "SIEM, SOAR, XDR, MDR, NDR, threat intelligence",
  },
  {
    slug: "exposure",
    name: "Exposure management",
    problem: "Which weakness should be fixed first?",
    href: "/markets/exposure",
    categories: "Vulnerability management, external attack surface, validation",
  },
  {
    slug: "ai",
    name: "AI security",
    problem: "What may a model or agent see, call, and do?",
    href: "/domains/ai",
    categories: "App testing, agent identity, runtime, MCP, data, models, governance",
  },
];

export const controlDepths: { depth: string; meaning: string; stops: boolean }[] = [
  { depth: "Inventory", meaning: "The control can list the actor, asset, or tool.", stops: false },
  { depth: "Alert", meaning: "The control raises a signal after it sees something.", stops: false },
  { depth: "Recommend", meaning: "The control suggests a change. A person still has to make it.", stops: false },
  { depth: "Initiate workflow", meaning: "The control opens a ticket or approval. The action may already have finished.", stops: false },
  { depth: "Enforce directly", meaning: "The control allows, narrows, or blocks the action on the path.", stops: true },
];

export const attackSteps: {
  id: string;
  title: string;
  narrative: string;
  actor: string;
  asset: string;
  lifecycle: string;
  controls: {
    name: string;
    href: string;
    observe: string;
    depth: string;
    timing: "before" | "during" | "after";
    evidence: EvidenceLabel;
  }[];
  ask: string;
}[] = [
  {
    id: "secret",
    title: "A credential is in the repository",
    narrative:
      "A coding agent, or the person guiding it, reaches a repository that still contains a cloud key. Nothing has called the cloud API yet.",
    actor: "AI agent, using a developer's workspace",
    asset: "Credential in code",
    lifecycle: "Discover",
    controls: [
      {
        name: "Secrets detection",
        href: "/categories/secrets-detection",
        observe: "Repository",
        depth: "Alert, and sometimes block the commit",
        timing: "before",
        evidence: "unknown",
      },
      {
        name: "Endpoint control",
        href: "/categories/endpoint-control",
        observe: "Endpoint or IDE",
        depth: "Inventory of the agent. Enforcement is not yet verified.",
        timing: "during",
        evidence: "analyst assessed",
      },
    ],
    ask: "In the demo, show a secret found in git and whether the push was blocked or only ticketed.",
  },
  {
    id: "identity",
    title: "The key represents an identity",
    narrative:
      "The string is a credential. The identity is the workload, service account, or agent that will use it. Detection does not name the owner.",
    actor: "Service account or agent",
    asset: "Cloud identity",
    lifecycle: "Discover and assign ownership",
    controls: [
      {
        name: "NHI governance",
        href: "/categories/nhi",
        observe: "Cloud IAM, vault, or SaaS",
        depth: "Inventory and an owner. Deprovisioning is a separate claim.",
        timing: "after",
        evidence: "unknown",
      },
      {
        name: "IGA",
        href: "/categories/iga",
        observe: "Identity provider",
        depth: "Recommend or start a review. It does not see the key in git.",
        timing: "after",
        evidence: "unknown",
      },
    ],
    ask: "Ask who owns the identity, and whether the product can remove it or only list it.",
  },
  {
    id: "broker",
    title: "Something could have issued a short-lived credential",
    narrative:
      "A vault or workload-identity broker is the control that might have kept this key from living in the repo. If the agent already holds a long-lived key, the vault is not in the path.",
    actor: "Workload",
    asset: "Credential",
    lifecycle: "Authorize, rotate, or decommission",
    controls: [
      {
        name: "Secrets management",
        href: "/categories/secrets-management",
        observe: "Vault",
        depth: "Enforce issuance only if the workload asks the vault.",
        timing: "before",
        evidence: "unknown",
      },
      {
        name: "PAM",
        href: "/categories/pam",
        observe: "Broker or session",
        depth: "Enforce a privileged session. Not the same as scanning git.",
        timing: "before",
        evidence: "unknown",
      },
    ],
    ask: "Ask whether this application still has a static key after the vault is deployed.",
  },
  {
    id: "tool",
    title: "The agent calls the cloud",
    narrative:
      "The agent uses the key to reach a cloud API. A valid credential can still be the wrong action. Runtime enforcement matters only if it sits on this call.",
    actor: "AI agent",
    asset: "Cloud resource",
    lifecycle: "Authorize and intervene",
    controls: [
      {
        name: "Agent runtime",
        href: "/categories/agentic-runtime",
        observe: "Gateway, MCP proxy, or agent framework",
        depth: "Enforce only when the product is in the path. Otherwise it alerts.",
        timing: "during",
        evidence: "analyst assessed",
      },
      {
        name: "Cloud entitlements",
        href: "/categories/ciem",
        observe: "Cloud API",
        depth: "Inventory of permissions. Blocking the call is not assumed.",
        timing: "after",
        evidence: "unknown",
      },
    ],
    ask: "Ask the vendor to stop one tool call in the demo and to show what happens if the agent bypasses the gateway.",
  },
  {
    id: "export",
    title: "The agent tries to export sensitive data",
    narrative:
      "The identity is allowed to read the store. The data's sensitivity is a second fact. Stopping the export requires a control that can see the data and act before the transfer finishes.",
    actor: "AI agent",
    asset: "Data",
    lifecycle: "Monitor and intervene",
    controls: [
      {
        name: "AI data security",
        href: "/categories/ai-data-security",
        observe: "Data layer or the AI workflow",
        depth: "Not yet verified. Do not treat a category name as enforcement.",
        timing: "during",
        evidence: "unknown",
      },
      {
        name: "DSPM and DLP",
        href: "/categories/dspm",
        observe: "Data store or egress channel",
        depth: "Alert is the common claim. Inline block must be shown.",
        timing: "after",
        evidence: "unknown",
      },
    ],
    ask: "Ask which data classes change the decision, and whether the block happens before the bytes leave.",
  },
];

export const nhiLifecycle: { step: string; question: string; stale: string }[] = [
  { step: "Discovery", question: "Where can the product see service accounts, keys, tokens, and workloads?", stale: "SACR's NHI guide is from 27 Sep 2024. Recheck every vendor named in it." },
  { step: "Inventory", question: "Is the list current, or a one-time export?", stale: "A 2024 landscape is not a 2026 shortlist." },
  { step: "Ownership", question: "Is a person accountable, and does that link survive a departure?", stale: "Ownership language on a homepage is vendor claimed until the workflow is shown." },
  { step: "Provisioning", question: "Who can create a new machine identity, and is that creation gated?", stale: "Not mentioned in a briefing does not mean the product cannot do it." },
  { step: "Permissions", question: "Which entitlements are standing, and which are unused?", stale: "Permission graphs are unknown here unless a primary page is cited." },
  { step: "Monitoring", question: "What behavior is visible after the identity is issued?", stale: "Monitoring is not enforcement." },
  { step: "Rotation", question: "Can the product change the secret without breaking the consumer?", stale: "Rotation that the customer must script is not the same as a product action." },
  { step: "Decommission", question: "What is removed, and in which systems does it remain?", stale: "Decommissioning is the claim most often left unverified." },
];

export const runtimeLayers: { layer: string; question: string; depth: string }[] = [
  { layer: "Predefined access", question: "What may this agent reach under normal policy?", depth: "Inventory or enforce, depending on whether policy is in the request path." },
  { layer: "Continuous observability", question: "Can we reconstruct the prompt, the tool, the identity, and the data?", depth: "Alert. Seeing the chain is not stopping it." },
  { layer: "Behavioral analysis", question: "Does this sequence differ from the agent's usual task?", depth: "Recommend. A score is not a block." },
  { layer: "Intent-aware decision", question: "Does this action still match the stated task?", depth: "Analyst assessed by SACR as a separate layer. Not verified for a named product." },
  { layer: "Human approval", question: "Does a person have to allow the next step?", depth: "Initiate workflow. The action waits only if the product actually pauses." },
  { layer: "Pre-action enforcement", question: "Can the product narrow or stop the call before it completes?", depth: "Enforce directly. This is the bar SACR treats as production-relevant." },
];

export const gatewayTradeoff = {
  gateway:
    "A gateway can allow or block a tool call that passes through it. Shadow agents, local coding tools, and direct API calls never hit that point. SACR's March 2026 note treats this as a structural limit, not a product defect.",
  direct:
    "Direct-access monitoring can see agents that do not use the gateway, including local tools. It often learns what happened after the call. Observation is not the same as a block.",
  both: "The note's own conclusion is that neither pattern is sufficient alone. This map does not award either pattern to a vendor.",
};

export const ecpZones: { zone: string; meaning: string }[] = [
  { zone: "Software posture", meaning: "What non-binary software is on the device: extensions, plugins, models, and local tools." },
  { zone: "Application-layer enforcement", meaning: "Browser and SaaS actions, not only a process the kernel can see." },
  { zone: "Agent runtime visibility", meaning: "Which local agent ran, which tool it called, and what happened next." },
  { zone: "Intent-aware behavioral analysis", meaning: "Whether the sequence still matches the person's task. A judgment, not a signature." },
  { zone: "Data-centric enforcement", meaning: "Whether sensitive data moved, and whether the device could stop that move." },
];

export const aiIntersections: { domain: string; href: string; intersection: string }[] = [
  { domain: "IAM and IGA", href: "/categories/iga", intersection: "A human owner and a review. They do not decide a live tool call." },
  { domain: "NHI", href: "/categories/nhi", intersection: "The machine identity an agent uses. Not every NHI is an agent." },
  { domain: "PAM and secrets", href: "/categories/secrets-management", intersection: "How the credential is issued. A vault does not judge intent." },
  { domain: "AppSec", href: "/categories/ai-application-security", intersection: "Prompt injection and unsafe outputs in the application." },
  { domain: "Endpoint", href: "/categories/endpoint-control", intersection: "Local coding agents and browser activity EDR may only see as a process." },
  { domain: "Cloud", href: "/categories/ciem", intersection: "The cloud role the agent assumes after it has a credential." },
  { domain: "Data security", href: "/categories/ai-data-security", intersection: "What the workflow can read or export. Identity context is not data context." },
  { domain: "SecOps", href: "/domains/secops", intersection: "Where the alert lands after the action. Response is late if the export already finished." },
];

export const caseStudy = {
  status: "Reviewed against primary pages on 2026-09-24. Integration in a customer environment is not verified.",
  rationale:
    "Cyera's 28 Jul 2026 post and Oasis's post the same day argue that data context and non-human identity context answer different halves of one question: what an agent can reach, and how sensitive that target is. That is the strategic rationale. It is the companies' argument.",
  shipped:
    "On 3 Sep 2026 Cyera's press release said the acquisition was complete and that the Oasis platform will operate as Cyera Identity, connecting to Cyera's data intelligence layer. That is a vendor statement about naming and direction. This map has not reviewed a product document that shows a data-classification signal changing an identity decision in a shipping workflow.",
  open: [
    "Which Oasis workflows are generally available inside Cyera, and which are still being integrated?",
    "Where is enforcement: the identity plane, a gateway, an API, or a ticket?",
    "Who owns the budget when data security and identity security are different teams?",
    "SACR's 31 Jul 2026 note, written before the close, called the combination operationally unproven and disclosed that Cyera is a SACR advisory client.",
  ],
};
