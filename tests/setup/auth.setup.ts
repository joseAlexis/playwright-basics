
import { test as setup, expect, Page } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import path from 'path';
import fs from 'fs';

const authDir = path.resolve(__dirname, '../../.auth');
const authFile = path.join(authDir, 'user.json');

setup.use({ baseURL: 'https://rahulshettyacademy.com' });

setup('authenticate', async ({ page }) => {
  // Ensure .auth directory exists
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const loginPage = new LoginPage(page);
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;

  await loginPage.goTo();
  await loginPage.validLogin(username, password);

  await page.context().storageState({ path: authFile });
});
