---
id: "sast"
type: "category"
name: "Static analysis (SAST)"
layer: "core"
vendors: 19
---

# Static analysis (SAST)

Analysis of source or bytecode for vulnerabilities before the code runs. No capability in this atlas is checked for a SAST vendor until a current page is cited.

**Buyer question:** Which defects can we see in the pull request, and who fixes them?

**Usual owner:** AppSec, with engineering as the fixer.

**Budget source:** AppSec tooling.

## Owning seats

- AppSec lead (`appsec`)
- Engineering manager (`engineering-manager`)
- Security champion (`security-champion`)
- Product security lead (`product-security`)
- Software developer (`developer`)

## Who vendors sell to

From 4 vendors' own pages, mapped to seats editorially. Vendor audience, not proof of who buys.

- AppSec lead (`appsec`): 4 of 4 vendors
- Software developer (`developer`): 4 of 4 vendors
- CISO / VP of security (`ciso`): 2 of 4 vendors
- Engineering manager (`engineering-manager`): 1 of 4 vendors
- GRC or trust lead (`grc-owner`): 1 of 4 vendors

## Vendors (primary)

- Snyk: AppSec vendor associated with dependencies, code, and containers. No scanner capability is checked in this seed.
- Semgrep: Homepage retrieved 26 Oct 2026 describes static analysis, marketed as SAST, in CLI, CI, IDEs, and pull requests. SCA and secrets scanning are named on that page and are not separate cells.
- Checkmarx: Homepage retrieved 26 Oct 2026 says SAST runs in the IDE and CI, and that secrets detection blocks credentials before they enter Git. SCA is named as flagging risky dependencies and is not a vulnerable-dependency cell.
- Veracode: AppSec testing vendor. Often met in established programs. No capability cell is filled.
- Mend: Named on SCA and SAST shortlists. Former name WhiteSource. No dependency claim is checked.
- Synopsys: Named on application-testing shortlists. The software-integrity business has been discussed separately from the chip business. Confirm the current product name before a comparison.
- Aikido Security: AppSec vendor named across SCA, SAST, and secrets. Do not treat the logo as all three licensed.

## Vendors (adjacent)

- GitHub
- Cycode
- StackHawk
- Probely
- ArmorCode
- Endor Labs
- Jit
- Apiiro
- Black Duck
- OpenText
- DeepSource
- Codacy

## What buyers do instead

- Open-source and linter-based static analysis. Good enough when: Few languages and engineers willing to tune rules. Breaks when: Coverage, false positives, and reporting have to be managed at scale. — hypothesis

## Objections

- "The open-source tool is good enough." — hypothesis
- "Developers will ignore it or route around it." — hypothesis
- "We don't have sprint time for security work." — hypothesis

## Triggers

- Pull-request scanning
- SAST replacement
- Language coverage gap
- The company hires its first AppSec or product security engineer.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
