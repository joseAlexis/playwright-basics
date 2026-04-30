import test, { expect } from '@playwright/test';
import { PageObjectsManager } from '../page-objects/PageObjecstManager';

let POManager: PageObjectsManager;

test.use({ baseURL: 'https://rahulshettyacademy.com' });
test.beforeEach(async ({ page }) => {
  POManager = new PageObjectsManager(page);
  POManager.dashboardPage.goto();
});

test('Should add a product and complete the checkout process', async () => {
  const itemName = 'IPHONE 13 PRO';

  await POManager.dashboardPage.addItemToCart(itemName);
  await expect(POManager.commonElements.notification).toBeVisible();

  // Go to cart and verify the item is in the cart
  await POManager.dashboardPage.topBar.cartButton.click();
  await expect(POManager.cartPage.items).toBeVisible();
  await expect(POManager.cartPage.items).toHaveCount(1);
  await expect(POManager.cartPage.getCartItemName(0)).toHaveText(itemName, {
    ignoreCase: true,
  });

  // Proceed to checkout
  await POManager.cartPage.checkoutButton.click();
  await POManager.checkoutPage.selectCountry('SPAIN');
  await POManager.checkoutPage.submitButton.click();

  // Verify order confirmation and get order ID
  await expect(
    POManager.orderConfirmationPage.confirmationMessage,
  ).toBeVisible();
  await expect(POManager.orderConfirmationPage.confirmationMessage).toHaveText(
    ' Thankyou for the order. ',
  );

  const orderId =
    (await POManager.orderConfirmationPage.orderId.textContent()) as string;
  const orderNumber = orderId.split(' ')[2].trim();

  // Go to orders page and open the order details
  await POManager.orderConfirmationPage.topbar.ordersButton.click();
  await POManager.ordersPage.ordersTable.waitFor();
  await POManager.ordersPage.openOrder(orderNumber);

  await expect(POManager.orderDetailsPage.orderNumber).toBeVisible();
  await expect(POManager.orderDetailsPage.orderNumber).toHaveText(orderNumber);
});
