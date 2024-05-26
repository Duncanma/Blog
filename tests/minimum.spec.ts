import { test, expect, Page, TestInfo } from '@playwright/test';

test('About', async ({ page }) => {
    await visualDiff(page, '/about/');
});

test('Home', async ({ page }) => {
    await visualDiff(page, '/');
});

test('Post with images', async ({ page }) => {
    await visualDiff(page, '/blog/space-games/');
});

test('Post with Code', async ({ page }) => {
    await visualDiff(page, '/blog/moving-my-google-fonts-local/');
});


test('Small Album', async ({ page }, testInfo) => {
    await visualDiff(page, '/albums/flowers/');
});

test('Small Album Buy Links', async ({ page }, testInfo) => {
    await visualDiffAlbum(page, '/albums/osaka/', testInfo);
});

test('Small Album Purchase', async ({ page }, testInfo) => {
    await visualDiffAlbum(page, '/albums/osaka/purchase.html', testInfo);
});

test('Albums', async ({ page }, testInfo) => {
    await visualDiffAlbum(page, '/albums/', testInfo);
});

test('Tags', async ({ page }, testInfo) => {
    await visualDiffAlbum(page, '/tags/', testInfo);
});

test('Tag Performance', async ({ page }, testInfo) => {
    await visualDiffAlbum(page, '/tags/performance/', testInfo);
});

test('Publications', async ({ page }, testInfo) => {
    await visualDiffAlbum(page, '/publications/', testInfo);
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
