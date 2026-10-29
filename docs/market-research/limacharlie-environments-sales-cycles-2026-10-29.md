# LimaCharlie environment technical fit and sales-cycle hypotheses

As of 2026-10-29. Status: source-backed vendor capabilities and **unvalidated GTM hypotheses**. Estimated ranges are not historical LimaCharlie sales data. Companion: [Notion outbound strategy](https://app.notion.com/p/3f6cdefaec7581b2aa0cef13f492cf31).

| Environment | Approximate first paid production cycle | Initial buyer | Entry workflow | Qualification risk |
| --- | --- | --- | --- | --- |
| MSSP / MDR, 10–100 tenants | 45–120 days | Head of SOC / CTO / founder | Automate repetitive quarantine/approval/triage queue across 2–3 client tenants using isolated organizations, adapters, Cases, D&R and governed agents | Vendor integration depth, permissions, staff trust, profitability |
| Cloud-native SaaS, AWS/Kubernetes/identity | 30–90 days | Security engineering lead / CTO | CloudTrail and Okta/Entra telemetry, filtered per-GB ingestion, D&R, investigation | True GB volume, residency, cloud event coverage, platform integration |
| DFIR and IR retainers | 14–60 days for pilot | IR practice lead | Preauthorized sleeper sensors, activation drill, evidence collection and response | Authorization, episodic billing, standby and event economics |
| Enterprise SOC / SIEM coexistence | 90–240+ days | CISO / SOC director | One SIEM pipeline and detection/response workflow in parallel with incumbent tooling | Procurement, detection parity, audit, data residency and scope |
| Security product / OEM builders | 30–120 days to paid prototype; 3–9+ months OEM | Founder / CTO | API/CLI/MCP-linked detection and agent prototype on tenant-separated infrastructure | Commercial rights, dependency risk, SLA, unit economics, security model |
| Distributed multisite | 60–180 days | IT/security director | Pilot supported endpoint sensors, site-level management and incident escalation | Device compatibility, bandwidth, regulated/OT constraints, rollout |

## Architecture and commercial reasoning

**MSSP:** One isolated org per customer; centrally managed staff groups; reusable IaC templates, adapters, D&R rules, outputs and Cases; optionally AI Sessions/Grid for governed repetitive work. Measure minutes per ticket, exception rates, new-client onboarding time, cost per managed tenant, and net expansion by tenant.

**Cloud-native:** Relative attractiveness increases when customer uses substantial identity and cloud logs but few traditional endpoints. External telemetry charged by GB; endpoint sensor telemetry has different billing. Validate filters and actual GB/day. Measure signal-to-noise and cost per investigated cloud finding.

**DFIR:** Sleeper mode documented at $0.10 per 30 days *plus* event processing and retained-event charges. Prepositioning lowers readiness latency, but contract/process for activation is essential. Measure drill success and time to useful evidence.

**Enterprise:** Coexist with SIEM/EDR first. Use D&R, outputs and native integrations to prove one scope. No general SIEM replacement claim without parity tests. Measure cost and latency of that exact scope plus governance.

**Builders:** Infrastructure-as-code, API/CLI, isolated tenant model and optional MCP/AI Sessions support agent and security product development. Distinguish technology fit from OEM rights, commercial terms and platform reliance.

**Distributed:** Endpoint deployment plus central rules might fit repeatable, managed locations; don't claim support for medical/OT devices without validation.

## Qualification and sales-cycle stages

Discover workflow and budget owner → measurable baseline and chosen integration → scope/governance and pricing → pilot negative/positive cases → paid production → usage and expansion. Track actual stage duration, implementation engineer hours, drop-off, 30/60/90-day expansion and median sales-cycle by segment before recalibrating estimates.

### Authoritative sources
- [Pricing](https://limacharlie.io/pricing)
- [MSSP walkthrough](https://docs.limacharlie.io/1-getting-started/mssp-walkthrough/)
- [MSSP use cases](https://docs.limacharlie.io/1-getting-started/use-cases/mssp-msp-mdr/)
- [AI Sessions](https://docs.limacharlie.io/9-ai-sessions/)
- [Access and staff groups](https://docs.limacharlie.io/7-administration/access/designing-access/)
- [Sleeper mode](https://docs.limacharlie.io/2-sensors-deployment/endpoint-agent/sleeper/)
