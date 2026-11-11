# Candidate incidents — November 2026 intake (needs review)

**Status:** candidate research only. Nothing here is a published typed claim, and nothing here is added to `data/security-intelligence/incidents.seed.json`. Each entry needs a named human reviewer, a primary-source check and an approval decision recorded in a PR before it can move into the seed registry.

**Intake date:** 2026-11-11. **Collected by:** agent-assisted web research. **Reviewer:** unassigned.

**Boundaries (per [incident classification framework](incident-classification-framework.md)):**

- A news report is a lead, not proof. Secondary sources are labeled as secondary.
- No ATT&CK, D3FEND, CWE or package links are asserted. All mappings stay `not_evaluated`.
- No claim that any vendor or product would have prevented or detected any incident.
- No inference about any organization's buying intent from a public incident.

**Proposed zoom-level placement:** broad market → endpoint detection and response / threat detection and investigation categories → incident as buyer-problem context. No navigation or UI change is proposed.

## Candidate entries

### 1. Binance internal wallet signing compromise

| Field | Value |
| --- | --- |
| Proposed ID | `incident:binance-wallet-signing-2026` |
| Proposed kind | `intrusion` |
| Disclosed on | 2026-10-29 (incident date per company); initial findings published 2026-11-03 (per secondary) |
| Affected ecosystems | crypto exchange, developer workstation |
| Source-supported assertion | Company update says the malware replaced a legitimate development tool component and that the 0-day malware was not detected by endpoint security protection tools at the time. Secondary roundup reports initial access via a fake recruiter "technical assignment" downloaded to a work computer. |
| Sources | Primary (company): [Binance on X, initial findings](https://x.com/binance/status/2117626126214504729). Secondary: [CybelAngel weekly roundup, Nov 2–8 2026](https://cybelangel.com/blog/weekly-cyber-roundup-november-2-8/); [This Week in Security, Nov 8 2026](https://this.weekinsecurity.com/this-week-in-security-november-8-2026-edition/) |
| Uncertainty | Affected-asset figures (~$6.34B affected, ~$2.85B frozen) come from a secondary summary of the company report and are not independently verified. Attribution not established here. |

### 2. Crédit Mutuel Arkéa fraudulent transfers

| Field | Value |
| --- | --- |
| Proposed ID | `incident:credit-mutuel-arkea-2026` |
| Proposed kind | `intrusion` |
| Disclosed on | 2026-11-04 |
| Affected ecosystems | banking, third-party service provider |
| Source-supported assertion | Bank disclosed an attack that allowed fraudulent transactions; attacker reached the network through a service provider's platform; bank said about EUR 100M was missing (per secondary reporting of the bank's statements). |
| Sources | Secondary: [BleepingComputer, Nov 7 2026](https://www.bleepingcomputer.com/news/security/hackers-pull-off-133-million-french-bank-heist-via-service-provider/); [Help Net Security, Nov 9 2026](https://www.helpnetsecurity.com/2026/11/09/credit-mutuel-arkea-cyberattack-133-million/); [Halborn explainer](https://www.halborn.com/blog/post/explained-the-credit-mutuel-arkea-cyberattack-november-2026) |
| Uncertainty | The $133M figure is from an independent on-chain investigator, not confirmed by the bank. Primary bank statement and FAQ not yet captured. Service provider not named. |

### 3. Novo Nordisk data theft

| Field | Value |
| --- | --- |
| Proposed ID | `incident:novo-nordisk-2026` |
| Proposed kind | `breach` |
| Disclosed on | 2026-06-11 |
| Affected ecosystems | pharmaceutical, clinical research |
| Source-supported assertion | Company disclosed unauthorized access to a limited number of internal IT systems; secondary reporting says clinical-trial-related data was copied. An extortion group claimed responsibility and claimed 1.3 TB stolen. |
| Sources | Secondary: [HIPAA Journal, Jun 18 2026](https://www.hipaajournal.com/novo-nordisk-cyberattack/); [Security Boulevard, Jul 2026](https://securityboulevard.com/2026/07/novo-nordisk-breached-when-the-worlds-most-valuable-pharma-company-becomes-a-target/); [Cyber Clan, Jul 10 2026](https://cyberclan.com/knowledge/novo-nordisk-cyberattack/) |
| Uncertainty | Dwell time (~2+ months), data volume and ransom demand are threat-actor or secondary claims; the company has not confirmed them per the sources above. Primary company disclosure not yet captured. |

### 4. West Pharmaceutical Services ransomware

| Field | Value |
| --- | --- |
| Proposed ID | `incident:west-pharmaceutical-2026` |
| Proposed kind | `intrusion` |
| Disclosed on | 2026-05-07 (SEC 8-K); intrusion detected 2026-05-04 |
| Affected ecosystems | pharmaceutical supply chain, manufacturing |
| Source-supported assertion | Company reported a material cyberattack involving data exfiltration and system encryption that disrupted global operations. |
| Sources | Secondary summary of primary filing: [StockTitan 8-K summary](https://www.stocktitan.net/sec-filings/WST/8-k-west-pharmaceutical-services-inc-reports-material-event-121ed3e9725b.html); [Security Magazine, May 14 2026](https://www.securitymagazine.com/articles/102300-expert-insights-on-the-west-pharmaceutical-ransomware-attack) |
| Uncertainty | Capture the 8-K directly from SEC EDGAR before review. Threat actor not established. |

### 5. AstraZeneca reported cyberattack

| Field | Value |
| --- | --- |
| Proposed ID | `incident:astrazeneca-2026` |
| Proposed kind | `breach` |
| Disclosed on | 2026-03-24 (first press report; no company disclosure found) |
| Affected ecosystems | pharmaceutical |
| Source-supported assertion | Reports describe IT disruption and theft of confidential data, allegedly by LAPSUS$. |
| Sources | Secondary: [INCIBE-CERT, Apr 21 2026](https://www.incibe.es/en/incibe-cert/publications/cybersecurity-highlights/astrazeneca-strengthening-its-cybersecurity-following-cyberattack) |
| Uncertainty | High. INCIBE notes the company had not confirmed the details. Proposed epistemic status if imported: `unknown` or `disputed` until a primary source exists. |

## Trend context (not incidents)

These are threat-landscape reports, not individual incidents. They should be tracked as source candidates, not incident records.

| Topic | Source-supported assertion | Sources |
| --- | --- | --- |
| EDR killers as a standard ransomware phase | Halcyon Q2 2026 report (published Jul 27 2026): EDR kill techniques are now standard practice among leading ransomware groups. | Secondary: [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/ransomware-q2-2026-edr-kill/) |
| EDR-killer ecosystem size | ESET tracked almost 90 EDR killers in the wild; more than half use BYOVD. | [ESET newsroom, Mar 19 2026](https://www.eset.com/us/about/newsroom/research/eset-research-deep-dive-edr-killers-ransomware/); [The Hacker News](https://thehackernews.com/2026/03/54-edr-killers-use-byovd-to-exploit-34.html) |
| GentleKiller (Gentlemen RaaS) | ESET: operator-maintained EDR-killer suite targeting 400 processes across 48 security tools. | [The Hacker News, Jun 19 2026](https://thehackernews.com/2026/06/the-gentlemen-raas-uses-gentlekiller.html); [CSA research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-gentlekiller-edr-evasion-ransomware-defens/) |
| October 2026 landscape | Cyware describes the month as marked by industrialization of EDR evasion techniques (BYOVD tools shared across groups). | [Cyware monthly, Oct 2026](https://www.cyware.com/resources/threat-briefings/monthly-threat-briefing/cyware-monthly-threat-intelligence-october-2026) |

## Review checklist before seed import

- [ ] Assign a named reviewer.
- [ ] Capture a primary source for each incident (company statement, regulator filing or government alert) and add it to `sources.seed.json` with `publishedOn`, `lastReviewedOn` and a rights note.
- [ ] Confirm `disclosedOn`; keep `occurredOn` null unless a primary source states it.
- [ ] Write a limited summary in our own words; keep threat-actor claims labeled as claims.
- [ ] Keep `techniqueIds` and `packageIds` empty until a separate mapping review.
- [ ] Record the approval decision in the PR before setting `reviewStatus` to `seed_reviewed`.
