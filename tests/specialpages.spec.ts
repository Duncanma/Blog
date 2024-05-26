import { test, expect, Page } from '@playwright/test';
import { visualDiff } from './visualDiffAlbum';

test('About', async ({ page }) => {
    await visualDiff(page, '/about/');
});

test('Home', async ({ page }) => {
    await visualDiff(page, '/');
});

test('Publications', async ({ page }) => {
    await visualDiff(page, '/publications/');
});
