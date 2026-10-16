import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("portfolio enquiry prepares a reviewable WhatsApp message and clears stale drafts", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/DiwaliBoost/);
  await page.getByLabel("Your name", { exact: true }).fill("Aashish");
  await page
    .getByLabel("Business name", { exact: true })
    .fill("Test मिठाई & bakery");
  await page.getByLabel("Which package").selectOption("Business (₹999)");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("It has not been sent");
  const href = await page
    .getByRole("link", { name: "Review & send in WhatsApp" })
    .getAttribute("href");
  const url = new URL(href!);
  expect(url.pathname).toBe("/916376566753");
  expect(url.searchParams.get("text")).toContain("Test मिठाई & bakery");
  await page.getByLabel("Your name", { exact: true }).fill("Changed");
  await expect(
    page.getByRole("link", { name: "Review & send in WhatsApp" }),
  ).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("demo filters work and product enquiries include sample context", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/demo/sweet-shop/");
  await expect(page).toHaveTitle(/Gulab/);
  await expect(page.locator(".product-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Gift boxes", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  const href = await page
    .getByRole("link", { name: "Try sample enquiry" })
    .getAttribute("href");
  const message = new URL(href!).searchParams.get("text");
  expect(message).toContain("The Celebration Box");
  expect(message).toContain("₹999");
  expect(message).toContain("not a real food order");
  await page.getByRole("button", { name: "Classics", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(5);
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1440]) {
  test(`both routes fit ${width}px screens and images load`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/demo/sweet-shop/"]) {
      await page.goto(route);
      await page.evaluate(async () => {
        for (const image of document.images) {
          image.loading = "eager";
          await image.decode();
        }
      });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator("h1")).toHaveCount(1);
      await page.screenshot({
        path: `test-results/${route === "/" ? "portfolio" : "demo"}-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
      if (width === 1440 || width === 390)
        await page.screenshot({
          path: `test-results/${route === "/" ? "portfolio" : "demo"}-${width}-viewport.png`,
          animations: "disabled",
        });
    }
  });
}

test("content is available without JavaScript and demo is noindex", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/demo/sweet-shop/");
  await expect(page.locator(".product-card")).toHaveCount(6);
  await expect(page.locator("meta[name=robots]")).toHaveAttribute(
    "content",
    "noindex,follow",
  );
  await expect(
    page.getByRole("link", { name: "Try sample enquiry" }).first(),
  ).toHaveAttribute("href", /wa.me\/916376566753/);
  await context.close();
});

test("keyboard navigation, FAQ and reduced motion work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page
    .locator("summary")
    .filter({ hasText: "Is this an online store?" })
    .click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
});

for (const colorScheme of ["light", "dark"] as const) {
  test(`both routes pass WCAG A/AA automated checks in ${colorScheme} mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
    for (const route of ["/", "/demo/sweet-shop/"]) {
      await page.goto(route);
      const report = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(report.violations).toEqual([]);
      await page.screenshot({
        path: `test-results/${route === "/" ? "portfolio" : "demo"}-${colorScheme}-desktop.png`,
        animations: "disabled",
      });
    }
  });
}

test("explicit theme choice persists across reloads and pages, and system mode follows the OS", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.goto("/demo/sweet-shop/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("button", { name: "Use dark theme" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Use light theme" }).click();
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Use system theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("theme works with production CSP and category links filter the collection", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/*", async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: {
        ...response.headers(),
        "Content-Security-Policy":
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'",
      },
    });
  });
  await page.goto("/demo/sweet-shop/");
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page
    .getByRole("navigation", { name: "Browse sweets" })
    .getByRole("link", { name: "Festive offers" })
    .click();
  await expect(page.locator(".product-card")).toHaveCount(3);
  expect(errors).toEqual([]);
});
