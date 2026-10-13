# Security data, SecOps infrastructure and AI SOC overlap

Status: candidate editorial research; not published typed catalog claims.
Observed: 2026-10-13. Human review: pending. Review owner: repository maintainer.
Next editorial check: 2026-11-13, or earlier after a material product or ownership change.
Scope: public vendor descriptions and public filings; no private opportunity or interview facts.

## Four overlapping buying jobs

| Buying job | Candidate companies | What to evaluate |
| --- | --- | --- |
| Collect, normalize, enrich, route and retain security telemetry | Tenzir, Cribl, Monad, DataBahn, Observo AI / SentinelOne | Source coverage, schema quality, delivery/replay, data portability and total processing cost |
| Build a security service or product on reusable infrastructure | LimaCharlie; Monad for embedded pipelines; Abstract for composable data/detection; 7AI Build | Actual programmable scope, tenant isolation, implementation ownership, export and resale rights |
| Build, run and govern AI agents and cross-tool workflows | BlinkOps, Tines; LimaCharlie APIs/Grid as a comparison candidate | Tool permissions, approvals, deterministic actions, audit, evaluation and operating burden |
| Obtain AI-assisted or agentic SOC operations | 7AI, Exaforce, BlinkOps; Abstract for detection and AI-enabled operations | Detection, triage, investigation and response coverage; human intervention; purchased service versus self-operation |

These are analyst groupings, not exclusive categories, rankings, feature-equivalence assertions or confirmed competitive shortlists. Potential complements remain hypotheses until an architecture or supported integration is evidenced.

## Company index

| Company | Vendor-reported scope | Overlap hypothesis and limitation | Sources |
| --- | --- | --- | --- |
| Tenzir | Security pipelines; OCSF normalization, enrichment, validation and routing; in-stream TQL, Sigma and YARA detection | Data infrastructure and detection engineering. More than routing, but these capabilities alone do not establish a complete AI SOC | TZ1, TZ2 |
| Cribl | Telemetry collection, transformation, enrichment and routing; broader search and storage suite | Data-layer scope/budget may overlap; could also supply upstream infrastructure | CR1 |
| Monad | Managed security ETL and embedded pipelines configured through APIs | Strong builder audience relevance; integration/data infrastructure is narrower than a whole SOC | MO1, MO2 |
| DataBahn | Security telemetry ingestion, normalization, enrichment, routing and optimization | Security data infrastructure candidate; broader agent claims need capability-level diligence | DB1 |
| Abstract Security | Composable SIEM, pipelines, streaming/historical/federated detection and AI-enabled operations | Potential overlap extends from data preparation into detection and operations | AB1, AB2 |
| Observo AI / SentinelOne | AI-oriented telemetry processing and routing | Track within SentinelOne strategy; acquisition completion is documented, but joint product equivalence is not established | OB1, OB2 |
| BlinkOps | Agents, deterministic workflows and case management; agentic SOC offering | Agent execution and SOC overlap; integration depth and deployment requirements need validation | BL1, BL2 |
| Tines | AI-agent actions within workflows; tools to build AI SOC workflows | Agent/workflow infrastructure candidate; does not establish equivalent native telemetry or endpoint capabilities | TI1, TI2 |
| 7AI | Agentic security platform and a Build motion for customers/partners developing offerings | Both AI SOC and builder overlap; do not claim only LimaCharlie supports builders | SE1 |
| Exaforce | Agentic SOC platform, with self-operated and managed options | Broader operating-platform comparison; developer/OEM rights remain unknown here | EX1 |
| LimaCharlie | API-accessible security capabilities for product builders; Grid documentation | Reference vendor spanning programmable SecOps and AI operations; comparative superiority untested | LC1, LC2 |

### Ownership correction

SentinelOne's public filing states it completed the Observo acquisition on September 22, 2025 [OB2]. Record Observo as an acquired offering/company under SentinelOne rather than an independent startup. This is a company filing, not evidence that all promised integration outcomes shipped.

## Three different AI claims

1. **AI assists configuration:** helps an operator create mappings or pipelines.
2. **Infrastructure supports agents:** lets builders deploy agents, give tools permissions, and govern execution.
3. **Agents perform SOC work:** carry out triage, investigation or response tasks.

Evidence for one does not prove the other two. AI for SecOps also differs from security products that protect AI applications and agents.

