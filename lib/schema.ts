import { z } from "zod";

export const AS_OF = "2026-10-13";

export const sourceTypeSchema = z.enum([
  "official_docs",
  "vendor_marketing",
  "press_release",
  "customer_story",
  "analyst",
  "review",
  "standard",
  "internal_note",
  "news",
  "legal_summary",
  "academic",
]);

export const verificationStatusSchema = z.enum([
  "verified",
  "vendor_published",
  "needs_review",
  "conflicting",
  "superseded",
]);

export const confidenceSchema = z.enum(["high", "medium", "low"]);
export const relationshipTypeSchema = z.enum([
  "direct_competitor",
  "bundled_alternative",
  "complement",
  "adjacent_budget",
]);
export const deploymentSchema = z.enum([
  "saas",
  "self_hosted",
  "hybrid",
  "cloud_native",
  "open_source",
  "unknown",
]);
export const identityScopeSchema = z.enum([
  "human",
  "nhi",
  "agent",
  "not_an_identity_control",
]);
export const priceSignalTypeSchema = z.enum([
  "public_list",
  "promotional_offer",
  "commissioned_composite",
  "field_signal",
  "actual_quote",
]);
export const availabilitySchema = z.enum([
  "generally_available",
  "announced",
  "limited",
  "legacy_name",
  "unknown",
]);
export const volatilitySchema = z.enum(["stable", "moderate", "fast"]);
export const claimPolaritySchema = z.enum(["asserts", "denies", "limits"]);
export const claimSubjectTypeSchema = z.enum(["vendor", "product", "category", "capability"]);
export const categoryGroupSchema = z.enum([
  "entry",
  "governance",
  "credentials",
  "machines",
  "detection",
  "adjacent",
  "corporate",
  "appsec",
  "product",
  "cloud",
  "data",
  "secops",
  "grc",
  "offensive",
  "platform",
]);
export const domainDepthSchema = z.enum(["evidenced", "mapped"]);
export const eventKindSchema = z.enum([
  "acquisition",
  "rename",
  "launch",
  "availability_note",
]);
export const proofTypeSchema = z.enum([
  "vendor_published",
  "independently_checked",
]);

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const flowSchema = z.object({
  actor: z.string().min(1),
  credential: z.string().min(1),
  permission: z.string().min(1),
  decision: z.string().min(1),
  action: z.string().min(1),
  evidence: z.string().min(1),
});

export const categorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  group: categoryGroupSchema,
  layer: z.enum(["core", "adjacent"]),
  definition: z.string().min(1),
  buyerQuestion: z.string().min(1),
  buyerOwner: z.string().min(1),
  triggers: z.array(z.string().min(1)).min(1),
  budgetSource: z.string().min(1),
  outcomes: z.array(z.string().min(1)).min(1),
  adjacentCategoryIds: z.array(z.string()),
  domainIds: z.array(z.string().min(1)).min(1),
  exampleWorkflow: z.string().min(1),
  flow: flowSchema,
});

export const domainSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  charter: z.string().min(1),
  typicalOwner: z.string().min(1),
  budget: z.string().min(1),
  depth: domainDepthSchema,
  categoryIds: z.array(z.string()).min(1),
  neighborIds: z.array(z.string()),
});

export const vendorSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  formerNames: z.array(z.string()),
  website: z.string().url(),
  positioning: z.string().min(1),
  primaryCategoryIds: z.array(z.string()).min(1),
  adjacentCategoryIds: z.array(z.string()),
  identityScopes: z.array(identityScopeSchema).min(1),
  verificationStatus: z.literal("research_candidate"),
  openQuestions: z.array(z.string().min(1)).min(1),
});

export const eventSchema = z.object({
  id: z.string().min(1),
  vendorId: z.string().min(1),
  date: isoDate.nullable(),
  kind: eventKindSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  sourceId: z.string().min(1),
});

