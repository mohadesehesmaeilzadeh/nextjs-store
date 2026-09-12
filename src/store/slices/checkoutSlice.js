import { createSlice } from "@reduxjs/toolkit";

export const emptyDeliveryInfo = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

const initialState = {
  delivery: emptyDeliveryInfo,
  paymentStatus: "idle",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    hydrateCheckout(state, action) {
      state.delivery = {
        ...emptyDeliveryInfo,
        ...action.payload,
      };
    },
    setDeliveryInfo(state, action) {
      state.delivery = action.payload;
    },
    setPaymentStatus(state, action) {
      state.paymentStatus = action.payload;
    },
    resetCheckout(state) {
      state.delivery = emptyDeliveryInfo;
      state.paymentStatus = "idle";
    },
  },
});

export const {
  hydrateCheckout,
  resetCheckout,
  setDeliveryInfo,
  setPaymentStatus,
} = checkoutSlice.actions;

export const selectDeliveryInfo = (state) => state.checkout.delivery;
export const selectPaymentStatus = (state) => state.checkout.paymentStatus;
export const selectHasDeliveryInfo = (state) =>
  Object.values(state.checkout.delivery).every(Boolean);

export default checkoutSlice.reducer;
