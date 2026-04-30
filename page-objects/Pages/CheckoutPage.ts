import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  protected page: Page;
  readonly countryInput: Locator;
  submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.countryInput = page.locator('[placeholder*="Country"]');
    this.submitButton = page.locator('.action__submit');
  }

  async selectCountry(country: string) {
    await this.countryInput.pressSequentially(country);
    const options = await this.page.locator('.ta-item');
    await options.waitFor();
    await options.first().click();
  }
}
