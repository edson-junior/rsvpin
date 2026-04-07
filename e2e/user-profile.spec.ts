import { expect, test } from '@playwright/test';
import { signIn, signOut, signUp } from './utils';

test.describe('User Profile', () => {
  const profileUser = {
    name: `Profile User ${Date.now()}`,
    email: `profileuser${Date.now()}@example.com`,
    username: `profileuser${Date.now()}`,
    password: 'TestPass123!',
  };

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await signUp(page, profileUser);
    await page.close();
  });

  test('displays user profile page', async ({ page }) => {
    await page.goto(`/user/${profileUser.username}`);

    await expect(
      page.getByRole('heading', { name: profileUser.name }),
    ).toBeVisible();
    await expect(page.getByText(profileUser.username)).toBeVisible();
  });

  test('shows "Hosted" and "Past" tabs', async ({ page }) => {
    await page.goto(`/user/${profileUser.username}`);

    await expect(page.getByRole('tab', { name: /hosted/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /past/i })).toBeVisible();
  });

  test('shows "No upcoming events" for new user', async ({ page }) => {
    await page.goto(`/user/${profileUser.username}`);

    await expect(page.getByText(/no upcoming events/i)).toBeVisible();
  });

  test('shows "No past events" in past tab', async ({ page }) => {
    await page.goto(`/user/${profileUser.username}`);

    await page.getByRole('tab', { name: /past/i }).click();
    await expect(page.getByText(/no past events/i)).toBeVisible();
  });

  test('owner sees "Edit profile" button', async ({ page }) => {
    await signIn(page, profileUser);
    await page.goto(`/user/${profileUser.username}`);

    await expect(
      page.getByRole('link', { name: /edit profile/i }),
    ).toBeVisible();
  });

  test('non-owner does not see "Edit profile" button', async ({ page }) => {
    await page.goto(`/user/${profileUser.username}`);

    await expect(
      page.getByRole('link', { name: /edit profile/i }),
    ).not.toBeVisible();
  });

  test('returns 404 for non-existent user', async ({ page }) => {
    await page.goto('/user/nonexistentuserxyz123');

    await expect(page.getByText(/not found/i)).toBeVisible();
  });

  test('navigating to profile via header link', async ({ page }) => {
    await signIn(page, profileUser);

    await page
      .getByRole('link', { name: new RegExp(profileUser.name) })
      .click();
    await expect(page).toHaveURL(`/user/${profileUser.username}`);
  });

  test('hosted events appear on profile after creating an event', async ({
    page,
  }) => {
    await signIn(page, profileUser);

    // Create an event
    const eventName = `Profile Event ${Date.now()}`;
    await page.goto('/events/create');
    await page.getByLabel(/event title/i).fill(eventName);
    await page.getByLabel(/date/i).fill('2026-12-25');
    await page.getByLabel(/time/i).fill('14:00');
    await page.getByLabel(/^location/i).fill('Profile Venue');
    await page.getByLabel(/category/i).fill('Testing');
    await page.getByLabel(/max guests/i).fill('50');
    await page.getByLabel(/description/i).fill('Test event for profile.');
    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });
    await page.waitForURL(/\/events\/.+/);

    // Visit profile
    await page.goto(`/user/${profileUser.username}`);
    await expect(page.getByText(eventName)).toBeVisible();
  });
});

