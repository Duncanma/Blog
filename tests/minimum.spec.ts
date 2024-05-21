import { test, expect, Page } from '@playwright/test';

test('Visual Diff About', async ({ page }) => {
    await visualDiff(page, '/about/');
});

test('Visual Diff Text and Image', async ({ page }) => {
    await visualDiff(page, '/blog/space-games/');
});

test('Visual Diff Small Album', async ({ page }) => {
    await visualDiff(page, '/albums/fall-trail-walk/');
});


async function visualDiff(page: Page, url: string) {
    await page.goto(url);

    // Trigger loading of all images
    for (const img of await page.locator('//img').all()) {
        await img.scrollIntoViewIfNeeded();
    }

    // Set up listeners concurrently
    await expect(page).toHaveScreenshot({ fullPage: true, timeout: 50000, stylePath: "tests/screenshot.css"});
}
