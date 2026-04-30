import { Locator, Page } from '@playwright/test';
import { TopBarComponent } from '../Components/TopBar';

export class OrderConfirmationPage {
  protected page: Page;
  readonly topbar: TopBarComponent;
  readonly confirmationMessage: Locator;
  readonly orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topbar = new TopBarComponent(page);
    this.confirmationMessage = page.locator('.hero-primary');
    this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
  }
}
