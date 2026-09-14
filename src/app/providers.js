"use client";

import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "../lib/apolloClient";
import StoreProvider from "../store/StoreProvider";
import GlobalStyles from "../styles/GlobalStyles";
import { theme } from "../styles/theme";

export default function Providers({ children }) {
  return (
    <StoreProvider>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </ApolloProvider>
    </StoreProvider>
  );
}
