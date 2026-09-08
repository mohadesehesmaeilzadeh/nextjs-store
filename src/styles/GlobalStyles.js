"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    min-width: 0;
    scroll-behavior: smooth;
  }

  body {
    min-width: 0;
    margin: 0;
    background:
      radial-gradient(circle at top left, rgba(241, 218, 200, 0.42), transparent 36rem),
      linear-gradient(180deg, ${({ theme }) => theme.colors.surfaceWarm} 0%, ${({ theme }) => theme.colors.background} 42%);
    color: ${({ theme }) => theme.colors.text};
    font-family: "Inter", "Segoe UI", Arial, Helvetica, sans-serif;
    line-height: 1.65;
    text-rendering: optimizeLegibility;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`;

export default GlobalStyles;
