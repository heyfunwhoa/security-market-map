import { z } from "zod";
import {
  AS_OF,
  capabilitySchema,
  categorySchema,
  claimSchema,
  customerStorySchema,
  distinctionSchema,
  domainSchema,
  eventSchema,
  glossaryTermSchema,
  personaSchema,
  pricingSignalSchema,
  productSchema,
  relationshipSchema,
  scenarioSchema,
  sourceSchema,
  useCaseSchema,
  vendorSchema,
  type Capability,
  type CatalogEvent,
  type Category,
  type Claim,
  type CustomerStory,
  type Distinction,
  type Domain,
  type GlossaryTerm,
  type BuyerPersona,
  type PricingSignal,
  type Product,
  type Relationship,
  type Scenario,
  type Source,
  type UseCase,
  type Vendor,
} from "./schema";
import { capabilities } from "./data/capabilities";
import { categories } from "./data/categories";
import { claims } from "./data/claims";
import {
  domainSeeds,
  ecosystemCapabilities,
  ecosystemCategories,
  ecosystemPersonas,
  ecosystemProducts,
  ecosystemRelationships,
  ecosystemUseCases,
  ecosystemVendors,
} from "./data/ecosystem";
import { distinctions, glossary, scenarios } from "./data/learn";
import { events, products, vendors } from "./data/market";
import { personas } from "./data/personas";
import { customerStories, pricingSignals, relationships } from "./data/relationships";
import { sources } from "./data/sources";
import { useCases } from "./data/use-cases";

const allCategories = [...categories, ...ecosystemCategories];

const domains: Domain[] = domainSeeds.map((seed) => ({
  ...seed,
  categoryIds: allCategories
    .filter((category) => category.domainIds.includes(seed.id))
    .map((category) => category.id),
}));

export type Catalog = {
  asOf: string;
  domains: Domain[];
  categories: Category[];
  vendors: Vendor[];
  products: Product[];
  capabilities: Capability[];
  useCases: UseCase[];
  personas: BuyerPersona[];
  sources: Source[];
  claims: Claim[];
  relationships: Relationship[];
  stories: CustomerStory[];
  pricing: PricingSignal[];
  events: CatalogEvent[];
  glossary: GlossaryTerm[];
  scenarios: Scenario[];
  distinctions: Distinction[];
};

function parseCatalog(): Catalog {
  return {
    asOf: AS_OF,
    domains: z.array(domainSchema).parse(domains),
    categories: z.array(categorySchema).parse(allCategories),
    vendors: z.array(vendorSchema).parse([...vendors, ...ecosystemVendors]),
    products: z.array(productSchema).parse([...products, ...ecosystemProducts]),
    capabilities: z.array(capabilitySchema).parse([...capabilities, ...ecosystemCapabilities]),
    useCases: z.array(useCaseSchema).parse([...useCases, ...ecosystemUseCases]),
    personas: z.array(personaSchema).parse([...personas, ...ecosystemPersonas]),
    sources: z.array(sourceSchema).parse(sources),
    claims: z.array(claimSchema).parse(claims),
    relationships: z.array(relationshipSchema).parse([...relationships, ...ecosystemRelationships]),
    stories: z.array(customerStorySchema).parse(customerStories),
    pricing: z.array(pricingSignalSchema).parse(pricingSignals),
    events: z.array(eventSchema).parse(events),
    glossary: z.array(glossaryTermSchema).parse(glossary),
    scenarios: z.array(scenarioSchema).parse(scenarios),
    distinctions: z.array(distinctionSchema).parse(distinctions),
  };
}

