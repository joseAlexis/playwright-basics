import test, { expect } from '@playwright/test';
import { DashboardPage } from '../page-objects/Pages/DasshboardPage';
import { CommonElements } from '../page-objects/CommonElements';
import { CartPage } from '../page-objects/Pages/CartPage';
import { CheckoutPage } from '../page-objects/Pages/CheckoutPage';
import { OrderConfirmationPage } from '../page-objects/Pages/OrderConfirmationPage';
import { OrdersPage } from '../page-objects/Pages/OrdersPage';
import { OrderDetailsPage } from '../page-objects/Pages/OrderDetailsPage';

test.use({ baseURL: 'https://rahulshettyacademy.com' });

test.beforeEach(async ({ page }) => {
  await page.goto('/client/#/dashboard/dash');
});

test('Should add a product and complete the checkout process', async ({
  page,
}) => {
  const commonElements = new CommonElements(page);
  const dashboardPage = new DashboardPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const orderConfirmationPage = new OrderConfirmationPage(page);
  const ordersPage = new OrdersPage(page);
  const orderDetailsPage = new OrderDetailsPage(page);

  const itemName = 'IPHONE 13 PRO';

  await dashboardPage.addItemToCart(itemName);
  await expect(commonElements.notification).toBeVisible();

  // Go to cart and verify the item is in the cart
  await dashboardPage.topBar.cartButton.click();
  await expect(cartPage.items).toBeVisible();
  await expect(cartPage.items).toHaveCount(1);
  await expect(cartPage.getCartItemName(0)).toHaveText(itemName, {
    ignoreCase: true,
  });

  // Proceed to checkout
  await cartPage.checkoutButton.click();
  await checkoutPage.selectCountry('SPAIN');
  await checkoutPage.submitButton.click();

  // Verify order confirmation and get order ID
  await expect(orderConfirmationPage.confirmationMessage).toBeVisible();
  await expect(orderConfirmationPage.confirmationMessage).toHaveText(
    ' Thankyou for the order. ',
  );

  const orderId = (await orderConfirmationPage.orderId.textContent()) as string;
  const orderNumber = orderId.split(' ')[2].trim();

  // Go to orders page and open the order details
  await orderConfirmationPage.topbar.ordersButton.click();
  await ordersPage.ordersTable.waitFor();
  await ordersPage.openOrder(orderNumber);

  await expect(orderDetailsPage.orderNumber).toBeVisible();
  await expect(orderDetailsPage.orderNumber).toHaveText(orderNumber);
});
