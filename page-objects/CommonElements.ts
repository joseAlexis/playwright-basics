import { Locator, Page } from '@playwright/test';

export class CommonElements {
  protected page: Page;
  readonly notification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.notification = page.locator('#toast-container');
  }
}
