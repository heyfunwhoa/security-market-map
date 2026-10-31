# Aikido Device Protection: commercial product template validation

Status: product-specific research and acceptance plan. Evidence is vendor-published, not a tested endpoint deployment. Reviewed 2026-10-31.

## Pilot purpose
Test Product Research Page Template v1 with an **existing commercial vendor and existing product**, without forcing Kingfisher's Detect → Validate → Map → Triage → Revoke sequence onto a network-based package protection product.

Canonical identifiers: vendor `aikido`, product `aikido-device-protection`. Do not introduce a duplicate vendor, offering or category. Product route `/products/aikido-device-protection`. Primary categories: endpoint control and software supply chain.

## Product-specific journey
1. **Trigger:** a developer, IDE or agent requests an install from a supported registry or marketplace.
2. **Intercept:** a locally installed network component inspects traffic for supported destinations. Examine OS support, local CA/TLS interception, registry mirrors, offline behavior and container/WSL boundaries before asserting coverage.
3. **Decision:** synchronized threat data and local policy evaluate the package request. Distinguish an actual pre-install block from a warning or inventory event.
4. **Report:** record package, policy reason, device and event timing without treating a device package inventory as an independent malware test.
5. **Other signals:** local secret scanning and optional AI provider/MCP usage visibility are separate features, not proof of prompt/tool-call leak prevention.

## Buyer-specific evaluation
- **AppSec:** what malicious-package install paths are prevented that SCA and CI miss?
- **Platform engineering:** what is the package manager overhead and how do exceptions, private mirrors and development containers behave?
- **Corporate endpoint/IT:** what enrollment, agent permissions, local trust certificates, uninstall and tamper controls exist?
- **SOC/security engineering:** what security events, suppression rules, inventory freshness and remediation handoffs are available?
- **AI governance:** which provider/agent/MCP usage is inventoried, and which interactions are actually prevented rather than simply reported?

## Evidence boundary
The existing Market Map record cites Aikido's official technical description: https://help.aikido.dev/aikido-device-protection/miscellaneous-aikido-endpoint/how-does-endpoint-protection-work . Confirm supported OS/ecosystems, plan entitlement and commercial terms against current vendor documents before creating narrower affirmative claims. No invented price, percentage of coverage, benchmark or EDR replacement claim. Keep missing features Unknown.

## Template acceptance
- Existing canonical entity reused; no redundant catalog entries or direct-competitor edge inferred.
- Product page is useful without comparison, with plain-language control sequence, limitation, original evidence, review date, and pilot questions.
- Commercial distribution and edition remain explicitly qualified instead of being inferred from the vendor brand.
- Category and vendor breadcrumbs, anchored navigation, evidence accordion and keyboard interaction remain usable.
- Review at 320px and 200% zoom; original sources open; no essential information behind hover.
- ProductFocus is **optional** and should not invent a fixed five-step security lifecycle.
- Existing GitGuardian comparison remains secondary and evidence-backed.
- Exact-head CI, security, source/reference, browser checks and approved release separately recorded. Unknown is not Not Supported.

## Non-goals
Do not install Aikido software on a workstation, intercept actual traffic, upload local secrets, connect private credentials or change EDR/MDM policies in this research pilot.
