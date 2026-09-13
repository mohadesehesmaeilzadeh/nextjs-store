import cartReducer, {
  addToCart,
  clearCart,
  decreaseQuantity,
  hydrateCart,
  increaseQuantity,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from "./cartSlice";

const product = {
  id: "1",
  image: "/images/products/wireless-headphones.jpg",
  name: "Wireless Headphones",
  price: 89,
};

describe("cartSlice", () => {
  it("adds a product and increments quantity when added again", () => {
    let state = cartReducer(undefined, addToCart(product));
    state = cartReducer(state, addToCart(product));

    expect(state.items).toEqual([
      {
        id: "1",
        image: product.image,
        name: product.name,
        price: 89,
        quantity: 2,
      },
    ]);
  });

  it("updates quantity without going below one", () => {
    let state = cartReducer(undefined, addToCart(product));
    state = cartReducer(state, decreaseQuantity("1"));
    expect(state.items[0].quantity).toBe(1);

    state = cartReducer(state, increaseQuantity("1"));
    state = cartReducer(state, decreaseQuantity("1"));
    expect(state.items[0].quantity).toBe(1);
  });

  it("removes, hydrates, clears, and selects totals", () => {
    const hydrated = cartReducer(undefined, hydrateCart([
      { id: "2", name: "Lamp", price: 46, quantity: 2 },
    ]));
    const rootState = { cart: hydrated };

    expect(selectCartItems(rootState)).toHaveLength(1);
    expect(selectCartCount(rootState)).toBe(2);
    expect(selectCartTotal(rootState)).toBe(92);

    const removed = cartReducer(hydrated, removeFromCart("2"));
    expect(removed.items).toEqual([]);

    const cleared = cartReducer(hydrated, clearCart());
    expect(cleared.items).toEqual([]);
  });
});
