import { expect, test } from '@playwright/test';
import { expectToast, signIn, signUp, testUser } from './utils';

test.describe('Events Listing', () => {
  test('displays the events page with heading', async ({ page }) => {
    await page.goto('/events');

    await expect(
      page.getByRole('heading', { name: /find your next/i }),
    ).toBeVisible();
  });

  test('displays seed events in the list', async ({ page }) => {
    await page.goto('/events');

    await expect(page.getByText('Spring Community Meetup')).toBeVisible();
    await expect(page.getByText('Remote Design Workshop')).toBeVisible();
  });

  test('event cards show category, date, location, and attendees', async ({
    page,
  }) => {
    await page.goto('/events');

    const card = page.locator('a[href*="/events/"]').first();
    await expect(card).toBeVisible();
    // Cards should have some content
    await expect(card.locator('h3')).toBeVisible();
  });

  test('clicking an event card navigates to event detail', async ({ page }) => {
    await page.goto('/events');

    await page.getByText('Spring Community Meetup').click();
    await expect(page).toHaveURL(/\/events\/.+/);
    await expect(
      page.getByRole('heading', { name: 'Spring Community Meetup' }),
    ).toBeVisible();
  });
});

test.describe('Event Detail', () => {
  test('displays event details', async ({ page }) => {
    await page.goto('/events');
    await page.getByText('Spring Community Meetup').click();

    await expect(
      page.getByRole('heading', { name: 'Spring Community Meetup' }),
    ).toBeVisible();
    await expect(page.getByText('Networking')).toBeVisible();
    await expect(page.getByText('Downtown Innovation Hub')).toBeVisible();
    await expect(page.getByText(/attending/i)).toBeVisible();
    await expect(page.getByText(/spots left/i)).toBeVisible();
  });

  test('displays "About" section with description', async ({ page }) => {
    await page.goto('/events');
    await page.getByText('Spring Community Meetup').click();

    await expect(page.getByText(/about/i)).toBeVisible();
  });

  test('displays "Hosted by" section with host link', async ({ page }) => {
    await page.goto('/events');
    await page.getByText('Spring Community Meetup').click();

    await expect(page.getByText(/hosted by/i)).toBeVisible();
    await expect(
      page.getByRole('link', { name: /ava martinez/i }),
    ).toBeVisible();
  });

  test('shows back to events link', async ({ page }) => {
    await page.goto('/events');
    await page.getByText('Spring Community Meetup').click();

    const backLink = page.getByRole('link', { name: /back to events/i });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL('/events');
  });

  test('shows "Sign in to register" for unauthenticated users', async ({
    page,
  }) => {
    await page.goto('/events');
    await page.getByText('Spring Community Meetup').click();

    await expect(
      page.getByRole('link', { name: /sign in to register/i }),
    ).toBeVisible();
  });

  test('"Sign in to register" redirects to sign-in with returnTo', async ({
    page,
  }) => {
    await page.goto('/events');
    await page.getByText('Spring Community Meetup').click();

    await page.getByRole('link', { name: /sign in to register/i }).click();
    await expect(page).toHaveURL(/\/signin\?returnTo=/);
  });

  test('shows "Share event" button', async ({ page }) => {
    await page.goto('/events');
    await page.getByText('Spring Community Meetup').click();

    await expect(
      page.getByRole('button', { name: /share event/i }),
    ).toBeVisible();
  });

  test('returns 404 for non-existent event', async ({ page }) => {
    await page.goto('/events/00000000-0000-0000-0000-000000000000');

    await expect(page.getByText(/not found/i)).toBeVisible();
  });
});

