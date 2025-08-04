import test, { expect } from '@playwright/test';

test.use({ baseURL: 'https://rahulshettyacademy.com' });

test.beforeEach(async ({ page }) => {
  const getProductsPromise = page.waitForResponse('**/get-all-products');
  await page.goto('/client/#/auth/login');
  await page.waitForLoadState('networkidle');

  await page.locator('#userEmail').fill(process.env.USERNAME);
  await page.locator('#userPassword').fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'login' }).click();

  await getProductsPromise;
  await expect(page.locator('#products')).toBeVisible();
});

test('Should add a product and complete the checkout process', async ({
  page,
}) => {
  const itemName = 'IPHONE 13 PRO';

  // Add item into the cart
  const items = page.locator('.card-body');
  for (let i = 0; i < (await items.count()); i++) {
    const currentName = await items.nth(i).locator('b').textContent();

    if (currentName === itemName) {
      await items.nth(i).locator("text=' Add To Cart'").click();
      const notification = page.locator('#toast-container');
      await expect(notification).toBeVisible();
      break;
    }
  }

  // Go to cart
  await page.locator("[routerlink*='cart']").click();
  await page.locator('.cart li').first().waitFor();

  const bool = await page.locator(`h3:has-text('${itemName}')`).isVisible();
  await expect(bool).toBeTruthy();

  await page.getByText('Checkout').click();

  await page.locator('[placeholder*="Country"]').pressSequentially('SPA');
  const options = await page.locator('.ta-item');
  await options.waitFor();
  await options.click();

  await expect(page.locator('.user__name label')).toHaveText(
    process.env.USERNAME
  );
  await page.locator('.action__submit').click();

  await expect(page.locator('.hero-primary')).toHaveText(
    ' Thankyou for the order. '
  );
  const orderId = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent();

  await page.locator('button[routerlink*="/myorders"]').click();
  await page.locator('tbody').waitFor();
  const rows = await page.locator('tbody tr');

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();

    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }

  const orderDetails = await page.locator('.col-text').textContent();
  expect(orderId.includes(orderDetails)).toBeTruthy();
});
