import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import cartReducer from "../store/slices/cartSlice";
import checkoutReducer from "../store/slices/checkoutSlice";
import { theme } from "../styles/theme";
import { AuthProvider } from "../components/AuthProvider";

export function createTestStore(preloadedState) {
  return configureStore({
    reducer: {
      cart: cartReducer,
      checkout: checkoutReducer,
    },
    preloadedState,
  });
}

export function renderWithProviders(
  ui,
  {
    authSession = null,
    preloadedState,
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <AuthProvider initialSession={authSession}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
      </AuthProvider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
