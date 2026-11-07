# Security ecosystem map — personas, work edges, coverage, and influence

As of: 2026-11-07 (America/Chicago). Owner: Security Market Map editorial maintainer.
Status: source-linked research candidate; **draft for owner review**. Builds on [security-org-personas.md](security-org-personas.md) and the typed catalog in `lib/data`. Does not invent org charts, budget authority, or buying intent from titles.
Next manual review: 2026-12-07, or sooner after a persona or category catalog change.

## What this adds

The persona note answers *who the seats are*. This note answers *how they connect*:

1. **Where security sits** — reporting lines and budget drivers (sourced benchmarks).
2. **Persona clusters** — how the 37 typed personas group around the CISO and outside the security org.
3. **Work edges** — who hands off to, approves for, or collides with whom.
4. **Coverage** — persona → domain → category → vendor counts, computed from the catalog.
5. **Influence** — how buyers discover vendors, and the communities and standards each cluster uses.
6. **Delivery channel** — MSSP/MDR, integrators, resellers, consultants.
7. **Gaps** — categories with no persona owner, plus open questions.

**Evidence labels** (same as the persona note): *sourced* = cited primary or survey source; *vendor/practitioner-published* = publisher's own framing; *hypothesis* = working separation to validate in discovery; *unknown* = no evidence yet.

## 1. Where security sits (sourced)

| Finding | Source | Limit |
| --- | --- | --- |
| Most CISOs still report into IT leadership; a sizeable minority report outside IT. Executive-titled CISOs are more likely to report outside IT than VP/director-titled peers. | IANS + Artico 2026 State of the CISO (662 CISOs, data Apr–Nov 2025)[^IANS-2026][^SB-IANS] | Summary/press coverage only; full report gated |
| Executive-level CISO titles now make up the largest share of security leadership roles. | [^IANS-2026] | Title ≠ budget authority |
| Smaller companies are more likely to give the CISO direct CEO access; reporting lines shift in larger companies. | Hitch Partners 2025 North America Security Organization Report (500+ CISOs/directors), via Socket summary[^HITCH-2025] | Secondary summary; NA only |
| Top drivers of budget approval: compliance obligations, demonstrable business impact, clear ROI — public or private. | [^HITCH-2025] | Self-reported |
| Over half of surveyed CISOs manage 10+ security areas. | [^HITCH-2025] | Scope ≠ hands-on ownership |
| Practitioners now rank critical skills gaps above headcount; AI (41%) and cloud security (36%) top the skills list. | ISC2 2025 Workforce Study (16,029 respondents, May–Jun 2025)[^ISC2-2025][^CSO-ISC2] | Global, self-reported |

**So what for the map (hypothesis):** the CISO is usually a sponsor, not the operator. Reporting line changes who else sits in the room — under a CIO, IT security and identity dominate; under a CTO/engineering line, AppSec, platform, and the CTO themselves carry more weight. Ask, don't assume.

## 2. Persona clusters (hypothesis)

Clusters group the 37 typed personas by the job they share. A person can sit in more than one.

| Cluster | Personas (`id`) | Usually inside security org? |
| --- | --- | --- |
| **Lead & govern** | `ciso`, `security-architect`, `grc-owner`, `privacy`, `security-awareness` | Yes (privacy often legal) |
| **Build securely** | `appsec`, `product-security`, `platform-security`, `supply-chain-security`, `security-champion` | Yes (champion sits in engineering) |
| **Protect the estate** | `identity-security`, `iga-owner`, `pam-owner`, `cloud-sec`, `data-security`, `network-security`, `saas-security`, `ot-security`, `it-security` | Mostly; `it-security` and `ot-security` often under IT/operations |
| **Detect & respond** | `soc-lead`, `soc-analyst`, `detection-engineer`, `incident-response`, `threat-hunter`, `threat-intel`, `digital-forensics`, `insider-risk` | Yes, or outsourced (see channel) |
| **Validate & reduce exposure** | `offensive-security`, `exposure-management` | Yes |
| **Recover** | `cyber-recovery` | Split with IT/backup owners |
| **Engineering & AI owners** | `cto`, `engineering-manager`, `developer`, `platform`, `ai-owner`, `ai-security` | No (except `ai-security`) — they operate or fix |
| **Service providers** | `mssp-ops` | External |

