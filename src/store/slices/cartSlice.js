import { createSlice } from "@reduxjs/toolkit";

function toCartItem(product) {
  return {
    id: String(product.id),
    name: product.name,
    price: Number(product.price) || 0,
    image: product.image,
    quantity: 1,
  };
}

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart(state, action) {
      state.items = Array.isArray(action.payload) ? action.payload : [];
    },
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === String(product.id),
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(toCartItem(product));
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  clearCart,
  decreaseQuantity,
  hydrateCart,
  increaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export default cartSlice.reducer;
