import type { UseCase } from "../schema";

export const useCases: UseCase[] = [
  {
    id: "uc-jml",
    slug: "jml-and-reviews",
    name: "Joiner, mover, leaver and access reviews",
    problem:
      "People change jobs faster than tickets. Reviews are spreadsheets. Leavers keep access. Auditors ask who approved it.",
    architecture:
      "An authoritative source, usually HR, drives the directory. IGA requests, birthright, and reviews write to apps. The IdP still authenticates. The vault still holds secrets. Do not collapse those into one logo.",
    stakeholders: ["IGA program owner", "IAM architect", "Audit or GRC", "App owners"],
    triggers: ["Failed access review", "Leaver incident", "New in-scope application", "SoD finding"],
    budgetOwner: "IAM or GRC program. Microsoft and Okta buyers may try to stay inside an existing agreement.",
    successMetrics: [
      "Time to remove a leaver",
      "Share of reviews completed without a spreadsheet",
      "SoD violations open versus closed",
    ],
    categoryIds: ["iga", "workforce-identity"],
    capabilityIds: ["cap-jml", "cap-access-request", "cap-certification", "cap-sod"],
    discoveryQuestions: [
      "Which system is authoritative for joiners, and how late is the feed?",
      "What share of access is birthright versus requested?",
      "Which apps can you provision with an API, and which still need a ticket?",
      "Are non-humans in the same review campaign, or out of scope?",
      "Is the buyer trying to stay inside Entra ID Governance or Okta, or leave a legacy IGA suite?",
    ],
    buyerQuestion: "Can we prove the right people have the right access, including after they move or leave?",
  },
  {
    id: "uc-jit",
    slug: "jit-privilege",
    name: "Just-in-time privileged access",
    problem:
      "Administrators hold standing privilege because checkout is slower than the incident. Shared passwords and always-on Global Admin are the usual shape.",
    architecture:
      "Separate role activation inside Entra or Azure from a session broker that logs into servers, and from a governance product that approves a time-bound grant in SaaS. A buyer can need more than one.",
    stakeholders: ["PAM owner", "Infrastructure", "SOC", "IGA owner"],
    triggers: ["Standing domain admin", "Shared root account", "Privileged audit finding"],
    budgetOwner: "PAM program, or the identity team if the scope is Entra and Azure roles only.",
    successMetrics: [
      "Standing privileged assignments removed",
      "Median elevation window",
      "Break-glass uses that expired on their own",
    ],
    categoryIds: ["pam", "iga"],
    capabilityIds: [
      "cap-jit-human",
      "cap-credential-custody",
      "cap-session-control",
      "cap-access-request",
    ],
    discoveryQuestions: [
      "Is the privilege an Entra or Azure role, a SaaS admin, or a server session?",
      "Do they need credential custody, or is eligible activation enough?",
      "Who approves at 2 a.m., and what happens if that person is the requester?",
      "What must the audit file contain: activation, session, or both?",
    ],
    buyerQuestion: "How does an admin get powerful access for minutes, with a record, and lose it again?",
  },
  {
    id: "uc-detect",
    slug: "secrets-detection",
    name: "Secrets detection and remediation",
    problem:
      "Live credentials land in git, tickets, images, and chat. Finding them is an AppSec job. Revoking them is an identity and platform job.",
    architecture:
      "A scanner watches source or other surfaces and may ask the issuer if the secret is live. Rotation happens in the vault or the cloud console. Ownership of the principal is an NHI question.",
    stakeholders: ["AppSec", "Developer", "Platform", "Cloud security"],
    triggers: ["Public leak", "Push-protection pilot", "Incident review"],
    budgetOwner: "AppSec or source-control security.",
    successMetrics: [
      "Verified live secrets open",
      "Median time from finding to revocation",
      "Share of pushes blocked before merge",
    ],
    categoryIds: ["secrets-detection"],
    capabilityIds: ["cap-secret-discovery", "cap-secret-verification"],
    discoveryQuestions: [
      "Which surfaces matter: git history, pull requests, images, tickets, SaaS?",
      "Do they need validity checks, or is a pattern match enough?",
      "Who is paged, and who is allowed to revoke?",
      "Is the follow-up a vault rotation, a cloud key delete, or an owner who does not exist yet?",
    ],
    buyerQuestion: "Where are live secrets exposed, and what happens in the hour after we find one?",
  },
  {
    id: "uc-vault",
    slug: "secrets-vaulting",
    name: "Vaulting and short-lived credentials",
    problem:
      "Applications ship with static passwords. Rotation is a wiki. A vault that only stores the same static secret is a weaker outcome than a credential that did not exist until it was requested.",
    architecture:
      "The workload authenticates to a secrets manager. The manager either returns a stored secret or mints a short-lived one. IGA may decide which workload should exist. It does not, by itself, mint the database user.",
    stakeholders: ["Platform or SRE", "Security engineering", "App owner"],
    triggers: ["Hardcoded credentials", "Certificate outages", "Vault bake-off"],
    budgetOwner: "Platform engineering or security engineering.",
    successMetrics: [
      "Static credentials retired",
      "Median lease length",
      "Certificate expirations that were automated",
    ],
    categoryIds: ["secrets-management", "nhi"],
    capabilityIds: ["cap-dynamic-secrets", "cap-pki", "cap-credential-custody"],
    discoveryQuestions: [
      "Do they need dynamic database or cloud credentials, or a place to store static ones?",
      "Who is allowed to read each path, and how does that workload authenticate?",
      "Is PKI in scope, or only key-value?",
      "Is a cloud secret store enough, or do they span clouds and data centers?",
    ],
    buyerQuestion: "Can we stop storing the long-lived credential the application uses?",
  },
  {
    id: "uc-nhi",
    slug: "nhi-lifecycle",
    name: "NHI ownership and decommissioning",
    problem:
      "Machine identities outnumber people, have no owner, and keep permissions after the workload is gone. A leaked key is the visible symptom.",
    architecture:
      "Inventory the principal, attach an owner and a purpose, cut permissions, and retire the identity. A vault can issue the credential. A scanner can find a leak. Neither one is the system of record for ownership unless you have evidence.",
    stakeholders: ["IAM", "Cloud security", "AppSec", "Service owners"],
    triggers: ["Ownerless service accounts", "NHI audit question", "Key leaked with no rotation path"],
    budgetOwner: "Often undecided between IAM, cloud security, and a new NHI project. Ask.",
    successMetrics: [
      "Share of NHIs with an owner",
      "Principals removed after the workload ended",
      "Long-lived secrets replaced",
    ],
    categoryIds: ["nhi", "secrets-management", "iga"],
    capabilityIds: [
      "cap-nhi-inventory",
      "cap-nhi-ownership",
      "cap-nhi-lifecycle",
      "cap-workload-federation",
      "cap-dynamic-secrets",
    ],
    discoveryQuestions: [
      "Where do the identities live: Entra service principals, AWS roles, SaaS bots, CI jobs?",
      "Is there an owner field anyone trusts?",
      "Can high-volume workloads use federation instead of a stored key?",
      "Who is allowed to decommission, and what breaks if they do?",
    ],
    buyerQuestion: "Who owns each machine identity, and how does it get turned off?",
  },
  {
    id: "uc-agent",
    slug: "agent-authorization",
    name: "Agent tool-call authorization",
    problem:
      "Agents request tools with standing tokens. Inventory without a decision at request time leaves the access in place. A proxy the enterprise did not ask for is a different design from writing policy into a gateway they already run.",
    architecture:
      "Know the agent and its human sponsor. Decide the request against policy. Enforce that decision where the tool call actually happens. Keep the decision as evidence. Do not treat a vendor's agent paragraph as proof of all three.",
    stakeholders: ["AI platform owner", "IAM", "Security engineering", "App owner of the tool"],
    triggers: ["MCP gateway already deployed", "Agent pilot with broad tokens", "Customer security review of an agent"],
    budgetOwner: "Not settled. It may be IGA, NHI, or the AI platform. Write down which budget the champion named.",
    successMetrics: [
      "Agents with a human sponsor",
      "Tool grants that expire",
      "Decisions you can show an auditor",
    ],
    categoryIds: ["agent-identity", "nhi", "iga"],
    capabilityIds: [
      "cap-agent-inventory",
      "cap-agent-decision",
      "cap-mcp-enforce",
      "cap-access-request",
    ],
    discoveryQuestions: [
      "Which agent platforms and which MCP gateways are already in place?",
      "Does the buyer want a decision inside the current gateway, or a new control plane in front of it?",
      "Can the agent receive more access than its human sponsor?",
      "What is generally available today, and what was announced this quarter?",
    ],
    buyerQuestion: "For this tool call, which agent, whose authority, how long, and where is it enforced?",
  },
  {
    id: "uc-ciem",
    slug: "cloud-entitlements",
    name: "Cloud entitlement posture",
    problem:
      "Cloud roles look small and combine into broad access. The CNAPP shows the path. IGA may still be the system that certifies whether a person should request it.",
    architecture:
      "Effective-access analysis sits in cloud security. Removal can be a cloud ticket, an infrastructure-as-code change, or an IGA revocation. Do not promise one product does the whole loop without a source.",
    stakeholders: ["Cloud security", "IAM", "Platform"],
    triggers: ["CNAPP renewal", "Overprivileged finding", "Multi-cloud identity question"],
    budgetOwner: "Cloud security or CNAPP. Treat IGA as a neighboring budget unless the buyer says otherwise.",
    successMetrics: ["Unused high-risk permissions removed", "Toxic role chains closed"],
    categoryIds: ["ciem", "adjacent-security", "nhi"],
    capabilityIds: ["cap-entitlement-visibility", "cap-certification"],
    discoveryQuestions: [
      "Which clouds, and is effective access already a CNAPP module?",
      "Do they want a graph, a review campaign, or both?",
      "Who remediates: cloud engineering or the IGA operations team?",
    ],
    buyerQuestion: "What can this cloud identity really do, and who is responsible for taking it away?",
  },
  {
    id: "uc-itdr",
    slug: "identity-detection",
    name: "Identity threat detection and response",
    problem:
      "The attacker uses a real account or token. Governance explains why the access existed. Detection explains that it is being abused now.",
    architecture:
      "Identity signals go to a detection product or the SOC. Response may disable an account in the IdP. The IGA system is where you later remove the standing access that made the blast radius large.",
    stakeholders: ["SOC", "Identity security", "Directory owner"],
    triggers: ["Token theft", "Directory incident", "Attack-path assessment"],
    budgetOwner: "SecOps or an identity-threat line. Not the IGA implementation budget by default.",
    successMetrics: ["Time to revoke a stolen session", "Attack paths closed after the incident"],
    categoryIds: ["itdr", "workforce-identity"],
    capabilityIds: ["cap-itdr"],
    discoveryQuestions: [
      "Is the concern Active Directory, Entra, SaaS sessions, or cloud roles?",
      "Do they already have an EDR vendor selling an identity SKU?",
      "What response action is in scope: disable, revoke sessions, or just alert?",
    ],
    buyerQuestion: "How do we notice and stop an attacker who is already a legitimate identity?",
  },
  {
    id: "uc-ciam",
    slug: "customer-auth",
    name: "Customer and developer authentication",
    problem:
      "A product needs sign-up, sign-in, and tenant isolation for people who are not employees. Buying IGA for that job mismatches the buyer.",
    architecture:
      "CIAM authenticates the customer or developer. Workforce IdP authenticates employees. Authorization inside the product may still be custom. IGA governs employee access to the admin console, which is a different project.",
    stakeholders: ["Product engineering", "Developer experience", "Security reviewer"],
    triggers: ["New product auth", "Homegrown auth pain", "Enterprise SSO request from customers"],
    budgetOwner: "Product or engineering.",
    successMetrics: ["Signup completion", "Account takeover rate", "Time for engineering to add SSO"],
    categoryIds: ["ciam", "workforce-identity"],
    capabilityIds: ["cap-ciam", "cap-sso"],
    discoveryQuestions: [
      "Is the user a customer, a developer's end user, or an employee admin?",
      "Do they need enterprise SSO into the product, or workforce SSO for staff?",
      "Who owns the roadmap: product engineering or the IAM team?",
    ],
    buyerQuestion: "Who is signing in, and is this the workforce directory or the product's own auth?",
  },
];
