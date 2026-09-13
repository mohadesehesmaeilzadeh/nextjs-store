import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "styled-components";
import apolloClient from "../src/lib/apolloClient";
import StoreProvider from "../src/store/StoreProvider";
import GlobalStyles from "../src/styles/GlobalStyles";
import { theme } from "../src/styles/theme";

/** @type { import('@storybook/nextjs-vite').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <StoreProvider>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Story />
          </ThemeProvider>
        </ApolloProvider>
      </StoreProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
