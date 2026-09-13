import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import cartReducer from "../store/slices/cartSlice";
import checkoutReducer from "../store/slices/checkoutSlice";
import productsReducer from "../store/slices/productsSlice";
import { theme } from "../styles/theme";

export function createTestStore(preloadedState) {
  return configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer,
      checkout: checkoutReducer,
    },
    preloadedState,
  });
}

export function renderWithProviders(
  ui,
  {
    preloadedState,
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
