import type { Distinction, GlossaryTerm, Scenario } from "../schema";

export const glossary: GlossaryTerm[] = [
  {
    id: "identity",
    term: "Identity",
    definition:
      "The record of a person, workload, or agent that can be granted access. It is not the password, key, or token.",
    categoryId: "workforce-identity",
    relatedTermIds: ["secret", "entitlement"],
  },
  {
    id: "secret",
    term: "Secret",
    definition:
      "Credential material: a password, API key, token, or private key. A secret can be stolen without anyone understanding which identity it belonged to.",
    categoryId: "secrets-detection",
    relatedTermIds: ["identity", "nhi"],
  },
  {
    id: "entitlement",
    term: "Entitlement",
    definition:
      "What an identity is allowed to do on a resource. Effective access can be wider than the role name suggests.",
    categoryId: "ciem",
    relatedTermIds: ["identity", "jit"],
  },
  {
    id: "nhi",
    term: "Non-human identity",
    definition:
      "A service account, service principal, CI job, app, container, API, or bot. It needs an owner and a lifecycle. A key is only one way it authenticates.",
    categoryId: "nhi",
    relatedTermIds: ["secret", "workload-identity"],
  },
  {
    id: "workload-identity",
    term: "Workload identity",
    definition:
      "An identity assigned to software so it can authenticate to other services. In Entra, Microsoft describes workload identities as applications, service principals, and managed identities.",
    categoryId: "nhi",
    relatedTermIds: ["nhi", "federation"],
  },
  {
    id: "federation",
    term: "Workload identity federation",
    definition:
      "The workload proves who it is with a short-lived assertion from a platform it already runs on, instead of storing a long-lived secret for that hop.",
    categoryId: "nhi",
    relatedTermIds: ["workload-identity", "dynamic-secret"],
  },
  {
    id: "dynamic-secret",
    term: "Dynamic secret",
    definition:
      "A credential that is created when something reads it and is revoked when the lease ends. It is not a static password sitting in a key-value store.",
    categoryId: "secrets-management",
    relatedTermIds: ["secret", "vault"],
  },
  {
    id: "vault",
    term: "Vault",
    definition:
      "A secrets manager that stores or mints credentials. It answers where the secret lives. It does not, by itself, decide the business entitlement or run an access review.",
    categoryId: "secrets-management",
    relatedTermIds: ["dynamic-secret", "secret"],
  },
  {
    id: "standing",
    term: "Standing privilege",
    definition:
      "Access that remains in place whether or not anyone is using it. Zero standing privilege means the grant exists only for the task.",
    categoryId: "pam",
    relatedTermIds: ["jit", "entitlement"],
  },
  {
    id: "jit",
    term: "Just-in-time access",
    definition:
      "Privilege created for a limited time, often after approval or MFA, then removed. Activation of an Entra role and checkout of a server password are both called JIT and are not the same control.",
    categoryId: "pam",
    relatedTermIds: ["standing", "session"],
  },
  {
    id: "session",
    term: "Privileged session",
    definition:
      "The period of elevated use itself. Session control means brokering, isolating, or recording that use, which is more than storing the password.",
    categoryId: "pam",
    relatedTermIds: ["jit", "secret"],
  },
  {
    id: "jml",
    term: "Joiner, mover, leaver",
    definition:
      "The lifecycle events that should create, change, and remove access. A mover is where excess access usually accumulates.",
    categoryId: "iga",
    relatedTermIds: ["certification", "sod"],
  },
  {
    id: "certification",
    term: "Access certification",
    definition:
      "A recurring human or policy decision that existing access is still justified. A graph of effective access is not a certification unless someone completes a review.",
    categoryId: "iga",
    relatedTermIds: ["jml", "entitlement"],
  },
  {
    id: "sod",
    term: "Separation of duties",
    definition:
      "A rule that one identity should not hold two conflicting permissions, such as creating a vendor and paying that vendor.",
    categoryId: "iga",
    relatedTermIds: ["certification", "entitlement"],
  },
  {
    id: "ciem",
    term: "CIEM",
    definition:
      "Cloud infrastructure entitlement management: analysis of what cloud identities can do. Buyers often meet it inside a CNAPP, which is a different budget from IGA.",
    categoryId: "ciem",
    relatedTermIds: ["entitlement", "nhi"],
  },
  {
    id: "itdr",
    term: "ITDR",
    definition:
      "Identity threat detection and response. It looks for abuse of a real identity. It does not replace joiner-mover-leaver.",
    categoryId: "itdr",
    relatedTermIds: ["identity", "standing"],
  },
  {
    id: "ciam",
    term: "CIAM",
    definition:
      "Customer or developer authentication for a product. The buyer is usually product engineering, not the IGA program.",
    categoryId: "ciam",
    relatedTermIds: ["identity"],
  },
  {
    id: "mcp",
    term: "MCP and tool access",
    definition:
      "A way agents call tools. Governing it means deciding which agent may call which tool, for how long, on whose authority. A request channel and gateway enforcement are different designs.",
    categoryId: "agent-identity",
    relatedTermIds: ["agent", "jit"],
  },
  {
    id: "agent",
    term: "Agent identity",
    definition:
      "An identity for software that takes actions with some autonomy. It needs a human sponsor and a decision at request time. It is not only a service account with a static key.",
    categoryId: "agent-identity",
    relatedTermIds: ["nhi", "mcp"],
  },
];

