# LimaCharlie AI Sessions vs other agent architectures — engineering burden thesis

**Status:** Research synthesis / hypotheses for review · **Recorded:** 2026-10-16 · **Scope:** public-source architecture and buyer-decision comparison. This is not a verified Grid implementation audit.

## Central insight

> **The differentiator may not be smarter AI agents. It may be the amount of secure engineering infrastructure customers no longer need to build, integrate, operate, and audit.**

For security engineering leaders, MSSPs/MDRs, and AI-native security startups, **engineering burden reduction** may be a stronger initial value proposition than generic AI analyst efficiency. Treat this as a GTM hypothesis requiring buyer validation and engineering demonstrations.

### Jobs to be done

- **AI security product builder:** Launch an agent-enabled security service without independently building every telemetry connector, security query abstraction, agent execution sandbox, credential-control interface and audit trail.
- **Enterprise security platform engineer:** Deliver one authorized investigation or response workflow against existing tooling without rebuilding and operating yet another orchestration runtime.
- **MSSP/MDR operator:** Build repeatable, tenant-aware automated services without incurring excessive per-customer engineering and maintenance costs. Tenant-level isolation of *agents, prompts, keys, memory* must be verified.

### Documented versus proposed layers

| Layer | Current evidence | Boundary / unknown |
| --- | --- | --- |
| LimaCharlie security telemetry, APIs, security operations substrate | Published platform docs and Grid positioning | Scope varies by product / deployment |
| AI Sessions trusted control plane and isolated untrusted agent execution | [Official architecture and Isolation & Trust](https://docs.limacharlie.io/9-ai-sessions/architecture/#isolation-trust) | Security claims are documentation, not independent audit |
| Scoped authorization / session tooling / credential handling | Same architecture reference | Confirm policy enforcement details for each tool and external provider |
| Grid AI FDE orchestration | [Grid marketing](https://limacharlie.io/grid) | Do not assume AI Sessions and FDE share identical runtimes without verification |
| Persistent orchestration, scheduling, retries, durable state, outcome verification | Strategic OS hypothesis | Not proven by AI Sessions architecture page |

**BYO LLM nuance:** user-selected model/provider may support existing vendor governance; it does *not* by itself guarantee data stays within customer's network, privacy compliance, per-tenant isolation or prompt retention policies. Verify actual prompt context, egress, provider terms, logging and control-plane boundaries.

### Competitive architectural alternatives

| Alternative | Buyer still needs to determine | Fair comparison |
| --- | --- | --- |
| Custom LangGraph + cloud runtime + SIEM/EDR APIs | Isolation, connectors, secret management, permissions, auditability, deployment, operations; framework may already support durable state | Compare total engineering ownership, not just agent intelligence. [LangGraph durability](https://docs.langchain.com/oss/python/langgraph/durable-execution) |
| AWS Bedrock Agents / cloud-native tools | Security tool integration, customer-specific runbooks and cloud/IAM architecture; managed services already cover agent controls | AWS is not devoid of guardrails; compare native security-domain primitives. [AWS Bedrock Agents](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html) |
| Tines / deterministic SOAR with AI capabilities | Workflow authoring and maintenance, custom cases, tool integration as applicable | Strong repeatability and mature workflow controls; not categorically less secure. [Tines](https://www.tines.com/platform/) |
| AI SOC analyst products | Agent outcomes, control plane openness, governance, integrations and extensibility | May be a substitute for particular jobs, but not necessarily an infrastructure substitute |
| LimaCharlie Grid / AI Sessions | Model-specific data handling, FDE state persistence, allowed actions, tenant controls, runtime availability, unit economics | Potentially reduces *integration and operations burden* while offering security-native tooling; not yet quantified |

### How to validate engineering burden reduction

Record for one narrowly bounded security workflow:
1. **Time to first controlled action:** elapsed engineering and operator hours from clean account to a working approval-gated investigation.
2. **Integrations to build or maintain:** source connectors, SIEM/EDR/API interfaces, auth scopes, secrets, policy, telemetry normalization.
3. **Ongoing run cost and maintenance:** hosting, model inference, telemetry, troubleshooting, version upgrades, on-call and vendor support.
4. **Governance artifacts:** access boundaries, audit logs, test results, human approvals, incident rollback and tenant segregation.
5. **Reliability:** task completion and false-action rates, human intervention, retry/failure recovery, degraded-source behavior.
6. **Economic contrast:** LimaCharlie platform/provider/usage costs versus engineer time and DIY cloud/tool spend. Do not assert cheaper without workload measurements.

**Suggested buyer interview:** “If you built a persistent identity monitoring operator in-house using LangGraph, cloud agent services, Tines and your security tools, what would you need to own? Which of those responsibilities could LimaCharlie remove, and what would remain?”

### GTM implications (hypotheses, not customer evidence)

- **Core positioning:** “Build security operations without rebuilding the security infrastructure beneath them.”
- **Engineering-oriented version:** “Let engineers spend time on detections and service differentiation, not maintaining agent sandboxes, connectors and permission plumbing.”
- **Enterprise:** “Run governed operators alongside the stack you already own.”
- **MSSP/MDR:** “Build differentiated services with reusable security infrastructure and explicit tenant boundaries.”
- **AI security startups:** “Own the product experience. Evaluate what infrastructure you can avoid owning.”

Grid's possible strategic framing is “operating system for autonomous SecOps.” Mark this as an interpretation, not established technical classification. AI Sessions is the documented **managed agent execution substrate**; supervision, durable memory, scheduling and end-to-end outcome verification remain questions.

### Questions / evidence gaps

1. Do FDE workers use AI Sessions or a distinct execution mechanism?
2. What continues across ephemeral sessions? Durable memory, schedule, replay, crash recovery?
3. Can non-LLM policy independently deny risky actions? Where are approval gates enforced?
4. How is cross-tenant isolation maintained in credentials, model context, tools, logs and memory?
5. What does Grid independently bill versus standard endpoint/telemetry pricing and BYO provider tokens?
6. What share of common SOC workflow engineering (measured in days/ongoing maintenance) is eliminated?

### Sources

- [LimaCharlie AI Sessions architecture / isolation and trust](https://docs.limacharlie.io/9-ai-sessions/architecture/#isolation-trust) — official product documentation, verify last update
- [LimaCharlie Grid](https://limacharlie.io/grid) — company positioning; do not treat marketing claims as independent proof
- [LimaCharlie pricing](https://limacharlie.io/pricing) — published price structure, not full Grid quote
- [LangGraph durable execution](https://docs.langchain.com/oss/python/langgraph/durable-execution) — alternative architecture reference
- [Amazon Bedrock Agents documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html)
- [Tines platform](https://www.tines.com/platform/)

**Evidence note:** These are primary/reference URLs for future verification; this document synthesizes prior research discussion and does not claim a fresh technical penetration test or buyer interview.