export function catalogProblems(catalog: Catalog): string[] {
  const problems: string[] = [];
  const categoryIds = new Set(catalog.categories.map((item) => item.id));
  const domainIds = new Set(catalog.domains.map((item) => item.id));
  const vendorIds = new Set(catalog.vendors.map((item) => item.id));
  const productIds = new Set(catalog.products.map((item) => item.id));
  const capabilityIds = new Set(catalog.capabilities.map((item) => item.id));
  const useCaseIds = new Set(catalog.useCases.map((item) => item.id));
  const sourceIds = new Set(catalog.sources.map((item) => item.id));
  const claimIds = new Set(catalog.claims.map((item) => item.id));
  const slugs = new Set<string>();

  const takeSlug = (kind: string, slug: string) => {
    const key = `${kind}:${slug}`;
    if (slugs.has(key)) problems.push(`Duplicate ${kind} slug ${slug}`);
    slugs.add(key);
  };

  for (const category of catalog.categories) {
    takeSlug("category", category.slug);
    if (category.id !== category.slug) problems.push(`Category id/slug mismatch ${category.id}`);
    for (const adjacent of category.adjacentCategoryIds) {
      if (!categoryIds.has(adjacent)) problems.push(`Category ${category.id} adjacent ${adjacent} missing`);
    }
    for (const domainId of category.domainIds) {
      if (!domainIds.has(domainId)) problems.push(`Category ${category.id} domain ${domainId} missing`);
    }
  }
  for (const domain of catalog.domains) {
    takeSlug("domain", domain.slug);
    if (domain.id !== domain.slug) problems.push(`Domain id/slug mismatch ${domain.id}`);
    for (const neighbor of domain.neighborIds) {
      if (!domainIds.has(neighbor)) problems.push(`Domain ${domain.id} neighbor ${neighbor} missing`);
    }
    const members = new Set(
      catalog.categories
        .filter((category) => category.domainIds.includes(domain.id))
        .map((category) => category.id),
    );
    for (const id of members) {
      if (!domain.categoryIds.includes(id)) {
        problems.push(`Domain ${domain.id} omits category ${id}`);
      }
    }
    for (const id of domain.categoryIds) {
      if (!categoryIds.has(id)) problems.push(`Domain ${domain.id} category ${id} missing`);
      if (!members.has(id)) {
        problems.push(`Domain ${domain.id} lists ${id} without a matching category.domainIds entry`);
      }
    }
  }
  for (const vendor of catalog.vendors) {
    takeSlug("vendor", vendor.slug);
    if (vendor.verificationStatus !== "research_candidate") {
      problems.push(`Vendor ${vendor.id} is not marked as a research candidate`);
    }
    for (const id of [...vendor.primaryCategoryIds, ...vendor.adjacentCategoryIds]) {
      if (!categoryIds.has(id)) problems.push(`Vendor ${vendor.id} category ${id} missing`);
    }
  }
  for (const product of catalog.products) {
    takeSlug("product", product.slug);
    if (!vendorIds.has(product.vendorId)) problems.push(`Product ${product.id} vendor missing`);
    for (const id of product.useCaseIds) {
      if (!useCaseIds.has(id)) problems.push(`Product ${product.id} use case ${id} missing`);
    }
    for (const id of [...product.primaryCategoryIds, ...product.adjacentCategoryIds]) {
      if (!categoryIds.has(id)) problems.push(`Product ${product.id} category ${id} missing`);
    }
  }
  for (const capability of catalog.capabilities) {
    if (!categoryIds.has(capability.categoryId)) {
      problems.push(`Capability ${capability.id} category missing`);
    }
  }
  for (const useCase of catalog.useCases) {
    takeSlug("use-case", useCase.slug);
    for (const id of useCase.capabilityIds) {
      if (!capabilityIds.has(id)) problems.push(`Use case ${useCase.id} capability ${id} missing`);
    }
  }
  for (const source of catalog.sources) {
    if (source.canonicalUrl !== source.url) {
      problems.push(`Source ${source.id} canonical URL differs from URL`);
    }
  }
  for (const claim of catalog.claims) {
    if (!sourceIds.has(claim.sourceId)) problems.push(`Claim ${claim.id} source missing`);
    if (!claim.sourceUrl || !claim.lastCheckedAt || !claim.observedAt) {
      problems.push(`Claim ${claim.id} missing source or dates`);
    }
    const source = catalog.sources.find((item) => item.id === claim.sourceId);
    if (source && source.url !== claim.sourceUrl) {
      problems.push(`Claim ${claim.id} source URL does not match its source`);
    }
    if (claim.capabilityId && !capabilityIds.has(claim.capabilityId)) {
      problems.push(`Claim ${claim.id} capability missing`);
    }
    if (claim.subjectType === "product" && !productIds.has(claim.subjectId)) {
      problems.push(`Claim ${claim.id} product subject missing`);
    }
    if (claim.subjectType === "vendor" && !vendorIds.has(claim.subjectId)) {
      problems.push(`Claim ${claim.id} vendor subject missing`);
    }
    if (claim.subjectType === "category" && !categoryIds.has(claim.subjectId)) {
      problems.push(`Claim ${claim.id} category subject missing`);
    }
    for (const other of claim.conflictsWith) {
      if (!claimIds.has(other)) problems.push(`Claim ${claim.id} conflict ${other} missing`);
      const counterpart = catalog.claims.find((item) => item.id === other);
      if (counterpart && !counterpart.conflictsWith.includes(claim.id)) {
        problems.push(`Conflict between ${claim.id} and ${other} is not symmetric`);
      }
    }
  }
  for (const relationship of catalog.relationships) {
    if (!productIds.has(relationship.fromProductId) || !productIds.has(relationship.toProductId)) {
      problems.push(`Relationship ${relationship.id} product missing`);
    }
    if (!useCaseIds.has(relationship.useCaseId)) {
      problems.push(`Relationship ${relationship.id} has no use case`);
    }
    if (relationship.fromProductId === relationship.toProductId) {
      problems.push(`Relationship ${relationship.id} points at itself`);
    }
    if (relationship.sourceId && !sourceIds.has(relationship.sourceId)) {
      problems.push(`Relationship ${relationship.id} source missing`);
    }
  }
  for (const event of catalog.events) {
    if (!vendorIds.has(event.vendorId)) problems.push(`Event ${event.id} vendor missing`);
    if (!sourceIds.has(event.sourceId)) problems.push(`Event ${event.id} source missing`);
  }
  for (const price of catalog.pricing) {
    if (!productIds.has(price.productId)) problems.push(`Price ${price.id} product missing`);
    if (!sourceIds.has(price.sourceId)) problems.push(`Price ${price.id} source missing`);
  }
  for (const term of catalog.glossary) {
    if (term.categoryId && !categoryIds.has(term.categoryId)) {
      problems.push(`Glossary ${term.id} category missing`);
    }
  }
  for (const scenario of catalog.scenarios) {
    for (const step of scenario.steps) {
      if (!categoryIds.has(step.categoryId)) problems.push(`Scenario step ${step.id} category missing`);
      if (!capabilityIds.has(step.capabilityId)) problems.push(`Scenario step ${step.id} capability missing`);
    }
  }
  return problems;
}

