import { act, screen, waitFor } from "@testing-library/react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../data/products";
import { addToCart, clearCart, selectCartCount } from "./slices/cartSlice";
import { resetCheckout } from "./slices/checkoutSlice";
import { store } from "./store";
import StoreProvider from "./StoreProvider";

const cartItem = {
  id: products[0].id,
  image: products[0].image,
  name: products[0].name,
  price: products[0].price,
  quantity: 1,
};

function CartProbe() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  return (
    <div>
      <span>Cart count: {cartCount}</span>
      <button type="button" onClick={() => dispatch(addToCart(products[0]))}>
        Add product
      </button>
    </div>
  );
}

describe("StoreProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    store.dispatch(clearCart());
    store.dispatch(resetCheckout());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("hydrates the cart from localStorage", async () => {
    window.localStorage.setItem("nextstore-cart", JSON.stringify([cartItem]));

    renderWithStoreProvider();

    await waitFor(() => {
      expect(screen.getByText(/cart count: 1/i)).toBeInTheDocument();
    });
  });

  it("persists cart updates after hydration", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    renderWithStoreProvider();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await user.click(screen.getByRole("button", { name: /add product/i }));

    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem("nextstore-cart"))).toEqual([
        cartItem,
      ]);
    });
  });
});

function renderWithStoreProvider() {
  return render(
    <StoreProvider>
      <CartProbe />
    </StoreProvider>,
  );
}
