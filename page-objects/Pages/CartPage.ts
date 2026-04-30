import { Locator, Page } from '@playwright/test';

export class CartPage {
  protected page: Page;

  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.items = page.locator('.cart li');
    this.checkoutButton = page.getByText('Checkout');
  }

  getCartItemName(index: number) {
    return this.items.nth(index).locator('h3');
  }
}
