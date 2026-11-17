---
id: "cwpp"
type: "category"
name: "Cloud workload protection"
layer: "core"
vendors: 3
---

# Cloud workload protection

Runtime protection of cloud workloads: hosts, containers, and serverless. Adjacent to endpoint security and to container security. Confirm which runtime the product actually sees.

**Buyer question:** What is running in the cloud, and can we stop a bad process there?

**Usual owner:** Cloud security or platform.

**Budget source:** CNAPP or workload protection.

## Owning seats

- Cloud security (`cloud-sec`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

_None recorded._

## Vendors (adjacent)

- Orca Security
- Aqua Security
- Sysdig

## What buyers do instead

- Posture scanning without runtime protection. Good enough when: Workloads are short-lived and posture is the main risk. Breaks when: Runtime threats, crypto-mining, or container escape attempts go unseen. — hypothesis
- Run the endpoint agent on cloud servers. Good enough when: Long-lived VMs that look like servers. Breaks when: Containers, serverless, and ephemeral workloads don't fit the agent model. — hypothesis

## Objections

_None recorded._

## Triggers

- Container runtime gap
- Agent fatigue

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
