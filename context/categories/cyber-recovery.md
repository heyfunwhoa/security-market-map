---
id: "cyber-recovery"
type: "category"
name: "Cyber recovery"
layer: "core"
vendors: 4
---

# Cyber recovery

Backup and recovery built for a ransomware event: immutable copies and a tested restore. This map keeps that restore separate from a GRC evidence collection. A backup product does not collect audit evidence, and a GRC platform does not restore a domain.

**Buyer question:** What can we restore, from when, and has anyone tested that restore?

**Usual owner:** Infrastructure, with security on the ransomware requirement.

**Budget source:** Infrastructure or resilience. Not the GRC suite.

## Owning seats

- Cyber recovery / resilience (`cyber-recovery`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Rubrik: Homepage retrieved 26 Oct 2026 says the platform keeps immutable backups and can recover data sets across cloud, on-premises, and SaaS. Identity recovery and agent inventory on that page are not identity or agent cells. Rubrik describes its DSPM offering as formerly Laminar in a vendor-published customer story. Vendor-reported DSPM scope reviewed 2026-10-13.
- Veeam: Homepage retrieved 26 Oct 2026 says the platform keeps immutable copies and can restore cloud, Kubernetes, SaaS, on-premises, and identity workloads. Identity workloads are a restore target. DSPM on that page classifies data across the hybrid estate and does not name a store. Recovery budget, not an identity or SIEM product.
- Cohesity: Backup and cyber-recovery vendor beside Rubrik and Veeam. Not a GRC suite.
- Commvault: Data-protection incumbent on cyber-recovery shortlists. Compare restore, not audit evidence.

## Vendors (adjacent)

_None recorded._

## What buyers do instead

- Standard backups with retention policies. Good enough when: Backups are tested and isolated from production credentials. Breaks when: Ransomware targets backups, or recovery has never been tested end to end. — hypothesis
- Rely on cyber insurance and incident response retainers. Good enough when: Low dependence on systems for revenue. Breaks when: Insurers require tested recovery, or downtime costs exceed coverage. — hypothesis

## Objections

- "Our IR retainer covers this." — hypothesis
- "Our backups are fine." — hypothesis

## Triggers

- Ransomware planning
- A backup renewal
- The company becomes subject to SEC cybersecurity disclosure rules or files its first annual disclosure.
- An EU financial entity works through DORA ICT risk-management requirements.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
