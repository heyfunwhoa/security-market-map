#!/usr/bin/env node
// Read-only MCP server over the generated context export (context/). No dependencies, no network,
// no write tools. Speaks MCP over stdio (newline-delimited JSON-RPC 2.0).
//
//   npm run context:md      # regenerate context/ from typed data first
//   npm run context:mcp     # or: node scripts/context-mcp-server.mjs
//
// Claude Code / Claude Desktop config:
//   { "mcpServers": { "security-market-map": { "command": "node", "args": ["<repo>/scripts/context-mcp-server.mjs"] } } }
import { existsSync, readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTEXT = join(ROOT, "context");
const PROTOCOL = "2025-06-18";

const load = (name) => JSON.parse(readFileSync(join(CONTEXT, name), "utf8"));
const index = load("index.json");
const gaps = load("gaps.json");

const STOP = new Set(["the", "a", "an", "and", "or", "of", "for", "to", "in", "on", "with", "our", "my", "is", "are"]);
const stem = (w) => w.replace(/(ings?|ed|es|s)$/, "").replace(/(.)\1$/, "$1");
const terms = (t) => t.toLowerCase().split(/[^a-z0-9]+/).filter((x) => x.length > 1 && !STOP.has(x)).map(stem);
const safeId = (id) => typeof id === "string" && /^[a-z0-9-]+$/.test(id);

const TOOLS = [
  {
    name: "search_context",
    description:
      "Keyword search over seats, pains, objections, qualification questions, categories and alternatives. Each hit has its evidence label (hypothesis unless sourced or field validated) and the file to read for detail.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "What to look for, e.g. 'leaked secrets' or 'CISO budget'" },
        types: { type: "array", items: { type: "string", enum: ["seat", "pain", "objection", "question", "category", "alternative"] } },
        limit: { type: "number", minimum: 1, maximum: 25 },
      },
      required: ["query"],
    },
  },
  {
    name: "get_seat",
    description: "Full buyer-seat profile as markdown: titles, owned categories, pains with sources, objections, qualification questions, triggers.",
    inputSchema: { type: "object", properties: { id: { type: "string", description: "Seat id, e.g. appsec, ciso, cloud-sec" } }, required: ["id"] },
  },
  {
    name: "get_category",
    description: "Category profile as markdown: definition, buyer question, owning seats, vendors (vendor-reported), alternatives, objections, triggers.",
    inputSchema: { type: "object", properties: { id: { type: "string", description: "Category id, e.g. secrets-detection" } }, required: ["id"] },
  },
  {
    name: "list_gaps",
    description: "Known gaps in the library (missing alternatives, unsourced pains, categories without vendors, contested ownership).",
    inputSchema: { type: "object", properties: { kind: { type: "string" } } },
  },
];

function search({ query, types, limit = 10 }) {
  const wanted = terms(String(query ?? ""));
  if (wanted.length === 0) return [];
  const hits = [];
  for (const entry of index) {
    if (Array.isArray(types) && types.length && !types.includes(entry.type)) continue;
    const hay = terms(`${entry.title} ${entry.text} ${entry.id}`);
    const set = new Set(hay);
    const matched = wanted.filter((t) => set.has(t) || hay.some((w) => w.startsWith(t) && t.length >= 4)).length;
    if (!matched) continue;
    hits.push({ ...entry, score: matched / wanted.length + (entry.title.toLowerCase().includes(String(query).toLowerCase()) ? 1 : 0) });
  }
  hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return hits.slice(0, Math.min(Number(limit) || 10, 25)).map((hit) => ({ id: hit.id, type: hit.type, title: hit.title, file: hit.file, evidence: hit.evidence, score: Math.round(hit.score * 100) / 100 }));
}

function readDoc(dir, id) {
  if (!safeId(id)) throw new Error("id must be lowercase letters, digits and dashes");
  const path = join(CONTEXT, dir, `${id}.md`);
  if (!existsSync(path)) throw new Error(`No ${dir === "seats" ? "seat" : "category"} with id ${id}`);
  return readFileSync(path, "utf8");
}

function callTool(name, args = {}) {
  if (name === "search_context") return JSON.stringify(search(args), null, 2);
  if (name === "get_seat") return readDoc("seats", args.id);
  if (name === "get_category") return readDoc("categories", args.id);
  if (name === "list_gaps") return JSON.stringify(args.kind ? gaps.filter((g) => g.kind === args.kind) : gaps, null, 2);
  throw new Error(`Unknown tool ${name}`);
}

function handle(msg) {
  const { id, method, params } = msg;
  if (method === "initialize") {
    return { jsonrpc: "2.0", id, result: { protocolVersion: params?.protocolVersion ?? PROTOCOL, capabilities: { tools: {} }, serverInfo: { name: "security-market-map-context", version: "1.0.0" } } };
  }
  if (method === "tools/list") return { jsonrpc: "2.0", id, result: { tools: TOOLS } };
  if (method === "tools/call") {
    try {
      return { jsonrpc: "2.0", id, result: { content: [{ type: "text", text: callTool(params?.name, params?.arguments) }] } };
    } catch (error) {
      return { jsonrpc: "2.0", id, result: { content: [{ type: "text", text: String(error.message ?? error) }], isError: true } };
    }
  }
  if (method === "ping") return { jsonrpc: "2.0", id, result: {} };
  if (id === undefined) return null; // notification
  return { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } };
}

createInterface({ input: process.stdin }).on("line", (line) => {
  if (!line.trim()) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } })}\n`);
    return;
  }
  const reply = handle(msg);
  if (reply) process.stdout.write(`${JSON.stringify(reply)}\n`);
});
