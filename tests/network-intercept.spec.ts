import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils/apiUtils';

let token;
let orderId;
const noOrdersPayload = { data: [], message: 'No Orders' };
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

test('Should display a message when no orders are created', async ({
  page,
}) => {
  const url =
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*';

  await page.goto('/client');

  await page.route(url, async (route) => {
    // Do the request and get the real response
    const response = await page.request.fetch(route.request());

    route.fulfill({
      response,
      body: JSON.stringify(noOrdersPayload), // Convert the JS object into JSON object string
    });
  });
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(url);
});
