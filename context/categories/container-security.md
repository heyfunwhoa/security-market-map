---
id: "container-security"
type: "category"
name: "Container and Kubernetes security"
layer: "core"
vendors: 5
---

# Container and Kubernetes security

Images, admission, runtime, and cluster configuration. Overlaps SCA for image contents, CWPP for runtime, and secrets management when the cluster needs a credential.

**Buyer question:** What is in the image, what is allowed to run, and how does the workload authenticate?

**Usual owner:** Platform security.

**Budget source:** Platform or CNAPP.

## Owning seats

- DevOps / platform engineering (`platform`)
- Platform security (`platform-security`)
- Software supply-chain security (`supply-chain-security`)
- CTO / VP of engineering (`cto`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Aqua Security: Container and cloud-native security candidate. No image or runtime capability is checked.
- Sysdig: Cloud and container security vendor named beside Wiz, Orca, and Aqua. Modules unverified.
- Chainguard: Software supply-chain vendor associated with hardened images. Not an SCA scanner by assumption.
- RapidFort: Container and image-hardening vendor on the supply-chain row. Not assumed to scan application code.

## Vendors (adjacent)

- Snyk

## What buyers do instead

- Open-source image scanners and admission policies. Good enough when: A few clusters and a platform team that owns policy. Breaks when: Many clusters, runtime threats, and reporting across teams. — hypothesis
- Container coverage inside a CNAPP. Good enough when: Kubernetes is one part of a broader cloud estate. Breaks when: Deep Kubernetes runtime or policy needs exceed the suite. — hypothesis

## Objections

_None recorded._

## Triggers

- Kubernetes standard
- Image scanning gap

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
