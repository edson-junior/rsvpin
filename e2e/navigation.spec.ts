import { expect, test } from '@playwright/test';
import { signIn, signUp } from './utils';

test.describe('Home Page', () => {
  test('displays hero section with heading', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        name: /discover, create, and attend unforgettable events/i,
      }),
    ).toBeVisible();
  });

  test('shows CTA buttons', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('link', { name: /create your first event/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('main').getByRole('link', { name: /explore events/i }),
    ).toBeVisible();
  });

  test('"Create your first Event" links to /events/create', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /create your first event/i }).click();
    await expect(page).toHaveURL(/events\/create|signin/);
  });

  test('"Explore Events" links to /events', async ({ page }) => {
    await page.goto('/');

    await page
      .getByRole('main')
      .getByRole('link', { name: /explore events/i })
      .click();
    await expect(page).toHaveURL('/events');
  });
});

test.describe('Header Navigation', () => {
  test('shows logo linking to home', async ({ page }) => {
    await page.goto('/events');

    const logo = page.getByRole('navigation').getByRole('link').first();
    await expect(logo).toBeVisible();
    await logo.click();
    await expect(page).toHaveURL('/');
  });

  test('shows "Explore Events" nav link', async ({ page }) => {
    await page.goto('/');

    await expect(
      page
        .getByRole('navigation')
        .getByRole('link', { name: /explore events/i }),
    ).toBeVisible();
  });

  test('shows "Create Event" nav link', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('link', { name: /create event/i }).first(),
    ).toBeVisible();
  });

  test('shows "Sign in" button when unauthenticated', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('navigation').getByRole('link', { name: /sign in/i }),
    ).toBeVisible();
  });

  test('shows user name and "Sign out" when authenticated', async ({
    page,
  }) => {
    const navUser = {
      name: `NavUser ${Date.now()}`,
      email: `navuser${Date.now()}@example.com`,
      username: `navuser${Date.now()}`,
      password: 'TestPass123!',
    };
    await signUp(page, navUser);

    await expect(page.getByText(navUser.name)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign out/i })).toBeVisible();
  });
});

test.describe('Footer', () => {
  test('displays copyright text', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByText(/© \d{4} RSVPin\. All rights reserved\./),
    ).toBeVisible();
  });

  test('shows navigation links', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: /discover/i })).toBeVisible();
    await expect(
      footer.getByRole('link', { name: /create event/i }),
    ).toBeVisible();
  });
});

test.describe('Not Found Page', () => {
  test('shows 404 for invalid routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');

    await expect(page.getByText(/not found/i)).toBeVisible();
  });

  test('shows "Return to Homepage" link', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');

    const link = page.getByRole('link', { name: /return to homepage/i });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/events');
  });
});

test.describe('Responsive Design', () => {
  test('mobile menu toggle works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuButton = page.getByLabel(/toggle menu/i);
    await expect(menuButton).toBeVisible();

    await menuButton.click();
    await expect(
      page.getByRole('banner').getByRole('link', { name: /discover/i }),
    ).toBeVisible();
  });
});
