import { screen, waitFor } from "@testing-library/react";
import { products } from "../../data/products";
import { selectCartItems } from "../../store/slices/cartSlice";
import { selectHasDeliveryInfo } from "../../store/slices/checkoutSlice";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import SuccessPageContent from "./SuccessPageContent";

describe("SuccessPageContent", () => {
  it("shows confirmation and clears checkout state after preserving the summary", async () => {
    const { store } = renderWithProviders(<SuccessPageContent />, {
      preloadedState: {
        cart: {
          items: [
            {
              id: products[0].id,
              image: products[0].image,
              name: products[0].name,
              price: products[0].price,
              quantity: 1,
            },
          ],
        },
        checkout: {
          delivery: {
            fullName: "Mina Test",
            email: "mina@example.com",
            phone: "5551234567",
            address: "42 Market Street",
            city: "Tehran",
            postalCode: "12345",
          },
          paymentStatus: "succeeded",
        },
      },
    });

    expect(
      screen.getByRole("heading", { name: /payment successful/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(products[0].name)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to store/i })).toHaveAttribute(
      "href",
      "/",
    );

    await waitFor(() => {
      expect(selectCartItems(store.getState())).toEqual([]);
      expect(selectHasDeliveryInfo(store.getState())).toBe(false);
    });
  });
});
