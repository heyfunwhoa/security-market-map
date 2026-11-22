#!/bin/sh
# Scan exactly what is staged for live or possibly live secrets, before it becomes a commit.
# A key that never reaches a commit never needs rotating.
#
# - Copies the staged version of each added or changed file into a temp folder, then runs
#   TruffleHog on that folder. Unstaged edits are not scanned; they are not being committed.
# - Blocks the commit when TruffleHog reports a verified or unknown (could not check) result.
# - If TruffleHog is not installed, warns and lets the commit through. CI scans every ready PR.
#   Install: https://github.com/trufflesecurity/trufflehog#floppy_disk-installation

if ! command -v trufflehog >/dev/null 2>&1; then
  echo "⚠️  TruffleHog is not installed, so staged changes were NOT scanned for secrets."
  echo "    Install it (brew install trufflehog) so keys are caught before they are committed."
  exit 0
fi

tmp=$(mktemp -d) || exit 1
trap 'rm -rf "$tmp"' EXIT INT TERM

# Staged added, copied, modified, or renamed files, written out as they are staged.
list="$tmp.list"
git diff --cached --name-only --diff-filter=ACMR -z >"$list"
if [ ! -s "$list" ]; then
  rm -f "$list"
  exit 0
fi
git checkout-index --prefix="$tmp/" -z --stdin <"$list"
rm -f "$list"

trufflehog filesystem "$tmp" --results=verified,unknown --fail --no-update --log-level=-1
status=$?
if [ $status -eq 183 ]; then
  echo ""
  echo "❌ TruffleHog found a secret in your staged changes. Remove it before committing."
  echo "   If it was a real key, treat it as exposed: rotate it, even though it was never committed."
  exit 1
fi
if [ $status -ne 0 ]; then
  echo "❌ TruffleHog failed to run (exit $status)."
  exit 1
fi
echo "✅ No secrets found in staged changes."