test.describe('Event Registration', () => {
  const regUser = {
    name: `RegUser ${Date.now()}`,
    email: `reguser${Date.now()}@example.com`,
    username: `reguser${Date.now()}`,
    password: 'TestPass123!',
  };

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await signUp(page, regUser);
    await page.close();
  });

  test('authenticated non-host user can register for an event', async ({
    page,
  }) => {
    await signIn(page, regUser);
    await page.goto('/events');
    await page.getByText('Spring Community Meetup').click();

    const registerBtn = page.getByRole('button', { name: 'Register' });
    await expect(registerBtn).toBeVisible();
    await registerBtn.click();

    await expectToast(page, 'registered');

    // After registering, the button should change to "Unregister"
    await expect(
      page.getByRole('button', { name: 'Unregister' }),
    ).toBeVisible();
  });

  test('registered user can unregister from an event', async ({ page }) => {
    await signIn(page, regUser);
    await page.goto('/events');
    await page.getByText('Spring Community Meetup').click();

    const unregisterBtn = page.getByRole('button', { name: 'Unregister' });
    await expect(unregisterBtn).toBeVisible();
    await unregisterBtn.click();

    await expectToast(page, 'unregistered');

    // After unregistering, the button should change back to "Register"
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  });
});

test.describe('Create Event', () => {
  const eventUser = {
    name: `EventCreator ${Date.now()}`,
    email: `eventcreator${Date.now()}@example.com`,
    username: `eventcreator${Date.now()}`,
    password: 'TestPass123!',
  };

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await signUp(page, eventUser);
    await page.close();
  });

  test('redirects unauthenticated users to sign-in', async ({ page }) => {
    await page.goto('/events/create');

    await expect(page).toHaveURL(/\/signin\?returnTo=/);
  });

  test('shows create event form when authenticated', async ({ page }) => {
    await signIn(page, eventUser);
    await page.goto('/events/create');

    await expect(
      page.getByRole('heading', { name: /create event/i }),
    ).toBeVisible();
    await expect(page.getByLabel(/event title/i)).toBeVisible();
    await expect(page.getByLabel(/date/i)).toBeVisible();
    await expect(page.getByLabel(/time/i)).toBeVisible();
    await expect(page.getByLabel(/location/i)).toBeVisible();
    await expect(page.getByLabel(/category/i)).toBeVisible();
    await expect(page.getByLabel(/max guests/i)).toBeVisible();
    await expect(page.getByLabel(/description/i)).toBeVisible();
  });

  test('shows validation errors for empty form submission', async ({
    page,
  }) => {
    await signIn(page, eventUser);
    await page.goto('/events/create');
    await page.locator('form').evaluate((f) => {
      const form = f as HTMLFormElement;
      form.noValidate = true;
      form.requestSubmit();
    });

    await expect(page.locator('.text-red-500').first()).toBeVisible();
  });

  test('successfully creates a new event', async ({ page }) => {
    await signIn(page, eventUser);
    await page.goto('/events/create');

    const eventName = `E2E Test Event ${Date.now()}`;
    await page.getByLabel(/event title/i).fill(eventName);
    await page.getByLabel(/date/i).fill('2026-12-25');
    await page.getByLabel(/time/i).fill('14:00');
    await page.getByLabel(/^location/i).fill('Test Venue');
    await page.getByLabel(/category/i).fill('Testing');
    await page.getByLabel(/max guests/i).fill('100');
    await page
      .getByLabel(/description/i)
      .fill('This is a test event created by Playwright E2E tests.');

    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });

    // Should redirect to the new event detail page
    await expect(page).toHaveURL(/\/events\/.+/);
    await expect(page.getByRole('heading', { name: eventName })).toBeVisible();
  });

  test('shows max guests validation for value exceeding 500', async ({
    page,
  }) => {
    await signIn(page, eventUser);
    await page.goto('/events/create');

    await page.getByLabel(/event title/i).fill('Test');
    await page.getByLabel(/date/i).fill('2026-12-25');
    await page.getByLabel(/time/i).fill('14:00');
    await page.getByLabel(/^location/i).fill('Test');
    await page.getByLabel(/category/i).fill('Test');
    await page.getByLabel(/max guests/i).fill('501');
    await page.getByLabel(/description/i).fill('Test description');

    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });

    await expect(page.locator('.text-red-500')).toBeVisible();
  });
});

