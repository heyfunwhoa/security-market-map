---
id: "model-security"
type: "category"
name: "Model and infrastructure security"
layer: "core"
vendors: 1
---

# Model and infrastructure security

The model supply chain, how a model is deployed, and protection of the runtime that serves it. Distinct from testing prompts in an application and from deciding which tools an agent may call.

**Buyer question:** Which model is running, where, and what can reach that runtime?

**Usual owner:** Platform or AI infrastructure.

**Budget source:** Platform or cloud. Not the IGA renewal.

## Owning seats

- AI platform owner (`ai-owner`)

## Vendors (primary)

_None recorded._

## Vendors (adjacent)

- Palo Alto Networks

## What buyers do instead

- Cloud AI platform security defaults. Good enough when: Models run on one managed AI platform. Breaks when: Self-hosted models, model supply chain, or GPU infrastructure need their own controls. — hypothesis
- Cover AI infrastructure with existing cloud posture tools. Good enough when: AI workloads look like other cloud workloads. Breaks when: Model artifacts, training pipelines, and model files need AI-specific checks. — hypothesis

## Objections

_None recorded._

## Triggers

- A self-hosted model
- An unreviewed model package

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
