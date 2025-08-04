import { test, expect, request } from '@playwright/test';

let token = '';

const loginPayload = {
  userEmail: process.env.USERNAME,
  userPassword: process.env.PASSWORD,
};

test.beforeAll(async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://rahulshettyacademy.com',
  });
  const response = await apiContext.post('/api/ecom/auth/login', {
    data: loginPayload,
  });
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  token = body.token;
});

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);
});

test('Should check though API', async () => {
  console.log(`Token => ${token}`);
});
