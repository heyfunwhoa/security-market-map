# Modern SIEM Architecture Models (MSAM)
Source: [SACR, The SIEM Problem Has Become an Architecture Problem](https://softwareanalyst.io/reports/the-siem-problem-has-become-an-architecture-problem), Uche Obiora and Sean Sosnowski, Oct 15 2026, updated Nov 13 2026, accessed Nov 25. Sponsored by Datadog and Scanner; SACR states editorial independence. Vendor profiles are illustrative, not rankings.

## Concepts
SIEM (security information and event management); XDR (extended detection and response); SOAR (security orchestration, automation and response); MCP (model context protocol); hot/warm/cold telemetry; indexed search versus querying data at its storage location; distributed detection; data portability and provenance.
SACR MSAM is an architecture framework rather than five mutually exclusive product categories. Two axes: customer vs vendor data control; modular vs integrated operating environment. Four design concerns: telemetry lifecycle, detection location and quality, investigative evidence, authorized agent activity.
Reuse existing SIEM, XDR, pipeline, detection engineering and response categories; reconcile IDs before adding typed records.

## Vendor intake by SACR narrative placement
| Model | Control point | Named examples |
|---|---|---|
| Converged SIEM/XDR | Integrated operations | Microsoft Sentinel; CrowdStrike; Palo Alto Networks Cortex XSIAM; Exaforce; Anomali; SentinelOne; Daylight Security |
| Observability-connected | Shared operational telemetry | Datadog |
| Pipeline-first | Upstream event processing | Cribl; Brava Security |
| Data platform, object storage native | Customer-controlled storage | Scanner.dev; Mitiga |
| Data platform, enterprise native | Lakehouse | Databricks |
| Federated | Distributed evidence access | Vega; 7AI; Artemis Security |

Secondary overlaps include SentinelOne with pipelines, Vega with data platforms, 7AI and Artemis with convergence. Figure 1/7 graphic not visually verified; roster is narrative only. No new vendor capability claims or ratings. Reconcile canonical vendor/product IDs and primary sources before typed integration.

## Applied evaluation (editorial proposal)
Compare telemetry completeness before/after routing, historical query latency on representative data, rule regression and false positives, source failure visibility, retention cost including engineering, exportability, scoped agent permissions, approvals and verified response. Distinguish empty results from failed sources. Use synthetic or authorized buyer data only.
Asset Intelligence supplies reconciled context; ARISE can govern agent operations; Trusted SOC connects evidence, decisions and verified outcomes. These are editorial cross-framework relationships, not claims of shipped integration.
Downstream research candidates: Account Signal Engine (SIEM renewal, data volume and SOC modernization signals); GTM Revenue OS (architecture discovery and POC); Joy Index (SecOps learning). No production changes or automated synchronization.