test.describe('Edit Profile', () => {
  const editUser = {
    name: `EditProfile ${Date.now()}`,
    email: `editprofile${Date.now()}@example.com`,
    username: `editprofile${Date.now()}`,
    password: 'TestPass123!',
  };

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await signUp(page, editUser);
    await page.close();
  });

  test('redirects unauthenticated users to sign-in', async ({ page }) => {
    await page.goto(`/user/${editUser.username}/settings`);

    await expect(page).toHaveURL(/\/signin\?returnTo=/);
  });

  test('shows edit profile form with pre-filled data', async ({ page }) => {
    await signIn(page, editUser);
    await page.goto(`/user/${editUser.username}/settings`);

    await expect(
      page.getByRole('heading', { name: /account settings/i }),
    ).toBeVisible();
    await expect(page.getByLabel(/^name/i)).toHaveValue(editUser.name);
    await expect(page.getByLabel(/username/i)).toHaveValue(editUser.username);
  });

  test('shows bio, location, and website fields', async ({ page }) => {
    await signIn(page, editUser);
    await page.goto(`/user/${editUser.username}/settings`);

    await expect(page.getByLabel(/bio/i)).toBeVisible();
    await expect(page.getByLabel(/^location/i)).toBeVisible();
    await expect(page.getByLabel(/website/i)).toBeVisible();
  });

  test('successfully updates profile', async ({ page }) => {
    await signIn(page, editUser);
    await page.goto(`/user/${editUser.username}/settings`);

    await page.getByLabel(/bio/i).fill('Updated bio from E2E test');
    await page.getByLabel(/^location/i).fill('Playwright City');
    await page
      .locator('form')
      .first()
      .evaluate((f) => {
        (f as HTMLFormElement).requestSubmit();
      });

    // Should redirect to profile page
    await expect(page).toHaveURL(new RegExp(`/user/${editUser.username}`));
    await expect(page.getByText('Updated bio from E2E test')).toBeVisible();
    await expect(page.getByText('Playwright City')).toBeVisible();
  });

  test('can update username and redirects to new profile URL', async ({
    page,
  }) => {
    const newUsername = `renamed${Date.now()}`;
    await signIn(page, editUser);
    await page.goto(`/user/${editUser.username}/settings`);

    await page.getByLabel(/username/i).clear();
    await page.getByLabel(/username/i).fill(newUsername);
    await page
      .locator('form')
      .first()
      .evaluate((f) => {
        (f as HTMLFormElement).requestSubmit();
      });

    await expect(page).toHaveURL(new RegExp(`/user/${newUsername}`));

    // Update username for further tests
    editUser.username = newUsername;
  });

  test('cancel button returns to profile page', async ({ page }) => {
    await signIn(page, editUser);
    await page.goto(`/user/${editUser.username}/settings`);

    await page.getByRole('link', { name: /cancel/i }).click();
    await expect(page).toHaveURL(`/user/${editUser.username}`);
  });

  test('shows validation error for empty name', async ({ page }) => {
    await signIn(page, editUser);
    await page.goto(`/user/${editUser.username}/settings`);

    await page.getByLabel(/^name/i).clear();
    await page
      .locator('form')
      .first()
      .evaluate((f) => {
        const form = f as HTMLFormElement;
        form.noValidate = true;
        form.requestSubmit();
      });

    await expect(page.locator('.text-red-500')).toBeVisible();
  });

  test('shows danger zone with delete account button', async ({ page }) => {
    await signIn(page, editUser);
    await page.goto(`/user/${editUser.username}/settings`);

    await expect(page.getByText(/danger zone/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /delete/i })).toBeVisible();
  });

  test('non-owner cannot access another user settings', async ({
    page,
    browser,
  }) => {
    // Create another user
    const otherUser = {
      name: `Other ${Date.now()}`,
      email: `other${Date.now()}@example.com`,
      username: `other${Date.now()}`,
      password: 'TestPass123!',
    };
    const otherPage = await browser.newPage();
    await signUp(otherPage, otherUser);
    await otherPage.close();

    // Sign in as editUser and try to access otherUser's settings
    await signIn(page, editUser);
    await page.goto(`/user/${otherUser.username}/settings`);

    await expect(page.getByText(/not found/i)).toBeVisible();
  });
});

test.describe('Delete Account', () => {
  test('user can delete their account', async ({ page }) => {
    const deleteUser = {
      name: `DeleteMe ${Date.now()}`,
      email: `deleteme${Date.now()}@example.com`,
      username: `deleteme${Date.now()}`,
      password: 'TestPass123!',
    };
    await signUp(page, deleteUser);
    await page.goto(`/user/${deleteUser.username}/settings`);

    // Click delete button to open dialog
    await page
      .getByRole('button', { name: /delete/i })
      .first()
      .click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByText(/are you sure.*delete your account/i),
    ).toBeVisible();

    // Confirm deletion
    await dialog.getByRole('button', { name: /delete account/i }).click();

    // Should redirect to home
    await expect(page).toHaveURL('/');

    // Profile should no longer exist
    await page.goto(`/user/${deleteUser.username}`);
    await expect(page.getByText(/not found/i)).toBeVisible();
  });
});
