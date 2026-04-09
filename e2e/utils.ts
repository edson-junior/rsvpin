import { expect, type Page } from '@playwright/test';

const timestamp = Date.now();

export const testUser = {
  name: `Test User ${timestamp}`,
  email: `testuser${timestamp}@example.com`,
  username: `testuser${timestamp}`,
  password: 'TestPass123!',
};

export async function signUp(page: Page, user = testUser) {
  await page.goto('/signup');
  await page.getByLabel('Name', { exact: true }).fill(user.name);
  await page.getByLabel('Email').fill(user.email);
  await page.getByLabel('Username').fill(user.username);
  await page.getByLabel('Password').fill(user.password);
  await page.locator('form').evaluate((f) => {
    (f as HTMLFormElement).requestSubmit();
  });
  await page.waitForURL('/');
}

export async function signIn(page: Page, user = testUser) {
  await page.goto('/signin');
  await page.getByLabel('Email').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.locator('form').evaluate((f) => {
    (f as HTMLFormElement).requestSubmit();
  });
  await page.waitForURL('/');
}

export async function signOut(page: Page) {
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.waitForURL('/signin');
}

export async function expectToast(page: Page, text: string) {
  const toast = page.locator('[data-sonner-toast]').filter({ hasText: text });
  await expect(toast).toBeVisible({ timeout: 5000 });
}
