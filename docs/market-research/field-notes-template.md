# Field notes intake

Use this to add anonymized patterns from real conversations to `lib/data/field-notes.ts`.
Field notes are how a pain, objection or edge earns the `field_validated` label.

## Rules

- **Patterns only.** No company, person, customer, prospect, deal value, pricing, or anything
  employer-confidential. If a pattern only makes sense with a name attached, leave it out.
- **Month only.** Record `observedMonth` as `YYYY-MM`, never an exact date.
- **Count conversations, not quotes.** `conversations` is how many separate conversations showed
  the pattern. Do not paste what anyone said.
- **3+ to validate.** A seat can only mark a pain, edge or profile `field_validated` once reviewed
  notes for that seat add up to 3+ conversations that confirm or add the pattern. The catalog check
  enforces this.
- **Challenges count too.** Record `stance: "challenges"` when the field contradicts a published
  pain. Those notes don't validate anything; they flag the line for review.
- **Review gate.** Leave `reviewedAt: null` until a human has checked the note against
  `docs/research-publication-boundary.md`.

## Template

```ts
{
  id: "fn-<seat>-<short-slug>",
  personaId: "<seat id, e.g. appsec>",
  pattern: "<one sentence, plain words, no names>",
  kind: "pain", // pain | objection | trigger | edge | title | other
  stance: "confirms", // confirms | challenges | new
  conversations: 3,
  companySize: "mid-market", // optional: small | mid-market | enterprise
  observedMonth: "2026-10",
  reviewedAt: null,
},
```

## Quick capture

If writing TypeScript is too much overhead, jot lines like this and convert them later:

```
appsec | pain | confirms | 4 convos | mid-market | 2026-10 | Findings without an owner never get fixed
```
