import { ThemeProvider } from "styled-components";
import StoreProvider from "../src/store/StoreProvider";
import GlobalStyles from "../src/styles/GlobalStyles";
import { theme } from "../src/styles/theme";

/** @type { import('@storybook/nextjs-vite').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
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
