import { describe, expect, it } from "vitest";
import { awsFoundationsPassCount, awsFoundationsSteps } from "./data/aws-foundations-course";

describe("AWS foundations guided course", () => {
  it("has five unique ordered lessons and achievable knowledge gate", () => {
    expect(awsFoundationsSteps).toHaveLength(5);
    expect(new Set(awsFoundationsSteps.map((step) => step.id)).size).toBe(5);
    expect(awsFoundationsPassCount).toBeGreaterThan(0);
    expect(awsFoundationsPassCount).toBeLessThanOrEqual(awsFoundationsSteps.length);
  });

  it("provides a complete, source-linked explanation and one valid answer per checkpoint", () => {
    for (const step of awsFoundationsSteps) {
      for (const field of [step.title, step.objective, step.concept, step.mechanics, step.caveat, step.example, step.question, step.teachBack, step.market.context]) {
        expect(field.trim().length, step.id).toBeGreaterThan(15);
      }
      expect(step.source.url, step.id).toMatch(/^https:\/\/docs\.aws\.amazon\.com\/|^https:\/\/aws\.amazon\.com\//);
      expect(step.market.href, step.id).toMatch(/^\//);
      expect(step.options).toHaveLength(4);
      expect(step.correctIndex, step.id).toBeGreaterThanOrEqual(0);
      expect(step.correctIndex, step.id).toBeLessThan(step.options.length);
      expect(new Set(step.options.map((option) => option.label)).size, step.id).toBe(4);
      for (const option of step.options) {
        expect(option.reason.trim().length, step.id).toBeGreaterThan(25);
      }
    }
  });
});
