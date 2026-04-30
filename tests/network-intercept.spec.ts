import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils/apiUtils';
import { PageObjectsManager } from '../page-objects/PageObjecstManager';

let token;
let orderId;

test.use({ baseURL: 'https://rahulshettyacademy.com' });

// test.beforeAll(async () => {
//   const { USERNAME, PASSWORD } = process.env;
//   const apiContext = await request.newContext({
//     baseURL: 'https://rahulshettyacademy.com',
//   });
//   const apiUtils = new APIUtils(apiContext, USERNAME, PASSWORD);
//   token = await apiUtils.getNewToken();
//   orderId = await apiUtils.createOrder(
//     'Costa Rica',
//     '68a961459320a140fe1ca57a',
//   );
// });
let POManager: PageObjectsManager;

test.beforeEach(async ({ page }) => {
  POManager = new PageObjectsManager(page);
});

test('Should display a message when no orders are created', async ({
  page,
  baseURL,
}) => {
  const noOrdersPayload = { data: [], message: 'No Orders' };
  const url = `${baseURL}/api/ecom/order/get-orders-for-customer/*`;

  await POManager.dashboardPage.goto();

  await page.route(url, async (route) => {
    // Do the request and get the real response
    const response = await page.request.fetch(route.request());

    route.fulfill({
      response,
      body: JSON.stringify(noOrdersPayload), // Convert the JS object into JSON object string
    });
  });

  await POManager.dashboardPage.topBar.ordersButton.click();
  await page.waitForResponse(url);
  await expect(POManager.ordersPage.noOrdersMessage).toBeVisible();
  await expect(POManager.ordersPage.noOrdersMessage).toContainText(
    'You have No Orders to show at this time.',
  );
});

test('Should not display orders that does not belong to the current user', async ({
  page,
  baseURL,
}) => {
  const url = `${baseURL}/api/ecom/order/get-orders-details`;
  
  await POManager.ordersPage.goto();

  await page.route(`${url}?id=*`, (route) =>
    route.continue({
      url: `${url}?id=6883ae356f585eb60d43139a`,
    }),
  );
  await page.locator('button').filter({ hasText: 'View' }).first().click();
  await expect(page.locator('p').last()).toHaveText(
    'You are not authorize to view this order',
  );
});

test.skip('Should do some visual regression testing of the orders page', async ({
  page,
}) => {
  await page.goto('/client/#/dashboard/myorders');
  await expect(await page.screenshot()).toMatchSnapshot('orders.png');
});
