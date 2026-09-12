"use client";

import { useEffect, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { hydrateCart, selectCartItems } from "./slices/cartSlice";
import {
  hydrateCheckout,
  selectDeliveryInfo,
} from "./slices/checkoutSlice";
import { store } from "./store";

const CART_STORAGE_KEY = "nextstore-cart";
const DELIVERY_STORAGE_KEY = "nextstore-delivery";

function readStoredValue(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function ReduxPersistence({ children }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const delivery = useSelector(selectDeliveryInfo);
  const hasHydrated = useRef(false);

  useEffect(() => {
    const savedCart = readStoredValue(CART_STORAGE_KEY, []);
    const savedDelivery = readStoredValue(DELIVERY_STORAGE_KEY, null);

    dispatch(hydrateCart(savedCart));

    if (savedDelivery) {
      dispatch(hydrateCheckout(savedDelivery));
    }

    window.setTimeout(() => {
      hasHydrated.current = true;
    }, 0);
  }, [dispatch]);

  useEffect(() => {
    if (!hasHydrated.current) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!hasHydrated.current) return;
    window.localStorage.setItem(
      DELIVERY_STORAGE_KEY,
      JSON.stringify(delivery),
    );
  }, [delivery]);

  return children;
}

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <ReduxPersistence>{children}</ReduxPersistence>
    </Provider>
  );
}
