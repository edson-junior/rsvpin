import { expect, test } from '@playwright/test';
import { signIn, signUp, testUser } from './utils';

test.describe('Sign Up', () => {
  const uniqueUser = {
    name: `Signup User ${Date.now()}`,
    email: `signup${Date.now()}@example.com`,
    username: `signup${Date.now()}`,
    password: 'TestPass123!',
  };

  test('shows sign-up page with form fields', async ({ page }) => {
    await page.goto('/signup');

    await expect(
      page.getByRole('heading', { name: /join the community/i }),
    ).toBeVisible();
    await expect(page.getByLabel('Name', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
  });

  test('shows link to sign-in page', async ({ page }) => {
    await page.goto('/signup');

    const signInLink = page
      .getByRole('main')
      .getByRole('link', { name: /sign in/i });
    await expect(signInLink).toBeVisible();
    await signInLink.click();
    await expect(page).toHaveURL('/signin');
  });

  test('shows validation errors for empty fields', async ({ page }) => {
    await page.goto('/signup');
    await page.locator('form').evaluate((f) => {
      const form = f as HTMLFormElement;
      form.noValidate = true;
      form.requestSubmit();
    });

    await expect(page.locator('.text-red-500').first()).toBeVisible();
  });

  test('shows validation error for short password', async ({ page }) => {
    await page.goto('/signup');
    await page.getByLabel('Name', { exact: true }).fill('Test');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('12345');
    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });

    await expect(page.locator('.text-red-500')).toBeVisible();
  });

  test('shows validation error for invalid username characters', async ({
    page,
  }) => {
    await page.goto('/signup');
    await page.getByLabel('Name', { exact: true }).fill('Test');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Username').fill('invalid user!');
    await page.getByLabel('Password').fill('TestPass123!');
    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });

    await expect(page.locator('.text-red-500')).toBeVisible();
  });

  test('successfully signs up a new user', async ({ page }) => {
    await signUp(page, uniqueUser);

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
  });

  test('shows error for duplicate email', async ({ page }) => {
    const dupUser = {
      ...uniqueUser,
      username: `dup${Date.now()}`,
    };
    await page.goto('/signup');
    await page.getByLabel('Name', { exact: true }).fill(dupUser.name);
    await page.getByLabel('Email').fill(dupUser.email);
    await page.getByLabel('Username').fill(dupUser.username);
    await page.getByLabel('Password').fill(dupUser.password);
    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });

    await expect(
      page.locator('text=/already exists|already taken/i'),
    ).toBeVisible();
  });

  test('shows error for duplicate username', async ({ page }) => {
    const dupUser = {
      ...uniqueUser,
      email: `dup${Date.now()}@example.com`,
    };
    await page.goto('/signup');
    await page.getByLabel('Name', { exact: true }).fill(dupUser.name);
    await page.getByLabel('Email').fill(dupUser.email);
    await page.getByLabel('Username').fill(dupUser.username);
    await page.getByLabel('Password').fill(dupUser.password);
    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });

    await expect(
      page.locator('text=/already taken|already exists/i'),
    ).toBeVisible();
  });

  test('redirects to home if already logged in', async ({ page }) => {
    await signUp(page, {
      name: `Redir ${Date.now()}`,
      email: `redir${Date.now()}@example.com`,
      username: `redir${Date.now()}`,
      password: 'TestPass123!',
    });

    await page.goto('/signup');
    await expect(page).toHaveURL('/');
  });
});

test.describe('Sign In', () => {
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await signUp(page, testUser);
    // Sign out so we can test sign-in
    await page.getByRole('button', { name: 'Sign out' }).click();
    await page.close();
  });

  test('shows sign-in page with form fields', async ({ page }) => {
    await page.goto('/signin');

    await expect(
      page.getByRole('heading', { name: /welcome back/i }),
    ).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  test('shows link to sign-up page', async ({ page }) => {
    await page.goto('/signin');

    const signUpLink = page
      .getByRole('main')
      .getByRole('link', { name: /sign up/i });
    await expect(signUpLink).toBeVisible();
    await signUpLink.click();
    await expect(page).toHaveURL('/signup');
  });

  test('shows validation errors for empty fields', async ({ page }) => {
    await page.goto('/signin');
    await page.locator('form').evaluate((f) => {
      const form = f as HTMLFormElement;
      form.noValidate = true;
      form.requestSubmit();
    });

    await expect(page.locator('.text-red-500').first()).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/signin');
    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('WrongPass123!');
    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });

    await expect(
      page.locator('text=/invalid email or password/i'),
    ).toBeVisible();
  });

  test('shows error for wrong password', async ({ page }) => {
    await page.goto('/signin');
    await page.getByLabel('Email').fill(testUser.email);
    await page.getByLabel('Password').fill('WrongPassword1!');
    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });

    await expect(
      page.locator('text=/invalid email or password/i'),
    ).toBeVisible();
  });

  test('successfully signs in', async ({ page }) => {
    await signIn(page);

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
  });

  test('redirects to home if already logged in', async ({ page }) => {
    await signIn(page);

    await page.goto('/signin');
    await expect(page).toHaveURL('/');
  });

  test('redirects to returnTo path after sign-in', async ({ page }) => {
    await page.goto('/signin?returnTo=/events/create');
    await page.getByLabel('Email').fill(testUser.email);
    await page.getByLabel('Password').fill(testUser.password);
    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });

    await expect(page).toHaveURL('/events/create');
  });
});

test.describe('Sign Out', () => {
  test('signs the user out and redirects to sign-in', async ({ page }) => {
    await signIn(page);

    await page.getByRole('button', { name: 'Sign out' }).click();
    await expect(page).toHaveURL('/signin');

    // Verify the user is actually signed out
    await page.goto('/');
    await expect(
      page.getByRole('navigation').getByRole('link', { name: /sign in/i }),
    ).toBeVisible();
  });
});
