# Vendor seat targeting: how to add a category

Use this guide for each new category in `lib/data/vendor-seat-targeting.ts` (KRU-329). Each row records who a vendor says its product is for. It is not proof of who buys. Only calls can confirm a seat (see the field notes in `lib/data/field-notes.ts`).

## Steps

1. **Pick vendors.** Choose four vendors that already list the category as primary in `lib/data`. Aim for a mix: a large platform (`leader`), a specialist (`specialist`), a newer company (`challenger`) and an open-source-led vendor (`open-source-led`) if one exists. Record the role in `selectionReason`. A mixed sample stops the result from leaning toward one company's competitors. Three vendors is the minimum before the gap report shows a vendor majority.
2. **Use vendor-owned sources only.** That means a product page, the vendor's docs, the vendor's press release or a marketplace listing the vendor runs. Set `basis` to match. Analyst, review-site and news pages can add context, but they are never sources for this table.
3. **Read the full page.** Use search snippets only to find pages. If a page won't load, set `inspection: "search-excerpt"`. Change it to `page-read` only after a full read.
4. **Copy the audience wording.** Keep it close to the vendor's own phrasing, paraphrased and under 200 characters. Then map it to seat ids using the rules at the top of the data file. Add a new rule to that header if you need one, and don't map case by case.
5. **Pitched vs. mentioned.** `seatIds` holds the seats the page is written for, and these are counted. `mentionedSeatIds` holds seats named only in passing (a read-only role, a customer quote, a side brief). Mentioned seats are shown on the category page and never counted.
6. **Note what's missing.** If a seat the map lists as an owner never shows up, say so in the PR. That gap is often the most useful finding.
7. **Conflicting pages.** Use the most specific product or role page, and name the other page in the PR.
8. **Company size.** If the page names a size band (for example, Series A to Fortune 500), put it in `audience`.
9. **Redirects and acquisitions.** Check where the vendor's domain lands. If it redirects to an acquirer or a new brand, cite the vendor's current page and flag the catalog for a vendor-record update. Don't rename vendors in this table.
10. **Record and run.** Fill in URL, `checkedAt` (the real date), `inspection` and `basis`. Then run `npm test` and `npm run context:md`.

## Recheck

Recheck each row 180 days after `checkedAt`. Recheck sooner if the vendor is acquired, rebrands or redesigns the cited page.

## Open catalog follow-ups found while building this

- Gem Security's domain now redirects to Wiz (acquired 2024). The Gem record does not record this, so the cloud-detection sample uses Wiz's own page.
- Code42 now markets Incydr under Mimecast. The record still says Code42.
- Panther says it is now part of Databricks. The record does not say so.
- Entro redirects to SailPoint, which the record already notes.
- Check Point endpoint pages name no team roles, so Check Point was skipped.
- Strac (DLP) is not sampled yet.
- SOAR, XDR, threat modeling and IaC security need more primary vendors first.
