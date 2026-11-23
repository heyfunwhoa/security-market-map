# Vendor release-feed candidates

A weekly job (`.github/workflows/watch-market-feeds.yml`) reads each official feed in `feeds.json` and adds unseen items to `candidates/<feed id>.json`. When anything is new, it opens or updates the `bot/market-feed-candidates` pull request.

This is the "weekly high-priority feed triage" channel from the [Competitive Intelligence Playbook](../../docs/market-research/competitive-intelligence-playbook.md#discovery-methods-and-freshness--how-to-find-new-evidence-economically). A feed title alone doesn't prove a capability. Candidates are research input, not published claims.

## What is stored

Only each item's title, date and link, plus `firstSeen` and `status`. The vendor's description and body are not copied; their reuse rights are unknown.

## Reviewing a candidates PR

For each item with `status: "new"`:

1. **Not notable:** set `status` to `"dismissed"`.
2. **Notable** (a new product, capability area, integration, acquisition, or availability or default-behavior change; see the promotion bar below):
   - Open the original link and read it.
   - Register the source in `lib/data/sources.ts`.
   - Add an event in `lib/data/market.ts` (`events`), using the vendor's id and an event kind. Write the summary in your own words.
   - Set the candidate's `status` to `"promoted"`.

Leave uncertain items as `"new"`. The next run keeps them, and it never overwrites a status you set.

### Triage on the bot branch

Make triage edits on `bot/market-feed-candidates` and merge that PR. Don't also set statuses in a separate branch or on `main`: both would edit the same candidates file and conflict. If triage does land elsewhere first, close the bot PR with a note pointing to that commit. The next run opens a fresh one.

### Keep the promotion bar consistent

Promote an item when it changes what a buyer can do or buy: a new product or capability area, an integration, an acquisition, or a change in availability or default behavior. Dismiss routine improvements to a product the catalog already has, such as UI changes, fixes or performance work. When several small updates add up to a shift, record it in that product's research notes rather than adding an event for each one.

## Adding a feed

Add one entry to `feeds.json` with the vendor's catalog id, its official feed URL, and `rss` or `atom`. Use the note to record why it's watched and how often it posts. The first run only picks up items from the last 30 days.

GitGuardian publishes seven feeds ([list](https://docs.gitguardian.com/platform/feeds)). Only SaaS is watched here. Self-Hosted mostly repeats the SaaS features each month, and ggshield, Py-GitGuardian, the VS Code extension and the ggscout Helm charts post release tags. The detection-engine feed is watched daily by Detector Atlas.
