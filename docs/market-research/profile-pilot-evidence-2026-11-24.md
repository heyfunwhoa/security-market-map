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

## Review and placement

- Existing category and product IDs are `ciam` with `descope` and `workos`, and `malware-analysis` with `stairwell-platform`. The notes supplement the Research gaps sections at the company-profile level.
- All observations are short paraphrases of vendor-published material. The WorkOS Sessions API announcement is dated August 12, 2025. Publication dates for the linked documentation pages were not confirmed.
- Editorial review and customer-environment testing are pending. Before changing catalog evidence, confirm the affected integration, collection policy, and contract terms with the original sources or the pilot owner.
