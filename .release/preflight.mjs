import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function blockers(pr) {
  const reasons = [];
  if (pr.state !== 'OPEN' || pr.isDraft !== false) reasons.push('PR must be open and ready for review');
  if (pr.baseRefName !== 'main') reasons.push('Expected main as the target branch');
  if (!/^[a-f0-9]{40}$/i.test(pr.headRefOid || '')) reasons.push('Full head commit is missing');
  if (pr.mergeable !== 'MERGEABLE') reasons.push('Mergeability is conflicted or unknown');
  if (pr.reviewDecision && pr.reviewDecision !== 'APPROVED') reasons.push('Required review is not approved');
  const checks = pr.statusCheckRollup;
  if (!Array.isArray(checks) || checks.length === 0) reasons.push('No check evidence: manual review required');
  else if (checks.some(c => c.__typename === 'StatusContext'
    ? c.state !== 'SUCCESS'
    : c.status !== 'COMPLETED' || !['SUCCESS','NEUTRAL','SKIPPED'].includes(c.conclusion))) reasons.push('Checks are failed, pending or unknown');
  return reasons;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const pr = JSON.parse(readFileSync(process.argv[2], 'utf8'));
  const reasons = blockers(pr);
  console.log(`PR #${Number(pr.number)} | target main | head ${/^[a-f0-9]{40}$/i.test(pr.headRefOid || '') ? pr.headRefOid : 'unknown'}`);
  console.log(reasons.length ? `BLOCKED: ${reasons.join('; ')}` : 'Snapshot checks passed. Recheck required checks and exact head before an authorized merge.');
  console.log('This is read-only evidence, not merge authorization, branch protection, or deployment verification.');
  process.exitCode = reasons.length ? 1 : 0;
}
