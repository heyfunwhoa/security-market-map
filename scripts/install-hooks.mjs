import { copyFileSync, chmodSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Installs the tracked git hooks: pre-commit (secret scan + fast checks) and pre-push (tests).
const root = dirname(dirname(fileURLToPath(import.meta.url)));

// `.git` is a directory in a normal clone and a file in a worktree. If it is
// missing (tarball install, CI image without git metadata), skip cleanly rather
// than letting git walk up and find some unrelated parent repository.
if (!existsSync(join(root, ".git"))) {
  console.log("No .git directory — skipping hook install.");
  process.exit(0);
}

// Ask git where hooks live for this checkout. In a worktree this resolves to
// the shared hooks directory in the main repository's git dir, and it honours
// core.hooksPath if one is configured.
let hooksDir;
try {
  const out = execFileSync("git", ["rev-parse", "--git-path", "hooks"], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
  hooksDir = resolve(root, out);
} catch {
  console.log("git unavailable or not a git repository — skipping hook install.");
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
console.log(`Installed pre-commit and pre-push hooks in ${hooksDir}.`);
