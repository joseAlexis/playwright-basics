import { Page, Locator } from '@playwright/test';

export class OrdersPage {
  protected page: Page;

  readonly ordersTable: Locator;
  readonly noOrdersMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersTable = page.locator('tbody');
    this.noOrdersMessage = page.locator('.table-responsive div.ng-star-inserted');
  }

  async openOrder(orderId: string) {
    const rows = await this.ordersTable.locator('tr');

    const orderRow = await rows.filter({hasText: orderId}).first();
    await orderRow.locator('button').first().click();
  }
  
  async goto() {
    await this.page.goto('/client/#/dashboard/myorders');
    await this.page.waitForLoadState('networkidle');
    await this.ordersTable.waitFor();
  }
}
