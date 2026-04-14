import BasePage from '../../src/pages/BasePage';
import { test, expect } from '../../src/utils/BaseTest';

test.describe('Smoke Tests', () => {
  test('should open home page', async ({ page }) => {
    const basePage = new BasePage(page);

    await basePage.goto('/');
    await basePage.waitForPageLoaded();

    await expect(page).toHaveURL(/.*example.com|\/$/);
  });
});
