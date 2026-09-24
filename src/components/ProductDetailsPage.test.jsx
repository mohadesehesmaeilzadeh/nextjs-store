import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { products } from "../test-utils/productFixtures";
import { selectCartCount } from "../store/slices/cartSlice";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import ProductDetailsPage from "./ProductDetailsPage";

describe("ProductDetailsPage", () => {
  const product = products[0];

  it("renders valid product details and a back link", () => {
    renderWithProviders(<ProductDetailsPage product={product} />);

    expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: product.name })).toHaveAttribute(
      "src",
      product.image,
    );
    expect(screen.getByRole("link", { name: /back to store/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("adds the selected product to the cart", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<ProductDetailsPage product={product} />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(selectCartCount(store.getState())).toBe(1);
    expect(screen.getByRole("status")).toHaveTextContent(
      `${product.name} added to cart.`,
    );
  });

});
