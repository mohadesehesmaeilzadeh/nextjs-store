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
    min-height: 100vh;
    margin: 0;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.surfaceWarm} 0,
      ${({ theme }) => theme.colors.background} 34rem
    );
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 16px;
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  main {
    min-height: calc(100vh - 260px);
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
  textarea,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accentSoft};
    color: ${({ theme }) => theme.colors.text};
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *, *::before, *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyles;
