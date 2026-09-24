"use client";

import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "../lib/apolloClient";
import StoreProvider from "../store/StoreProvider";
import GlobalStyles from "../styles/GlobalStyles";
import { theme } from "../styles/theme";
import { AuthProvider } from "../components/AuthProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <StoreProvider>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </ApolloProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
