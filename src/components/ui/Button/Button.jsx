"use client";

import styled, { css } from "styled-components";

const variantStyles = {
  primary: css`
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    box-shadow: 0 10px 20px rgba(49, 95, 82, 0.18);

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryDark};
      border-color: ${({ theme }) => theme.colors.primaryDark};
      box-shadow: 0 14px 26px rgba(49, 95, 82, 0.22);
      transform: translateY(-1px);
    }
  `,
  secondary: css`
    border-color: ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.primaryDark};
    box-shadow: 0 2px 8px rgba(38, 50, 45, 0.04);

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.primary};
      color: #ffffff;
      box-shadow: 0 8px 18px rgba(49, 95, 82, 0.14);
      transform: translateY(-1px);
    }
  `,
  danger: css`
    border-color: ${({ theme }) => theme.colors.danger};
    background: ${({ theme }) => theme.colors.danger};
    color: #ffffff;

    &:hover:not(:disabled) {
      filter: brightness(0.94);
    }
  `,
};

const sizeStyles = {
  small: css`
    min-height: 44px;
    padding: 0.58rem 0.9rem;
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  `,
  medium: css`
    min-height: 46px;
    padding: 0.72rem 1.05rem;
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  `,
  large: css`
    min-height: 50px;
    padding: 0.9rem 1.25rem;
    font-size: ${({ theme }) => theme.typography.sizes.md};
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "fit-content")};
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: 1;
  text-align: center;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease,
    color 160ms ease,
    transform 160ms ease,
    opacity 160ms ease;
  white-space: nowrap;

  ${({ $variant }) => variantStyles[$variant] || variantStyles.primary}
  ${({ $size }) => sizeStyles[$size] || sizeStyles.medium}

  &:disabled,
  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.55;
    transform: none;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export default function Button({
  as,
  children,
  disabled = false,
  fullWidth = false,
  size = "medium",
  type = "button",
  variant = "primary",
  ...props
}) {
  return (
    <StyledButton
      as={as}
      type={as ? undefined : type}
      disabled={as ? undefined : disabled}
      aria-disabled={as && disabled ? "true" : undefined}
      $fullWidth={fullWidth}
      $size={size}
      $variant={variant}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
