import { describe, expect, it } from "vitest";
import { inngestServeReady } from "./config";

describe("inngest serve configuration", () => {
  it("requires a dev flag or a signing key", () => {
    expect(inngestServeReady({})).toBe(false);
    expect(inngestServeReady({ INNGEST_DEV: "", INNGEST_SIGNING_KEY: "" })).toBe(false);
    expect(inngestServeReady({ INNGEST_DEV: "0" })).toBe(false);
    expect(inngestServeReady({ INNGEST_DEV: "false" })).toBe(false);
    expect(inngestServeReady({ INNGEST_DEV: "1" })).toBe(true);
    expect(inngestServeReady({ INNGEST_DEV: "true" })).toBe(true);
    expect(inngestServeReady({ INNGEST_DEV: "http://127.0.0.1:8288" })).toBe(true);
    expect(inngestServeReady({ INNGEST_SIGNING_KEY: "signkey-test" })).toBe(true);
    expect(inngestServeReady({ INNGEST_DEV: "0", INNGEST_SIGNING_KEY: "signkey-test" })).toBe(true);
  });
});
