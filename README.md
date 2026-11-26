# Security Market Map

[Explore the live Security Market Map](https://security-market-map.vercel.app/)

I’m Kristen Aing, an enterprise cybersecurity seller. When two security products sound alike, I want to know which part of the buyer’s problem each one solves. I built this map to connect security categories, buyer roles and products to the public sources behind their claims.

## Start with a question

| What do you want to know? | Where to start |
| --- | --- |
| What does this security category do, and who owns the problem? | [Browse domains](https://security-market-map.vercel.app/domains), then open a category to see its purpose, buyers and adjacent categories. |
| Where does a product fit? | [Search the landscape](https://security-market-map.vercel.app/landscape) by product or company. Follow its profile to see its positioning and related categories. |
| What evidence supports a buying decision? | [Compare products](https://security-market-map.vercel.app/compare) for one use case. Open the cited sources and note which questions are still marked **Unknown**. |

### A question I’d take into discovery

**“We found an exposed application credential. Who can revoke it, and how will we know the app picked up its replacement?”**

A scanner finding tells me where someone saw the credential. To understand the response, I’d ask who can invalidate the old credential at the issuer, who owns the application using it, and what evidence each person can bring back. Those questions help a buyer see where secrets detection, secrets management and incident response fit together. [Walk through the handoff](docs/market-research/workforce-identity-and-credential-response.md#from-public-alert-to-confirmed-containment) or [explore seven secrets-management decisions](docs/market-research/secrets-management-comparison.md).

## How to read the evidence

Identity and secrets have the deepest coverage. Across the wider map, a category or vendor profile can help you decide what to investigate even when capability evidence is sparse. The [live map](https://security-market-map.vercel.app/) displays current catalog counts. The [dated category audit](docs/market-research/category-audit-2026-11-06.md) records coverage and gaps at the time of review.

- **Vendor-published** means the statement comes from the vendor. Open the source to see exactly what it promises and when it was reviewed.
- **Conflicting** means sources disagree. Both accounts stay visible.
- **Unknown** means the map has insufficient evidence to answer that question. Use it as a follow-up in an evaluation.

The map is an independent educational project. Category membership describes where a product fits. Use the [methodology](https://security-market-map.vercel.app/methodology) and [source ledger](https://security-market-map.vercel.app/sources) to interpret individual claims.

## Go deeper

- **Learn a market.** The [industry and category guide](docs/market-research/industry-category-foundation.md) explains domains, workflows and category boundaries. The [security persona guide](docs/market-research/security-org-personas.md) explains who owns the work.
- **Prepare a buyer conversation.** Explore the research on [security operations and managed providers](docs/market-research/secops-mssp-economics-2026-11-06.md), [email fraud response](docs/market-research/agentic-email-security-2026-11-05.md), or [secrets detection](docs/market-research/secrets-detection-sweep-2026-10-13.md). Each guide gives its sources and review status.
- **Learn by following a scenario.** The [coding-agent walkthrough](https://security-market-map.vercel.app/attack-path) follows one credential from discovery to attempted data export, showing where different controls could intervene.
- **Contribute a correction.** Follow the [contribution guide](CONTRIBUTING.md) and [research playbook](docs/market-research/competitive-intelligence-playbook.md). Published records live in the [typed catalog](lib/data/). A person reviews proposed findings before adding them to the catalog.

## Run locally

```bash
npm ci
npm run dev
```

Open [localhost:43123](http://127.0.0.1:43123). The app runs from the bundled catalog without API keys.

| Working on | Reference |
| --- | --- |
| Catalog structure, evidence and freshness | [Catalog assembly](lib/catalog.ts) and [record schemas](lib/schema.ts) |
| Validation, hooks and release checks | [Contribution checks](CONTRIBUTING.md#checks-and-limits) and [release workflow](RELEASE.md) |
| Research fixtures and scheduling | [Research engine](docs/research-engine.md) and [Inngest setup](docs/inngest.md). The vendor-monitor example runs on an offline fixture. |
| New sources and proposed integrations | [Market feed review](data/market-feeds/README.md) and [proposed shared architecture](docs/security-intelligence/architecture.md) |

[More of Kristen Aing’s work in enterprise cybersecurity](https://www.kristenaing.com/work)