export const distinctions: Distinction[] = [
  {
    id: "four-layers",
    title: "Secret, NHI, entitlement, privileged session",
    lede: "These four words get used as if they were one product. In a call, separate them before you name a vendor.",
    rows: [
      {
        label: "Secret",
        body: "The credential material. An API key in a commit is a secret even if nobody can name the account it opens.",
      },
      {
        label: "NHI",
        body: "The non-human identity that uses a secret or a federated assertion. It needs an owner, a purpose, and a way to be turned off.",
      },
      {
        label: "Entitlement",
        body: "What that identity is allowed to do. A narrow role name can still reach production through another role.",
      },
      {
        label: "Privileged session",
        body: "A period of elevated use. Custody of a password, activation of a cloud role, and a recorded server session are three different controls.",
      },
    ],
  },
  {
    id: "three-tools",
    title: "Detection, vaulting, and NHI governance",
    lede: "A cybersecurity analyst who already knows secrets detection can place the other two layers without pretending they are the same deal.",
    rows: [
      {
        label: "Secrets detection",
        body: "Finds credentials in the wrong place and may check whether they are still valid. It does not mint the replacement or decide who owns the account.",
      },
      {
        label: "Secrets manager",
        body: "Stores or issues credentials, including short-lived ones. The workload still needs an identity that is allowed to ask. A vault competes with other vaults. It complements an IGA or NHI program when the question is issuance.",
      },
      {
        label: "NHI governance",
        body: "Inventory, owner, purpose, permissions, and decommissioning of the machine identity. One company can sell more than one layer. Read the claim for the layer you are in.",
      },
    ],
  },
];

