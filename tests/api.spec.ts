import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils/apiUtils';
import { PageObjectsManager } from '../page-objects/PageObjecstManager';

let token: string;
let apiUtils: APIUtils;

/**
 * Creating an order through API and then verifying the order through UI. This is to demonstrate how we can use API to set up test data for our UI tests, which can be much faster than creating the order through UI.
 */
test.use({ baseURL: 'https://rahulshettyacademy.com' });

test.beforeAll(async () => {
  const { USERNAME, PASSWORD } = process.env;
  const apiContext = await request.newContext({
    baseURL: 'https://rahulshettyacademy.com',
  });
  apiUtils = new APIUtils(apiContext, USERNAME!, PASSWORD!);
  token = await apiUtils.getNewToken();
});

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);
});

test('Should place an order through API and verify it in UI', async ({ page }) => {
  const POManager = new PageObjectsManager(page);

  const products = await apiUtils.getProducts();
  const orderId = await apiUtils.createOrder(
    'Costa Rica',
    products.data[0]._id
    
  );

  await POManager.dashboardPage.goto()
  await POManager.dashboardPage.topBar.ordersButton.click();
  POManager.ordersPage.ordersTable.waitFor();
  POManager.ordersPage.openOrder(orderId);
  
  await expect(POManager.orderDetailsPage.orderNumber).toBeVisible();
  await expect(POManager.orderDetailsPage.orderNumber).toHaveText(orderId);
});
