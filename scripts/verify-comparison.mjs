/** Optional browser acceptance runner. Use an installed Playwright; no app dependency. */
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const base = process.env.COMPARISON_BASE_URL || "http://localhost:43123";
const artifacts = process.env.COMPARISON_ARTIFACTS || "/tmp/kru76-comparison";
await mkdir(artifacts, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined,
  headless: true,
  proxy: process.env.COMPARISON_PROXY
    ? { server: process.env.COMPARISON_PROXY, bypass: "localhost,127.0.0.1" }
    : undefined,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const results = [];
try {
  for (const width of [375, 768, 1280, 640]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
      ignoreHTTPSErrors: process.env.COMPARISON_TEST_PROXY_TLS === "1",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(`${base}/categories/secrets-detection`);
    const entry = page.getByRole("link", {
      name: "Compare secrets detection products",
      exact: true,
    });
    // Traverse real tab order, then follow the category entry with Enter.
    for (
      let i = 0;
      i < 80 && !(await entry.evaluate((el) => el === document.activeElement));
      i++
    )
      await page.keyboard.press("Tab");
    assert(
      await entry.evaluate((el) => el === document.activeElement),
      "category CTA reachable by keyboard",
    );
    await page.keyboard.press("Enter");
    await page.waitForURL("**/compare?**");
    await page.getByRole("table").waitFor();
    assert.equal(
      await page.locator("#compare-category").inputValue(),
      "secrets-detection",
    );
    assert.equal(await page.locator("thead th").count(), 5);
    const region = page.getByRole("region", {
      name: "Product capability comparison",
    });
    const summary = region.locator("summary").first();
    await summary.focus();
    await page.keyboard.press("Enter");
    assert(
      await summary.evaluate((el) => el.parentElement.open),
      "Enter opens source details",
    );
    assert(
      await summary.evaluate(
        (el) => getComputedStyle(el).outlineStyle !== "none",
      ),
      "visible keyboard focus",
    );
    await page.keyboard.press("Space");
    assert(
      !(await summary.evaluate((el) => el.parentElement.open)),
      "Space closes source details",
    );
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    const href = await page.locator(":focus").getAttribute("href");
    assert.equal(
      href,
      "https://github.com/trufflesecurity/trufflehog/blob/main/README.md",
    );
    if (process.env.COMPARISON_VERIFY_ORIGINAL_SOURCE === "1") {
      const appErrorCount = errors.length;
      const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: "commit" }),
        page.keyboard.press("Enter"),
      ]);
      assert.equal(page.url(), href);
      assert.equal(response.status(), 200, "original publisher page responds");
      errors.splice(appErrorCount);
      await page.goBack();
      await region.waitFor();
    }
    assert(
      (await region.innerText()).includes(
        "Vendor-reported; not independently validated",
      ),
    );
    // No page overflow; the comparison alone can scroll horizontally.
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    );
    await region.focus();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(200);
    if (width < 704)
      assert(
        await region.evaluate((el) => el.scrollLeft > 0),
        "keyboard scroll stays in table",
      );
    await region.screenshot({ path: `${artifacts}/comparison-${width}.png` });
    await page.screenshot({
      path: `${artifacts}/page-${width}.png`,
      fullPage: true,
    });
    // Remove using keyboard, recover focus, find a product and add it again.
    const chips = page.getByRole("list", { name: "Products in the matrix" });
    await chips.getByRole("button").first().focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction(
      () =>
        document.querySelector('[aria-label="Products in the matrix"]').children
          .length === 3,
    );
    assert.equal(
      await page.locator(":focus").getAttribute("id"),
      "compare-pick",
    );
    await page.keyboard.type("TruffleHog");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.waitForFunction(
      () =>
        document.querySelector('[aria-label="Products in the matrix"]').children
          .length === 4,
    );
    await page.locator("#compare-pick").fill("zz-no-such-product");
    await page.getByRole("button", { name: "Clear search" }).waitFor();
    assert(
      (await page.locator("#compare-matches").innerText()).includes(
        "No products match",
      ),
    );
    await page.getByRole("button", { name: "Clear search" }).click();
    assert.equal(await page.locator("#compare-pick").inputValue(), "");
    for (let remaining = 4; remaining > 0; remaining--) {
      await chips.getByRole("button").first().click();
      await page.waitForFunction(
        (n) =>
          document.querySelector('[aria-label="Products in the matrix"]')
            .children.length === n,
        remaining - 1,
      );
    }
    await page.reload();
    assert.equal(await chips.getByRole("button").count(), 0);
    assert(
      (await page.locator("main").innerText()).includes(
        "Select at least two products",
      ),
    );
    await page.locator("#compare-category").selectOption("security-awareness");
    await page
      .getByText("No comparison use case is mapped", { exact: false })
      .waitFor();
    assert.equal(errors.length, 0, errors.join("\n"));
    results.push({
      width,
      reducedMotion: true,
      categoryEntry: "pass",
      keyboard: "pass",
      sources: href,
      originalSourceNavigation:
        process.env.COMPARISON_VERIFY_ORIGINAL_SOURCE === "1"
          ? "HTTP 200"
          : "not run",
      overflow: "pass",
      emptyAndRecovery: "pass",
      consoleErrors: errors,
    });
    await context.close();
  }
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
