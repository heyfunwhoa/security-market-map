import assert from 'node:assert/strict';
import test from 'node:test';
import { blockers } from './preflight.mjs';
const good={state:'OPEN',isDraft:false,baseRefName:'main',headRefOid:'a'.repeat(40),mergeable:'MERGEABLE',reviewDecision:'APPROVED',statusCheckRollup:[{__typename:'CheckRun',status:'COMPLETED',conclusion:'SUCCESS'}]};
test('ready snapshot and absent optional review',()=>{assert.deepEqual(blockers(good),[]);assert.deepEqual(blockers({...good,reviewDecision:''}),[]);});
test('reject stale, incomplete, unreviewed and failing states',()=>{
 for(const patch of [{state:'MERGED'},{isDraft:true},{baseRefName:'dev'},{headRefOid:'abc'},{mergeable:'UNKNOWN'},{reviewDecision:'REVIEW_REQUIRED'},{reviewDecision:'CHANGES_REQUESTED'},{statusCheckRollup:[]},{statusCheckRollup:[{__typename:'StatusContext',state:'FAILURE'}]},{statusCheckRollup:[{__typename:'CheckRun',status:'IN_PROGRESS',conclusion:null}]},{statusCheckRollup:[{__typename:'CheckRun',status:'COMPLETED',conclusion:'FAILURE'}]}]) assert.ok(blockers({...good,...patch}).length,JSON.stringify(patch));
});