export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  vendorId: z.string().min(1),
  name: z.string().min(1),
  positioning: z.string().min(1),
  primaryCategoryIds: z.array(z.string()).min(1),
  adjacentCategoryIds: z.array(z.string()),
  deployment: z.array(deploymentSchema).min(1),
  identityScopes: z.array(identityScopeSchema).min(1),
  availability: availabilitySchema,
  availabilityNote: z.string().min(1),
  officialUrl: z.string().url(),
  useCaseIds: z.array(z.string()),
});

export const capabilitySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
});

export const useCaseSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  problem: z.string().min(1),
  architecture: z.string().min(1),
  stakeholders: z.array(z.string()).min(1),
  triggers: z.array(z.string()).min(1),
  budgetOwner: z.string().min(1),
  successMetrics: z.array(z.string()).min(1),
  categoryIds: z.array(z.string()).min(1),
  capabilityIds: z.array(z.string()).min(1),
  discoveryQuestions: z.array(z.string()).min(2),
  buyerQuestion: z.string().min(1),
});

export const personaSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  caresAbout: z.string().min(1),
  questions: z.array(z.string()).min(1),
  categoryIds: z.array(z.string()).min(1),
  /** Acronyms and alternate titles for the same seat. Overloaded labels belong in research notes, not as exclusive aliases. */
  aliases: z.array(z.string().min(1)).default([]),
});

/** Which shared job a seat belongs to. A person can wear more than one hat; this is the primary cluster. */
export const personaClusterSchema = z.enum([
  "lead-govern",
  "build",
  "protect",
  "detect-respond",
  "validate",
  "recover",
  "engineering-ai",
  "service-provider",
  "business",
]);

/** Where the seat usually sits. "varies" when reporting lines differ too much to generalize. */
export const personaOrgPlacementSchema = z.enum([
  "security",
  "engineering",
  "it",
  "legal-privacy",
  "executive",
  "finance-procurement",
  "people",
  "external",
  "varies",
]);

/** Roles a seat may play in a purchase. Titles do not prove any of these; confirm per deal. */
export const buyingRoleSchema = z.enum([
  "economic-buyer",
  "budget-owner-possible",
  "executive-sponsor",
  "evaluator",
  "operator",
  "influencer",
  "user",
  "approver",
  "blocker",
]);

/**
 * sourced = cited source; practitioner_published = publisher's own framing;
 * field_validated = repeated in anonymized field notes (see fieldNoteSchema); hypothesis = validate in discovery.
 */
export const personaEvidenceSchema = z.enum(["sourced", "practitioner_published", "field_validated", "hypothesis", "unknown"]);


export const personaEdgeTypeSchema = z.enum([
  "sponsors",
  "sets-standards-for",
  "hands-off-to",
  "escalates-to",
  "feeds",
  "co-owns",
  "depends-on",
  "bridges",
  "collides",
  "operates-for",
  "reports-to",
  "oversees",
  "approves-purchase",
]);

export const personaEdgeSchema = z.object({
  toPersonaId: z.string().min(1),
  type: personaEdgeTypeSchema,
  /** What moves across the edge: findings, budget, evidence, alerts. */
  carries: z.string().min(1),
  qualify: z.string().min(1).optional(),
  evidence: personaEvidenceSchema,
  sourceIds: z.array(z.string().min(1)).default([]),
});

export const personaCommunitySchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
});

/** Company size bands. Employee cutoffs are working estimates; see companySizeBands in lib/data/company-segments.ts. */
export const companySizeSchema = z.enum(["small", "mid-market", "enterprise"]);

/** Whether the seat exists as its own job at a given size. "external" = provided by an outside firm. */
export const seatPresenceSchema = z.enum(["dedicated", "shared", "usually-absent", "external"]);

export const sizePresenceSchema = z.object({
  presence: seatPresenceSchema,
  /** Persona or stakeholder ids that usually cover the work when the seat is shared or absent. */
  coveredBy: z.array(z.string().min(1)).default([]),
  note: z.string().min(1).optional(),
});

/** Non-security seats that shape security purchases (CIO, procurement, legal, board). No category ownership. */
export const stakeholderSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  roleInSecurityDeals: z.string().min(1),
  questions: z.array(z.string().min(1)).min(1),
  aliases: z.array(z.string().min(1)).default([]),
});

