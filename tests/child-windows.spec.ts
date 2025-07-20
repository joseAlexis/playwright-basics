import test, { BrowserContext, expect, Page } from "@playwright/test";

let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  await page.goto('/windows');
});

test.afterEach(async () => {
  await page.close();
  await context.close();
});

test('should open a new window', async () => {
  const childPagePromise = context.waitForEvent('page');

  await page.click('text=Click Here');

  const childPage = await childPagePromise;
  await expect(childPage.getByText("New Window")).toBeVisible();

  await childPage.close();
  await page.close();
  await context.close();
});

test("should opne a new page using promise.all", async () => {
  await page.click('text=Click Here');

  // Promises have 3 states: pending, fulfilled, rejected
  // Promise.all will wait for all promises to be fulfilled
  // If any of the promises is rejected, the entire Promise.all will be rejected
  // Promise.all will return an array of the results of the promises
  const [childPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=Click Here')
  ]);

  await expect(childPage.getByText("New Window")).toBeVisible();

  await childPage.close();
});