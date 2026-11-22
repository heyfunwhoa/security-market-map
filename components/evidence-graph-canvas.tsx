"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Core, StylesheetStyle } from "cytoscape";
import type { EvidenceEdge, GraphNode } from "@/lib/evidence-graph/contract";
import { layoutPosition } from "@/lib/evidence-graph/view";

/**
 * Resolve a design token to an rgb() string cytoscape can parse. The browser paints one pixel with
 * the token, so any CSS colour syntax works (the production build ships hex/lab()/oklch() variants).
 */
function tokenColor(element: Element, token: string, fallback: string): string {
  const value = getComputedStyle(element).getPropertyValue(`--${token}`).trim();
  const context = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!value || !context) return fallback;
  context.fillStyle = fallback;
  context.fillStyle = value;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  return `rgb(${r}, ${g}, ${b})`;
}

const SHAPE: Record<GraphNode["kind"], string> = {
  domain: "round-rectangle",
  category: "ellipse",
  use_case: "diamond",
  capability: "hexagon",
  product: "round-rectangle",
  vendor: "rectangle",
  persona: "tag",
  claim: "ellipse",
  source: "rectangle",
  pain: "triangle",
  objection: "vee",
  alternative: "barrel",
  trigger: "star",
  segment: "octagon",
  question: "round-diamond",
};

export function EvidenceGraphCanvas({
  nodes,
  edges,
  selectedId,
  onSelect,
}: {
  nodes: GraphNode[];
  edges: EvidenceEdge[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const onSelectRef = useRef(onSelect);
  const [ready, setReady] = useState(false);
  const [themeVersion, setThemeVersion] = useState(0);
  const descriptionId = useId();
  const signature = `${nodes.map((node) => node.id).join("|")}::${edges.map((edge) => edge.id).join("|")}::${selectedId}`;

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // Redraw with the other palette when the operating-system theme changes.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const redraw = () => setThemeVersion((version) => version + 1);
    query.addEventListener("change", redraw);
    return () => query.removeEventListener("change", redraw);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || nodes.length === 0) return;
    let destroyed = false;
    let cy: Core | null = null;
    const positions = layoutPosition(nodes);
    const palette = {
      label: tokenColor(container, "foreground", "#3f342c"),
      node: tokenColor(container, "card", "#f4efe4"),
      nodeBorder: tokenColor(container, "muted-foreground", "#5c5348"),
      selectedBorder: tokenColor(container, "primary", "#243246"),
      selectedNode: tokenColor(container, "accent", "#d9e4df"),
      edge: tokenColor(container, "muted-foreground", "#6d645a"),
      edgeLabel: tokenColor(container, "accent-foreground", "#1f3d32"),
    };
    void import("cytoscape").then(({ default: cytoscape }) => {
      if (destroyed || !containerRef.current) return;
      cy = cytoscape({
        container,
        minZoom: 0.2,
        maxZoom: 2.5,
        userZoomingEnabled: false,
        boxSelectionEnabled: false,
        elements: [
          ...nodes.map((node) => ({
            data: { id: node.id, label: node.label, shape: SHAPE[node.kind] },
            position: positions.get(node.id),
            classes: node.id === selectedId ? "is-selected" : "",
          })),
          ...edges.map((edge) => ({
            data: {
              id: edge.id,
              source: edge.fromId,
              target: edge.toId,
              basis: edge.evidenceBasis,
              capability: edge.assertsProductCapability ? "yes" : "no",
            },
          })),
        ],
        layout: { name: "preset", fit: false, animate: false },
        style: [
          {
            selector: "node",
            style: {
              label: "data(label)",
              shape: "data(shape)",
              "font-size": 11,
              "text-wrap": "wrap",
              "text-max-width": "140px",
              "text-valign": "bottom",
              "text-halign": "center",
              "text-margin-y": 8,
              color: palette.label,
              "background-color": palette.node,
              "border-width": 2,
              "border-color": palette.nodeBorder,
              width: 28,
              height: 28,
            },
          },
          {
            selector: "node.is-selected",
            style: { "border-width": 4, "border-color": palette.selectedBorder, "background-color": palette.selectedNode },
          },
          {
            selector: "edge",
            style: {
              width: 1.5,
              "line-color": palette.edge,
              "target-arrow-color": palette.edge,
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
              "line-style": "solid",
            },
          },
          {
            selector: 'edge[basis = "unknown"], edge[basis = "hypothesis"]',
            style: { "line-style": "dashed", width: 2 },
          },
          {
            selector: 'edge[basis = "source_referenced"], edge[basis = "vendor_reported"], edge[basis = "needs_review"]',
            style: { "line-style": "dotted", width: 2 },
          },
          {
            selector: 'edge[capability = "yes"]',
            style: { label: "Verified capability", "font-size": 9, width: 3, "line-style": "solid", color: palette.edgeLabel },
          },
        ] as StylesheetStyle[],
      });
      cy.on("tap", "node", (event) => {
        onSelectRef.current(event.target.id());
      });
      cy.fit(undefined, 24);
      if (cy.zoom() > 1) {
        cy.zoom(1);
        cy.center();
      }
      cyRef.current = cy;
      setReady(true);
    });
    return () => {
      destroyed = true;
      cy?.destroy();
      cyRef.current = null;
      setReady(false);
    };
  }, [signature, nodes, edges, selectedId, themeVersion]);

  const zoomBy = (factor: number) => {
    const cy = cyRef.current;
    if (!cy) return;
    const level = Math.min(2.5, Math.max(0.2, cy.zoom() * factor));
    cy.zoom({ level, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
  };

  return (
    <div className="hidden md:block">
      <div className="mb-2 flex flex-wrap gap-2">
        <button type="button" className="min-h-11 rounded-md border border-border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" onClick={() => zoomBy(1.25)} disabled={!ready}>Zoom in</button>
        <button type="button" className="min-h-11 rounded-md border border-border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" onClick={() => zoomBy(0.8)} disabled={!ready}>Zoom out</button>
        <button type="button" className="min-h-11 rounded-md border border-border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" onClick={() => cyRef.current?.fit(undefined, 16)} disabled={!ready}>Fit</button>
      </div>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="h-[28rem] w-full overflow-hidden rounded-xl border border-border bg-card motion-reduce:transition-none"
      />
      <p id={descriptionId} className="mt-2 text-sm leading-6 text-muted-foreground">
        The diagram repeats the node and relationship lists. Shape distinguishes the kind of record. A dashed line is Unknown or a hypothesis, a dotted line cites a source or vendor report, and a solid line is taxonomy or catalog structure. Position is not rank, spend, or evidence strength. The layout does not animate.
      </p>
    </div>
  );
}