/** Deal lifecycle stages, following docs/academy lifecycle placeholders in the portfolio. */
export const dealStageSchema = z.enum([
  "prospecting",
  "discovery",
  "technical-evaluation",
  "business-case",
  "security-review",
  "procurement-legal",
  "close",
  "implementation",
  "renewal-expansion",
]);

/** Links a use case to typed seats. Free-text stakeholders that are not modeled yet stay listed. */
export const useCaseSeatsSchema = z.object({
  useCaseId: z.string().min(1),
  seatIds: z.array(z.string().min(1)).min(1),
  likelyBudgetSeatIds: z.array(z.string().min(1)).default([]),
  unmodeledStakeholders: z.array(z.string().min(1)).default([]),
});

/** Functional home of a seat, independent of where it reports at a given company. */
export const seatFunctionSchema = z.enum([
  "security",
  "engineering",
  "it",
  "legal-privacy",
  "finance-procurement",
  "executive",
  "people",
  "external",
]);

/** Seniority levels used to read titles. Head-of maps to director by default; at small companies it can be the top seat. */
export const seniorityLevelSchema = z.enum(["ic", "senior-ic", "manager", "director", "vp", "c-level"]);

export const painSchema = z.object({
  pain: z.string().min(1),
  evidence: personaEvidenceSchema,
  sourceIds: z.array(z.string().min(1)).default([]),
  /** Categories that address this pain. Empty when it is a people, budget or process problem, not a product one. */
  relatedCategoryIds: z.array(z.string().min(1)).default([]),
  relatedUseCaseIds: z.array(z.string().min(1)).default([]),
  /** Catalog capabilities that address this pain (Octave-style pain → capability → outcome). */
  relatedCapabilityIds: z.array(z.string().min(1)).default([]),
});

/** Research profile for a typed persona. Keyed by personaId; the base persona stays small for filters. */
export const personaProfileSchema = z.object({
  personaId: z.string().min(1),
  /** null = cross-domain seat (e.g. CISO, architect, CTO). */
  primaryDomainId: z.string().min(1).nullable(),
  cluster: personaClusterSchema,
  orgPlacement: personaOrgPlacementSchema,
  buyingRoles: z.array(buyingRoleSchema).min(1),
  function: seatFunctionSchema,
  job: z.string().min(1),
  /** What hurts in this seat's own terms. Sourced pains cite surveys or reports; the rest are hypotheses. */
  pains: z.array(painSchema).min(1),
  triggers: z.array(z.string().min(1)).default([]),
  messageToTest: z.string().min(1).optional(),
  successMeasures: z.array(z.string().min(1)).default([]),
  objections: z.array(z.string().min(1)).default([]),
  disconfirmation: z.array(z.string().min(1)).default([]),
  doNotAssume: z.array(z.string().min(1)).default([]),
  boundary: z.string().min(1).optional(),
  edges: z.array(personaEdgeSchema).default([]),
  communities: z.array(personaCommunitySchema).default([]),
  frameworks: z.array(z.string().min(1)).default([]),
  /** Stages where this seat usually shows up. Hypothesis unless the profile cites sources. */
  dealStages: z.array(dealStageSchema).min(1),
  /** Things a seller can observe from outside (postings, filings, announcements). Not proof of intent. */
  publicSignals: z.array(z.string().min(1)).default([]),
  bySize: z.object({
    small: sizePresenceSchema,
    "mid-market": sizePresenceSchema,
    enterprise: sizePresenceSchema,
  }),
  evidence: personaEvidenceSchema,
  sourceIds: z.array(z.string().min(1)).default([]),
  lastReviewedAt: isoDate,
});

export const segmentKindSchema = z.enum(["business-model", "industry", "ownership", "region", "provider"]);

