import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://the-internet.herokuapp.com' });

test.beforeEach(async ({ page }) => {
  await page.goto('/iframe');
  await expect(page.locator('h3')).toBeVisible();
});

test('Should interact with iframes', async ({ page }) => {
  const iframe = page.frameLocator('#mce_0_ifr');
  const iframeText = iframe.locator('#tinymce p');
  await expect(iframeText).toHaveText('Your content goes here.');
});

test("Should interact with iframes using 'contentFrame'", async ({ page }) => {
  const text = page.locator('#mce_0_ifr').contentFrame().locator('#tinymce p');
  await expect(text).toHaveText('Your content goes here.');
});