## Commercial and architecture questions

- Which precise workflow is the buyer purchasing, and which platform already owns it?
- Which functions are native versus integrated: collection, normalization, storage, detection, reasoning and response?
- Does the customer want to build a differentiated service, configure a platform, or purchase managed outcomes?
- Who owns data, tenant boundaries, changes, approvals, support and ongoing operation?
- What is the full cost at the same workload, including pipeline duplication, retention, inference and engineering?
- Is there a documented integration or only a plausible coexistence design?

### Falsifiable hypotheses

| Hypothesis | Evidence that would disconfirm it |
| --- | --- |
| A data pipeline is complementary to LimaCharlie | Required protocols or tenant isolation cannot be supported, or duplicated processing makes the design uneconomic |
| A builder motion differentiates LimaCharlie | Another evaluated product supplies the required APIs, ownership and operating model equally well |
| A packaged AI SOC reduces customer engineering work | The agreed workflow still requires substantial custom integration, tuning and human intervention |

No measured scores, pricing comparisons, ROI or win rates are asserted.

## Original source register

All URLs were discovered/inspected through web retrieval on 2026-10-13. Source publication dates are unknown unless explicitly recorded. This is candidate research, not full documentation or product testing. Human reviewed date is unset. Vendor materials remain vendor-reported; OB2 is issuer-reported corporate information. Store links and paraphrases only; no right to republish full pages is assumed.

| ID | Publisher | Original URL | Publication date |
| --- | --- | --- | --- |
| TZ1 | Tenzir | https://tenzir.com/solutions/use-cases/ | Unknown |
| TZ2 | Tenzir | https://tenzir.com/ | Unknown |
| CR1 | Cribl | https://cribl.io/blog/the-observability-pipeline/ | Unknown |
| MO1 | Monad | https://www.monad.com/ | Unknown |
| MO2 | Monad | https://www.monad.com/use-cases/embedded-security-pipelines | Unknown |
| DB1 | DataBahn | https://www.databahn.ai/press-releases/databahn-advances-security-data-pipeline-with-autonomous-in-stream-data-intelligence | 2026-03-24 |
| AB1 | Abstract Security | https://www.abstract.security/ | Unknown |
| AB2 | Abstract Security | https://www.abstract.security/platform | Unknown |
| OB1 | SentinelOne | https://www.sentinelone.com/blog/observo-ai-and-the-future-of-the-autonomous-soc/ | Unknown |
| OB2 | SentinelOne filing / SEC | https://www.sec.gov/Archives/edgar/data/1583708/000158370826000055/s-20260731.htm | Unknown; period ended 2026-07-31 |
| BL1 | BlinkOps | https://www.blinkops.com/agentic-soar | Unknown |
| BL2 | BlinkOps | https://www.blinkops.com/ai-soc | Unknown |
| TI1 | Tines | https://www.tines.com/stories/docs/actions/types/ai-agent/ | Unknown |
| TI2 | Tines | https://www.tines.com/solutions/security/ai-soc/ | Unknown |
| SE1 | 7AI | https://7ai.com/platform | Unknown |
| EX1 | Exaforce | https://www.exaforce.com/platform | Unknown |
| LC1 | LimaCharlie | https://www.limacharlie.com/solutions/builders | Unknown |
| LC2 | LimaCharlie | https://docs.limacharlie.io/9-ai-sessions/grid/ | Unknown |

## Ownership, refresh and publication

Security Market Map owns this public research. See the [existing landscape](agentic-secops-competitive-landscape.md) and [Competitive Intelligence Playbook](competitive-intelligence-playbook.md). The typed application catalog in `lib/data` remains unchanged; publication needs claim-level source review and existing catalog tests. No live integration, partner agreement or direct substitution is confirmed.

- Monthly editorial review is a target, not a running automation.
- Recheck product scope, corporate ownership, source availability and conflicting claims before publication.
- Private learning consumers should link this document rather than duplicate its vendor registry.
- Account intelligence and revenue scenarios: no changes; no account-specific evidence or validated economics supplied.
- Academy: defer until a stable educational use case is selected.
- The proposed shared Research Intelligence Lifecycle path returned 404 during this change. Local provenance and publication rules govern this candidate note; no compliance with the unavailable document is claimed.