export const catalog = parseCatalog();

const problems = catalogProblems(catalog);
if (problems.length > 0) {
  throw new Error(`Catalog integrity failed:\n${problems.join("\n")}`);
}

export function domainBySlug(slug: string): Domain | undefined {
  return catalog.domains.find((item) => item.slug === slug);
}

export function categoryBySlug(slug: string): Category | undefined {
  return catalog.categories.find((item) => item.slug === slug);
}

export function vendorBySlug(slug: string): Vendor | undefined {
  return catalog.vendors.find((item) => item.slug === slug);
}

export function findUseCase(slug: string): UseCase | undefined {
  return catalog.useCases.find((item) => item.slug === slug);
}

export function productsForVendor(vendorId: string): Product[] {
  return catalog.products.filter((item) => item.vendorId === vendorId);
}

export function claimsForSubject(subjectType: Claim["subjectType"], subjectId: string): Claim[] {
  return catalog.claims.filter(
    (claim) => claim.subjectType === subjectType && claim.subjectId === subjectId,
  );
}

export function relationshipsForProduct(productId: string): Relationship[] {
  return catalog.relationships.filter(
    (relationship) =>
      relationship.fromProductId === productId || relationship.toProductId === productId,
  );
}

export function sourceById(id: string): Source | undefined {
  return catalog.sources.find((source) => source.id === id);
}

export function productById(id: string): Product | undefined {
  return catalog.products.find((product) => product.id === id);
}

export function vendorById(id: string): Vendor | undefined {
  return catalog.vendors.find((vendor) => vendor.id === id);
}

export type SearchHit = {
  href: string;
  kind: string;
  title: string;
  text: string;
};

export function searchIndex(): SearchHit[] {
  return [
    ...catalog.domains.map((item) => ({
      href: `/domains/${item.slug}`,
      kind: "Domain",
      title: item.name,
      text: `${item.charter} ${item.depth}`,
    })),
    ...catalog.categories.map((item) => ({
      href: `/categories/${item.slug}`,
      kind: "Category",
      title: item.name,
      text: `${item.definition} ${item.buyerQuestion}`,
    })),
    ...catalog.vendors.map((item) => ({
      href: `/vendors/${item.slug}`,
      kind: "Vendor",
      title: item.name,
      text: `${item.positioning} ${item.formerNames.join(" ")}`,
    })),
    ...catalog.products.map((item) => ({
      href: `/vendors/${catalog.vendors.find((vendor) => vendor.id === item.vendorId)?.slug ?? ""}`,
      kind: "Product",
      title: item.name,
      text: item.positioning,
    })),
    ...catalog.useCases.map((item) => ({
      href: `/use-cases/${item.slug}`,
      kind: "Use case",
      title: item.name,
      text: `${item.problem} ${item.buyerQuestion}`,
    })),
    ...catalog.glossary.map((item) => ({
      href: `/learn#${item.id}`,
      kind: "Glossary",
      title: item.term,
      text: item.definition,
    })),
    ...catalog.claims.map((item) => ({
      href: "/sources",
      kind: "Claim",
      title: item.statement.slice(0, 90),
      text: item.statement,
    })),
  ];
}

export function searchHits(query: string, hits: SearchHit[] = searchIndex()): SearchHit[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];
  return hits
    .filter((hit) => `${hit.title} ${hit.text} ${hit.kind}`.toLowerCase().includes(needle))
    .slice(0, 12);
}
