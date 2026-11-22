/** Writes the reviewed incident feed as a STIX 2.1 bundle. Usage: npm run export:stix [-- out.json] */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { SeedIncident, SeedSource } from "../lib/stix-export";

// Node's type stripping needs the .ts extension at runtime; tsc type-checks via the type-only import above.
const { toStixBundle }: typeof import("../lib/stix-export") = await import("../lib/stix-export" + ".ts");

const dir = join(process.cwd(), "data/security-intelligence");
const read = <T>(file: string) => JSON.parse(readFileSync(join(dir, file), "utf8")) as T;
const bundle = toStixBundle(
  read<SeedIncident[]>("incidents.seed.json"),
  read<SeedSource[]>("sources.seed.json"),
  read<{ createdOn: Record<string, string> }>("stix-created-on.json").createdOn,
);
const out = process.argv[2] ?? "security-incidents.stix.json";
writeFileSync(out, JSON.stringify(bundle, null, 2) + "\n");
console.log(`Wrote ${bundle.objects.length - 3} incidents to ${out}`);
