# Development workflow (Git + Cursor)

Use this small-team workflow for all meaningful product changes.

## 1. Start safely
- In Cursor, open the **existing** repository and inspect `git status` before fetching or switching branches. Do not discard local work.
- Update local `main` from remote before starting a new feature. Never commit secrets, `.env.local`, or generated files.
- Create one branch per cohesive feature or milestone, named `feature/<topic>`, `fix/<topic>`, or `chore/<topic>`.
- **If a branch/PR already exists for the milestone, use it; do not create another.**

## 2. Work in small checkpoints
- Implement a small vertical slice; add or update tests; inspect the diff.
- Commit related changes in logical checkpoints with meaningful messages (e.g., `feat: assess evidence quality`).
- Prefer multiple logical commits per branch over one giant unreviewable change.
- Keep research claims sourced, test fixtures synthetic, and private/employer/customer data out of public artifacts.

## 3. Review before merge
- Push the feature branch, open **one PR** targeting `main`, and write why, what changed, tests, risks, and screenshots for visual changes.
- Run the repository's existing tests, TypeScript check, lint, and build; wait for GitHub CI to finish successfully.
- For database changes, check forward migrations and rollback strategy; for external calls, protect secrets, rate limits, cost, and permissions.
- Review the PR diff and test the affected user journey manually. Do not merge on a red or unverified check.
- Merge (prefer squash for a tidy history when appropriate), then sync local `main` and delete the completed feature branch.

## 4. Cursor working agreement
- Before edits: explain intended files, acceptance criteria, trade-offs, and risks.
- Never automatically push to `main` or merge PRs. Ask for explicit approval before destructive database actions.
- After edits: summarize tests actually executed vs not executed, changed files, and remaining gaps.
- Teach while coding: briefly explain Git commands, architectural decisions, tests, and UX considerations.
- Never claim live API/database integration works from mocks alone.

## 5. Lightweight exceptions
- Typo-only/readme fixes may be committed directly to `main` by the repository owner, but a small PR is useful practice.
- Hotfixes get their own `fix/` branch and quick verification.

## First commands in Cursor
```bash
git status
git branch --show-current
git fetch origin
git branch -a
```
Inspect your work before running `git switch`, `git pull`, or any reset. For a new feature only (when the working tree is clean):
```bash
git switch main
git pull --ff-only origin main
git switch -c feature/short-description
```
