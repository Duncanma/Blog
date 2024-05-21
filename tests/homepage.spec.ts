import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Duncan Mackenzie");
});

test('get started link', async ({ page }) => {
  await page.goto('/');
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Photography Content' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Posts on Engineering Management' })).toBeVisible();
});
