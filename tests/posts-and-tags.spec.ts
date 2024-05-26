import { test, expect, Page } from '@playwright/test';
import { visualDiff } from './visualDiffAlbum';

test('Post with images', async ({ page }) => {
    await visualDiff(page, '/blog/space-games/');
});

test('Post with Code', async ({ page }) => {
    await visualDiff(page, '/blog/moving-my-google-fonts-local/');
});

test('Tags', async ({ page }) => {
    await visualDiff(page, '/tags/');
});

test('Tag Performance', async ({ page }) => {
    await visualDiff(page, '/tags/performance/');
});

test('Blog', async ({ page }) => {
    await visualDiff(page, '/blog/');
});
