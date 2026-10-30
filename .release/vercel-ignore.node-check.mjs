import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import test from 'node:test';
import { decide, shouldSkip } from './vercel-ignore.mjs';

const policy = JSON.parse(readFileSync(new URL('./policy.json', import.meta.url), 'utf8'));
test('internal allowlist does not swallow content, config, data or mixed changes', () => {
  assert.equal(shouldSkip(['RELEASE.md'], policy), true);
  for (const path of ['app/page.tsx', 'content/academy/lesson.mdoc', 'docs/builder-academy/lesson.md', 'data/snapshots/trufflehog.json', 'package-lock.json', 'vercel.json', '.github/workflows/ci.yml', '.release/policy.json', 'new-folder/file.md', '../README.md', 'README.md\napp/page.tsx']) {
    assert.equal(shouldSkip([path], policy), false, path);
    assert.equal(shouldSkip(['RELEASE.md', path], policy), false, path);
  }
  assert.equal(shouldSkip([], policy), false);
  assert.equal(shouldSkip(['RELEASE.md'], {}), false);
});

test('real git history covers cumulative changes, renames, missing history and nested cwd', () => {
  const root = mkdtempSync(join(tmpdir(), 'release-policy-'));
  try {
    const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    const put = (p, text) => { mkdirSync(dirname(join(root, p)), {recursive:true}); writeFileSync(join(root,p),text); };
    const commit = () => { git(['add','.']); git(['commit','-qm','synthetic fixture']); return git(['rev-parse','HEAD']); };
    git(['init','-q']); git(['config','user.name','Synthetic Test']); git(['config','user.email','test@example.invalid']);
    put('RELEASE.md', 'initial'); const first = commit();
    put('RELEASE.md', 'internal'); const second = commit();
    const env = (a,b) => ({VERCEL_GIT_PREVIOUS_SHA:a,VERCEL_GIT_COMMIT_SHA:b});
    assert.equal(decide(env(first,second),root).code,0);
    assert.equal(decide({...env(first,second),RELEASE_FORCE_BUILD:'1'},root).code,1);
    put('app/page.tsx','app'); const third=commit();
    put('RELEASE.md','later internal'); const fourth=commit();
    assert.equal(decide(env(second,fourth),root).code,1,'all commits since previous deployment count');
    assert.equal(decide(env(third,fourth),join(root,'app')).code,0,'nested working directory');
    git(['mv','app/page.tsx','CLAUDE.md']); const fifth=commit();
    assert.equal(decide(env(fourth,fifth),root).code,1,'rename out of application must build');
    assert.equal(decide(env(fifth,fifth),root).code,1,'empty diff builds');
    assert.equal(decide(env('a'.repeat(40),fifth),root).code,1,'unavailable base builds');
    assert.equal(decide(env(first,second),root).code,1,'checkout mismatch builds');
    assert.equal(decide({},root).code,1,'missing metadata builds');
    git(['checkout','--orphan','unrelated']); git(['rm','-rf','.']); put('RELEASE.md','unrelated'); const other=commit();
    assert.equal(decide(env(fifth,other),root).code,1,'non-ancestor builds');
  } finally { rmSync(root,{recursive:true,force:true}); }
});
