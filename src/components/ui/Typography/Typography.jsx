"use client";

import styled, { css } from "styled-components";

const variantStyles = {
  h1: css`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.sizes.xxxl};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    line-height: 1.02;

    @media (max-width: 640px) {
      font-size: 2.45rem;
      line-height: ${({ theme }) => theme.typography.lineHeights.tight};
    }
  `,
  h2: css`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.sizes.xxl};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    line-height: 1.15;
  `,
  h3: css`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.sizes.xl};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    line-height: 1.28;
  `,
  body: css`
    color: ${({ theme }) => theme.colors.muted};
    font-size: ${({ theme }) => theme.typography.sizes.md};
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  `,
  bodySmall: css`
    color: ${({ theme }) => theme.colors.muted};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    line-height: 1.55;
  `,
  caption: css`
    color: ${({ theme }) => theme.colors.softText};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    text-transform: uppercase;
  `,
};

const defaultElements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  bodySmall: "p",
  caption: "span",
};

const Text = styled.p`
  margin: 0;
  ${({ $variant }) => variantStyles[$variant] || variantStyles.body}
`;

export default function Typography({
  as,
  variant = "body",
  children,
  ...props
}) {
  return (
    <Text as={as || defaultElements[variant]} $variant={variant} {...props}>
      {children}
    </Text>
  );
}
