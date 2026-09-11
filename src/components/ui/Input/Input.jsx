"use client";

import { useId } from "react";
import styled from "styled-components";
import Typography from "../Typography/Typography";

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const Control = styled.input`
  width: 100%;
  min-height: 48px;
  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.softText};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }
`;

const ErrorText = styled(Typography)`
  color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export default function Input({
  error,
  id,
  label,
  required = false,
  type = "text",
  ...props
}) {
  const generatedId = useId();
  const inputId = id || props.name || generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <Field>
      {label ? (
        <Label htmlFor={inputId}>
          {label}
          {required ? " *" : ""}
        </Label>
      ) : null}
      <Control
        id={inputId}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        $invalid={Boolean(error)}
        {...props}
      />
      {error ? (
        <ErrorText id={errorId} variant="bodySmall" role="alert">
          {error}
        </ErrorText>
      ) : null}
    </Field>
  );
}