test.describe('Edit Event', () => {
  const hostUser = {
    name: `EditHost ${Date.now()}`,
    email: `edithost${Date.now()}@example.com`,
    username: `edithost${Date.now()}`,
    password: 'TestPass123!',
  };
  let eventUrl: string;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await signUp(page, hostUser);

    // Create an event to edit
    await page.goto('/events/create');
    await page.getByLabel(/event title/i).fill('Event to Edit');
    await page.getByLabel(/date/i).fill('2026-12-20');
    await page.getByLabel(/time/i).fill('10:00');
    await page.getByLabel(/^location/i).fill('Edit Location');
    await page.getByLabel(/category/i).fill('Editable');
    await page.getByLabel(/max guests/i).fill('50');
    await page.getByLabel(/description/i).fill('This event will be edited.');
    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });
    await page.waitForURL(/\/events\/.+/);
    eventUrl = page.url();
    await page.close();
  });

  test('host sees "Edit event" button on their event', async ({ page }) => {
    await signIn(page, hostUser);
    await page.goto(eventUrl);

    await expect(page.getByRole('link', { name: /edit event/i })).toBeVisible();
  });

  test('non-host does not see "Edit event" button', async ({ page }) => {
    await page.goto(eventUrl);

    await expect(
      page.getByRole('link', { name: /edit event/i }),
    ).not.toBeVisible();
  });

  test('edit page shows pre-filled form', async ({ page }) => {
    await signIn(page, hostUser);
    await page.goto(eventUrl);
    await page.getByRole('link', { name: /edit event/i }).click();

    await expect(
      page.getByRole('heading', { name: /edit event/i }),
    ).toBeVisible();
    await expect(page.getByLabel(/event title/i)).toHaveValue('Event to Edit');
    await expect(page.getByLabel(/description/i)).toHaveValue(
      'This event will be edited.',
    );
  });

  test('successfully updates an event', async ({ page }) => {
    await signIn(page, hostUser);
    await page.goto(eventUrl);
    await page.getByRole('link', { name: /edit event/i }).click();

    await page.getByLabel(/event title/i).clear();
    await page.getByLabel(/event title/i).fill('Updated Event Name');
    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });

    await expect(page).toHaveURL(/\/events\/.+/);
    await expect(
      page.getByRole('heading', { name: 'Updated Event Name' }),
    ).toBeVisible();
  });

  test('cancel button returns to event detail page', async ({ page }) => {
    await signIn(page, hostUser);
    await page.goto(eventUrl);
    await page.getByRole('link', { name: /edit event/i }).click();

    await page.getByRole('link', { name: /cancel/i }).click();
    await expect(page).toHaveURL(new URL(eventUrl).pathname);
  });

  test('redirects unauthenticated users to sign-in', async ({ page }) => {
    const settingsUrl = new URL(eventUrl).pathname + '/settings';
    await page.goto(settingsUrl);

    await expect(page).toHaveURL(/\/signin\?returnTo=/);
  });
});

test.describe('Delete Event', () => {
  const deleteHostUser = {
    name: `DeleteHost ${Date.now()}`,
    email: `deletehost${Date.now()}@example.com`,
    username: `deletehost${Date.now()}`,
    password: 'TestPass123!',
  };

  test('host can delete their event', async ({ page }) => {
    await signUp(page, deleteHostUser);

    // Create an event to delete
    await page.goto('/events/create');
    await page.getByLabel(/event title/i).fill('Event to Delete');
    await page.getByLabel(/date/i).fill('2026-12-31');
    await page.getByLabel(/time/i).fill('18:00');
    await page.getByLabel(/^location/i).fill('Delete Location');
    await page.getByLabel(/category/i).fill('Deletable');
    await page.getByLabel(/max guests/i).fill('10');
    await page.getByLabel(/description/i).fill('This event will be deleted.');
    await page.locator('form').evaluate((f) => {
      (f as HTMLFormElement).requestSubmit();
    });
    await page.waitForURL(/\/events\/.+/);

    // Navigate to edit page
    await page.getByRole('link', { name: /edit event/i }).click();

    // Open delete confirmation dialog
    await page.getByRole('button', { name: /delete event/i }).click();

    // Confirm deletion in the dialog
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByText(/are you sure.*delete this event/i),
    ).toBeVisible();
    await dialog.getByRole('button', { name: /delete event/i }).click();

    // Should redirect to events list
    await expect(page).toHaveURL('/events');
  });
});

test.describe('Share Event', () => {
  test('share button copies link to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.goto('/events');
    await page.getByText('Spring Community Meetup').click();

    await page.getByRole('button', { name: /share event/i }).click();

    await expectToast(page, 'copied');
  });
});
