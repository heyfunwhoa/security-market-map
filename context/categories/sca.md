---
id: "sca"
type: "category"
name: "Software composition analysis"
layer: "core"
vendors: 20
---

# Software composition analysis

Known vulnerabilities and license risk in dependencies. This is not IT vulnerability management of servers, and it is not a secret scanner, though the same pull request can contain all three.

**Buyer question:** Which libraries are we shipping, and which of those findings are reachable?

**Usual owner:** AppSec or product security.

**Budget source:** AppSec tooling.

## Owning seats

- AppSec lead (`appsec`)
- Engineering manager (`engineering-manager`)
- Security champion (`security-champion`)
- Software supply-chain security (`supply-chain-security`)
- Software developer (`developer`)

## Vendors (primary)

- Snyk: AppSec vendor associated with dependencies, code, and containers. No scanner capability is checked in this seed.
- Checkmarx: Homepage retrieved 26 Oct 2026 says SAST runs in the IDE and CI, and that secrets detection blocks credentials before they enter Git. SCA is named as flagging risky dependencies and is not a vulnerable-dependency cell.
- Veracode: AppSec testing vendor. Often met in established programs. No capability cell is filled.
- Mend: Named on SCA and SAST shortlists. Former name WhiteSource. No dependency claim is checked.
- Endor Labs: Dependency and reachability vendor on SCA shortlists. No reachability claim is checked.
- Aikido Security: AppSec vendor named across SCA, SAST, and secrets. Do not treat the logo as all three licensed.
- Socket: Dependency supply-chain vendor. A malicious-package signal is not a CVE scanner unless that is what they show.

## Vendors (adjacent)

- GitHub
- Aqua Security
- Cycode
- Synopsys
- Chainguard
- Scribe Security
- Jit
- Xygeni
- OX Security
- Kusari
- Stacklok
- Black Duck
- Codacy

## What buyers do instead

- Dependency alerts from the code host. Good enough when: One code host and basic known-vulnerability alerts are enough. Breaks when: Reachability, licenses, or SBOM requests from customers matter. — hypothesis

## Objections

- "The open-source tool is good enough." — hypothesis
- "Developers will ignore it or route around it." — hypothesis
- "We'll deal with SBOMs when customers make us." — hypothesis

## Triggers

- Dependency incident
- SCA consolidation
- The company hires its first AppSec or product security engineer.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
