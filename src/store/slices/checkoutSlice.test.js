import checkoutReducer, {
  emptyDeliveryInfo,
  hydrateCheckout,
  resetCheckout,
  selectDeliveryInfo,
  selectHasDeliveryInfo,
  selectPaymentStatus,
  setDeliveryInfo,
  setPaymentStatus,
} from "./checkoutSlice";

const delivery = {
  fullName: "Mina Test",
  email: "mina@example.com",
  phone: "5551234567",
  address: "42 Market Street",
  city: "Tehran",
  postalCode: "12345",
};

describe("checkoutSlice", () => {
  it("stores delivery information and payment status", () => {
    let state = checkoutReducer(undefined, setDeliveryInfo(delivery));
    state = checkoutReducer(state, setPaymentStatus("processing"));

    const rootState = { checkout: state };
    expect(selectDeliveryInfo(rootState)).toEqual(delivery);
    expect(selectPaymentStatus(rootState)).toBe("processing");
    expect(selectHasDeliveryInfo(rootState)).toBe(true);
  });

  it("hydrates partial delivery info with empty defaults", () => {
    const state = checkoutReducer(undefined, hydrateCheckout({ email: "a@b.com" }));

    expect(state.delivery).toEqual({
      ...emptyDeliveryInfo,
      email: "a@b.com",
    });
    expect(selectHasDeliveryInfo({ checkout: state })).toBe(false);
  });

  it("resets checkout state", () => {
    const current = {
      delivery,
      paymentStatus: "succeeded",
    };

    expect(checkoutReducer(current, resetCheckout())).toEqual({
      delivery: emptyDeliveryInfo,
      paymentStatus: "idle",
    });
  });
});
