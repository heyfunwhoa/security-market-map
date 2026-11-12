import { copyFileSync, chmodSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Installs the tracked git hooks: pre-commit (secret scan + fast checks) and pre-push (tests).
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const hooksDir = join(root, ".git", "hooks");

if (!existsSync(join(root, ".git"))) {
  console.log("No .git directory — skipping hook install.");
  process.exit(0);
}

if (!existsSync(hooksDir)) {
  mkdirSync(hooksDir, { recursive: true });
}

for (const hook of ["pre-commit", "pre-push"]) {
  const dest = join(hooksDir, hook);
  copyFileSync(join(root, "scripts", hook), dest);
  chmodSync(dest, 0o755);
}
console.log("Installed pre-commit and pre-push hooks.");
