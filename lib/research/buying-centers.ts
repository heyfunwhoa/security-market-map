import { z } from "zod";

export const jobRoleSchema = z.object({
  id:z.string(), title:z.string(), responsibilities:z.array(z.string()),
  categoryIds:z.array(z.string()), status:z.literal("illustrative"),
});
export const budgetModelSchema = z.enum(["security_central","it_central","engineering","business_unit","joint","shared_service","unknown"]);
export const buyingScenarioSchema = z.object({
  id:z.string(), name:z.string(), technologyCategoryId:z.string(),
  stakeholderRoleIds:z.array(z.string()),
  possibleFundingModels:z.array(budgetModelSchema),
  questions:z.array(z.string()),
  note:z.string(),
  evidence:z.literal("illustrative_hypothesis"),
});
export const jobRoles=z.array(jobRoleSchema).parse([
 {id:"identity-engineer",title:"Identity Security Engineer",responsibilities:["Implement identity controls","Maintain access integrations"],categoryIds:["iga","pam"],status:"illustrative"},
 {id:"security-architect",title:"Security Architect",responsibilities:["Review architecture","Evaluate technical controls"],categoryIds:["iga","ciem"],status:"illustrative"},
 {id:"security-operations-analyst",title:"Security Operations Analyst",responsibilities:["Triage alerts","Investigate identity events"],categoryIds:["itdr"],status:"illustrative"},
]);
export const buyingScenarios=z.array(buyingScenarioSchema).parse([
 {id:"iga-evaluation",name:"Identity governance evaluation",technologyCategoryId:"iga",stakeholderRoleIds:["identity-engineer","security-architect"],possibleFundingModels:["security_central","it_central","joint","unknown"],questions:["Is the funding allocated to IAM, IT, compliance, or a joint initiative?","Who owns the original budget and which executive approves exceptions?","Is this a new budget, a renewal, a consolidation, or shared across departments?","Which teams pay for licenses, implementation, and ongoing operations?","What is the approval path, fiscal timing, and procurement threshold?"],note:"Illustrative possibilities only. No purchase authority, reporting line, or budget share is asserted.",evidence:"illustrative_hypothesis"},
]);
export function buyingCenterProblems():string[] {
 const ids=new Set(jobRoles.map(r=>r.id));
 return buyingScenarios.flatMap(s=>s.stakeholderRoleIds.filter(id=>!ids.has(id)).map(id=>`Unknown stakeholder role: ${id}`));
}
