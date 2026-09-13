import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { products } from "../data/products";
import { selectCartCount } from "../store/slices/cartSlice";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import ProductDetailsPage from "./ProductDetailsPage";

describe("ProductDetailsPage", () => {
  const product = products[0];

  it("renders valid product details and a back link", () => {
    renderWithProviders(<ProductDetailsPage productId={product.id} />, {
      preloadedState: {
        products: {
          items: products,
          status: "succeeded",
          error: null,
          selectedItem: null,
          selectedStatus: "idle",
          selectedError: null,
        },
      },
    });

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
    const { store } = renderWithProviders(
      <ProductDetailsPage productId={product.id} />,
      {
        preloadedState: {
          products: {
            items: products,
            status: "succeeded",
            error: null,
            selectedItem: null,
            selectedStatus: "idle",
            selectedError: null,
          },
        },
      },
    );

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(selectCartCount(store.getState())).toBe(1);
    expect(screen.getByRole("status")).toHaveTextContent(
      `${product.name} added to cart.`,
    );
  });

  it("shows product not found for an invalid product id", async () => {
    renderWithProviders(<ProductDetailsPage productId="999999" />, {
      preloadedState: {
        products: {
          items: [],
          status: "succeeded",
          error: null,
          selectedItem: null,
          selectedStatus: "succeeded",
          selectedError: null,
        },
      },
    });

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /product not found/i }),
      ).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });
});
