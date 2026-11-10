---
id: "iac-security"
type: "category"
name: "Infrastructure-as-code security"
layer: "core"
vendors: 1
---

# Infrastructure-as-code security

Review of Terraform, CloudFormation, and similar before apply. It catches the change in the pull request. CSPM catches what is already deployed. Both can be true.

**Buyer question:** Can we stop a bad cloud change before it is applied?

**Usual owner:** Platform or cloud security.

**Budget source:** Platform or cloud security tooling.

## Owning seats

- DevOps / platform engineering (`platform`)
- Platform security (`platform-security`)
- Software supply-chain security (`supply-chain-security`)
- CTO / VP of engineering (`cto`)

## Vendors (primary)

- Gomboc: Named beside cloud and infrastructure-as-code security. No policy-fix claim is checked.

## Vendors (adjacent)

_None recorded._

## What buyers do instead

- Open-source IaC linters in CI. Good enough when: A few repos and engineers who fix findings. Breaks when: Rules, exceptions, and drift between code and cloud need managing at scale. — hypothesis
- Catch misconfigurations after deploy with CSPM. Good enough when: Infrastructure changes are infrequent. Breaks when: Fixing in production is slower and riskier than catching it in the pull request. — hypothesis

## Objections

_None recorded._

## Triggers

- Everything is Terraform
- A public resource created from a module

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
