import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { products } from "../test-utils/productFixtures";
import { selectCartCount } from "../store/slices/cartSlice";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  const product = products[0];

  it("renders product content and image", () => {
    renderWithProviders(<ProductCard product={product} />);

    expect(screen.getByRole("img", { name: product.name })).toHaveAttribute(
      "src",
      product.image,
    );
    expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText(product.shortDescription)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
  });

  it("links to the product details route", () => {
    renderWithProviders(<ProductCard product={product} />);

    expect(screen.getByRole("link", { name: /view/i })).toHaveAttribute(
      "href",
      `/products/${product.id}`,
    );
  });

  it("adds the product to the cart", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<ProductCard product={product} />);

    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(selectCartCount(store.getState())).toBe(1);
    expect(screen.getByRole("status")).toHaveTextContent(
      `${product.name} added to cart.`,
    );
  });

  it("matches the stable product card snapshot", () => {
    const { container } = renderWithProviders(<ProductCard product={product} />);

    expect(container).toMatchSnapshot();
  });
});
