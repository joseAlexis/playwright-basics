import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils/apiUtils';

let token;
let orderId;

test.use({ baseURL: 'https://rahulshettyacademy.com' });

test.beforeAll(async () => {
  const { USERNAME, PASSWORD } = process.env;
  const apiContext = await request.newContext({
    baseURL: 'https://rahulshettyacademy.com',
  });
  const apiUtils = new APIUtils(apiContext, USERNAME, PASSWORD);
  token = await apiUtils.getNewToken();
  orderId = await apiUtils.createOrder(
    'Costa Rica',
    '68a961459320a140fe1ca57a'
  );
});

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);
});

test('Should check though API', async ({ page }) => {
  await page.goto('/client');
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('tbody').waitFor();
  const rows = await page.locator('tbody tr');

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (rowOrderId.includes(orderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
