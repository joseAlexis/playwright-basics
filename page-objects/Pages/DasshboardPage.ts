import { Page, Locator } from '@playwright/test';
import { TopBarComponent } from '../Components/TopBar';
export class DashboardPage {
  protected page: Page;

  readonly topBar: TopBarComponent;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topBar = new TopBarComponent(page);
    this.items = page.locator('.card-body');
  }

  async addItemToCart(itemName: string) {
    const item = this.items.filter({ hasText: itemName });
    await item.locator("text=' Add To Cart'").click();
  }
}
