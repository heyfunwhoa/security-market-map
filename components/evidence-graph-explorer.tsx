"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { StatusPill } from "@/components/chrome";
import { EvidenceGraphCanvas } from "@/components/evidence-graph-canvas";
import {
  evidenceBasisLabels,
  nodeKindLabels,
  predicateLabels,
  type EvidenceEdge,
  type EvidenceGraph,
  type GraphNode,
} from "@/lib/evidence-graph/contract";
import { diagramNodes, edgesAmong, filterGraphNodes, incidentEdges } from "@/lib/evidence-graph/view";
import { formatDate, relationshipLabel } from "@/lib/format";

function otherId(edge: EvidenceEdge, nodeId: string): string {
  return edge.fromId === nodeId ? edge.toId : edge.fromId;
}

export function EvidenceGraphExplorer({
  graph,
  initialCategoryId,
  initialNodeId,
}: {
  graph: EvidenceGraph;
  initialCategoryId?: string;
  initialNodeId?: string;
}) {
  const categories = graph.nodes.filter((node) => node.kind === "category").sort((left, right) => left.label.localeCompare(right.label));
  const firstCategory = graph.nodes.find((node) => node.kind === "category");
  const [categoryId, setCategoryId] = useState(initialCategoryId ?? firstCategory?.catalogId ?? "all");
  const [search, setSearch] = useState("");
  const [includeEvidenceNodes, setIncludeEvidenceNodes] = useState(false);
  const [selectedId, setSelectedId] = useState(initialNodeId ?? firstCategory?.id ?? "");
  const nodes = useMemo(
    () => filterGraphNodes(graph, { categoryId, search, includeEvidenceNodes, selectedId }),
    [graph, categoryId, search, includeEvidenceNodes, selectedId],
  );
  const selected = graph.nodes.find((node) => node.id === selectedId) ?? nodes[0];
  const activeId = selected?.id ?? "";
  const drawn = diagramNodes(nodes, categoryId, activeId);
  const activeCategory = categories.find((category) => category.catalogId === categoryId);
  const drawnEdges = edgesAmong(graph, drawn.nodes);
  const relationships = selected ? incidentEdges(graph, selected.id) : [];
  const verifiedCapabilityCount = graph.edges.filter((edge) => edge.assertsProductCapability).length;
  const unknownCount = graph.edges.filter((edge) => edge.evidenceBasis === "unknown").length;
  const nodeById = useMemo(() => new Map(graph.nodes.map((node) => [node.id, node])), [graph.nodes]);

  const chooseCategory = (next: string) => {
    setCategoryId(next);
    if (next !== "all") setSelectedId(`category:${next}`);
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = nodes.findIndex((node) => node.id === activeId);
    const nextIndex = event.key === "ArrowDown"
      ? Math.min(nodes.length - 1, Math.max(0, index) + 1)
      : event.key === "ArrowUp"
        ? Math.max(0, index - 1)
        : event.key === "Home"
          ? 0
          : nodes.length - 1;
    const next = nodes[nextIndex];
    if (!next) return;
    setSelectedId(next.id);
    document.getElementById(`graph-node-${next.id}`)?.focus();
  };

  return (
    <div className="mt-8">
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm leading-6">
          Independently verified product capabilities in this slice: {verifiedCapabilityCount}. Unknown comparisons: {unknownCount}. A research candidate is not a verified relationship.
        </p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 sm:grid-cols-2">
          <li>Solid line: taxonomy mapping or catalog structure.</li>
          <li>Dashed line: Unknown or hypothesis.</li>
          <li>Dotted line: source referenced, vendor reported, or needs review.</li>
          <li>Verified capability label: only an independently verified product capability. This slice currently has {verifiedCapabilityCount}.</li>
        </ul>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <label className="block text-sm font-medium" htmlFor="graph-search">Search nodes</label>
        <input
          id="graph-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Name, id, or summary"
          className="min-h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        <fieldset>
          <legend className="text-sm font-medium">Category</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" aria-pressed={categoryId === "all"} className={`min-h-11 rounded-full border border-border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${categoryId === "all" ? "bg-muted font-semibold" : ""}`} onClick={() => chooseCategory("all")}>All in this slice</button>
            {categories.map((category) => (
              <button key={category.id} type="button" aria-pressed={categoryId === category.catalogId} className={`min-h-11 rounded-full border border-border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${categoryId === category.catalogId ? "bg-muted font-semibold" : ""}`} onClick={() => chooseCategory(category.catalogId)}>
                {category.label}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="text-sm leading-6 text-muted-foreground">
          {categoryId === "all"
            ? "Showing every record in this slice. The diagram keeps a bounded sample, and the lists carry the rest."
            : `Showing ${activeCategory?.label ?? "this category"}. Choose All in this slice for the wider neighborhood.`}
        </p>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeEvidenceNodes}
            onChange={(event) => setIncludeEvidenceNodes(event.target.checked)}
            className="size-4 accent-primary"
          />
          Show claims and sources for the selected node
        </label>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted-foreground md:hidden">
        On a narrow screen the diagram is hidden. Use the node list, category filters, evidence panel, and relationship list. They carry the same records.
      </p>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[18rem_minmax(0,1fr)_22rem]">
        <div>
          <h2 id="graph-nodes" tabIndex={-1} className="scroll-mt-24 text-lg">Nodes</h2>
          <p className="text-sm text-muted-foreground">{nodes.length} shown{search.trim() ? ` for “${search.trim()}”` : ""}.</p>
          {nodes.length === 0 ? <p className="mt-3 text-sm">No nodes match this search.</p> : (
            <div role="listbox" aria-label="Nodes in this graph" aria-activedescendant={activeId ? `graph-node-${activeId}` : undefined} onKeyDown={onListKeyDown} className="mt-2 max-h-[32rem] space-y-1 overflow-y-auto rounded-xl border border-border p-2">
              {nodes.map((node) => (
                <button
                  key={node.id}
                  id={`graph-node-${node.id}`}
                  type="button"
                  role="option"
                  aria-selected={node.id === activeId}
                  tabIndex={node.id === activeId ? 0 : -1}
                  onClick={() => setSelectedId(node.id)}
                  className={`block min-h-11 w-full rounded-lg px-2 py-2 text-left hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${node.id === activeId ? "bg-muted" : ""}`}
                >
                  <span className="block text-sm font-medium">{node.label}</span>
                  <span className="block text-xs text-muted-foreground">{nodeKindLabels[node.kind]} · {node.catalogId}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="hidden text-lg md:block">Diagram</h2>
          <EvidenceGraphCanvas nodes={drawn.nodes} edges={drawnEdges} selectedId={activeId} onSelect={setSelectedId} />
          {drawn.truncated ? <p className="mt-2 hidden text-sm leading-6 text-muted-foreground md:block">The diagram shows {drawn.nodes.length} categories, use cases, and products in stable order. Domains, vendors, personas, claims, and any records past this sample stay in the lists.</p> : null}
        </div>

        <EvidencePanel graph={graph} node={selected} relationships={relationships} nodeById={nodeById} />
      </div>

      <section className="mt-6" aria-labelledby="graph-relationships">
        <h2 id="graph-relationships" tabIndex={-1} className="scroll-mt-24 text-lg">Relationships</h2>
        <p className="text-sm leading-6 text-muted-foreground">Choose a relationship to select the record at the other end. This list is available without the diagram.</p>
        {relationships.length === 0 ? <p className="mt-3 text-sm">No relationships are stored for this record.</p> : (
          <ul aria-label={selected ? `Relationships for ${selected.label}` : "Relationships"} className="mt-3 space-y-2">
            {relationships.map((edge) => {
              const other = nodeById.get(otherId(edge, activeId));
              return (
                <li key={edge.id}>
                  <button type="button" onClick={() => other && setSelectedId(other.id)} className="block min-h-11 w-full rounded-xl border border-border bg-card p-3 text-left hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{predicateLabels[edge.predicate]}{edge.relationshipType ? ` · ${relationshipLabel(edge.relationshipType)}` : ""}</span>
                      <StatusPill status={edge.evidenceBasis} />
                      {edge.assertsProductCapability ? <StatusPill status="independently_verified" /> : null}
                    </span>
                    <span className="mt-1 block text-sm">Other record: {other?.label ?? "Missing record"}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{edge.assertsProductCapability ? "Independently verified product capability." : "Does not assert a product capability."}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{edge.rationale}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Sources: {edge.sourceIds.length === 0 ? "none" : edge.sourceIds.join(", ")}.
                      {" "}Last checked: {formatDate(edge.lastCheckedAt)}. Observed: {formatDate(edge.observedAt)}. Published: {formatDate(edge.publishedAt)}. Retrieved: {formatDate(edge.retrievedAt)}.
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function EvidencePanel({
  graph,
  node,
  relationships,
  nodeById,
}: {
  graph: EvidenceGraph;
  node: GraphNode | undefined;
  relationships: EvidenceEdge[];
  nodeById: Map<string, GraphNode>;
}) {
  if (!node) return <p className="text-sm">No record is selected.</p>;
  const sources = [...new Set(relationships.flatMap((edge) => edge.sourceIds))]
    .map((id) => nodeById.get(`source:${id}`))
    .filter((item): item is GraphNode => Boolean(item));
  const omission = graph.omissions.primaryProductsNotProjected.find((item) => item.categoryId === node.catalogId);
  return (
    <section id="graph-evidence" aria-live="polite" className="rounded-xl border border-border bg-card p-4">
      <h2 className="text-lg">Evidence</h2>
      <p className="mt-2 font-heading text-2xl tracking-tight">{node.label}</p>
      <p className="mt-1 text-sm text-muted-foreground">{nodeKindLabels[node.kind]} · {node.catalogId}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {node.recordStatus ? <StatusPill status={node.recordStatus} /> : null}
      </div>
      <p className="mt-3 text-sm leading-6">{node.summary}</p>
      {node.detail ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{node.detail}</p> : null}
      <p className="mt-3 text-sm leading-6">Taxonomy mappings, hypotheses, unknown comparisons, and vendor-reported statements are not independently verified product capabilities.</p>
      {node.kind === "vendor" ? <p className="mt-2 text-sm leading-6">Catalog status stays research candidate. This graph does not turn that into a verified relationship.</p> : null}
      {omission ? <p className="mt-2 text-sm leading-6">{omission.count} other primary products in this category stay out of the graph. That omission is not a capability finding.</p> : null}
      <dl className="mt-3 space-y-1 text-sm">
        <div><dt className="inline">Catalog as of </dt><dd className="inline">{formatDate(graph.catalogAsOf)}</dd></div>
        <div><dt className="inline">Published </dt><dd className="inline">{formatDate(node.publishedAt)}</dd></div>
        <div><dt className="inline">Observed </dt><dd className="inline">{formatDate(node.observedAt)}</dd></div>
        <div><dt className="inline">Retrieved </dt><dd className="inline">{formatDate(node.retrievedAt)}</dd></div>
        <div><dt className="inline">Last checked </dt><dd className="inline">{formatDate(node.lastCheckedAt)}</dd></div>
      </dl>
      {sources.length > 0 ? (
        <ul className="mt-3 space-y-2 text-sm" aria-label="Sources for this record">
          {sources.slice(0, 6).map((source) => (
            <li key={source.id}>
              <span className="block">{source.summary}</span>
              <span className="text-muted-foreground">Retrieved {formatDate(source.retrievedAt)}. Published {formatDate(source.publishedAt)}.</span>
              {source.externalUrl ? <a className="mt-1 block text-primary underline underline-offset-4" href={source.externalUrl} rel="noreferrer">Open source</a> : null}
            </li>
          ))}
        </ul>
      ) : <p className="mt-3 text-sm">No source is attached to the relationships on this record.</p>}
      {sources.length > 6 ? <p className="mt-2 text-sm text-muted-foreground">{sources.length - 6} more sources are named on the relationship list.</p> : null}
      <p className="mt-3 text-sm">Basis labels in the relationship list use the words {evidenceBasisLabels.unknown}, {evidenceBasisLabels.hypothesis}, and {evidenceBasisLabels.taxonomy_mapping}.</p>
      {node.href ? <Link href={node.href} className="mt-3 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">Open detail</Link> : <p className="mt-3 text-sm text-muted-foreground">No separate detail page is published for this record.</p>}
    </section>
  );
}
