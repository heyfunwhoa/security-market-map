---
id: "ai-security"
type: "seat"
name: "AI security"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 2
---

# AI security

Controls for models, AI apps, agents, and AI data paths, including approved actions.

## Typical titles

- ic: AI Security Engineer, AI Red Team Engineer
- senior-ic: Senior AI Security Engineer, Staff AI Security Engineer, Principal AI Security Engineer
- manager: AI Security Manager, AI Red Team Manager
- director: Director of AI Security, Head of AI Security
- vp: VP of AI Security

## Owns categories

- AI application security (`ai-application-security`)
- AI data security (`ai-data-security`)
- AI governance (`ai-governance`)
- AI agent identity and runtime authorization (`agent-identity`)
- NHI and workload identity (`nhi`)
- MCP and tool security (`mcp-security`)

## Pains

- The AI risk taxonomy changes every year — sourced ([OWASP GenAI Security Project](https://genai.owasp.org/announcement/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/))
- Agents use credentials nobody inventoried — hypothesis

## Objections

- "It's too early to buy for AI agents." Usually about: No inventory of agents yet, and unclear ownership. Reframe to test: Start with finding which agents and AI tools are already in use and what they can reach. — hypothesis

## Qualification questions

- Are AI agents or MCP servers being given access to internal systems? Good fit if: Agent pilots with real credentials or tool access. (high weight, hypothesis)
- Is there a named owner for AI risk? Good fit if: An AI security role or AI governance committee. (medium weight, hypothesis)
- Is AI use limited to a chat tool with no internal data? Poor fit if: No AI features or agents in production. (medium weight, hypothesis)

## Buying triggers

- Teams start deploying AI agents or MCP servers with access to internal systems. — hypothesis

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
