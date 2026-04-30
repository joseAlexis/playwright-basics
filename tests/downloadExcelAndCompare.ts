import test from "@playwright/test";

test.use({ baseURL: 'https://rahulshettyacademy.com' });
test("Download Excel and compare against web ui", async ({ page }) => {
  const downloadPromise = page.waitForEvent("download");
  await page.goto("/upload-download-test/index.html");
  await page.locator("#downloadButton").click();
  await downloadPromise
});