/** A seat a law or standard requires by name. personaId links it when the seat is already modeled. */
export const mandatedSeatSchema = z.object({
  title: z.string().min(1),
  personaId: z.string().min(1).optional(),
  rule: z.string().min(1),
  sourceIds: z.array(z.string().min(1)).min(1),
});

/** How a company type changes the map: which seats a rule requires, which seats gain weight, what triggers appear. */
export const segmentOverlaySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: segmentKindSchema,
  appliesTo: z.string().min(1),
  mandatedSeats: z.array(mandatedSeatSchema).default([]),
  elevatedPersonaIds: z.array(z.string().min(1)).default([]),
  addedTriggers: z.array(z.string().min(1)).default([]),
  frameworks: z.array(z.string().min(1)).default([]),
  notes: z.string().min(1).optional(),
  evidence: personaEvidenceSchema,
  sourceIds: z.array(z.string().min(1)).default([]),
  lastReviewedAt: isoDate,
});

export const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  canonicalUrl: z.string().url(),
  publisher: z.string().min(1),
  author: z.string().min(1).nullable().optional(),
  sourceType: sourceTypeSchema,
  publishedAt: isoDate.nullable(),
  retrievedAt: isoDate,
  volatility: volatilitySchema,
  excerpt: z.string().max(420),
});

export const claimSchema = z.object({
  id: z.string().min(1),
  statement: z.string().min(1),
  subjectType: claimSubjectTypeSchema,
  subjectId: z.string().min(1),
  capabilityId: z.string().nullable(),
  polarity: claimPolaritySchema,
  sourceId: z.string().min(1),
  sourceUrl: z.string().url(),
  sourceType: sourceTypeSchema,
  publishedAt: isoDate.nullable(),
  observedAt: isoDate,
  effectiveFrom: isoDate.nullable(),
  effectiveTo: isoDate.nullable(),
  confidence: confidenceSchema,
  verificationStatus: verificationStatusSchema,
  lastCheckedAt: isoDate,
  conflictsWith: z.array(z.string()),
  notes: z.string().nullable(),
});

export const relationshipSchema = z.object({
  id: z.string().min(1),
  fromProductId: z.string().min(1),
  toProductId: z.string().min(1),
  type: relationshipTypeSchema,
  useCaseId: z.string().min(1),
  rationale: z.string().min(1),
  sourceId: z.string().nullable(),
});

export const customerStorySchema = z.object({
  id: z.string().min(1),
  vendorId: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  sourceId: z.string().min(1),
  proofType: proofTypeSchema,
});

export const pricingSignalSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  signalType: priceSignalTypeSchema,
  statement: z.string().min(1),
  amountLabel: z.string().nullable(),
  asOf: isoDate,
  sourceId: z.string().min(1),
  caveats: z.string().min(1),
});

export const glossaryTermSchema = z.object({
  id: z.string().min(1),
  term: z.string().min(1),
  definition: z.string().min(1),
  categoryId: z.string().nullable(),
  relatedTermIds: z.array(z.string()),
});

export const scenarioStepSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  narrative: z.string().min(1),
  categoryId: z.string().min(1),
  capabilityId: z.string().min(1),
  handoff: z.string().min(1),
});

export const scenarioSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  steps: z.array(scenarioStepSchema).min(3),
});

export const distinctionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  lede: z.string().min(1),
  rows: z
    .array(
      z.object({
        label: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .min(2),
});

export const incumbentSchema = z.enum(["unknown", "none", "named"]);

export const accountSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  industry: z.string(),
  employees: z.string(),
  identityEstimate: z.string(),
  idp: z.string(),
  iga: z.object({ state: incumbentSchema, name: z.string() }),
  pam: z.object({ state: incumbentSchema, name: z.string() }),
  vault: z.object({ state: incumbentSchema, name: z.string() }),
  cloud: z.array(z.string()),
  compliance: z.array(z.string()),
  agentAdoption: z.enum(["unknown", "none", "pilot", "production"]),
  triggers: z.string(),
  partner: z.string(),
  sourceLinks: z.array(z.object({ label: z.string(), url: z.string() })),
  hypothesis: z.string(),
  notes: z.string(),
  useCaseIds: z.array(z.string()),
  updatedAt: z.string(),
});

