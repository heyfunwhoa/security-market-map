# LimaCharlie platform foundation — evidence note

Research change ID: LC-ARCH-2026-10-13.
Status: Researched; candidate editorial note, pending human review. Not a published typed catalog claim or Research Hub ingestion record.
Observed / last checked: 2026-10-13. Publication dates: unknown (undated pages).
Owner: Security Market Map editorial maintainer. Next review target: 2026-11-13, or earlier on documentation change; no scheduled automation implied.

## Question and delta

What underlies the security capabilities customers consume? Existing [competitive landscape](agentic-secops-competitive-landscape.md) and [persona research](limacharlie-audience-personas.md) already describe the platform and Grid. This note adds the documented hosting foundation and separates it from product capabilities and customer-built outcomes. It does not introduce a new vendor or competitor relationship.

## Source-supported claims

| Claim ID | Layer | Vendor-documented statement | Source / passage |
| --- | --- | --- | --- |
| LC-ARCH-01 | Hosting | LimaCharlie says its platform is hosted on Google Cloud. | S1, “Is my data secure with LimaCharlie?” |
| LC-ARCH-02 | Processing and access | Its FAQ identifies Google Kubernetes Engine for processing and Google Cloud IAM for component/customer-data isolation. | S1, same section |
| LC-ARCH-03 | Customer-facing platform | LimaCharlie describes API-first security building blocks, including endpoint telemetry and customizable detection/response. | S2, “Cloud-based security building blocks” |
| LC-ARCH-04 | Grid | Grid builds and supervises automation on the LimaCharlie platform; its outputs are inspectable/editable platform configurations. | S3, “What Grid actually gives you” and “Built on battle-hardened infrastructure” |

Evidence status for every row: official vendor documentation, not independently tested. Checked date is not publication or release date.

## Explanation and interpretation

Plain-language model: Google Cloud supplies the underlying computing infrastructure; LimaCharlie provides security data and action capabilities; customers and Grid assemble workflows using those capabilities.

Commercial hypothesis: this could reduce engineering effort for security-service providers and internal security teams. Validate implementation effort, operating costs, maintenance, reliability and tenant rollout time with a scoped proof of value. No quantified ROI or universal replacement claim follows from these sources.

Unknown: complete internal stack; proprietary versus third-party composition of every subsystem; contracted availability/region/retention; customer-specific deployment design. Google Cloud hosting alone does not establish a Chronicle dependency, Google ownership, or a formal commercial partnership.

## Downstream impact disposition

| Consumer | Decision | Reason / next action |
| --- | --- | --- |
| Security Market Map research | Update via this review PR | Adds architecture evidence; typed catalog and app remain unchanged. |
| Private company learning / interview workspace | Update authorized by user | Link this proposal and add architecture explanation, interpretation and validation questions; private context stays out of this repo. |
| Account Signal Engine Research Hub | Defer ingestion | This manual note is not a durable Hub source capture, hash, or approved research-evidence-v1 export. Use existing producer workflow when processing these URLs. |
| GTM Revenue OS | No change | No validated economics or forecast assumptions. |
| Builder Academy | Defer | General cloud/platform/application distinction may become a lesson; this note alone does not justify a curriculum change. |
| Technical Docs Platform | No change | Existing ownership ADR and playbook cover this work; no new governance needed. |

Follow [the existing playbook](competitive-intelligence-playbook.md) and [accepted boundary ADR](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/architecture/ADR-001-research-evidence-boundary.md). No automatic cross-repository publication.

## Sources and rights

- S1: LimaCharlie, [General FAQ](https://docs.limacharlie.io/8-reference/faq/general/), official technical documentation, undated; accessed 2026-10-13.
- S2: LimaCharlie, [Platform](https://limacharlie.io/platform), official product positioning, undated; accessed 2026-10-13.
- S3: LimaCharlie, [Grid: Your AI Field Engineer](https://docs.limacharlie.io/9-ai-sessions/grid/), official technical documentation, undated; accessed 2026-10-13.

Original pages inspected. Paraphrases and source pointers only; no full-page republication, raw customer data, or private interview content. Public accessibility is not a blanket redistribution license.
