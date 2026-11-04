import assert from 'node:assert/strict';
import test from 'node:test';
import { draftPreviewSkip } from './preview-draft.mjs';

const base = {
  VERCEL_ENV: 'preview',
  VERCEL_GIT_PULL_REQUEST_ID: '42',
  VERCEL_GIT_REPO_OWNER: 'example-owner',
  VERCEL_GIT_REPO_SLUG: 'example-repo',
  VERCEL_GIT_COMMIT_REF: 'feature/x',
  VERCEL_GIT_COMMIT_MESSAGE: 'feat: synthetic change',
  GITHUB_PR_READ_TOKEN: 'synthetic-placeholder',
};
const reply = (body, ok = true) => async () => ({ ok, json: async () => body });
const draftPr = { draft: true, state: 'open', head: { ref: 'feature/x' } };

test('draft PR preview skips; ready PR builds', async () => {
  assert.equal((await draftPreviewSkip(base, reply(draftPr)))?.code, 0);
  assert.equal(await draftPreviewSkip(base, reply({ ...draftPr, draft: false })), null);
  assert.equal(await draftPreviewSkip(base, reply({ ...draftPr, state: 'closed' })), null);
  assert.equal(await draftPreviewSkip(base, reply({ ...draftPr, head: { ref: 'other' } })), null, 'PR for another branch');
});

test('production, overrides and missing inputs build without calling GitHub', async () => {
  let calls = 0;
  const spy = async () => { calls++; return { ok: true, json: async () => draftPr }; };
  for (const env of [
    { ...base, VERCEL_ENV: 'production' },
    { ...base, VERCEL_ENV: undefined },
    { ...base, RELEASE_FORCE_BUILD: '1' },
    { ...base, VERCEL_GIT_COMMIT_MESSAGE: 'fix: thing [preview]' },
    { ...base, VERCEL_GIT_PULL_REQUEST_ID: '' },
    { ...base, VERCEL_GIT_PULL_REQUEST_ID: '0' },
    { ...base, VERCEL_GIT_PULL_REQUEST_ID: '42/../1' },
    { ...base, VERCEL_GIT_REPO_OWNER: 'a/b' },
    { ...base, VERCEL_GIT_REPO_SLUG: 'x?y' },
    { ...base, VERCEL_GIT_COMMIT_REF: '' },
    { ...base, GITHUB_PR_READ_TOKEN: '' },
  ]) assert.equal(await draftPreviewSkip(env, spy), null);
  assert.equal(calls, 0);
});

test('API failures fail open', async () => {
  assert.equal(await draftPreviewSkip(base, reply(draftPr, false)), null, 'non-2xx');
  assert.equal(await draftPreviewSkip(base, async () => { throw new Error('network'); }), null, 'network error');
  assert.equal(await draftPreviewSkip(base, async () => ({ ok: true, json: async () => { throw new Error('bad json'); } })), null, 'bad json');
  assert.equal(await draftPreviewSkip(base, reply(null)), null, 'empty body');
  assert.equal(await draftPreviewSkip(base, 'not a function'), null);
});

test('request targets only the PR endpoint and sends the token as a header', async () => {
  let seen;
  await draftPreviewSkip(base, async (url, opts) => { seen = { url, opts }; return { ok: true, json: async () => draftPr }; });
  assert.equal(seen.url, 'https://api.github.com/repos/example-owner/example-repo/pulls/42');
  assert.equal(seen.opts.headers.Authorization, 'Bearer synthetic-placeholder');
  assert.equal(seen.opts.redirect, 'error');
});
