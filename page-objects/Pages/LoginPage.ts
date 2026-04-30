import { Locator, Page } from '@playwright/test';

export class LoginPage {
  protected page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#userEmail');
    this.passwordInput = page.locator('#userPassword');
    this.loginButton = page.getByRole('button', { name: 'login' });
  }

  async goTo() {
    await this.page.goto('/client/#/auth/login');
    await this.page.waitForLoadState('networkidle');
  }

  async validLogin(username: string, password: string) {
    const getProductsPromise = this.page.waitForResponse('**/get-all-products');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    await getProductsPromise;
  }
}
