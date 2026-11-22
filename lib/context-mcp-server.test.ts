import { spawn } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const SERVER = join(__dirname, "..", "scripts", "context-mcp-server.mjs");

type Reply = { id?: number; result?: { serverInfo?: { name: string }; tools?: { name: string }[]; content?: { text: string }[]; isError?: boolean } };

function session(messages: { id?: number; [key: string]: unknown }[]): Promise<Reply[]> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [SERVER], { stdio: ["pipe", "pipe", "inherit"] });
    let out = "";
    child.stdout.on("data", (chunk) => {
      out += chunk;
      const lines = out.trim().split("\n").filter(Boolean);
      if (lines.length >= messages.filter((m) => m.id !== undefined).length) {
        child.kill();
        resolve(lines.map((line) => JSON.parse(line) as Reply));
      }
    });
    child.on("error", reject);
    for (const message of messages) child.stdin.write(`${JSON.stringify(message)}\n`);
  });
}

describe("read-only context MCP server", () => {
  it("lists four read-only tools and answers each one", async () => {
    const replies = await session([
      { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18" } },
      { jsonrpc: "2.0", method: "notifications/initialized" },
      { jsonrpc: "2.0", id: 2, method: "tools/list" },
      { jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "search_context", arguments: { query: "leaked secrets", limit: 3 } } },
      { jsonrpc: "2.0", id: 4, method: "tools/call", params: { name: "get_seat", arguments: { id: "appsec" } } },
      { jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "get_category", arguments: { id: "secrets-detection" } } },
      { jsonrpc: "2.0", id: 6, method: "tools/call", params: { name: "list_gaps", arguments: { kind: "category-no-vendors" } } },
      { jsonrpc: "2.0", id: 7, method: "tools/call", params: { name: "get_seat", arguments: { id: "../package" } } },
    ]);
    const byId = new Map(replies.map((reply) => [reply.id, reply]));
    expect(byId.get(1)?.result?.serverInfo?.name).toBe("security-market-map-context");
    expect(byId.get(2)?.result?.tools?.map((tool) => tool.name)).toEqual(["search_context", "get_seat", "get_category", "list_gaps"]);
    const hits = JSON.parse(byId.get(3)?.result?.content?.[0].text ?? "");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0]).toHaveProperty("file");
    expect(byId.get(4)?.result?.content?.[0].text ?? "").toContain("# AppSec lead");
    expect(byId.get(5)?.result?.content?.[0].text ?? "").toContain("# Secrets detection");
    expect(JSON.parse(byId.get(6)?.result?.content?.[0].text ?? "")).toEqual([]);
    expect(byId.get(7)?.result?.isError).toBe(true);
  });
});
