# Profile pilot evidence for Descope, WorkOS and Stairwell

**Owner:** Security Market Map maintainer. **Status:** candidate research for editorial review. **Sources checked:** 2026-11-24. **Next review:** before using these notes for a buyer pilot or promoting them into catalog claims.

## Customer identity and access management

Time offboarding at four points: the identity-provider change, the event or update reaching the application, removal of tenant membership, and the first denied request from an already signed-in browser. Repeat with a user who also belongs to a second tenant and record whether that tenant remains accessible. Record which team owns each step.

| Profile | What the vendor documents | What to verify |
| --- | --- | --- |
| [Descope](https://security-market-map.vercel.app/vendors/descope) | Descope describes a short-lived session token validated by the application backend and a separate refresh token used to obtain a new session token. [Sessions documentation](https://docs.descope.com/sessions) | Test the flow with Descope-managed sessions and with existing app-managed sessions if both are in scope. After deactivation, record whether refresh succeeds and when an already-issued session stops granting access to the affected tenant. |
| [WorkOS](https://security-market-map.vercel.app/vendors/workos) | WorkOS Directory Sync delivers directory updates through webhooks or the Events API. WorkOS separately documents an API that lists and revokes sessions. [Directory Sync](https://workos.com/docs/directory-sync) · [Sessions API announcement](https://workos.com/changelog/sessions-api) | Confirm what connects the directory event to tenant access removal and which sessions the application or WorkOS owns. Test that connection in the chosen integration and measure the time to deny an existing session. |

For either pilot, request a written quote for the planned mix of single sign-on connections and directory provisioning. Ask who owns customer onboarding, certificate rotation and incident support. Keep entitlement, support commitments and measured offboarding time open until confirmed.

## File and malware analysis

| Profile | What the vendor documents | What to verify |
| --- | --- | --- |
| [Stairwell](https://security-market-map.vercel.app/vendors/stairwell) | Stairwell's default policy targets specified file types. It documents host-side exclusions and separate environment intake filters that determine what is stored. [What Gets Collected](https://docs.stairwell.com/docs/policies-overview) · [Intake Filters](https://docs.stairwell.com/docs/intake-filters) | Use approved, harmless files on representative enrolled devices. Include examples expected to be collected and examples the policy should omit. Record which files reach storage, whether an analyst can retrieve the original, and whether historical results identify the observed hosts and timestamps. Capture retention and deletion terms in writing, including what happens after a device is unenrolled. |

When a file is absent from results, record whether it was collected, stored, and within the analyst's access scope. Those checks determine how to interpret the result.

### Stairwell alongside an existing endpoint stack

**Buyer decision.** Can the incident response team recover usable file evidence and establish where it was seen after the original alert, using the endpoint detection and response (EDR) or forensic tools it already owns? Identify the residual gap before pricing a separate file investigation layer.

| Investigation step | What the public docs describe | What to measure in the buyer's environment |
| --- | --- | --- |
| Recover the original file | Microsoft documents download and collection actions in Defender for Endpoint, including retrieval from a device through Live Response. Carbon Black Cloud Enterprise EDR documents a store for previously uploaded binaries and metadata. Stairwell describes original-file retrieval for collected objects. [Microsoft file response](https://learn.microsoft.com/en-us/defender-endpoint/respond-file-alerts) · [Microsoft Live Response](https://learn.microsoft.com/en-us/defender-endpoint/live-response) · [Carbon Black Unified Binary Store](https://developer.carbonblack.com/reference/carbon-black-cloud/cb-threathunter/latest/unified-binary-store-api/) · [Stairwell Objects](https://docs.stairwell.com/docs/objects) | Use the same approved test file for both workflows. Check whether an authorized analyst can retrieve it while the device is online and again after it is taken offline. Log whether the result contains original bytes, metadata only, or no result. |
| Establish where and when it appeared | Stairwell describes sightings with machine, path, name, and observation times. It says Rehunt re-evaluates collected file history as new intelligence arrives. [Sightings](https://docs.stairwell.com/docs/sightings) · [Rehunt](https://stairwell.com/rehunt/) | Compare known placements across the same enrolled devices and time window. Check whether evidence distinguishes file presence from execution. Note which system supplies process or response context, and record gaps due to collection policy, permissions, or expired history. |
| Hand off the investigation | Stairwell describes a Backstory report with a summary and detailed findings for files, machines, and indicators. [The Backstory Report](https://docs.stairwell.com/docs/the-backstory-report) | Ask an incident responder to trace two findings to their underlying evidence. Ask an executive reader to identify the impact, open uncertainty, and action owner from the summary. Record time to a reviewable handoff, corrections, and unresolved findings alongside the current workflow. |

**Pilot decision.** Before testing, agree what evidence must be recoverable and how much analyst time the team is willing to spend. Record the configured plans, policies, roles, and time windows. Compare the baseline with the same workflow plus Stairwell. If the current stack already meets the agreed criteria, document which remaining gap, if any, would justify a second purchase. Keep host containment and recovery in the existing incident response workflow.

The sources in this section were checked on 2026-11-25. The workflows are vendor-documented. Incremental coverage, analyst time saved, and suitability of the report for each audience remain pilot questions.

## Review and placement

- Existing category and product IDs are `ciam` with `descope` and `workos`, and `malware-analysis` with `stairwell-platform`. The notes supplement the Research gaps sections at the company-profile level.
- All observations are short paraphrases of vendor-published material. The WorkOS Sessions API announcement is dated August 12, 2025. Publication dates for the linked documentation pages were not confirmed.
- Editorial review and customer-environment testing are pending. Before changing catalog evidence, confirm the affected integration, collection policy, and contract terms with the original sources or the pilot owner.
