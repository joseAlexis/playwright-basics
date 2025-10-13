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

test('Should not display orders that does not belong to the current user', async ({
  page,
}) => {
  await page.goto('/client/#/dashboard/myorders');
  await page.locator('tbody').waitFor();
  const url =
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-details';
  await page.route(`${url}?id=*`, (route) =>
    route.continue({
      url: `${url}?id=6883ae356f585eb60d43139a`,
    })
  );
  await page.locator('button').filter({ hasText: 'View' }).first().click();
  await expect(page.locator('p').last()).toHaveText(
    'You are not authorize to view this order'
  );
});

test.only('Should do some visual regression testing of the orders page', async ({
  page,
}) => {
  await page.goto('/client/#/dashboard/myorders');
  await expect(await page.screenshot()).toMatchSnapshot('orders.png');
});
