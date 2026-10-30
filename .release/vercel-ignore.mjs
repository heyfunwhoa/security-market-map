import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function shouldSkip(paths, policy) {
  if (!Array.isArray(paths) || paths.length === 0) return false;
  if (!Array.isArray(policy.files) || !Array.isArray(policy.markdownPrefixes)) return false;
  return paths.every((p) => {
    if (!p || p.startsWith('/') || p.includes('\\') || /[\r\n\0]/.test(p) || p.split('/').some(s => s === '..' || s === '.' || s === '')) return false;
    return policy.files.includes(p) || (p.endsWith('.md') && policy.markdownPrefixes.some(prefix => p.startsWith(prefix)));
  });
}

export function decide(env = process.env, cwd = process.cwd()) {
  const build = (reason) => ({ code: 1, reason: `build: ${reason}` });
  if (env.RELEASE_FORCE_BUILD === '1') return build('explicit force-build override');
  const previous = env.VERCEL_GIT_PREVIOUS_SHA || '';
  const current = env.VERCEL_GIT_COMMIT_SHA || '';
  if (![previous, current].every(s => /^[a-f0-9]{40}$/i.test(s))) return build('missing commit history; fail open');
  try {
    const git = args => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 5000 });
    if (git(['rev-parse', 'HEAD']).trim().toLowerCase() !== current.toLowerCase()) return build('checkout mismatch; fail open');
    git(['merge-base', '--is-ancestor', previous, current]);
    // No rename detection: both deletion and addition must be classified.
    // NUL delimiters preserve unusual filenames; never trim or split on newline.
    const paths = git(['diff', '--no-relative', '--no-renames', '--name-only', '-z', previous, current, '--']).split('\0').filter(Boolean);
    const policy = JSON.parse(readFileSync(new URL('./policy.json', import.meta.url), 'utf8'));
    return shouldSkip(paths, policy)
      ? { code: 0, reason: 'skip: only explicitly allowed internal documentation changed' }
      : build('app, published content, configuration, empty or unclassified changes');
  } catch {
    return build('history or policy unavailable; fail open');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = decide();
  console.log(result.reason);
  process.exitCode = result.code;
}
