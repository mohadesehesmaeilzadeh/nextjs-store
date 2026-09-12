"use client";

import styled from "styled-components";

const Control = styled.div`
  display: inline-grid;
  grid-template-columns: 44px minmax(44px, auto) 44px;
  align-items: center;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceWarm};
`;

const StepButton = styled.button`
  min-height: 44px;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

const Quantity = styled.span`
  min-width: 44px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-align: center;
`;

export default function QuantityControl({
  onDecrease,
  onIncrease,
  quantity,
}) {
  return (
    <Control aria-label="Quantity controls">
      <StepButton
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={onDecrease}
      >
        -
      </StepButton>
      <Quantity aria-live="polite">{quantity}</Quantity>
      <StepButton
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrease}
      >
        +
      </StepButton>
    </Control>
  );
}
