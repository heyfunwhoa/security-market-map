/** Local category-link acceptance. Requires separately installed Playwright. */
import assert from "node:assert/strict";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.MARKET_MAP_BASE_URL || "http://localhost:43123";
const expected = {
  "secrets-detection": ["credential-risk"],
  "secrets-management": ["credential-risk", "identity-journey"],
  nhi: ["credential-risk", "identity-journey"],
  aspm: ["credential-risk", "source-verification"],
  "workforce-identity": ["identity-journey"],
  dspm: ["source-verification"], sast: ["source-verification"],
  sca: ["source-verification"], dast: ["source-verification"], pam: [],
};
const destinations = {
  "credential-risk": "https://byjoyaing.com/builder-academy/credential-risk",
  "identity-journey": "https://byjoyaing.com/builder-academy/identity-journey",
  "source-verification": "https://byjoyaing.com/ai-academy/journeys/source-verification",
};
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const results = [];
try {
  for (const width of [375, 768, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    for (const [category, ids] of Object.entries(expected)) {
      const response = await page.goto(`${base}/categories/${category}`);
      assert.equal(response.status(), 200);
      const section = page.locator('section[aria-labelledby="academy-links-heading"]');
      if (!ids.length) { assert.equal(await section.count(), 0); continue; }
      const links = section.getByRole("link");
      assert.deepEqual(await links.evaluateAll((elements) => elements.map((el) => el.href)), ids.map((id) => destinations[id]));
      for (let i = 0; i < ids.length; i++) {
        const link = links.nth(i);
        if (i === 0) await link.focus(); else await page.keyboard.press("Tab");
        assert(await link.evaluate((el) => el === document.activeElement), "logical link tab order");
        assert(await link.evaluate((el) => getComputedStyle(el).outlineStyle !== "none"), "visible focus");
        assert((await link.boundingBox()).height >= 44, "minimum tap target");
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "no page overflow");
    }
    // Prove native keyboard navigation emits the exact public URL, without
    // requiring external networks for this deterministic local test.
    await page.goto(`${base}/categories/secrets-detection`);
    await page.route("https://byjoyaing.com/**", (route) => route.fulfill({ status: 200, contentType: "text/html", body: "<h1>Synthetic navigation target</h1>" }));
    const link = page.locator('section[aria-labelledby="academy-links-heading"] a');
    await link.focus();
    await Promise.all([page.waitForURL(destinations["credential-risk"]), page.keyboard.press("Enter")]);
    assert.equal(page.url(), destinations["credential-risk"]);
    assert.equal(errors.length, 0, errors.join("\n"));
    results.push({ width, categories: 9, unrelatedOmission: "pass", keyboardAndTargets: "pass", overflow: "pass", publicNavigation: "synthetic target only; live check separate" });
    await context.close();
  }
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
