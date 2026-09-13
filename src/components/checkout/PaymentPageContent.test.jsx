import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { products } from "../../data/products";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import PaymentPageContent from "./PaymentPageContent";

const delivery = {
  fullName: "Mina Test",
  email: "mina@example.com",
  phone: "5551234567",
  address: "42 Market Street",
  city: "Tehran",
  postalCode: "12345",
};

const cartItem = {
  id: products[0].id,
  image: products[0].image,
  name: products[0].name,
  price: products[0].price,
  quantity: 1,
};

describe("PaymentPageContent", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("requires cart items before payment", () => {
    renderWithProviders(<PaymentPageContent />);

    expect(
      screen.getByRole("heading", { name: /your cart is empty/i }),
    ).toBeInTheDocument();
  });

  it("requires delivery info before payment", () => {
    renderWithProviders(<PaymentPageContent />, {
      preloadedState: {
        cart: { items: [cartItem] },
      },
    });

    expect(
      screen.getByRole("heading", { name: /delivery information is missing/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to delivery/i })).toHaveAttribute(
      "href",
      "/checkout/delivery",
    );
  });

  it("processes payment and routes to success", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    renderWithProviders(<PaymentPageContent />, {
      preloadedState: {
        cart: { items: [cartItem] },
        checkout: {
          delivery,
          paymentStatus: "idle",
        },
      },
    });

    await user.click(screen.getByRole("button", { name: /pay now/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/processing payment/i);
    expect(screen.getByRole("button", { name: /processing/i })).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(900);
    });

    expect(push).toHaveBeenCalledWith("/checkout/success");
  });
});
