import { expect, test } from "@playwright/test";

async function signIn(page) {
  await page.goto("/login");
  await page.getByLabel(/email/i).fill("demo@nextstore.test");
  await page.getByLabel(/password/i).fill("password123");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("button", { name: /logout/i })).toBeVisible();
}

test("store homepage loads products and supports add to cart", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /nextstore/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /quietly useful pieces/i }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /shop the edit/i })).toBeVisible();

  const productCards = page.locator("#products article");
  const productCount = await productCards.count();
  expect(productCount).toBeGreaterThan(0);
  await expect(page.getByText(`${productCount} products`)).toBeVisible();
  await expect(productCards.first().getByRole("heading")).toBeVisible();
  await expect(productCards.first().getByRole("img")).toHaveAttribute(
    "src",
    /cdn\.dummyjson\.com/,
  );
  await expect(page.getByRole("link", { name: /^view$/i }).first()).toBeVisible();

  await page.getByRole("button", { name: /^add$/i }).first().click();
  await expect(page.getByRole("button", { name: /added to cart/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /cart \(1\)/i })).toBeVisible();
});

test("catalog filters work together and clear back to all products", async ({
  page,
}) => {
  await page.goto("/");

  const productCards = page.locator("#products article");
  const initialCount = await productCards.count();
  const firstCard = productCards.first();
  const productName = (await firstCard.getByRole("heading").textContent()).trim();
  const cardText = await firstCard.textContent();
  const categoryOptions = await page
    .getByLabel("Category")
    .locator("option")
    .allTextContents();
  const category = categoryOptions.find(
    (option) => option !== "All categories" && cardText.includes(option),
  );
  const priceText = (await firstCard.getByText(/^\$\d/).textContent()).trim();
  const price = priceText.replace("$", "");

  await page.getByLabel("Search").fill(productName);
  await page.getByLabel("Category").selectOption({ label: category });
  await page.getByLabel("Minimum price").fill(price);
  await page.getByLabel("Maximum price").fill(price);

  await expect(page.getByText("1 product", { exact: true })).toBeVisible();
  await expect(productCards).toHaveCount(1);
  await expect(productCards.first().getByRole("heading")).toHaveText(productName);

  await page.getByLabel("Search").fill("not a product in this catalog");
  await expect(
    page.getByRole("heading", { name: "No products match your filters." }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "Clear Filters" })
    .last()
    .click();
  await expect(productCards).toHaveCount(initialCount);
  await expect(page.getByLabel("Search")).toHaveValue("");
  await expect(page.getByLabel("Category")).toHaveValue("");
});

test("cart persists across refresh and removal is persisted", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /^add$/i }).first().click();
  await expect(page.getByRole("link", { name: /cart \(1\)/i })).toBeVisible();
  await page.waitForFunction(() => {
    const cart = JSON.parse(localStorage.getItem("nextstore-cart") || "[]");
    return cart.length === 1 && cart[0].quantity === 1;
  });

  await page.reload();
  await expect(page.getByRole("link", { name: /cart \(1\)/i })).toBeVisible();
  await page.getByRole("link", { name: /cart \(1\)/i }).click();
  await page.getByRole("button", { name: /remove/i }).click();
  await expect(page.getByRole("heading", { name: /your cart is empty/i })).toBeVisible();
  await page.waitForFunction(
    () => JSON.parse(localStorage.getItem("nextstore-cart") || "[]").length === 0,
  );

  await page.reload();
  await expect(page.getByRole("heading", { name: /your cart is empty/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /cart \(0\)/i })).toBeVisible();
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
  await page.goto("/");
  const firstProduct = page.locator("#products article").first();
  const productName = await firstProduct.getByRole("heading").textContent();
  const productPrice = await firstProduct.getByText(/^\$\d/).textContent();
  const productHref = await firstProduct
    .getByRole("link", { name: /^view$/i })
    .getAttribute("href");

  await firstProduct.getByRole("link", { name: /^view$/i }).click();

  await expect(page).toHaveURL(productHref);
  await expect(page.getByRole("heading", { name: productName })).toBeVisible();
  await expect(page.getByText(productPrice, { exact: true })).toBeVisible();

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
  await expect(page.getByRole("link", { name: /back to store/i })).toBeVisible();
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

test("invalid login shows an error", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel(/email/i).fill("wrong@example.com");
  await page.getByLabel(/password/i).fill("short");
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page.getByText(/invalid login/i)).toBeVisible();
  await expect(page).toHaveURL("/login");
});

test("login succeeds and survives refresh", async ({ page }) => {
  await signIn(page);

  await expect(page.getByRole("link", { name: /account/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /login/i })).toHaveCount(0);

  await page.reload();

  await expect(page.getByRole("button", { name: /logout/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /account/i })).toBeVisible();
});

test("protected account page redirects logged-out users to login", async ({
  page,
}) => {
  await page.goto("/account");

  await expect(page).toHaveURL("/login");
  await expect(page.getByRole("heading", { name: /login/i })).toBeVisible();
});

test("logged-in users can view account details", async ({ page }) => {
  await signIn(page);

  await page.getByRole("link", { name: /account/i }).click();

  await expect(page).toHaveURL("/account");
  await expect(page.getByRole("heading", { name: /account/i })).toBeVisible();
  await expect(page.getByText("Demo Customer")).toBeVisible();
  await expect(page.getByText("demo@nextstore.test")).toBeVisible();
});

test("logout clears the session and stays logged out after refresh", async ({
  page,
}) => {
  await signIn(page);

  await page.getByRole("button", { name: /logout/i }).click();

  await expect(page).toHaveURL("/login");
  await expect(page.getByRole("link", { name: /login/i })).toBeVisible();

  await page.reload();

  await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();

  await page.goto("/account");
  await expect(page).toHaveURL("/login");
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
    await expect(
      page.locator("#products article").first().getByRole("heading"),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /^view$/i }).first()).toBeVisible();

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true);
  });
});
