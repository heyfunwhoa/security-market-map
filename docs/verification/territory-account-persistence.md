# Territory account creation and saving

Status: implemented and locally verified on `fix/territory-account-persistence`; not merged or deployed. Synthetic data only. No new runtime dependencies, external data flows, storage key changes or migrations.

The existing `/territory` workspace already supports account briefs. This change repairs its new-account path: blank names no longer fail scoring validation. Account names have no scoring effect; drafts keep their original names and all-unknown accounts remain unscored. Markdown export labels unnamed drafts explicitly.

Saving keeps the existing `atlas-territory-v1` format. Edits update `updatedAt`. Failed writes retain the latest edits in memory, show a persistent warning, and offer Retry saving. The UI explains browser-only persistence and warns that unsaved edits can be lost on navigation/refresh. A Markdown download no longer depends on clipboard permission. This is not a complete backup/import or cross-device storage system. Existing malformed-storage recovery and cross-tab synchronization are outside this change.

## Acceptance evidence

| Criterion | Local result |
| --- | --- |
| Create an unnamed account; clear and re-enter its name | Passed Chromium at 375/768/1280px; draft regression unit test |
| Enter company information, incumbent, source, notes and a use case | Passed Chromium at all three widths |
| Refresh, select another account, reopen and edit | Passed; both synthetic accounts retained |
| Edit updates timestamp and persists | Passed; timestamp comparison and subsequent reload |
| Failed writes preserve saved data and current edits | Passed with injected `QuotaExceededError` |
| Retry recovers after storage is available | Passed; reload verifies the retried edit |
| Export contains account details, source and notes | Passed; downloaded Markdown inspected, clipboard deliberately denied |
| Keyboard and responsive behavior | New account reached through actual tab order and activated with Enter; retry activated with Enter and focus moves to saved confirmation; no horizontal page overflow at the three widths; reduced motion enabled |

Checks passed: `npm test` (153 tests), `npm run test:research-integrity`, `npm run typecheck`, `npm run lint`, `npm run build` (340 generated pages). Browser checks reported no page runtime errors. Physical device keyboard behavior, screen-reader speech, and browser zoom remain manual checks; viewport results are not a claim of complete accessibility validation.

## Repeat the browser check

Start the production build locally with `npm start`. Run `node scripts/verify-territory.mjs` with an installed Playwright. If it is outside normal module resolution, set `PLAYWRIGHT_MODULE` to its ESM entry path; set `CHROMIUM_EXECUTABLE_PATH` for a system Chromium. `TERRITORY_BASE_URL` selects a different local server. The runner uses isolated browser contexts and fictional companies, leaving real browser accounts alone.

## UI reuse decision

Reuse installed Button/Input/Label/Textarea and the existing workspace layout. Adapt the bank's inline actionable feedback guidance using native status/alert regions rather than introducing a toast package. Reference: portfolio `lib/component-options.ts`, feedback entry, revision `60a799285f746cc38f9806d4cefb4532fabd8026`. No upstream code or branding copied. Existing catalog use-case IDs and source URLs retain their behavior; no taxonomy or navigation changes.

Shared engineering baseline and execution contract were read at Technical Docs revision `af69c95ea415ce6ecd4c7fa4cab137daa2513961`. GitHub GraphQL access for open issue/PR discovery returned Forbidden, so duplicate issue/PR status is unverified. No issue was invented, PR opened, merge performed or deployment attempted.

Rollback: revert the component, scoring/export changes, regression tests and this record. The persisted record shape is unchanged; no account migration or deletion is required.
