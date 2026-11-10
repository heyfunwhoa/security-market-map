---
id: "ai-owner"
type: "seat"
name: "AI platform owner"
kind: "persona"
function: "engineering"
sourcedPains: 1
pains: 3
---

# AI platform owner

Ship AI gateways, models, and agents; often not the owner of the security bar.

## Typical titles

- ic: AI Platform Engineer, ML Platform Engineer
- senior-ic: Senior AI Platform Engineer, Staff AI Platform Engineer, Principal AI Platform Engineer
- manager: AI Platform Manager, ML Platform Manager
- director: Director of AI Platform, Head of AI Platform
- vp: VP of AI Platform

## Owns categories

- AI agent identity and runtime authorization (`agent-identity`)
- NHI and workload identity (`nhi`)
- AI governance (`ai-governance`)
- Agentic runtime enforcement (`agentic-runtime`)
- Model and infrastructure security (`model-security`)

## Pains

- AI tools and models shipped without access controls or shadow-AI policy — sourced ([IBM](https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls))
- Shipping agents faster than controls exist — hypothesis
- Unclear who approves agent data and tool access — hypothesis

## Objections

- "It's too early to buy for AI agents." Usually about: No inventory of agents yet, and unclear ownership. Reframe to test: Start with finding which agents and AI tools are already in use and what they can reach. — hypothesis

## Qualification questions

- Is the team shipping AI features or agents to customers or employees? Good fit if: Product launches or internal agents in use. (high weight, hypothesis)
- Has security slowed or blocked an AI launch? Good fit if: Launch delays from security review. (medium weight, hypothesis)
- Is AI work still only a proof of concept? Poor fit if: No production AI workloads. (medium weight, hypothesis)

## Buying triggers

- Teams start deploying AI agents or MCP servers with access to internal systems. — hypothesis

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
