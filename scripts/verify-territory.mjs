/** Optional browser acceptance runner; use an installed Playwright and Chromium. */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.TERRITORY_BASE_URL || "http://127.0.0.1:43123";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  for (const width of [375, 768, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce", acceptDownloads: true });
    await context.addInitScript(() => {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key === "atlas-territory-v1" && window.failTerritorySave) throw new DOMException("Synthetic quota failure", "QuotaExceededError");
        return original.call(this, key, value);
      };
      Object.defineProperty(navigator, "clipboard", { value: { writeText: async () => { throw new Error("Synthetic clipboard denial"); } } });
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`${base}/territory`);
    const add = page.getByRole("button", { name: "New account", exact: true });
    // Exercise the actual tab order and keyboard activation.
    for (let i = 0; i < 60 && !(await add.evaluate(el => el === document.activeElement)); i++) await page.keyboard.press("Tab");
    assert(await add.evaluate(el => el === document.activeElement), "New account reachable by keyboard");
    await page.keyboard.press("Enter");
    await page.getByLabel("Account name", { exact: true }).waitFor();
    await page.getByLabel("Account name", { exact: true }).fill("Fictional Existing Company");
    await add.click();
    const name = page.getByLabel("Account name", { exact: true });
    await name.fill("Fictional Test Company");
    // Clearing a name must not crash or prevent continued editing.
    await name.fill("");
    await name.fill("Fictional Test Company");
    await page.getByLabel("Industry", { exact: true }).fill("Synthetic manufacturing");
    await page.getByLabel("IGA incumbent", { exact: true }).selectOption("named");
    await page.locator("#iga-incumbent-name").fill("Synthetic IGA Tool");
    await page.getByLabel("Notes", { exact: true }).fill("Synthetic discovery note");
    const useCase = page.getByRole("checkbox").first();
    await useCase.check();
    await page.getByLabel("Source link", { exact: true }).fill("https://example.com/security");
    await page.getByLabel("Source link", { exact: true }).press("Enter");
    const before = await page.locator("time").getAttribute("datetime");
    await page.reload();
    await name.waitFor();
    assert.equal(await name.inputValue(), "Fictional Test Company");
    assert.equal(await page.getByLabel("Industry", { exact: true }).inputValue(), "Synthetic manufacturing");
    assert.equal(await page.locator("#iga-incumbent-name").inputValue(), "Synthetic IGA Tool");
    assert(await page.getByRole("checkbox").first().isChecked());
    assert.equal(await page.getByRole("link", { name: "example.com", exact: true }).getAttribute("href"), "https://example.com/security");
    await page.getByRole("button", { name: "Fictional Existing Company", exact: true }).click();
    await page.getByRole("button", { name: "Fictional Test Company", exact: true }).click();
    await page.getByLabel("Notes", { exact: true }).fill("Updated synthetic note");
    const after = await page.locator("time").getAttribute("datetime");
    assert(new Date(after) > new Date(before), "edit advances timestamp");
    await page.reload();
    assert.equal(await page.getByLabel("Notes", { exact: true }).inputValue(), "Updated synthetic note");

    const storedBeforeFailure = await page.evaluate(() => localStorage.getItem("atlas-territory-v1"));
    await page.evaluate(() => { window.failTerritorySave = true; });
    await page.getByLabel("Notes", { exact: true }).fill("Unsaved synthetic note");
    const saveAlert = page.getByRole("alert").filter({ hasText: "Could not save in this browser." });
    await saveAlert.waitFor();
    assert.equal(await page.evaluate(() => localStorage.getItem("atlas-territory-v1")), storedBeforeFailure, "failed write preserves saved data");
    assert.equal(await page.getByLabel("Notes", { exact: true }).inputValue(), "Unsaved synthetic note", "failed write preserves current edits");

    // Export must still download a recovery brief when clipboard access is denied.
    const downloadEvent = page.waitForEvent("download");
    await page.getByRole("button", { name: "Export Markdown brief", exact: true }).click();
    const download = await downloadEvent;
    const brief = await readFile(await download.path(), "utf8");
    for (const expected of ["Fictional Test Company", "Synthetic IGA Tool", "https://example.com/security", "Unsaved synthetic note", "## Discovery plan"]) assert(brief.includes(expected), `brief contains ${expected}`);
    await page.getByText("Brief downloaded. Clipboard access was unavailable.", { exact: true }).waitFor();
    await page.evaluate(() => { window.failTerritorySave = false; });
    const retry = page.getByRole("button", { name: "Retry saving", exact: true });
    await retry.focus();
    await page.keyboard.press("Enter");
    await page.getByText("Saved in this browser.", { exact: true }).waitFor();
    assert(await page.getByText("Saved in this browser.", { exact: true }).evaluate(el => el === document.activeElement), "retry keeps keyboard focus on save confirmation");
    assert.equal(await saveAlert.count(), 0);
    await page.reload();
    assert.equal(await page.getByLabel("Notes", { exact: true }).inputValue(), "Unsaved synthetic note");
    assert.equal(await page.getByRole("button", { name: "Fictional Existing Company", exact: true }).count(), 1, "existing account retained");
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "no horizontal page overflow");
    assert.deepEqual(errors, [], "no browser runtime errors");
    console.log(`${width}px: create, clear name, edit, refresh, reopen, sources/use case, timestamps, storage failure/retry, clipboard-denied export passed`);
    await context.close();
  }
} finally {
  await browser.close();
}
