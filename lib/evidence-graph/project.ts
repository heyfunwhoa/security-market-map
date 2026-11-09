import type {
  Capability,
  Category,
  Claim,
  Domain,
  BuyerPersona,
  Product,
  Relationship,
  Source,
  UseCase,
  Vendor,
} from "../schema";
import {
  EVIDENCE_GRAPH_VERSION,
  EXPANSION_LIMITS,
  evidenceGraphProblems,
  evidenceGraphSchema,
  graphEdgeId,
  graphNodeId,
  type EvidenceBasis,
  type EvidenceEdge,
  type EvidenceGraph,
  type EvidenceGraphExpansion,
  type GraphNode,
} from "./contract";

export type ProjectableCatalog = {
  asOf: string;
  domains: Pick<Domain, "id" | "slug" | "name" | "charter">[];
  categories: Pick<Category, "id" | "slug" | "name" | "definition" | "buyerQuestion" | "domainIds" | "adjacentCategoryIds">[];
  vendors: Pick<Vendor, "id" | "slug" | "name" | "positioning" | "verificationStatus">[];
  products: Pick<Product, "id" | "slug" | "vendorId" | "name" | "positioning" | "primaryCategoryIds" | "adjacentCategoryIds" | "useCaseIds">[];
  capabilities: Pick<Capability, "id" | "slug" | "name" | "description" | "categoryId">[];
  useCases: Pick<UseCase, "id" | "slug" | "name" | "problem" | "buyerQuestion" | "categoryIds" | "capabilityIds">[];
  personas: Pick<BuyerPersona, "id" | "name" | "title" | "caresAbout" | "categoryIds">[];
  sources: Pick<Source, "id" | "title" | "url" | "publisher" | "sourceType" | "publishedAt" | "retrievedAt">[];
  claims: Pick<Claim, "id" | "statement" | "subjectType" | "subjectId" | "capabilityId" | "polarity" | "sourceId" | "sourceType" | "publishedAt" | "observedAt" | "verificationStatus" | "lastCheckedAt" | "notes" | "conflictsWith">[];
  relationships: Pick<Relationship, "id" | "fromProductId" | "toProductId" | "type" | "useCaseId" | "rationale" | "sourceId">[];
};

export type SliceSpec = {
  id: string;
  title: string;
  categoryIds: readonly string[];
  useCaseIds: readonly string[];
};

export class EvidenceGraphQueryError extends Error {
  readonly status = 400;
}

const TAXONOMY_NOTE = "This is a catalog taxonomy mapping. It is not an independently verified product capability.";
const STRUCTURE_NOTE = "This link records the catalog's own structure. It is not a verified market relationship.";

