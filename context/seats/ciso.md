---
id: "ciso"
type: "seat"
name: "CISO / VP of security"
kind: "persona"
function: "security"
sourcedPains: 5
pains: 5
---

# CISO / VP of security

Improve defensible security outcomes within budget and governance; set risk appetite and fund programs.

## Typical titles

- director: Director of Security, Head of Security
- vp: VP of Security
- c-level: CISO, Chief Information Security Officer, Chief Security Officer, CSO

## Owns categories

- Control evidence and risk (`grc-controls`)
- SIEM (`siem`)
- Endpoint security (`endpoint-security`)
- Identity governance (IGA) (`iga`)
- Cloud-native application protection (`cnapp`)

## Pains

- Budget growth has slowed while scope keeps growing — sourced ([IANS Research](https://www.iansresearch.com/resources/press-releases/detail/ians-research-and-artico-search-release-security-budget-benchmark-report))
- Credential abuse and edge-device exploitation keep leading breach entry points — sourced ([Verizon](https://www.verizongov.com/resources/reports/2025-dbir-executive-summary.pdf))
- Personal liability and disclosure exposure after a material incident — sourced ([Proofpoint](https://www.proofpoint.com/us/newsroom/press-releases/proofpoint-2025-voice-ciso-report))
- Scope keeps growing faster than team and budget — practitioner published ([Socket](https://socket.dev/blog/survey-finds-over-half-of-cisos-manage-10-security-areas))
- Must prove business impact and ROI to get spend approved — practitioner published ([Socket](https://socket.dev/blog/survey-finds-over-half-of-cisos-manage-10-security-areas))

## Objections

- "Our platform vendor already does this." Usually about: Fear of tool sprawl and of explaining another line item. Reframe to test: Compare what the bundled feature covers today against the sources and depth this problem needs, then decide whether the gap is worth a separate tool. — hypothesis
- "We don't have anyone to run another tool." Usually about: The last tool created alerts nobody owned. Reframe to test: Size the work the tool removes against the work it adds, and agree up front who owns its output. — sourced
- "It's not in this year's budget." Usually about: No clear owner for the spend, or the problem hasn't been tied to a risk the board tracks. Reframe to test: Find whose existing budget this replaces or protects, and tie the problem to an exposure already on the risk register. — sourced
- "Auditors won't accept tool output as evidence." Usually about: Past attempts at automated evidence were rejected. Reframe to test: Ask the auditor which evidence format they accept, then map the tool's output to it before buying. — hypothesis
- "We can't give a vendor access to that data." Usually about: Privacy, residency, or contract limits on sharing code or customer data. Reframe to test: Clarify what leaves the environment, what is stored, and whether a self-hosted or scoped option exists. — hypothesis
- "It's too early to buy for AI agents." Usually about: No inventory of agents yet, and unclear ownership. Reframe to test: Start with finding which agents and AI tools are already in use and what they can reach. — hypothesis
- "This overlaps a tool already in our reference architecture." Usually about: Fear of another exception to shared standards. Reframe to test: Show where it fits the existing architecture and which tool or process it replaces or feeds. — hypothesis
- "Our IR retainer covers this." Usually about: Retainers feel like insurance for the whole problem. Reframe to test: Check what the retainer includes, how fast it starts, and what the internal team still has to do in the first hours. — hypothesis
- "The board needs a simple answer, not more detail." Usually about: Directors can't judge technical reports. Reframe to test: Offer one or two measures the board can track over time, tied to risks already on the register. — hypothesis

## Qualification questions

- Has a security outcome tied to this problem been named in a board or risk discussion this year? Good fit if: The problem appears on the risk register or board deck. (high weight, hypothesis)
- Is there budget or a planning cycle in the next two quarters this could fit into? Good fit if: A named budget line, consolidation goal, or planning date. (high weight, hypothesis)
- Is the CISO only sponsoring, with no owner below them who will run it? Poor fit if: Nobody below the CISO can name who would operate it. (medium weight, hypothesis)

## Buying triggers

- A live credential is found in a public repo, ticket, or chat. — sourced ([NDSS Symposium (Meli, McNiece, Reaves; NC State University)](https://www.ndss-symposium.org/wp-content/uploads/2019/02/ndss2019_04B-3_Meli_paper.pdf))
- A breach or near-miss starts with stolen or abused credentials. — sourced ([Verizon](https://www.verizongov.com/resources/reports/2025-dbir-executive-summary.pdf))
- The company becomes subject to SEC cybersecurity disclosure rules or files its first annual disclosure. — sourced ([K&L Gates](https://www.klgates.com/SEC-Adopts-Final-Rules-for-Cybersecurity-Disclosures-8-7-2023))
- A New York-regulated financial firm prepares its annual NYDFS Part 500 certification. — sourced ([Mondaq](https://www.mondaq.com/unitedstates/security/1396442/ydfs-finalizes-amendments-to-cybersecurity-regulations))
- An EU financial entity works through DORA ICT risk-management requirements. — sourced ([Hannes Snellman](https://digitalhorizon.hannessnellman.com/?p=5896))
- An audit flags access reviews, privileged access, or evidence gaps. — hypothesis
- A new CISO or head of security joins. — hypothesis
- Teams start deploying AI agents or MCP servers with access to internal systems. — hypothesis
- An acquisition brings in new code, cloud accounts, and identities. — hypothesis
- An incumbent tool in the category comes up for renewal. — hypothesis
- The MDR provider misses an incident or can't cover cloud and identity. — hypothesis

## Not a fit when

- Initiative lacks priority, sponsor, budget, or named operator

## Don't assume

- Day-to-day ownership of vault, SAST, or EDR operations
- That reporting line is the same as peers' — it varies by size and industry

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
