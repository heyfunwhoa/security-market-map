---
id: "ai-application-security"
type: "category"
name: "AI application security"
layer: "core"
vendors: 8
---

# AI application security

Controls aimed at models and AI features, including prompt injection and model abuse. Securing the model remains a different job from deciding which tools an agent may call.

**Buyer question:** Is the issue the model, the application around it, or the identity the agent uses?

**Usual owner:** Product security or AppSec.

**Budget source:** AppSec or a new AI-security line. Do not take it from the IGA budget by default.

## Owning seats

- AI security (`ai-security`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Lakera: AI application security specialist. Corporate ownership was not re-checked. No model-protection claim is filled.
- HiddenLayer: AI security vendor named for model detection and protection. Unverified here.
- Robust Intelligence: AI security vendor on the same shortlist. Ownership was not re-checked. Do not treat it as agent identity.
- Noma Security: Named in SACR's runtime note for agent visibility beyond an MCP gateway. AI application security and runtime enforcement are not separated by a sourced claim here.
- Pillar Security: Pillar Security markets one platform to discover, test, secure and govern AI agents, with an inventory of agents, models, MCP servers and skills.

## Vendors (adjacent)

- Lasso Security
- Holistic AI
- Straiker

## What buyers do instead

- Manual red teaming and prompt reviews before launch. Good enough when: A few AI features with low exposure. Breaks when: Many AI features ship continuously and prompts change weekly. — hypothesis
- Model provider safety filters. Good enough when: Low-risk use cases with no sensitive data. Breaks when: Prompt injection, data leakage, or tool misuse matters for the business. — hypothesis

## Objections

_None recorded._

## Triggers

- A customer-facing model
- An internal copilot with tools

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
