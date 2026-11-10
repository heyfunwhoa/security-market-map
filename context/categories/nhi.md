---
id: "nhi"
type: "category"
name: "NHI and workload identity"
layer: "core"
vendors: 40
---

# NHI and workload identity

Service accounts, service principals, CI jobs, apps, containers, APIs, and bots. The work is discovery, ownership, purpose, lifecycle, permissions, and decommissioning. A key is not the identity.

**Buyer question:** Which machine identities exist, who owns them, and which ones should already be gone?

**Usual owner:** IAM, cloud security, or a new NHI owner. AppSec often finds the symptom first.

**Budget source:** Can land in IAM, cloud security, or a new NHI line. Do not assume it is the IGA budget.

## Owning seats

- Identity security lead (`identity-security`)
- AppSec lead (`appsec`)
- DevOps / platform engineering (`platform`)
- AI security (`ai-security`)
- AI platform owner (`ai-owner`)

## Who vendors sell to

From 4 vendors' own pages, mapped to seats editorially. Vendor audience, not proof of who buys.

- Identity security lead (`identity-security`): 4 of 4 vendors
- DevOps / platform engineering (`platform`): 2 of 4 vendors
- Software developer (`developer`): 1 of 4 vendors

## Vendors (primary)

- Entro Security: SailPoint said on 29 Jun 2026 that it completed the Entro acquisition and that Entro's solutions are available to SailPoint customers as standalone offerings while native integration continues. entro.security presents SailPoint Entro: discovery, a human owner, lifecycle language, a Slack DLP description, and NHIDR. The product page does not restate the close date. Customer quotations and credential counts are not adopted.
- Astrix Security: NHI and agent-security vendor. The homepage describes an inventory of AI agents, MCP servers, and non-human identities, and says Astrix is now part of Cisco. Cisco's 29 Jun 2026 update says the acquisition is complete. New standalone licenses ended 30 Jun 2026. Owner assignment and decommissioning are not on the homepage. Cisco's capability list is not a checked product cell.
- Oasis Security: NHI security vendor. The about page describes discovery, owners, and lifecycle. Cyera's 3 Sep 2026 release says the acquisition is complete and that Oasis will operate as Cyera Identity. A combined enforcement workflow is not verified.
- Token Security: Token Security's homepage describes continuous discovery of AI agents and non-human identities, a human owner for each agent, and automatic decommissioning of orphaned identities. Which systems can be decommissioned is not listed. Customer quotations are not adopted.
- Aembit: Aembit's non-human identity page describes policy-based, secretless, just-in-time access between workloads and resources. It does not say federation, and it does not list targets. Inventory and decommissioning are not on that page.
- Clutch Security: Clutch's homepage describes continuous discovery of non-human identities across cloud, SaaS, and on-premises, and a graph it calls Identity Lineage. Lifecycle and threat response were not in the fetched text.
- AppOmni: SaaS and AI security vendor. The homepage describes discovery of SaaS and AI in use, who has access, unsanctioned apps, and shadow agents, plus response actions such as revoking access. It does not describe an NHI owner or a decommission cell. Integration counts and customer quotations are not adopted.
- Grip Security: SaaS and AI control vendor. The homepage says Grip builds an app inventory and links assets to identities. It does not describe an NHI owner or a decommission cell. Ratings, savings figures, and customer quotations are not adopted.
- Venafi: Certificate lifecycle vendor named in machine-identity conversations. Corporate ownership after the CyberArk and Palo Alto transactions was not re-checked. No certificate claim is filled.
- Keyfactor: Certificate and machine-identity lifecycle candidate beside Venafi and DigiCert. Unverified here.
- DigiCert: Public certificate authority also sold into enterprise certificate lifecycle. Do not treat CA issuance as machine IAM.
- Corsha: Named in SACR's 2024 NHI guide beside Aembit for machine authentication. No capability is checked.
- Natoma: Named on a 2024 SACR NHI shortlist beside Astrix, Clutch, Entro, and Oasis. On 27 May 2026 Snowflake announced a definitive agreement to acquire Natoma, which it describes as an enterprise MCP platform for AI agents, to be integrated into the Snowflake AI Data Cloud. The standalone site did not serve a page on 26 Oct 2026. Neither the shortlist nor the acquisition is a capability cell.
- SlashID: Named on SACR's NHI authorization list and on the cloud-identity row of the ecosystem graphic. Capabilities unknown.
- TrustFour: SACR's 2024 NHI guide describes TrustFour as workload and machine zero trust, and the ecosystem graphic places it in microsegmentation. Neither claim is checked.

## Vendors (adjacent)

- C1
- Opal Security
- SailPoint
- Saviynt
- Omada
- Microsoft
- Okta
- Veza
- Palo Alto Networks
- Teleport
- StrongDM
- HashiCorp
- Akeyless
- Amazon Web Services
- Google
- Wiz
- Cyera
- Britive
- Sonrai Security
- Apono
- Andromeda Security
- Cyata
- Keycard
- Adaptive Shield
- Cerbos

## What buyers do instead

- Spreadsheet inventory of service accounts and keys. Good enough when: Dozens of machine identities with clear owners. Breaks when: Thousands of keys, tokens, and service accounts across SaaS and cloud, with owners who left. — hypothesis
- Extend the IGA program to machine accounts. Good enough when: Machine accounts mostly live in the directory and follow human-like lifecycles. Breaks when: Most machine credentials live outside the directory (cloud roles, API keys, OAuth apps). — hypothesis
- Vault plus secret scanning. Good enough when: The main worry is leaked or hard-coded credentials. Breaks when: The question becomes who owns each identity and what it can reach. — hypothesis

## Objections

- "We built our own." — hypothesis
- "Our identity provider covers this." — hypothesis
- "That belongs to another team." — hypothesis

## Triggers

- Service-account sprawl
- Leaked key with no owner
- Audit of non-human access
- OWASP NHI concerns
- A live credential is found in a public repo, ticket, or chat.
- A breach or near-miss starts with stolen or abused credentials.
- An acquisition brings in new code, cloud accounts, and identities.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
