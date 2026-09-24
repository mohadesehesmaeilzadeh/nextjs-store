import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { products } from "../../test-utils/productFixtures";
import { selectCartCount } from "../../store/slices/cartSlice";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import AddToCartButton from "./AddToCartButton";

describe("AddToCartButton", () => {
  it("dispatches addToCart and announces the result", async () => {
    const user = userEvent.setup();
    const product = products[0];
    const { store } = renderWithProviders(
      <AddToCartButton product={product}>Add</AddToCartButton>,
    );

    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(selectCartCount(store.getState())).toBe(1);
    expect(screen.getByRole("button", { name: /added to cart/i })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      `${product.name} added to cart.`,
    );
  });
});
