import { Locator, Page } from '@playwright/test';

export class OrderDetailsPage {
  protected page: Page;
  readonly orderNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderNumber = page.locator('.col-text')
  }
}
