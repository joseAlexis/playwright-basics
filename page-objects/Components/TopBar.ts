import { Locator, Page } from '@playwright/test';

export class TopBarComponent {
  protected page: Page;
  readonly cartButton: Locator;
  readonly ordersButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('nav [routerlink*="cart"]');
    this.ordersButton = page.locator('nav [routerlink*="myorders"]');
  }
}
