import { Page, Locator } from '@playwright/test';

export class OrdersPage {
  protected page: Page;

  readonly ordersTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersTable = page.locator('tbody');
  }

  async openOrder(orderId: string) {
    const rows = await this.ordersTable.locator('tr');

    const orderRow = await rows.filter({hasText: orderId}).first();
    await orderRow.locator('button').first().click();
  }
}
