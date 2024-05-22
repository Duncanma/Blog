import { test, expect, Page, TestInfo } from '@playwright/test';

test('Visual Diff About', async ({ page }) => {
    await visualDiff(page, '/about/');
});

test('Visual Diff Text and Image', async ({ page }) => {
    await visualDiff(page, '/blog/space-games/');
});

test('Visual Diff Sample Code', async ({ page }) => {
    await visualDiff(page, '/blog/image-formats/');
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

    await expect(page).toHaveScreenshot({ fullPage: true, timeout: 10000, stylePath: "tests/screenshot.css" });
}
