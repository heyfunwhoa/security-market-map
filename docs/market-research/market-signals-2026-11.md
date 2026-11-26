# Market signals — November 2026

**Status:** research candidate. The verified deals below are recorded as `acquisition` events; nothing here changes a category, a capability, or a vendor comparison. | **Observed:** 2026-11-26 | **Next review target:** 2026-12-26, or when any deal below closes | **Owner/reviewer:** pending human editorial assignment

Follows the [competitive intelligence playbook](competitive-intelligence-playbook.md): an agreement is recorded separately from a close, a report of talks is not a deal, and a buyer purchase does not by itself make the companies direct competitors.

## Zoom placement

Market → domain → vendor timeline. Each recorded signal sits on an existing vendor's `/vendors/[slug]` page as an event. No new vendor, category, navigation or UI is added. Targets that aren't on the map (AuthMind, Applied Compute, Fiddler, Dreadnode, Pillar) are named only inside the buyer's event, not added as records.

## Recorded in typed data

| Signal | Status | Primary source | Event IDs | Vendor change |
| --- | --- | --- | --- | --- |
| CrowdStrike to acquire Zscaler, all stock, about $43.9B enterprise value, 1.135 CRWD shares per ZS share | Definitive agreement 2026-11-23. Expected close in the second half of CrowdStrike FY2028, subject to Zscaler shareholder and regulatory approval. **Not closed.** | [CrowdStrike IR](https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-acquire-zscaler-bringing-network-security-and-zero) (also filed as [SEC EX-99.1](https://www.sec.gov/Archives/edgar/data/1535527/000110465926130801/tm2630454d2_ex99-1.htm)) | `evt-zscaler-crowdstrike-agree`, `evt-crowdstrike-zscaler-agree` | `zscaler` positioning notes the deal and says to treat Zscaler as independent until close. New open question about standalone availability. |
| IBM acquires AuthMind (identity observability) for HashiCorp Vault | Announced 2026-11-12. The post says "with the acquisition"; close date and price are **Unknown**. | [IBM Newsroom](https://newsroom.ibm.com/blog-ibm-advances-agent-identity-security-with-new-vault-capabilities) | `evt-hashicorp-authmind` | `hashicorp` positioning gains one sentence. |
| Palo Alto Networks to acquire Applied Compute (open-weight AI post-training and inference), all stock, $4.5B | Definitive agreement 2026-11-18. Expected to close in PANW fiscal Q3 2027. **Not closed.** | [PANW press release](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-to-acquire-applied-compute--bringing-secure-open-weight-ai-to-the-enterprise) | `evt-panw-applied-compute-agree` | None |
| CrowdStrike intends to acquire Fiddler (AI agent observability), planned as Falcon Observe, GA Q4 FY27 per CrowdStrike | Intent announced around 2026-11-04 at Fal.Con EU. Price and close are **Unknown**. | [CrowdStrike blog](https://www.crowdstrike.com/en-us/blog/crowdstrike-to-acquire-fiddler/) | `evt-crowdstrike-fiddler-intent` | None |

## Not recorded: needs a primary source

| Lead | What we have | Why it stays here |
| --- | --- | --- |
| Palo Alto Networks in talks to buy Clutch Security (`clutch`, NHI), about $500M | TechCrunch report, 2026-11-05 | **Talks only.** No agreement or company statement. Don't add to the `clutch` record until one exists. |
| Vanta to acquire Pillar Security, about $150M | Calcalist report, 2026-11-09 | Single secondary report. Pillar isn't on the map. |
| CrowdStrike to acquire Dreadnode (offensive AI / red teaming) | A CrowdStrike blog URL found in search | Not yet read. Verify date, terms and status before recording. |

## Buyer impact to review (editorial, not claims)

- **Zscaler + CrowdStrike:** an endpoint/XDR platform buying security service edge. Until close, an SSE evaluation should still treat Zscaler as an independent vendor. After close, ask whether Zscaler stays sold on its own and what happens to existing integrations with other EDR vendors. This doesn't change Zscaler's category (`network-edge`).
- **Agent observability as an acquisition theme:** IBM/AuthMind (credential use after issuance) and CrowdStrike/Fiddler (agent behavior monitoring) both buy runtime visibility for AI agents. Either one could become evidence for `agent-identity` or `agentic-runtime` capability claims **after** a product page documents it. They aren't claims yet.
- **Clutch:** if a PANW agreement is announced, record it the same way as `evt-panw-agree` (CyberArk) and note that Clutch is independent until close.

## Recheck

When a deal closes, add a separate close event (the `evt-panw-close` pattern) and update the vendor positioning. Don't edit the agreement event to say it closed.