export const scenarios: Scenario[] = [
  {
    id: "live-key",
    title: "A live key, then an agent",
    summary:
      "A developer commits a working API key. Follow the handoff from detection to the machine identity, the vault, governance, and an agent tool call. Each step names the layer that can actually do the work.",
    steps: [
      {
        id: "commit",
        title: "A developer commits a live API key",
        narrative:
          "The key is credential material in source control. A secrets scanner can block the push or open a finding. Validity checking, when the product does it, says whether the key still works. That is the end of what detection owes you.",
        categoryId: "secrets-detection",
        capabilityId: "cap-secret-discovery",
        handoff:
          "Someone still has to revoke the key. The scanner does not remove the cloud role and does not know the owner unless a later system does.",
      },
      {
        id: "principal",
        title: "The service account is the identity",
        narrative:
          "The key belonged to a principal: a service account, a CI job, or an app registration. Ownership, purpose, and whether the identity should still exist are NHI questions. Finding the string in git did not answer them.",
        categoryId: "nhi",
        capabilityId: "cap-nhi-ownership",
        handoff:
          "If the workload can use federation, the long-lived key may be unnecessary. That is a workload-identity control, not a scanner feature.",
      },
      {
        id: "vault",
        title: "A vault issues a short-lived credential",
        narrative:
          "Instead of storing the next static key, a secrets manager can mint a credential when the workload asks and revoke it at the TTL. The vault policy decides who may read that path. It does not decide the business entitlement in every downstream app.",
        categoryId: "secrets-management",
        capabilityId: "cap-dynamic-secrets",
        handoff:
          "IGA or the cloud team still decides which identity should be allowed to ask. Issuance and certification are different meetings.",
      },
      {
        id: "review",
        title: "Governance finds access that is too broad",
        narrative:
          "A review or an entitlement graph asks whether the access is still justified. A certification campaign and a cloud effective-access graph answer related questions and do not replace each other.",
        categoryId: "iga",
        capabilityId: "cap-certification",
        handoff:
          "If the excessive path is only visible in cloud role chaining, the CNAPP owner may be the one who can see it. The IGA owner may be the one who can make a person attest to it.",
      },
      {
        id: "agent",
        title: "An agent requests a tool call",
        narrative:
          "An agent is not finished when it has an inventory row. Someone has to decide this call: which agent, whose authority, how long, and which gateway enforces it. Vendors describe different mechanisms. Unknown means this seed has no source, not that the product cannot do it.",
        categoryId: "agent-identity",
        capabilityId: "cap-agent-decision",
        handoff:
          "Ask whether enforcement is in the gateway they already run, or a new control plane that provisions access after the request. Those are different architectures.",
      },
    ],
  },
  {
    id: "standing-admin",
    title: "A standing administrator",
    summary:
      "A person holds privilege all the time. Separate role activation, credential custody, and a later governance review. Microsoft PIM evidence in this atlas is about Entra and Azure resources, not every server in the estate.",
    steps: [
      {
        id: "standing",
        title: "The admin role is always on",
        narrative:
          "Standing privilege is the access that remains when nobody is using it. The first question is which system holds it: an Entra role, a SaaS admin, or a server account with a shared password.",
        categoryId: "pam",
        capabilityId: "cap-jit-human",
        handoff:
          "If you cannot name the system, you cannot pick PIM versus a session broker versus an IGA request flow.",
      },
      {
        id: "activate",
        title: "Elevation is requested",
        narrative:
          "Just-in-time means the person receives the privilege for a window. Approval, MFA, and a justification may be required. A product that stores the password is not automatically the product that activates the role.",
        categoryId: "pam",
        capabilityId: "cap-access-request",
        handoff:
          "Write down the window and the approver. Break-glass that never expires is standing privilege with extra steps.",
      },
      {
        id: "session",
        title: "The session itself may be a separate control",
        narrative:
          "Some buyers need a brokered or recorded session. This seed does not treat session recording as proven just because a vendor is known for PAM. If the cell says Unknown, ask.",
        categoryId: "pam",
        capabilityId: "cap-session-control",
        handoff:
          "Credential custody, role activation, and session recording can be three line items.",
      },
      {
        id: "attest",
        title: "Later, someone reviews whether the role should exist",
        narrative:
          "JIT limits a window. Certification asks whether the person should be eligible at all. Both can be true. A detection alert is a third conversation: something abused the access that governance left in place.",
        categoryId: "iga",
        capabilityId: "cap-certification",
        handoff:
          "ITDR may disable the account today. IGA removes the standing eligibility so the next incident is smaller.",
      },
    ],
  },
];