export const fitWeightsSchema = z.object({
  igaWhitespace: z.number().min(0).max(5),
  pamWhitespace: z.number().min(0).max(5),
  vaultWhitespace: z.number().min(0).max(5),
  complianceNamed: z.number().min(0).max(5),
  agentAdoption: z.number().min(0).max(5),
  triggerPresent: z.number().min(0).max(5),
  cloudNamed: z.number().min(0).max(5),
  idpKnown: z.number().min(0).max(5),
});

export const evaluationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  useCaseId: z.string().min(1),
  productIds: z.array(z.string()).min(2).max(4),
  notes: z.string(),
  createdAt: isoDate,
});

export const budgetInputSchema = z.object({
  identities: z.number().nonnegative(),
  applications: z.number().nonnegative(),
  reviewHoursPerIdentityPerYear: z.number().nonnegative(),
  jmlEventsPerYear: z.number().nonnegative(),
  hoursPerJmlEvent: z.number().nonnegative(),
  requestsPerYear: z.number().nonnegative(),
  minutesPerRequest: z.number().nonnegative(),
  hourlyRate: z.number().nonnegative(),
  retiredToolsAnnual: z.number().nonnegative(),
  implementationCost: z.number().nonnegative(),
  annualLicense: z.number().nonnegative(),
  adminHoursPerYear: z.number().nonnegative(),
});

export type Category = z.infer<typeof categorySchema>;
export type Domain = z.infer<typeof domainSchema>;
export type Vendor = z.infer<typeof vendorSchema>;
export type Product = z.infer<typeof productSchema>;
export type Capability = z.infer<typeof capabilitySchema>;
export type UseCase = z.infer<typeof useCaseSchema>;
export type BuyerPersona = z.infer<typeof personaSchema>;
export type PersonaProfile = z.infer<typeof personaProfileSchema>;
export type PersonaProfileInput = z.input<typeof personaProfileSchema>;
export type PersonaEdge = z.infer<typeof personaEdgeSchema>;
export type Stakeholder = z.infer<typeof stakeholderSchema>;
export type StakeholderInput = z.input<typeof stakeholderSchema>;
export type SegmentOverlay = z.infer<typeof segmentOverlaySchema>;
export type SegmentOverlayInput = z.input<typeof segmentOverlaySchema>;
export type SizePresenceInput = z.input<typeof sizePresenceSchema>;
export type DealStage = z.infer<typeof dealStageSchema>;
export type CompanySize = z.infer<typeof companySizeSchema>;
export type SeatFunction = z.infer<typeof seatFunctionSchema>;
export type SeniorityLevel = z.infer<typeof seniorityLevelSchema>;
export type BuyingRole = z.infer<typeof buyingRoleSchema>;
export type UseCaseSeats = z.infer<typeof useCaseSeatsSchema>;
export type UseCaseSeatsInput = z.input<typeof useCaseSeatsSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type Claim = z.infer<typeof claimSchema>;
export type Relationship = z.infer<typeof relationshipSchema>;
export type CustomerStory = z.infer<typeof customerStorySchema>;
export type PricingSignal = z.infer<typeof pricingSignalSchema>;
export type GlossaryTerm = z.infer<typeof glossaryTermSchema>;
export type Scenario = z.infer<typeof scenarioSchema>;
export type Distinction = z.infer<typeof distinctionSchema>;
export type Account = z.infer<typeof accountSchema>;
export type FitWeights = z.infer<typeof fitWeightsSchema>;
export type Evaluation = z.infer<typeof evaluationSchema>;
export type BudgetInput = z.infer<typeof budgetInputSchema>;
export type CatalogEvent = z.infer<typeof eventSchema>;

/**
 * An anonymized pattern seen in real conversations. Patterns only: no company, person,
 * customer, deal value, or employer-confidential detail. See docs/research-publication-boundary.md.
 */
