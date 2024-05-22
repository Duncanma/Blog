import { test, expect, Page, TestInfo } from '@playwright/test';

test('Visual Diff About', async ({ page }) => {
    await visualDiff(page, '/about/');
});

test('Visual Diff Text and Image', async ({ page }) => {
    await visualDiff(page, '/blog/space-games/');
});

test('Visual Diff Small Album', async ({ page }, testInfo) => {
    await visualDiff(page, '/albums/fall-trail-walk/');
});

test('Visual Diff Small Album Buy Links', async ({ page }, testInfo) => {
    await visualDiffAlbum(page, '/albums/osaka/', testInfo);
});

async function visualDiffAlbum(page: Page, url: string, testInfo: TestInfo) {
    await page.goto(url);

    // Trigger loading of all images
    for (const img of await page.locator('//img').all()) {
        await img.scrollIntoViewIfNeeded();
    }

    var screenshot = testInfo.title + ".png";
    await expect(page).toHaveScreenshot(screenshot, { fullPage: true, timeout: 50000, stylePath: "tests/screenshot.css"});

    screenshot = testInfo.title + "purchase.png";
    await page.click("#gallery > div.availableForPurchase");
    await page.waitForSelector("body.showBuyButtons");
    await expect(page).toHaveScreenshot(screenshot, { fullPage: true, timeout: 50000, stylePath: "tests/screenshot.css"});
}

async function visualDiff(page: Page, url: string) {
    await page.goto(url);

    // Trigger loading of all images
    for (const img of await page.locator('//img').all()) {
        await img.scrollIntoViewIfNeeded();
    }

    await expect(page).toHaveScreenshot({ fullPage: true, timeout: 50000, stylePath: "tests/screenshot.css"});
}
