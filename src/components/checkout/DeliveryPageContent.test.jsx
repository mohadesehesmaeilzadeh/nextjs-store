import { screen } from "@testing-library/react";
import { products } from "../../test-utils/productFixtures";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import DeliveryPageContent from "./DeliveryPageContent";

describe("DeliveryPageContent", () => {
  it("shows an empty-cart message before delivery details can be entered", () => {
    renderWithProviders(<DeliveryPageContent />);

    expect(
      screen.getByRole("heading", { name: /your cart is empty/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue shopping/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the delivery form when the cart has items", () => {
    renderWithProviders(<DeliveryPageContent />, {
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
      },
    });

    expect(
      screen.getByRole("heading", { name: /delivery information/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });
});
