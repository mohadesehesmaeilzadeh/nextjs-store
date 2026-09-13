import { expect, test } from "@playwright/test";
import { products } from "../../src/data/products";

test("store homepage loads products and supports add to cart", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /nextstore/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /quietly useful pieces/i }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /shop the edit/i })).toBeVisible();
  await expect(page.getByText(`${products.length} products`)).toBeVisible();

  await expect(page.getByRole("heading", { name: products[0].name })).toBeVisible();
  await expect(page.getByRole("heading", { name: products[1].name })).toBeVisible();
  await expect(page.getByRole("link", { name: /^view$/i }).first()).toBeVisible();

  await page.getByRole("button", { name: /^add$/i }).first().click();
  await expect(page.getByRole("button", { name: /added to cart/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /cart \(1\)/i })).toBeVisible();
});

test("desktop navigation moves through About, Contact, and Store", async ({
  page,
}) => {
  await page.goto("/");

  const mainNav = page.getByRole("navigation", { name: /main navigation/i });

  await mainNav.getByRole("link", { name: /about/i }).click();
  await expect(page).toHaveURL("/about");
  await expect(
    page.getByRole("heading", { name: /about nextstore/i }),
  ).toBeVisible();

  await mainNav.getByRole("link", { name: /contact/i }).click();
  await expect(page).toHaveURL("/contact");
  await expect(page.getByLabel(/name/i)).toBeVisible();

  await mainNav.getByRole("link", { name: /store/i }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: /shop the edit/i })).toBeVisible();
});

test("product details flow opens a product and returns to store", async ({
  page,
}) => {
  const product = products[0];

  await page.goto("/");
  await page.getByRole("link", { name: /^view$/i }).first().click();

  await expect(page).toHaveURL(`/products/${product.id}`);
  await expect(page.getByRole("heading", { name: product.name })).toBeVisible();
  await expect(page.getByText(`$${product.price}`)).toBeVisible();
  await expect(page.getByText(product.description)).toBeVisible();

  await page.getByRole("link", { name: /back to store/i }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: /shop the edit/i })).toBeVisible();
});

test("invalid product route shows a readable not-found state", async ({
  page,
}) => {
  await page.goto("/products/999999");

  await expect(
    page.getByRole("heading", { name: /product not found/i }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /try again/i })).toBeVisible();
});

test("contact form validates and submits from the user perspective", async ({
  page,
}) => {
  await page.goto("/contact");

  await page.getByRole("button", { name: /send message/i }).click();

  await expect(page.getByText(/name is required/i)).toBeVisible();
  await expect(page.getByText(/email is required/i)).toBeVisible();
  await expect(page.getByText(/message is required/i)).toBeVisible();

  await page.getByLabel(/name/i).fill("Mina");
  await page.getByLabel(/email/i).fill("not-an-email");
  await page.getByLabel(/message/i).fill("Please send details.");
  await page.getByRole("button", { name: /send message/i }).click();

  await expect(page.getByText(/enter a valid email address/i)).toBeVisible();

  await page.getByLabel(/email/i).fill("mina@example.com");
  await page.getByRole("button", { name: /send message/i }).click();

  await expect(page.getByRole("status")).toContainText(
    /thanks for your message/i,
  );
  await expect(page.getByLabel(/name/i)).toHaveValue("");
  await expect(page.getByLabel(/email/i)).toHaveValue("");
  await expect(page.getByLabel(/message/i)).toHaveValue("");
});

test("cart and checkout flow reaches success", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /^add$/i }).first().click();
  await page.getByRole("link", { name: /cart \(1\)/i }).click();

  await expect(page).toHaveURL("/cart");
  await expect(page.getByRole("heading", { name: /your cart/i })).toBeVisible();

  await page.getByRole("button", { name: /increase quantity/i }).click();
  await expect(page.getByLabel("Quantity controls").getByText("2")).toBeVisible();

  await page.getByRole("link", { name: /continue to delivery/i }).click();
  await expect(page).toHaveURL("/checkout/delivery");

  await page.getByLabel(/full name/i).fill("Mina Test");
  await page.getByLabel(/email/i).fill("mina@example.com");
  await page.getByLabel(/phone/i).fill("5551234567");
  await page.getByLabel(/city/i).fill("Tehran");
  await page.getByLabel(/address/i).fill("42 Market Street");
  await page.getByLabel(/postal code/i).fill("12345");
  await page.getByRole("button", { name: /continue to payment/i }).click();

  await expect(page).toHaveURL("/checkout/payment");
  await expect(page.getByRole("heading", { name: /checkout/i })).toBeVisible();

  await page.getByRole("button", { name: /pay now/i }).click();
  await expect(page.getByRole("status")).toContainText(/processing payment/i);
  await expect(page).toHaveURL("/checkout/success");
  await expect(
    page.getByRole("heading", { name: /payment successful/i }),
  ).toBeVisible();
});

test.describe("mobile layout", () => {
  test.use({
    viewport: { width: 390, height: 844 },
  });

  test("mobile navigation opens links and the page avoids horizontal overflow", async ({
    page,
  }) => {
    await page.goto("/");

    const menu = page.getByRole("button", { name: /menu/i });
    await expect(menu).toBeVisible();

    await menu.click();
    await expect(
      page.getByRole("navigation", { name: /mobile navigation/i }),
    ).toBeVisible();

    await page
      .getByRole("navigation", { name: /mobile navigation/i })
      .getByRole("link", { name: /about/i })
      .click();

    await expect(page).toHaveURL("/about");
    await expect(
      page.getByRole("heading", { name: /about nextstore/i }),
    ).toBeVisible();

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true);
  });

  test("product grid content remains visible on mobile", async ({ page }) => {
    await page.goto("/");

    // The /products/i regex checks readable product content with case-insensitive matching.
    await expect(page.getByText(/products/i).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: products[0].name })).toBeVisible();
    await expect(page.getByRole("link", { name: /^view$/i }).first()).toBeVisible();

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true);
  });
});
