---
id: "wim"
type: "category"
name: "Workload identity management (WIM)"
layer: "core"
vendors: 1
---

# Workload identity management (WIM)

How a running workload proves what it is and gets a short-lived credential for the next hop, without a stored secret: attestation, issued workload identities such as SPIFFE IDs, federation between clouds and CI, and policy on which workload may reach which resource. NHI programs inventory and govern identities that already exist. WIM changes how workloads authenticate. A vault stores or issues secrets. WIM tries to remove the stored secret.

**Buyer question:** Can this service, job, or container prove what it is at runtime and get access without a long-lived key?

**Usual owner:** Platform engineering or SRE, with cloud security or IAM setting policy.

**Budget source:** Platform engineering or cloud security. It is rarely the IGA budget, and it may compete with vault spend.

## Owning seats

- Identity security lead (`identity-security`)
- DevOps / platform engineering (`platform`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Aembit: Aembit's non-human identity page describes policy-based, secretless, just-in-time access between workloads and resources. It does not say federation, and it does not list targets. Inventory and decommissioning are not on that page.

## Vendors (adjacent)

_None recorded._

## What buyers do instead

- Keep secrets in a vault and rotate them. Good enough when: Few workloads, one platform, and targets that only accept keys or passwords. Breaks when: Rotation lags, keys leak from CI or config, or workloads span clouds and need per-request policy. — hypothesis
- Cloud provider workload identity and federation features. Good enough when: Most workloads and targets live in one cloud that already issues workload tokens. Breaks when: Workloads cross clouds, on-premises, SaaS APIs, or CI systems that each federate differently. — hypothesis
- Self-run open-source workload identity (for example SPIFFE/SPIRE). Good enough when: A platform team that can run and upgrade the issuing infrastructure itself. Breaks when: Nobody owns the control plane, or targets outside the mesh still need brokered credentials. — hypothesis

## Objections

_None recorded._

## Triggers

- Leaked long-lived cloud or API key
- Multi-cloud or hybrid workloads calling each other
- CI pipelines holding static deploy credentials
- Zero-trust or service-mesh program

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
