import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { products } from "../data/products";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import StorePage from "./StorePage";

describe("StorePage", () => {
  it("renders the store hero and products from Redux data", () => {
    renderWithProviders(<StorePage />, {
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

    expect(
      screen.getByRole("heading", { name: /quietly useful pieces/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /shop the edit/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(`${products.length} products`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore products/i })).toHaveAttribute(
      "href",
      "#products",
    );

    products.forEach((product) => {
      expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
    });
  });

  it("loads local products when the products state starts idle", async () => {
    renderWithProviders(<StorePage />);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: products[0].name }),
      ).toBeInTheDocument();
    });
  });

  it("shows a failed state and lets the user retry", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StorePage />, {
      preloadedState: {
        products: {
          items: [],
          status: "failed",
          error: "Unable to load products.",
          selectedItem: null,
          selectedStatus: "idle",
          selectedError: null,
        },
      },
    });

    expect(
      screen.getByRole("heading", { name: /unable to load products/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /try again/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: products[0].name }),
      ).toBeInTheDocument();
    });
  });
});