## 3. Work edges (hypothesis unless noted)

Edge types: **sponsors** (funds/approves), **hands off to** (output becomes their queue), **co-owns**, **collides** (same budget word, different job — see the persona note's collision table).

| From | Edge | To | What moves across | Qualify with |
| --- | --- | --- | --- | --- |
| `ciso` | sponsors | every cluster lead | Budget, risk appetite, exceptions | "Who is on call for exceptions after go-live?" |
| `security-architect` | sets standards for | `appsec`, `platform-security`, `identity-security`, `cloud-sec` | Reference patterns, guardrails | "Which standard would this product change?" |
| `appsec` | hands off to | `developer`, `engineering-manager` | Findings → tickets → fixes | "Who can close a finding without a waiver?" |
| `security-champion` | bridges | `appsec` ↔ `developer` | Triage, context, adoption | "Is there a champions program, and who runs it?" |
| `appsec` (secret found) | hands off to | `platform` / `pam-owner` | Revoke/rotate, vault onboarding | "Who is allowed to revoke?" |
| `product-security` | co-owns with | `offensive-security`; feeds a PSIRT | Disclosure, launch reviews, pentests | "Is there a PSIRT? Who answers researchers?" FIRST membership includes PSIRTs (sourced)[^FIRST-IMP] |
| `supply-chain-security` | sets bar for | `platform`, `developer` | Provenance, build integrity | SLSA names producers, consumers (incl. CISO judging risk), and infrastructure providers (sourced)[^SLSA] |
| `detection-engineer` | hands off to | `soc-analyst` | Tested detections → alerts | "Who writes vs who triages?" |
| `soc-analyst` | escalates to | `incident-response` → `digital-forensics` | Cases, containment, evidence | "Who declares an incident?" |
| `threat-intel` | feeds | `detection-engineer`, `threat-hunter` | Indicators, hypotheses | "How does intel become a detection or a block?" |
| `exposure-management` | hands off to | `it-security`, `cloud-sec`, `appsec` | Prioritized exposures | "Which owner's queue does a finding land in?" |
| `identity-security` | co-owns with | `ai-owner`, `ai-security` | Agent identities, tool credentials | "Who approves an agent's access?" |
| `data-security` | co-owns with | `privacy`, `grc-owner` | Data inventory → policy → evidence | "Store discovery, egress, or evidence?" |
| `grc-owner` | depends on | control operators (all clusters) | Evidence for audits/questionnaires | "Who runs the control the evidence claims?" |
| `ot-security` | depends on | system integrators, product suppliers | Zone/conduit design, patch windows | ISA/IEC 62443 assigns separate duties to asset owners, integrators, and suppliers (sourced)[^62443-ROLES][^62443-SS] |
| `mssp-ops` | runs on behalf of | `soc-lead` (customer) | Monitoring, response under contract | "Selling a service or operating one org's SOC?" |
| `cto` | collides / co-sponsors with | `ciso` | Platform and delivery spend | "Whose budget line pays, and who adopts?" |

## 4. Coverage — persona → domain → categories → vendors

Computed from the catalog on 2026-11-07 (`catalog.personas`, `catalog.categories`, `catalog.vendors` primary categories). Domain = the two domains most often attached to the persona's categories. Vendor count = unique vendors with a primary category in the persona's set. **Counts describe this atlas's coverage, not the market.**

| Persona | Top domains | Categories | Vendors in atlas |
| --- | --- | --- | --- |
| `ciso` | secops, grc | `grc-controls`, `siem`, `endpoint-security`, `iga`, `cnapp` | 24 |
| `security-architect` | product, appsec | `threat-modeling`, `workforce-identity`, `secrets-management`, `aspm`, `cnapp` | 30 |
| `identity-security` | identity, corporate | `workforce-identity`, `iga`, `pam`, `nhi`, `ciem`, `itdr`, `agent-identity` | 46 |
| `iga-owner` | identity | `iga`, `workforce-identity` | 15 |
| `pam-owner` | identity, corporate | `pam`, `secrets-management` | 17 |
| `appsec` | appsec, product | `sast`, `sca`, `dast`, `api-security`, `aspm`, `secrets-detection`, `nhi` | 64 |
| `platform` | platform, identity | `secrets-management`, `nhi`, `container-security`, `iac-security` | 31 |
| `cloud-sec` | cloud, identity | `cspm`, `cwpp`, `ciem`, `cnapp`, `cloud-detection`, `itdr`, `adjacent-security` | 17 |
| `data-security` | data, cloud | `dspm`, `dlp`, `data-access-governance`, `privacy-governance`, `data-encryption` | 30 |
| `privacy` | data, grc | `privacy-governance`, `dspm`, `dlp`, `customer-trust` | 25 |
| `ai-security` | ai, product | `ai-application-security`, `ai-data-security`, `ai-governance`, `agent-identity`, `nhi` | 21 |
| `ai-owner` | identity, ai | `agent-identity`, `nhi`, `ai-governance` | 17 |
| `engineering-manager` | appsec, product | `sast`, `sca`, `aspm`, `secrets-detection` | 40 |
| `security-champion` | appsec, product | `sast`, `sca`, `secrets-detection`, `threat-modeling` | 36 |
| `it-security` | corporate, secops | `endpoint-security`, `email-security`, `it-vulnerability-management`, `network-edge`, `security-awareness` | 13 |
| `product-security` | product, appsec | `product-security-program`, `threat-modeling`, `vulnerability-disclosure`, `sast` | 10 |
| `platform-security` | platform, cloud | `container-security`, `iac-security`, `secrets-management`, `aspm` | 22 |
| `soc-lead` | secops, identity | `siem`, `soar`, `itdr`, `cloud-detection`, `xdr`, `mdr` | 14 |
| `detection-engineer` | secops, cloud | `siem`, `soar`, `cloud-detection`, `itdr`, `xdr` | 10 |
| `offensive-security` | offensive, product | `breach-simulation`, `pentest-program`, `vulnerability-disclosure`, `threat-modeling` | 5 |
| `grc-owner` | grc, product | `grc-controls`, `customer-trust`, `third-party-risk`, `privacy-governance` | 4 |
| `soc-analyst` | secops, corporate | `siem`, `xdr`, `soar`, `endpoint-security`, `cloud-detection` | 7 |
| `incident-response` | secops, corporate | `soar`, `siem`, `xdr`, `mdr`, `endpoint-security`, `itdr` | 11 |
| `threat-hunter` | secops, corporate | `siem`, `xdr`, `ndr`, `threat-intelligence`, `cloud-detection` | 11 |
| `threat-intel` | secops, corporate | `threat-intelligence`, `siem`, `digital-risk-protection`, `external-attack-surface` | 6 |
| `digital-forensics` | secops, corporate | `endpoint-security`, `siem`, `xdr`, `insider-risk` | 7 |
| `insider-risk` | corporate, data | `insider-risk`, `dlp`, `endpoint-security`, `email-security` | 12 |
| `network-security` | corporate, secops | `network-edge`, `ndr`, `microsegmentation`, `waf-waap` | 15 |
| `saas-security` | corporate, identity | `sspm`, `dlp`, `workforce-identity`, `dspm` | 33 |
| `ot-security` | corporate, secops | `ot-security`, `network-edge`, `ndr`, `microsegmentation` | 14 |
| `exposure-management` | corporate, cloud | `external-attack-surface`, `ctem`, `security-asset-management`, `cloud-vulnerability`, `it-vulnerability-management` | 9 |
| `cyber-recovery` | corporate, secops | `cyber-recovery`, `endpoint-security`, `cnapp` | 13 |
| `supply-chain-security` | platform, appsec | `software-supply-chain`, `sca`, `container-security`, `iac-security` | 20 |
| `security-awareness` | corporate, data | `security-awareness`, `email-security`, `insider-risk` | 6 |
| `mssp-ops` | secops, corporate | `mdr`, `siem`, `soar`, `xdr`, `security-data-pipelines` | 6 |
| `developer` | appsec, product | `sast`, `sca`, `secrets-detection`, `dast` | 39 |
| `cto` | platform, cloud | `aspm`, `secrets-management`, `container-security`, `iac-security`, `cnapp` | 28 |

**Reading the coverage:** the atlas is deep where builders and identity buy (AppSec 64, identity 46) and thin for GRC (4), offensive (5), and much of SecOps (6–11). That reflects research focus to date, not market size. Thin rows are the next vendor-research targets if SecOps buyers matter for the job search or a deal.

## 5. Influence — how buyers find and trust vendors

### Discovery and selection (sourced)

- Peer recommendations lead vendor discovery (55%), then staff recommendations (48%) and peer review sites (44%); research/survey reports have the strongest direct effect on selection (46%). 39% use AI when drafting RFPs. Ponemon + NOLA Marketing, 320 enterprise security decision-makers, published March 2026.[^PONEMON-2026][^CIOI-PONEMON]
- The same study describes influence as distributed across peer-review sites, consultants, resellers, technical workshops, research, website content, and AI-generated answers.[^CIOI-PONEMON]
- Analysts already tracked in this atlas: Gartner, SACR, Forrester, Latio (see `lib/data/sources.ts`). Per Ponemon, analysts rank below peers for discovery; treat analyst placement as a shortlist signal, not a buying trigger (hypothesis).

### Communities and standards by cluster

Where each cluster learns, gathers, and borrows its vocabulary. *Use for event, content, and referral planning — membership is not intent.*

| Cluster / persona | Professional community | Standards / frameworks they cite | Notes |
| --- | --- | --- | --- |
| All seats | ISC2 (CISSP etc.)[^ISC2-2025]; NICE work roles[^NICE] | NIST CSF, CIS Controls (already cited) | NICE roles are not job titles |
| `identity-security`, `iga-owner`, `pam-owner` | IDPro — vendor-neutral IAM Body of Knowledge and CIDPRO certification[^IDPRO-BOK][^IDPRO-BW] | IDPro BoK | Identity pros often learned via a single product first (practitioner view)[^IDPRO-SEM] |
| `privacy`, `data-security` | IAPP — reported 75,000+ members across 150 countries (secondary)[^IAPP-BNH] | Privacy regulation, IAPP certifications | Membership figure from press interview; not verified on IAPP site |
| `appsec`, `product-security`, `security-champion`, `developer` | OWASP chapters and projects | OWASP DevSecOps Guideline (cited), OWASP Top 10s | Shared vocabulary with engineering |
| `ai-security`, `ai-owner` | OWASP GenAI Security Project — community reported 30,000+ members[^OWASP-GENAI-2026] | OWASP Top 10 for LLM Applications 2026; Top 10 for Agentic Applications (Dec 2025)[^OWASP-AGENTIC] | Newest, fastest-moving vocabulary |
| `supply-chain-security`, `platform` | OpenSSF | SLSA[^SLSA] | Producer vs consumer framing matters in discovery |
| `incident-response`, `product-security`, `threat-intel` | FIRST — 820+ member teams in 110+ countries (2025)[^FIRST-2025]; CSIRTs and PSIRTs[^FIRST-IMP] | CVSS, CSIRT Services Framework (published by FIRST)[^FIRST-AR] | Vetted, peer-sponsored membership |
| `ot-security` | ISA Global Cybersecurity Alliance[^62443-ISAGCA] | ISA/IEC 62443; cited by CISA OT asset inventory guidance (Aug 2025)[^62443-CISA] | Separate duties for owners, integrators, suppliers |
| Sector teams (SOC, CTI, CISO) | Sector ISACs, coordinated via the National Council of ISACs[^NCI] | Sector-specific | Strong peer channel in regulated sectors (hypothesis) |

## 6. Delivery channel (hypothesis unless noted)

- **MSSP / MDR** (`mssp-ops`): buys multi-tenant tooling to run customers' detection and response; margins and tenancy drive evaluation, not one org's queue.
- **System integrators** (OT especially): ISA/IEC 62443 names integrators as a distinct role with their own requirements.[^62443-SS]
- **Resellers and consultants**: named in buyer influence research as part of the evaluation path.[^CIOI-PONEMON] Their role per category is **unknown** in this atlas.
- **Cloud marketplaces**: not yet researched here — **unknown**.

## 7. Gaps to close

### Categories with no persona owner (13)

Catalog `buyerOwner` text shown; proposed persona link is a **hypothesis** to add to `personas.ts` `categoryIds` after review.

| Category | Catalog owner text | Vendors in atlas | Proposed persona link |
| --- | --- | --- | --- |
| `agentic-runtime` | Identity security, with the team that owns the agent | 12 | `identity-security`, `ai-owner` |
| `ciam` | Product, developer-experience, or a dedicated CIAM owner | 5 | `identity-security`; consider a new `ciam-owner` seat |
| `security-ratings` | Third-party risk | 3 | `grc-owner` |
| `database-security` | Data security or the database team | 2 | `data-security` |
| `endpoint-control` | Endpoint security, often with the team adopting coding agents | 2 | `it-security`, `ai-owner` |
| `app-runtime` | AppSec or the edge team | 1 | `appsec`, `network-security` |
| `enterprise-browser` | IT security or the digital workplace team | 1 | `it-security`, `saas-security` |
| `detection-engineering` | Detection engineering lead or SOC engineering | 0 | `detection-engineer` |
| `identity-orchestration` | Platform or application security architect | 0 | `security-architect` |
| `runtime-validated-application-security` | AppSec, with the team that runs the application | 0 | `appsec` |
| `mcp-security` | AI platform or AppSec, with identity if the tool uses a credential | 0 | `ai-security`, `appsec` |
| `model-security` | Platform or AI infrastructure | 0 | `ai-owner`, `platform` |
| `iast` | AppSec | 0 | `appsec` |

`detection-engineering` → `detection-engineer` is the clearest miss: the seat exists and the category exists, but they are not linked.

### Open questions

1. Should reporting line (under CIO vs CTO vs CEO) become a persona or account attribute in the fit worksheet?
2. Is a dedicated `ciam-owner` seat worth adding, or does CIAM stay with product/identity?
3. Which thin rows (GRC, offensive, SecOps) deserve vendor research next?
4. Should the communities table become typed data (e.g. `lib/data/communities.ts`) and a page, or stay in research notes?

## Claims, uncertainty and refresh

| Claim ID | Statement | Status / source | Limit |
| --- | --- | --- | --- |
| SEC-ECO-C01 | Most CISOs report into IT; executive-titled CISOs more often report outside IT | [^IANS-2026][^SB-IANS] | Gated full report; summary only |
| SEC-ECO-C02 | Compliance, business impact, ROI top budget approval drivers | [^HITCH-2025] | Secondary summary of NA survey |
| SEC-ECO-C03 | Peers 55%, staff 48%, review sites 44% lead discovery; research reports 46% drive selection | [^PONEMON-2026][^CIOI-PONEMON] | 320 respondents; marketing-agency co-author |
| SEC-ECO-C04 | AI (41%) and cloud (36%) top skills needs | [^ISC2-2025][^CSO-ISC2] | Self-reported |
| SEC-ECO-C05 | ISA/IEC 62443 separates asset owner, integrator, product supplier duties | [^62443-ROLES][^62443-SS] | Standard text is paid; secondary descriptions |
| SEC-ECO-C06 | SLSA addresses producers, consumers, and infrastructure providers | [^SLSA] | Framework scope, not adoption data |
| SEC-ECO-C07 | FIRST has 820+ member teams; includes CSIRTs and PSIRTs | [^FIRST-2025][^FIRST-IMP] | Count from news coverage |
| SEC-ECO-C08 | Coverage counts in §4 | Local catalog, 2026-11-07 | Atlas coverage, not market size |
| SEC-ECO-H01 | Clusters, work edges, channel roles, proposed category owners | Hypothesis | Validate in discovery |
| SEC-ECO-U01 | Reseller, consultant, and marketplace roles per category | Unknown | Needs deal or partner evidence |

## Cross-repository disposition

- **Security Market Map — update:** this note. Follow-ups (separate PRs, owner approval): link the 13 orphan categories in `personas.ts`; optionally type the communities table.
- **Account Signal Engine / GTM Revenue OS — no automatic change:** community membership and reporting-line hypotheses are not account intent.
- **Content Engine — optional:** "who actually buys security" and "peers beat analysts" are usable post ideas; no private deal data.

## Original sources

Observed 2026-11-07. Paraphrase only. Living pages; dates as published where stated.

[^IANS-2026]: IANS — 2026 Report Finds Executive-Level CISO Titles More Prevalent than Ever (press release, Jan 15, 2026): https://www.iansresearch.com/resources/press-releases/detail/2026-report-finds-executive-level-ciso-titles-more-prevalent-than-ever
[^SB-IANS]: SecurityBrief UK — Executive-level CISO titles surge amid rising scope strain: https://securitybrief.co.uk/story/executive-level-ciso-titles-surge-amid-rising-scope-strain
[^HITCH-2025]: Socket — Survey Finds Over Half of CISOs Manage 10+ Security Areas (summary of Hitch Partners 2025 NA Security Organization Report, Jun 18, 2025): https://socket.dev/blog/survey-finds-over-half-of-cisos-manage-10-security-areas
[^ISC2-2025]: ISC2 — 2025 Cybersecurity Workforce Study (Dec 2025): https://www.isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study
[^CSO-ISC2]: CSO Online — Cybersecurity skills matter more than headcount in the AI era: https://www.csoonline.com/article/4108270/cybersecurity-skills-matter-more-than-headcount-in-the-ai-era.html
[^PONEMON-2026]: Ponemon Sullivan Report — The State of Cybersecurity Marketing Influence 2026: https://ponemonsullivanreport.com/?p=1036
[^CIOI-PONEMON]: CIO Influence — New Ponemon–NOLA Marketing Study Reveals What Influences Enterprise Cybersecurity Buyers (Mar 2026): https://cioinfluence.com/security/new-ponemon-nola-marketing-study-reveals-what-influences-enterprise-cybersecurity-buyers/
[^NICE]: NICCS / NIST — NICE Workforce Framework for Cybersecurity: https://niccs.cisa.gov/workforce-development/nice-framework
[^IDPRO-BOK]: IDPro Body of Knowledge (vendor-neutral): https://bok.idpro.org/
[^IDPRO-BW]: Business Wire — IDPro Continues Organizational Growth and Expands Digital Identity Certification Opportunities (Jan 2023): https://www.businesswire.com/news/home/20230105005089/en/
[^IDPRO-SEM]: Semperis — A community for identity professionals: https://www.semperis.com/blog/a-community-for-identity-professionals/
[^IAPP-BNH]: Business NH Magazine — After 25 years, IAPP leader sees demand skyrocketing: https://www.businessnhmagazine.com/article/after-25-yearsampcomma-iapp-leader-sees-demand-skyrocketing
[^OWASP-GENAI-2026]: OWASP GenAI Security Project — 2026 Top 10 for LLM Applications, Agent Control Standard; community tops 30,000 members (Sep 2026): https://genai.owasp.org/announcement/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/
[^OWASP-AGENTIC]: TechIntelPro — OWASP Top 10 for Agentic AI Security Risks released (Dec 10, 2025): https://techintelpro.com/Cybersecurity/AI/owasp-top-10-for-agentic-ai-security-risks-released-by-experts
[^SLSA]: OpenSSF — Supply-chain Levels for Software Artifacts: https://openssf.org/projects/slsa/
[^FIRST-2025]: SecurityBrief Australia — FIRST marks record growth in global cyber defence: https://securitybrief.com.au/story/first-marks-record-growth-in-global-cyber-defence
[^FIRST-IMP]: Improsec — membership in FIRST (CSIRTs, PSIRTs, independent researchers): https://blog.improsec.com/cyber-blog/improsec-is-proud-to-annouce-our-membership-in-first
[^FIRST-AR]: FIRST Annual Report 2019–2020 (archived): https://webcf.waybackmachine.org/web/20220430085645/https://www.first.org/about/reports/FIRST-Annual-Report-2019-2020.pdf
[^62443-ROLES]: Cisco — IEC 62443 white paper (product supplier, system integrator, asset owner): https://cisco.com/c/en/us/td/docs/solutions/Verticals/IoT_Security_Lab/IEC62443_WP.pdf
[^62443-SS]: SmartSuite — IEC 62443 series overview (owner, integrator, supplier obligations): https://www.smartsuite.com/frameworks/iec-62443-series-security-for-industrial-automation-and-control-systems
[^62443-ISAGCA]: PR Newswire — Update to ISA/IEC 62443 standards; About ISAGCA: https://prnewswire.com/news-releases/update-to-isaiec-62443-standards-addresses-organization-wide-cybersecurity-in-industrial-and-critical-infrastructure-operations-302362183.html
[^62443-CISA]: ISAGCA — ISA/IEC 62443 Cited in CISA OT Cybersecurity Guidance: https://gca.isa.org/blog/isa-iec-62443-cited-in-cisa-ot-cybersecurity-guidance
[^NCI]: National Council of ISACs — About NCI: https://www.nationalisacs.org/about-nci