export const fieldNoteSchema = z.object({
  id: z.string().regex(/^fn-[a-z0-9-]+$/),
  personaId: z.string().min(1),
  /** The pain, objection, trigger, or edge being confirmed or challenged, in plain words. */
  pattern: z.string().min(1).max(280),
  kind: z.enum(["pain", "objection", "trigger", "edge", "title", "other"]),
  stance: z.enum(["confirms", "challenges", "new"]),
  /** How many separate conversations showed it. A label needs 3+ to count as field_validated. */
  conversations: z.number().int().min(1),
  companySize: companySizeSchema.optional(),
  /** Month granularity only, e.g. "2026-10". */
  observedMonth: z.string().regex(/^\d{4}-\d{2}$/),
  reviewedAt: isoDate.nullable(),
});
export type FieldNote = z.infer<typeof fieldNoteSchema>;

// ---------------------------------------------------------------------------
// Context graph concepts: objections, alternatives, buying triggers.
// Vendor-neutral and public. Seller-specific offerings, motions and proof live in ASE.
// ---------------------------------------------------------------------------

export const objectionSchema = z.object({
  id: z.string().regex(/^obj-[a-z0-9-]+$/),
  /** The pushback in the buyer's words, paraphrased. */
  objection: z.string().min(1).max(200),
  /** What the objection is usually really about. */
  underlyingConcern: z.string().min(1).max(240),
  /** A neutral reframe to test; never a claim about a specific vendor. */
  reframe: z.string().min(1).max(280),
  /** Questions that tell you whether the objection is real or a brush-off. */
  qualifyingQuestions: z.array(z.string().min(1)).min(1),
  seatIds: z.array(z.string().min(1)).min(1),
  categoryIds: z.array(z.string().min(1)).default([]),
  /** The alternative the objection usually points to, if any. */
  alternativeIds: z.array(z.string().min(1)).default([]),
  evidence: personaEvidenceSchema,
  sourceIds: z.array(z.string().min(1)).default([]),
  lastReviewedAt: isoDate,
});
export type Objection = z.infer<typeof objectionSchema>;
export type ObjectionInput = z.input<typeof objectionSchema>;

export const alternativeKindSchema = z.enum([
  "do-nothing",
  "manual-process",
  "build-in-house",
  "open-source",
  "platform-bundle",
  "adjacent-category",
  "service",
]);

export const alternativeSchema = z.object({
  id: z.string().regex(/^alt-[a-z0-9-]+$/),
  categoryId: z.string().min(1),
  kind: alternativeKindSchema,
  name: z.string().min(1).max(120),
  /** When this alternative is genuinely good enough. */
  whenItWins: z.string().min(1).max(280),
  /** When it stops working, which is usually the buying trigger. */
  whenItBreaks: z.string().min(1).max(280),
  adjacentCategoryId: z.string().min(1).optional(),
  evidence: personaEvidenceSchema,
  sourceIds: z.array(z.string().min(1)).default([]),
});
export type Alternative = z.infer<typeof alternativeSchema>;
export type AlternativeInput = z.input<typeof alternativeSchema>;

export const triggerKindSchema = z.enum([
  "incident",
  "regulation",
  "audit",
  "customer-demand",
  "org-change",
  "tech-change",
  "business-event",
  "tool-renewal",
]);

export const buyingTriggerSchema = z.object({
  id: z.string().regex(/^trg-[a-z0-9-]+$/),
  trigger: z.string().min(1).max(200),
  kind: triggerKindSchema,
  /** How a seller could observe it from outside. A public signal is a lead, not buyer intent. */
  publicSignal: z.string().min(1).max(240).nullable(),
  useCaseIds: z.array(z.string().min(1)).default([]),
  categoryIds: z.array(z.string().min(1)).default([]),
  seatIds: z.array(z.string().min(1)).min(1),
  evidence: personaEvidenceSchema,
  sourceIds: z.array(z.string().min(1)).default([]),
});
export type BuyingTrigger = z.infer<typeof buyingTriggerSchema>;
export type BuyingTriggerInput = z.input<typeof buyingTriggerSchema>;
