---
id: "grc-owner"
type: "seat"
name: "GRC or trust lead"
kind: "persona"
function: "security"
sourcedPains: 3
pains: 4
---

# GRC or trust lead

Own evidence and outside questions — audits, third parties, customer trust questionnaires. Consumes operated controls; does not replace them.

## Typical titles

- ic: GRC Analyst, Governance Risk and Compliance Analyst
- senior-ic: Senior GRC Analyst, Lead GRC Analyst
- manager: GRC Manager, Governance Risk and Compliance Manager
- director: Director of GRC, Head of GRC
- vp: VP of GRC

## Owns categories

- Control evidence and risk (`grc-controls`)
- Customer trust (`customer-trust`)
- Third-party risk (`third-party-risk`)
- Privacy governance (`privacy-governance`)
- Security ratings (`security-ratings`)

## Pains

- Most audit evidence is still gathered by hand — sourced ([Help Net Security](https://www.helpnetsecurity.com/2025/04/22/security-grc-teams-compliance/))
- Weak handoffs between GRC and security teams undermine audit prep — sourced ([Help Net Security](https://www.helpnetsecurity.com/2025/04/22/security-grc-teams-compliance/))
- Vendor and customer questionnaires eat hours every week — practitioner published ([Whistic](https://www.whistic.com/resources/blog/state-of-vendor-security-report-challenges-and-solutions))
- Evidence depends on control owners who don't report to GRC — hypothesis

## Objections

- "We don't have anyone to run another tool." Usually about: The last tool created alerts nobody owned. Reframe to test: Size the work the tool removes against the work it adds, and agree up front who owns its output. — sourced
- "Auditors won't accept tool output as evidence." Usually about: Past attempts at automated evidence were rejected. Reframe to test: Ask the auditor which evidence format they accept, then map the tool's output to it before buying. — hypothesis
- "You haven't passed our security review yet." Usually about: Procurement or legal needs paperwork before anyone will sign. Reframe to test: Send the security pack, DPA, and data-flow summary early so the review runs in parallel with evaluation. — hypothesis

## Qualification questions

- Does the company hold or pursue multiple frameworks (SOC 2, ISO, PCI, HIPAA)? Good fit if: Several audits a year. (high weight, hypothesis)
- Does audit prep take weeks of manual evidence gathering? Good fit if: Screenshots and spreadsheets each cycle. (high weight, hypothesis)
- Is the company pre-revenue with no customer audit demands? Poor fit if: No audits planned. (medium weight, hypothesis)

## Buying triggers

- A New York-regulated financial firm prepares its annual NYDFS Part 500 certification. — sourced ([Mondaq](https://www.mondaq.com/unitedstates/security/1396442/ydfs-finalizes-amendments-to-cybersecurity-regulations))
- An EU financial entity works through DORA ICT risk-management requirements. — sourced ([Hannes Snellman](https://digitalhorizon.hannessnellman.com/?p=5896))
- An audit flags access reviews, privileged access, or evidence gaps. — hypothesis
- The company needs its first SOC 2 or ISO 27001 to close enterprise deals. — hypothesis
- Security questionnaires start blocking or slowing enterprise deals. — hypothesis

## Not a fit when

- Buyer wants a scanner or SOC platform sold as 'compliance done'

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
