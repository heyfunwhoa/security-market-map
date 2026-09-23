import { z } from "zod";

export const AS_OF = "2026-09-23";

export const sourceTypeSchema = z.enum([
  "official_docs",
  "vendor_marketing",
  "press_release",
  "customer_story",
  "analyst",
  "review",
  "standard",
  "internal_note",
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
});

export const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  canonicalUrl: z.string().url(),
  publisher: z.string().min(1),
  sourceType: sourceTypeSchema,
  publishedAt: isoDate.nullable(),
  retrievedAt: isoDate,
  volatility: volatilitySchema,
  excerpt: z.string().max(420),
});

export const claimSchema = z.object({
  id: z.string().min(1),
  statement: z.string().min(1),
  subjectType: z.enum(["vendor", "product", "category", "capability"]),
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
