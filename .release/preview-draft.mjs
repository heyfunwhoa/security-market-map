// Skip Vercel preview builds while the pull request is still a draft.
// Fails open: any missing input, API error, timeout or unexpected response builds.
// Production builds are never affected. The token is never logged.

const PR_ID = /^[1-9][0-9]{0,9}$/;
const OWNER = /^[A-Za-z0-9-]{1,39}$/;
const REPO = /^[A-Za-z0-9._-]{1,100}$/;

export async function draftPreviewSkip(env = process.env, fetchImpl = globalThis.fetch) {
  if (env.VERCEL_ENV !== 'preview') return null;
  if (env.RELEASE_FORCE_BUILD === '1') return null;
  if (/\[preview\]/i.test(env.VERCEL_GIT_COMMIT_MESSAGE || '')) return null;
  const pr = env.VERCEL_GIT_PULL_REQUEST_ID || '';
  const owner = env.VERCEL_GIT_REPO_OWNER || '';
  const repo = env.VERCEL_GIT_REPO_SLUG || '';
  const ref = env.VERCEL_GIT_COMMIT_REF || '';
  const token = env.GITHUB_PR_READ_TOKEN || '';
  if (!PR_ID.test(pr) || !OWNER.test(owner) || !REPO.test(repo) || !ref || !token) return null;
  if (typeof fetchImpl !== 'function') return null;
  try {
    const res = await fetchImpl(`https://api.github.com/repos/${owner}/${repo}/pulls/${pr}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'User-Agent': 'release-preview-draft-check',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      redirect: 'error',
      signal: AbortSignal.timeout(4000),
    });
    if (!res || !res.ok) return null;
    const data = await res.json();
    if (data?.draft === true && data?.state === 'open' && data?.head?.ref === ref) {
      return {
        code: 0,
        reason: `skip: preview for draft PR #${pr}. Mark it ready and push, redeploy, or add [preview] to a commit message.`,
      };
    }
  } catch {
    // fail open
  }
  return null;
}
