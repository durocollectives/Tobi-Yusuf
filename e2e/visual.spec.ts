import { test, expect } from "@playwright/test";

test.describe("S-Tier redesign assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero headline uses clip-path reveal (no span children)", async ({ page }) => {
    const h1 = page.locator(".hero-headline");
    await expect(h1).toBeVisible();
    const spanCount = await h1.locator("span").count();
    expect(spanCount).toBe(0);
  });

  test("work pillar index elements — count is 3", async ({ page }) => {
    const indices = page.locator(".work-pillar-index");
    await expect(indices).toHaveCount(3);
  });

  test("featured offer card — exactly 1", async ({ page }) => {
    const featured = page.locator(".offer-card--featured");
    await expect(featured).toHaveCount(1);
  });

  test("featured testimonial is visible", async ({ page }) => {
    const testimonial = page.locator(".testimonial-featured");
    await expect(testimonial).toBeVisible();
  });

  test("contact split visual is removed", async ({ page }) => {
    const splitVisual = page.locator(".contact-split-visual");
    await expect(splitVisual).toHaveCount(0);
  });

  test("footer wordmark text is visible", async ({ page }) => {
    const wordmark = page.locator(".footer-wordmark-text");
    await expect(wordmark).toBeVisible();
  });

  test("no horizontal overflow on desktop", async ({ page }) => {
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2);
  });

  test("no horizontal overflow on mobile (390px)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    // Use window.scrollX after scrolling left to check for real user-scrollable overflow.
    // document.body.scrollWidth is inflated by clipped marquee children even when
    // html { overflow-x: clip } prevents actual scrolling.
    const canScrollHorizontally = await page.evaluate(() => {
      window.scrollBy(9999, 0);
      return window.scrollX;
    });
    expect(canScrollHorizontally).toBe(0);
  });

  test("subscribe form submit button is enabled", async ({ page }) => {
    const submitBtn = page.locator(".shimmer-button, .love-reset-slide-submit").first();
    await expect(submitBtn).toBeEnabled();
  });
});
