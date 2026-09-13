import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { products } from "../../data/products";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import CartPageContent from "./CartPageContent";

describe("CartPageContent", () => {
  const cartItem = {
    id: products[0].id,
    image: products[0].image,
    name: products[0].name,
    price: products[0].price,
    quantity: 1,
  };

  it("renders an empty cart state", () => {
    renderWithProviders(<CartPageContent />);

    expect(
      screen.getByRole("heading", { name: /your cart is empty/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue shopping/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders cart items, updates quantity, and removes items", async () => {
    const user = userEvent.setup();

    renderWithProviders(<CartPageContent />, {
      preloadedState: {
        cart: { items: [cartItem] },
      },
    });

    expect(screen.getByRole("heading", { name: /your cart/i })).toBeInTheDocument();
    expect(screen.getAllByText("$89").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /continue to delivery/i })).toHaveAttribute(
      "href",
      "/checkout/delivery",
    );

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getAllByText("$178").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: /decrease quantity/i }));
    expect(screen.getByText("1")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /remove/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /your cart is empty/i }),
      ).toBeInTheDocument();
    });
  });
});
