import { test, expect, Page, TestInfo } from '@playwright/test';
import { visualDiff, visualDiffAlbum } from './visualDiffAlbum';

test('Small Album', async ({ page }, testInfo) => {
    await visualDiff(page, '/albums/flowers/');
});

test('Small Album Buy Links', async ({ page }, testInfo) => {
    await visualDiffAlbum(page, '/albums/osaka/', testInfo);
});

test('Small Album Purchase', async ({ page }) => {
    await visualDiff(page, '/albums/osaka/purchase.html');
});

test('Albums', async ({ page }) => {
    await visualDiff(page, '/albums/');
});