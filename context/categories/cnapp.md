---
id: "cnapp"
type: "category"
name: "Cloud-native application protection"
layer: "adjacent"
vendors: 9
---

# Cloud-native application protection

A suite label that bundles posture, identity entitlements, workload, and sometimes code. Treat the module on the order form as the product. Do not treat the suite name as proof of every module.

**Buyer question:** Which modules are we actually licensed for?

**Usual owner:** Cloud security.

**Budget source:** CNAPP renewal. Code and identity modules may be extra.

## Owning seats

- CISO / VP of security (`ciso`)
- Security architect (`security-architect`)
- Cloud security (`cloud-sec`)
- Cyber recovery / resilience (`cyber-recovery`)
- CTO / VP of engineering (`cto`)

## Vendors (primary)

- Wiz: CNAPP vendor. Cloud entitlement conversations often happen here. That is adjacent budget to IGA, not a certification suite, unless a sourced claim says otherwise. Wiz markets a DSPM solution for cloud data security. Vendor-reported DSPM scope reviewed 2026-10-13.
- Orca Security: Homepage retrieved 26 Oct 2026 says the platform unifies cloud posture and evaluates paths that include misconfigurations. Code, secrets, identity permissions, and data are named on the same page and are not separate cells.
- Sysdig: Cloud and container security vendor named beside Wiz, Orca, and Aqua. Modules unverified.
- Upwind: Cloud security vendor on the same shortlist as CNAPP platforms. No runtime claim is checked.
- Lacework: Cloud security vendor named on CNAPP shortlists. Corporate ownership was not re-checked.
- Uptycs: Cloud security and detection vendor. Not assumed to be a corporate EDR product.
- Dazz: Named in the cloud-security set. Ownership was not re-checked. Treat it as a remediation and posture candidate until a current page is read.

## Vendors (adjacent)

- Gem Security
- Sweet Security

## What buyers do instead

- Separate CSPM, workload, and IaC tools. Good enough when: Different teams own each layer and tools are already in place. Breaks when: Findings need one risk view across code, cloud, and runtime. — hypothesis

## Objections

- "Our platform vendor already does this." — hypothesis
- "Our cloud provider's native tools are enough." — hypothesis

## Triggers

- CNAPP consolidation pitch
- A major cloud migration or a second cloud provider.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
