"use client";

import { ThemeProvider } from "styled-components";
import StoreProvider from "../store/StoreProvider";
import GlobalStyles from "../styles/GlobalStyles";
import { theme } from "../styles/theme";

export default function Providers({ children }) {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StoreProvider>
  );
}