function shortLabel(text: string, max = 88): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max - 1)}…`;
}

function byId<T extends { id: string }>(items: readonly T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]));
}

export function claimAssertsVerifiedProductCapability(claim: Pick<Claim, "subjectType" | "polarity" | "capabilityId" | "verificationStatus" | "sourceType">): boolean {
  return claim.subjectType === "product"
    && claim.polarity === "asserts"
    && claim.capabilityId !== null
    && claim.verificationStatus === "verified"
    && claim.sourceType === "standard";
}

function claimBasis(claim: Pick<Claim, "verificationStatus">): EvidenceBasis {
  switch (claim.verificationStatus) {
    case "verified":
      return "independently_verified";
    case "vendor_published":
      return "vendor_reported";
    case "needs_review":
      return "needs_review";
    case "conflicting":
      return "disputed";
    case "superseded":
      return "superseded";
    default: {
      const exhaustive: never = claim.verificationStatus;
      return exhaustive;
    }
  }
}

function blankDates(): Pick<EvidenceEdge, "publishedAt" | "observedAt" | "retrievedAt" | "lastCheckedAt"> {
  return { publishedAt: null, observedAt: null, retrievedAt: null, lastCheckedAt: null };
}

export function projectEvidenceGraph(catalog: ProjectableCatalog, slice: SliceSpec): { graph: EvidenceGraph; problems: string[] } {
  const problems: string[] = [];
  const nodes = new Map<string, GraphNode>();
  const edges = new Map<string, EvidenceEdge>();
  const categoryIds = new Set(slice.categoryIds);
  const useCaseIds = new Set(slice.useCaseIds);
  const categories = byId(catalog.categories);
  const domains = byId(catalog.domains);
  const useCases = byId(catalog.useCases);
  const capabilities = byId(catalog.capabilities);
  const products = byId(catalog.products);
  const vendors = byId(catalog.vendors);
  const sources = byId(catalog.sources);
  const claims = byId(catalog.claims);

  const pushNode = (node: GraphNode) => {
    const existing = nodes.get(node.id);
    if (existing) {
      if (JSON.stringify(existing) !== JSON.stringify(node)) problems.push(`Duplicate node id ${node.id}`);
      return;
    }
    nodes.set(node.id, node);
  };

  const pushEdge = (edge: EvidenceEdge) => {
    if (edge.assertsProductCapability && !claimAssertsVerifiedProductCapability({
      subjectType: edge.subjectKind ?? "category",
      polarity: edge.polarity ?? "limits",
      capabilityId: edge.capabilityId,
      verificationStatus: edge.claimVerificationStatus ?? "needs_review",
      sourceType: edge.sourceType ?? "internal_note",
    })) {
      problems.push(`Refused to promote edge ${edge.id} to a verified product capability`);
      edge = { ...edge, assertsProductCapability: false };
    }
    if (edge.fromId === edge.toId) {
      problems.push(`Edge ${edge.id} points at itself`);
      return;
    }
    if (!nodes.has(edge.fromId) || !nodes.has(edge.toId)) {
      problems.push(`Edge ${edge.id} has an endpoint outside the graph`);
      return;
    }
    for (const sourceId of edge.sourceIds) {
      if (!nodes.has(graphNodeId("source", sourceId))) {
        problems.push(`Edge ${edge.id} cites missing source ${sourceId}`);
        return;
      }
    }
    const existing = edges.get(edge.id);
    if (existing) {
      if (JSON.stringify(existing) !== JSON.stringify(edge)) problems.push(`Duplicate edge id ${edge.id}`);
      return;
    }
    edges.set(edge.id, edge);
  };

  const includedCategories: ProjectableCatalog["categories"] = [];
  for (const categoryId of slice.categoryIds) {
    const category = categories.get(categoryId);
    if (!category) {
      problems.push(`Slice category ${categoryId} is not in the catalog`);
      continue;
    }
    includedCategories.push(category);
    pushNode({
      id: graphNodeId("category", category.id),
      kind: "category",
      catalogId: category.id,
      label: category.name,
      summary: category.definition,
      detail: category.buyerQuestion,
      href: `/categories/${category.slug}`,
      externalUrl: null,
      recordStatus: null,
      categoryIds: [category.id],
      domainIds: [...category.domainIds],
      vendorId: null,
      publishedAt: null,
      observedAt: null,
      retrievedAt: null,
      lastCheckedAt: null,
    });
  }

  const domainIdSet = new Set(includedCategories.flatMap((category) => category.domainIds));
  for (const domainId of [...domainIdSet].sort((left, right) => left.localeCompare(right))) {
    const domain = domains.get(domainId);
    if (!domain) {
      problems.push(`Category domain ${domainId} is not in the catalog`);
      continue;
    }
    const memberIds = includedCategories.filter((category) => category.domainIds.includes(domain.id)).map((category) => category.id);
    pushNode({
      id: graphNodeId("domain", domain.id),
      kind: "domain",
      catalogId: domain.id,
      label: domain.name,
      summary: domain.charter,
      detail: null,
      href: `/domains/${domain.slug}`,
      externalUrl: null,
      recordStatus: null,
      categoryIds: memberIds,
      domainIds: [domain.id],
      vendorId: null,
      publishedAt: null,
      observedAt: null,
      retrievedAt: null,
      lastCheckedAt: null,
    });
  }

  for (const useCaseId of slice.useCaseIds) {
    const useCase = useCases.get(useCaseId);
    if (!useCase) {
      problems.push(`Slice use case ${useCaseId} is not in the catalog`);
      continue;
    }
    pushNode({
      id: graphNodeId("use_case", useCase.id),
      kind: "use_case",
      catalogId: useCase.id,
      label: useCase.name,
      summary: useCase.problem,
      detail: useCase.buyerQuestion,
      href: `/use-cases/${useCase.slug}`,
      externalUrl: null,
      recordStatus: null,
      categoryIds: useCase.categoryIds.filter((id) => categoryIds.has(id)),
      domainIds: [],
      vendorId: null,
      publishedAt: null,
      observedAt: null,
      retrievedAt: null,
      lastCheckedAt: null,
    });
  }

  for (const capability of catalog.capabilities) {
    if (!categoryIds.has(capability.categoryId)) continue;
    if (!categories.has(capability.categoryId)) {
      problems.push(`Capability ${capability.id} category ${capability.categoryId} is not in the catalog`);
      continue;
    }
    pushNode({
      id: graphNodeId("capability", capability.id),
      kind: "capability",
      catalogId: capability.id,
      label: capability.name,
      summary: capability.description,
      detail: "A capability record describes a job. A product listing in the same category does not prove the product does this job.",
      href: null,
      externalUrl: null,
      recordStatus: null,
      categoryIds: [capability.categoryId],
      domainIds: [],
      vendorId: null,
      publishedAt: null,
      observedAt: null,
      retrievedAt: null,
      lastCheckedAt: null,
    });
  }

  const sliceRelationships = catalog.relationships.filter((relationship) => useCaseIds.has(relationship.useCaseId));
  const relationshipsOutsideSlice = catalog.relationships.length - sliceRelationships.length;
  const includedProductIds = new Set<string>();
  for (const relationship of sliceRelationships) {
    if (!products.has(relationship.fromProductId)) {
      problems.push(`Relationship ${relationship.id} from-product ${relationship.fromProductId} is not in the catalog`);
    } else includedProductIds.add(relationship.fromProductId);
    if (!products.has(relationship.toProductId)) {
      problems.push(`Relationship ${relationship.id} to-product ${relationship.toProductId} is not in the catalog`);
    } else includedProductIds.add(relationship.toProductId);
  }

  const includedVendorIds = new Set<string>();
  for (const productId of [...includedProductIds].sort((left, right) => left.localeCompare(right))) {
    const product = products.get(productId);
    if (!product) continue;
    const vendor = vendors.get(product.vendorId);
    if (!vendor) problems.push(`Product ${product.id} vendor ${product.vendorId} is not in the catalog`);
    else includedVendorIds.add(vendor.id);
    const inSliceCategories = [...product.primaryCategoryIds, ...product.adjacentCategoryIds].filter((id) => categoryIds.has(id));
    pushNode({
      id: graphNodeId("product", product.id),
      kind: "product",
      catalogId: product.id,
      label: product.name,
      summary: product.positioning,
      detail: "Included because a catalog relationship in this slice names the product. Category membership stays a taxonomy mapping.",
      href: vendor ? `/vendors/${vendor.slug}` : null,
      externalUrl: null,
      recordStatus: null,
      categoryIds: inSliceCategories,
      domainIds: [],
      vendorId: product.vendorId,
      publishedAt: null,
      observedAt: null,
      retrievedAt: null,
      lastCheckedAt: null,
    });
  }

  for (const vendorId of [...includedVendorIds].sort((left, right) => left.localeCompare(right))) {
    const vendor = vendors.get(vendorId);
    if (!vendor) continue;
    if (vendor.verificationStatus !== "research_candidate") {
      problems.push(`Vendor ${vendor.id} is not a research candidate in the catalog`);
    }
    const categorySet = new Set<string>();
    for (const productId of includedProductIds) {
      const product = products.get(productId);
      if (!product || product.vendorId !== vendor.id) continue;
      for (const categoryId of [...product.primaryCategoryIds, ...product.adjacentCategoryIds]) {
        if (categoryIds.has(categoryId)) categorySet.add(categoryId);
      }
    }
    pushNode({
      id: graphNodeId("vendor", vendor.id),
      kind: "vendor",
      catalogId: vendor.id,
      label: vendor.name,
      summary: vendor.positioning,
      detail: "This vendor record remains a research candidate. The graph does not promote it to a verified company or capability relationship.",
      href: `/vendors/${vendor.slug}`,
      externalUrl: null,
      recordStatus: vendor.verificationStatus === "research_candidate" ? "research_candidate" : null,
      categoryIds: [...categorySet].sort((left, right) => left.localeCompare(right)),
      domainIds: [],
      vendorId: vendor.id,
      publishedAt: null,
      observedAt: null,
      retrievedAt: null,
      lastCheckedAt: null,
    });
  }

  for (const persona of catalog.personas) {
    const linked = persona.categoryIds.filter((id) => categoryIds.has(id));
    if (linked.length === 0) continue;
    pushNode({
      id: graphNodeId("persona", persona.id),
      kind: "persona",
      catalogId: persona.id,
      label: persona.name,
      summary: `${persona.title}. ${persona.caresAbout}`,
      detail: "Buyer interest uses the persona record on main. Open persona PRs are not imported, and this schema has no source id, so the link stays a hypothesis.",
      href: null,
      externalUrl: null,
      recordStatus: null,
      categoryIds: linked,
      domainIds: [],
      vendorId: null,
      publishedAt: null,
      observedAt: null,
      retrievedAt: null,
      lastCheckedAt: null,
    });
  }

  const subjectNodeId = (claim: Pick<Claim, "subjectType" | "subjectId">): string | null => {
    if (claim.subjectType === "product" && includedProductIds.has(claim.subjectId)) return graphNodeId("product", claim.subjectId);
    if (claim.subjectType === "vendor" && includedVendorIds.has(claim.subjectId)) return graphNodeId("vendor", claim.subjectId);
    if (claim.subjectType === "category" && categoryIds.has(claim.subjectId) && categories.has(claim.subjectId)) {
      return graphNodeId("category", claim.subjectId);
    }
    if (claim.subjectType === "capability" && nodes.has(graphNodeId("capability", claim.subjectId))) {
      return graphNodeId("capability", claim.subjectId);
    }
    return null;
  };

  const includedClaims = catalog.claims.filter((claim) => subjectNodeId(claim) !== null);
  const includedClaimIds = new Set(includedClaims.map((claim) => claim.id));
  const referencedSourceIds = new Set<string>();
  for (const claim of includedClaims) referencedSourceIds.add(claim.sourceId);
  for (const relationship of sliceRelationships) {
    if (relationship.sourceId) referencedSourceIds.add(relationship.sourceId);
  }

  for (const sourceId of [...referencedSourceIds].sort((left, right) => left.localeCompare(right))) {
    const source = sources.get(sourceId);
    if (!source) {
      problems.push(`Referenced source ${sourceId} is not in the catalog`);
      continue;
    }
    pushNode({
      id: graphNodeId("source", source.id),
      kind: "source",
      catalogId: source.id,
      label: shortLabel(source.title),
      summary: `${source.publisher}. ${source.title}`,
      detail: null,
      href: "/sources",
      externalUrl: source.url,
      recordStatus: null,
      categoryIds: [],
      domainIds: [],
      vendorId: null,
      publishedAt: source.publishedAt,
      observedAt: null,
      retrievedAt: source.retrievedAt,
      lastCheckedAt: null,
    });
  }

  for (const claim of includedClaims) {
    const source = sources.get(claim.sourceId);
    pushNode({
      id: graphNodeId("claim", claim.id),
      kind: "claim",
      catalogId: claim.id,
      label: shortLabel(claim.statement),
      summary: claim.statement,
      detail: claim.notes,
      href: "/sources",
      externalUrl: source?.url ?? null,
      recordStatus: null,
      categoryIds: [],
      domainIds: [],
      vendorId: null,
      publishedAt: claim.publishedAt,
      observedAt: claim.observedAt,
      retrievedAt: source?.retrievedAt ?? null,
      lastCheckedAt: claim.lastCheckedAt,
    });
  }

  for (const category of includedCategories) {
    for (const domainId of category.domainIds) {
      if (!nodes.has(graphNodeId("domain", domainId))) continue;
      pushEdge({
        id: graphEdgeId({
          predicate: "in_domain",
          fromId: graphNodeId("category", category.id),
          toId: graphNodeId("domain", domainId),
          catalogRecordId: null,
        }),
        predicate: "in_domain",
        fromId: graphNodeId("category", category.id),
        toId: graphNodeId("domain", domainId),
        evidenceBasis: "taxonomy_mapping",
        assertsProductCapability: false,
        sourceIds: [],
        catalogRecordId: null,
        useCaseId: null,
        relationshipType: null,
        polarity: null,
        claimVerificationStatus: null,
        sourceType: null,
        subjectKind: null,
        capabilityId: null,
        rationale: TAXONOMY_NOTE,
        ...blankDates(),
      });
    }
    for (const adjacentId of category.adjacentCategoryIds) {
      if (!categoryIds.has(adjacentId) || !categories.has(adjacentId)) continue;
      pushEdge({
        id: graphEdgeId({
          predicate: "adjacent_to",
          fromId: graphNodeId("category", category.id),
          toId: graphNodeId("category", adjacentId),
          catalogRecordId: null,
        }),
        predicate: "adjacent_to",
        fromId: graphNodeId("category", category.id),
        toId: graphNodeId("category", adjacentId),
        evidenceBasis: "taxonomy_mapping",
        assertsProductCapability: false,
        sourceIds: [],
        catalogRecordId: null,
        useCaseId: null,
        relationshipType: null,
        polarity: null,
        claimVerificationStatus: null,
        sourceType: null,
        subjectKind: null,
        capabilityId: null,
        rationale: `${TAXONOMY_NOTE} Adjacency is not competition or feature parity.`,
        ...blankDates(),
      });
    }
  }

  for (const useCaseId of slice.useCaseIds) {
    const useCase = useCases.get(useCaseId);
    if (!useCase) continue;
    for (const categoryId of useCase.categoryIds) {
      if (!categoryIds.has(categoryId) || !nodes.has(graphNodeId("category", categoryId))) continue;
      pushEdge({
        id: graphEdgeId({
          predicate: "includes_category",
          fromId: graphNodeId("use_case", useCase.id),
          toId: graphNodeId("category", categoryId),
          catalogRecordId: null,
        }),
        predicate: "includes_category",
        fromId: graphNodeId("use_case", useCase.id),
        toId: graphNodeId("category", categoryId),
        evidenceBasis: "taxonomy_mapping",
        assertsProductCapability: false,
        sourceIds: [],
        catalogRecordId: null,
        useCaseId: useCase.id,
        relationshipType: null,
        polarity: null,
        claimVerificationStatus: null,
        sourceType: null,
        subjectKind: null,
        capabilityId: null,
        rationale: TAXONOMY_NOTE,
        ...blankDates(),
      });
    }
    for (const capabilityId of useCase.capabilityIds) {
      if (!capabilities.has(capabilityId)) {
        problems.push(`Use case ${useCase.id} capability ${capabilityId} is not in the catalog`);
        continue;
      }
      if (!nodes.has(graphNodeId("capability", capabilityId))) continue;
      pushEdge({
        id: graphEdgeId({
          predicate: "includes_capability",
          fromId: graphNodeId("use_case", useCase.id),
          toId: graphNodeId("capability", capabilityId),
          catalogRecordId: null,
        }),
        predicate: "includes_capability",
        fromId: graphNodeId("use_case", useCase.id),
        toId: graphNodeId("capability", capabilityId),
        evidenceBasis: "taxonomy_mapping",
        assertsProductCapability: false,
        sourceIds: [],
        catalogRecordId: null,
        useCaseId: useCase.id,
        relationshipType: null,
        polarity: null,
        claimVerificationStatus: null,
        sourceType: null,
        subjectKind: null,
        capabilityId,
        rationale: "The use case lists this capability. That list does not say a product implements it.",
        ...blankDates(),
      });
    }
  }

  for (const capability of catalog.capabilities) {
    if (!nodes.has(graphNodeId("capability", capability.id))) continue;
    if (!nodes.has(graphNodeId("category", capability.categoryId))) continue;
    pushEdge({
      id: graphEdgeId({
        predicate: "groups_capability",
        fromId: graphNodeId("category", capability.categoryId),
        toId: graphNodeId("capability", capability.id),
        catalogRecordId: null,
      }),
      predicate: "groups_capability",
      fromId: graphNodeId("category", capability.categoryId),
      toId: graphNodeId("capability", capability.id),
      evidenceBasis: "taxonomy_mapping",
      assertsProductCapability: false,
      sourceIds: [],
      catalogRecordId: null,
      useCaseId: null,
      relationshipType: null,
      polarity: null,
      claimVerificationStatus: null,
      sourceType: null,
      subjectKind: null,
      capabilityId: capability.id,
      rationale: TAXONOMY_NOTE,
      ...blankDates(),
    });
  }

  for (const productId of includedProductIds) {
    const product = products.get(productId);
    if (!product || !nodes.has(graphNodeId("product", product.id))) continue;
    if (nodes.has(graphNodeId("vendor", product.vendorId))) {
      pushEdge({
        id: graphEdgeId({
          predicate: "published_by",
          fromId: graphNodeId("product", product.id),
          toId: graphNodeId("vendor", product.vendorId),
          catalogRecordId: null,
        }),
        predicate: "published_by",
        fromId: graphNodeId("product", product.id),
        toId: graphNodeId("vendor", product.vendorId),
        evidenceBasis: "catalog_structure",
        assertsProductCapability: false,
        sourceIds: [],
        catalogRecordId: null,
        useCaseId: null,
        relationshipType: null,
        polarity: null,
        claimVerificationStatus: null,
        sourceType: null,
        subjectKind: null,
        capabilityId: null,
        rationale: STRUCTURE_NOTE,
        ...blankDates(),
      });
    }
    const linkCategory = (predicate: "primary_category" | "adjacent_category", categoryId: string) => {
      if (!categoryIds.has(categoryId) || !nodes.has(graphNodeId("category", categoryId))) return;
      pushEdge({
        id: graphEdgeId({
          predicate,
          fromId: graphNodeId("product", product.id),
          toId: graphNodeId("category", categoryId),
          catalogRecordId: null,
        }),
        predicate,
        fromId: graphNodeId("product", product.id),
        toId: graphNodeId("category", categoryId),
        evidenceBasis: "taxonomy_mapping",
        assertsProductCapability: false,
        sourceIds: [],
        catalogRecordId: null,
        useCaseId: null,
        relationshipType: null,
        polarity: null,
        claimVerificationStatus: null,
        sourceType: null,
        subjectKind: null,
        capabilityId: null,
        rationale: TAXONOMY_NOTE,
        ...blankDates(),
      });
    };
    for (const categoryId of product.primaryCategoryIds) linkCategory("primary_category", categoryId);
    for (const categoryId of product.adjacentCategoryIds) linkCategory("adjacent_category", categoryId);
    for (const useCaseId of product.useCaseIds) {
      if (!useCaseIds.has(useCaseId) || !nodes.has(graphNodeId("use_case", useCaseId))) continue;
      pushEdge({
        id: graphEdgeId({
          predicate: "listed_for_use_case",
          fromId: graphNodeId("product", product.id),
          toId: graphNodeId("use_case", useCaseId),
          catalogRecordId: null,
        }),
        predicate: "listed_for_use_case",
        fromId: graphNodeId("product", product.id),
        toId: graphNodeId("use_case", useCaseId),
        evidenceBasis: "taxonomy_mapping",
        assertsProductCapability: false,
        sourceIds: [],
        catalogRecordId: null,
        useCaseId,
        relationshipType: null,
        polarity: null,
        claimVerificationStatus: null,
        sourceType: null,
        subjectKind: null,
        capabilityId: null,
        rationale: "The catalog lists this product on the use case. A listing is not proof the product performs the job.",
        ...blankDates(),
      });
    }
  }

  for (const persona of catalog.personas) {
    if (!nodes.has(graphNodeId("persona", persona.id))) continue;
    for (const categoryId of persona.categoryIds) {
      if (!categoryIds.has(categoryId) || !nodes.has(graphNodeId("category", categoryId))) continue;
      pushEdge({
        id: graphEdgeId({
          predicate: "buyer_interest",
          fromId: graphNodeId("persona", persona.id),
          toId: graphNodeId("category", categoryId),
          catalogRecordId: null,
        }),
        predicate: "buyer_interest",
        fromId: graphNodeId("persona", persona.id),
        toId: graphNodeId("category", categoryId),
        evidenceBasis: "hypothesis",
        assertsProductCapability: false,
        sourceIds: [],
        catalogRecordId: null,
        useCaseId: null,
        relationshipType: null,
        polarity: null,
        claimVerificationStatus: null,
        sourceType: null,
        subjectKind: null,
        capabilityId: null,
        rationale: "The merged persona schema records interest without a source id. This stays a hypothesis and does not import unmerged persona profiles.",
        ...blankDates(),
      });
    }
  }

  const seenRelationshipIds = new Set<string>();
  for (const relationship of sliceRelationships) {
    if (seenRelationshipIds.has(relationship.id)) {
      problems.push(`Duplicate relationship id ${relationship.id}`);
      continue;
    }
    seenRelationshipIds.add(relationship.id);
    const fromId = graphNodeId("product", relationship.fromProductId);
    const toId = graphNodeId("product", relationship.toProductId);
    if (!nodes.has(fromId) || !nodes.has(toId)) continue;
    const source = relationship.sourceId ? sources.get(relationship.sourceId) : undefined;
    if (relationship.sourceId && !source) continue;
    const sourced = Boolean(relationship.sourceId && source);
    pushEdge({
      id: graphEdgeId({
        predicate: "compared_as",
        fromId,
        toId,
        catalogRecordId: relationship.id,
      }),
      predicate: "compared_as",
      fromId,
      toId,
      evidenceBasis: sourced ? "source_referenced" : "unknown",
      assertsProductCapability: false,
      sourceIds: sourced && relationship.sourceId ? [relationship.sourceId] : [],
      catalogRecordId: relationship.id,
      useCaseId: relationship.useCaseId,
      relationshipType: relationship.type,
      polarity: null,
      claimVerificationStatus: null,
      sourceType: source?.sourceType ?? null,
      subjectKind: null,
      capabilityId: null,
      rationale: relationship.rationale,
      publishedAt: source?.publishedAt ?? null,
      observedAt: null,
      retrievedAt: source?.retrievedAt ?? null,
      lastCheckedAt: null,
    });
  }

  for (const claim of includedClaims) {
    const subjectId = subjectNodeId(claim);
    const source = sources.get(claim.sourceId);
    if (!subjectId || !source || !nodes.has(graphNodeId("claim", claim.id))) continue;
    const basis = claimBasis(claim);
    const shared = {
      evidenceBasis: basis,
      sourceIds: [claim.sourceId],
      catalogRecordId: claim.id,
      useCaseId: null,
      relationshipType: null,
      polarity: claim.polarity,
      claimVerificationStatus: claim.verificationStatus,
      sourceType: claim.sourceType,
      subjectKind: claim.subjectType,
      capabilityId: claim.capabilityId,
      publishedAt: claim.publishedAt,
      observedAt: claim.observedAt,
      retrievedAt: source.retrievedAt,
      lastCheckedAt: claim.lastCheckedAt,
    } satisfies Partial<EvidenceEdge>;
    pushEdge({
      id: graphEdgeId({ predicate: "about", fromId: graphNodeId("claim", claim.id), toId: subjectId, catalogRecordId: claim.id }),
      predicate: "about",
      fromId: graphNodeId("claim", claim.id),
      toId: subjectId,
      assertsProductCapability: false,
      rationale: "This is the catalog statement about the subject. It does not, by itself, assert that a product implements a capability.",
      ...shared,
    });
    pushEdge({
      id: graphEdgeId({
        predicate: "cites",
        fromId: graphNodeId("claim", claim.id),
        toId: graphNodeId("source", claim.sourceId),
        catalogRecordId: claim.id,
      }),
      predicate: "cites",
      fromId: graphNodeId("claim", claim.id),
      toId: graphNodeId("source", claim.sourceId),
      assertsProductCapability: false,
      rationale: "The statement cites this source record. A citation is not independent verification unless the claim status already says verified.",
      ...shared,
      evidenceBasis: basis,
    });
    if (claim.capabilityId) {
      if (!capabilities.has(claim.capabilityId)) {
        problems.push(`Claim ${claim.id} capability ${claim.capabilityId} is not in the catalog`);
      } else if (nodes.has(graphNodeId("capability", claim.capabilityId))) {
        pushEdge({
          id: graphEdgeId({
            predicate: "concerns_capability",
            fromId: graphNodeId("claim", claim.id),
            toId: graphNodeId("capability", claim.capabilityId),
            catalogRecordId: claim.id,
          }),
          predicate: "concerns_capability",
          fromId: graphNodeId("claim", claim.id),
          toId: graphNodeId("capability", claim.capabilityId),
          assertsProductCapability: claimAssertsVerifiedProductCapability(claim),
          rationale: claimAssertsVerifiedProductCapability(claim)
            ? "A verified standard source asserts this product capability. Category membership was not used."
            : "The statement names a capability, but the catalog does not treat it as an independently verified product capability.",
          ...shared,
        });
      }
    }
  }

  const conflictPairs = new Set<string>();
  for (const claim of includedClaims) {
    for (const otherId of claim.conflictsWith) {
      if (!claims.has(otherId)) {
        problems.push(`Claim ${claim.id} conflict ${otherId} is not in the catalog`);
        continue;
      }
      if (!includedClaimIds.has(otherId)) continue;
      const pair = [claim.id, otherId].sort((left, right) => left.localeCompare(right)).join("|");
      if (conflictPairs.has(pair)) continue;
      conflictPairs.add(pair);
      const [left, right] = pair.split("|");
      if (!left || !right) continue;
      pushEdge({
        id: graphEdgeId({
          predicate: "conflicts_with",
          fromId: graphNodeId("claim", left),
          toId: graphNodeId("claim", right),
          catalogRecordId: null,
        }),
        predicate: "conflicts_with",
        fromId: graphNodeId("claim", left),
        toId: graphNodeId("claim", right),
        evidenceBasis: "disputed",
        assertsProductCapability: false,
        sourceIds: [],
        catalogRecordId: null,
        useCaseId: null,
        relationshipType: null,
        polarity: null,
        claimVerificationStatus: "conflicting",
        sourceType: null,
        subjectKind: null,
        capabilityId: null,
        rationale: "Both claims record this conflict. The graph does not pick a winner.",
        ...blankDates(),
      });
    }
  }

  const categoriesNotExpanded = includedCategories.flatMap((category) =>
    category.adjacentCategoryIds
      .filter((adjacentId) => !categoryIds.has(adjacentId))
      .map((categoryId) => ({ fromCategoryId: category.id, categoryId })),
  ).sort((left, right) => `${left.fromCategoryId}:${left.categoryId}`.localeCompare(`${right.fromCategoryId}:${right.categoryId}`));

  const omittedCounts = new Map<string, number>();
  for (const product of catalog.products) {
    if (includedProductIds.has(product.id)) continue;
    for (const categoryId of product.primaryCategoryIds) {
      if (!categoryIds.has(categoryId)) continue;
      omittedCounts.set(categoryId, (omittedCounts.get(categoryId) ?? 0) + 1);
    }
  }

  const draft: EvidenceGraph = {
    contractVersion: EVIDENCE_GRAPH_VERSION,
    sliceId: slice.id,
    title: slice.title,
    catalogAsOf: catalog.asOf,
    projectionNotes: [
      "Nodes and edges reuse catalog ids. This projection does not create a second fact store.",
      "Taxonomy mappings and buyer-interest hypotheses are not product capabilities.",
      "A comparison without a source stays Unknown. A source on a comparison does not make it independently verified.",
      "Vendor records stay research candidates. Open persona PRs #123 and #148 are not imported.",
      "Products that only carry a category tag are counted as omissions. Omission is not a finding that the product lacks a capability.",
    ],
    nodes: [...nodes.values()].sort((left, right) => left.id.localeCompare(right.id)),
    edges: [...edges.values()].sort((left, right) => left.id.localeCompare(right.id)),
    omissions: {
      statement: "Omission is a projection bound. It is not evidence that a product lacks a capability or that two tools compete.",
      primaryProductsNotProjected: [...omittedCounts.entries()]
        .map(([categoryId, count]) => ({ categoryId, count }))
        .sort((left, right) => left.categoryId.localeCompare(right.categoryId)),
      categoriesNotExpanded,
      relationshipsOutsideSlice,
    },
    limits: { ...EXPANSION_LIMITS },
  };

  const parsed = evidenceGraphSchema.safeParse(draft);
  if (!parsed.success) {
    problems.push(parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; "));
    return { graph: draft, problems };
  }
  return { graph: parsed.data, problems: [...problems, ...evidenceGraphProblems(parsed.data)] };
}

export function expandEvidenceGraph(graph: EvidenceGraph, input: {
  rootId: string;
  depth: number;
  nodeLimit: number;
  edgeLimit: number;
}): EvidenceGraphExpansion {
  if (!graph.nodes.some((node) => node.id === input.rootId)) {
    throw new EvidenceGraphQueryError(`Unknown node: ${input.rootId}`);
  }
  if (!Number.isInteger(input.depth) || input.depth < 0 || input.depth > EXPANSION_LIMITS.maxDepth) {
    throw new EvidenceGraphQueryError(`depth must be an integer from 0 to ${EXPANSION_LIMITS.maxDepth}`);
  }
  if (!Number.isInteger(input.nodeLimit) || input.nodeLimit < 1 || input.nodeLimit > EXPANSION_LIMITS.maxNodeLimit) {
    throw new EvidenceGraphQueryError(`nodeLimit must be an integer from 1 to ${EXPANSION_LIMITS.maxNodeLimit}`);
  }
  if (!Number.isInteger(input.edgeLimit) || input.edgeLimit < 1 || input.edgeLimit > EXPANSION_LIMITS.maxEdgeLimit) {
    throw new EvidenceGraphQueryError(`edgeLimit must be an integer from 1 to ${EXPANSION_LIMITS.maxEdgeLimit}`);
  }

  const nodeById = new Map(graph.nodes.map((node) => [node.id, node]));
  const incident = new Map<string, EvidenceEdge[]>();
  for (const edge of graph.edges) {
    for (const endpoint of [edge.fromId, edge.toId]) {
      const list = incident.get(endpoint) ?? [];
      list.push(edge);
      incident.set(endpoint, list);
    }
  }
  for (const list of incident.values()) list.sort((left, right) => left.id.localeCompare(right.id));

  const keptNodes = new Map<string, GraphNode>([[input.rootId, nodeById.get(input.rootId)!]]);
  const keptEdges = new Map<string, EvidenceEdge>();
  const reasons = new Set<string>();
  const queue: { id: string; depth: number }[] = [{ id: input.rootId, depth: 0 }];
  const queued = new Set<string>([input.rootId]);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || current.depth >= input.depth) continue;
    for (const edge of incident.get(current.id) ?? []) {
      const nextId = edge.fromId === current.id ? edge.toId : edge.fromId;
      const next = nodeById.get(nextId);
      if (!next) {
        reasons.add("missing_endpoint");
        continue;
      }
      const needsNode = !keptNodes.has(nextId);
      const needsEdge = !keptEdges.has(edge.id);
      if (needsNode && keptNodes.size >= input.nodeLimit) {
        reasons.add("node_limit");
        continue;
      }
      if (needsEdge && keptEdges.size >= input.edgeLimit) {
        reasons.add("edge_limit");
        continue;
      }
      if (needsNode) keptNodes.set(nextId, next);
      if (needsEdge) keptEdges.set(edge.id, edge);
      if (!queued.has(nextId)) {
        queued.add(nextId);
        queue.push({ id: nextId, depth: current.depth + 1 });
      }
    }
  }

  return {
    contractVersion: EVIDENCE_GRAPH_VERSION,
    sliceId: graph.sliceId,
    mode: "expansion",
    rootId: input.rootId,
    depth: input.depth,
    nodeLimit: input.nodeLimit,
    edgeLimit: input.edgeLimit,
    truncated: reasons.size > 0,
    reasons: [...reasons].sort((left, right) => left.localeCompare(right)),
    nodes: [...keptNodes.values()].sort((left, right) => left.id.localeCompare(right.id)),
    edges: [...keptEdges.values()].sort((left, right) => left.id.localeCompare(right.id)),
  };
}
