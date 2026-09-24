import { products } from "../test-utils/productFixtures";
import { addToCart, clearCart, selectCartCount } from "./slices/cartSlice";
import { store } from "./store";

describe("store", () => {
  afterEach(() => {
    store.dispatch(clearCart());
  });

  it("combines the app reducers into one Redux store", () => {
    expect(store.getState()).toEqual(
      expect.objectContaining({
        cart: expect.any(Object),
        checkout: expect.any(Object),
      }),
    );
  });

  it("handles cart actions through the configured store", () => {
    store.dispatch(addToCart(products[0]));

    expect(selectCartCount(store.getState())).toBeGreaterThan(0);
  });
});
