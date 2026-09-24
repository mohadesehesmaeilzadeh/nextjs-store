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

const Control = styled.textarea`
  width: 100%;
  min-height: 150px;
  resize: vertical;
  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.78rem 0.9rem;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme, $invalid }) =>
      $invalid ? theme.colors.danger : theme.colors.borderStrong};
  }

  &:focus-visible {
    border-color: ${({ theme, $invalid }) =>
      $invalid ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 4px
      ${({ theme, $invalid }) =>
        $invalid ? "rgba(180, 35, 24, 0.08)" : "rgba(47, 102, 87, 0.09)"};
  }

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

export default function Textarea({
  error,
  id,
  label,
  required = false,
  rows = 5,
  ...props
}) {
  const generatedId = useId();
  const textareaId = id || props.name || generatedId;
  const errorId = error ? `${textareaId}-error` : undefined;

  return (
    <Field>
      {label ? (
        <Label htmlFor={textareaId}>
          {label}
          {required ? " *" : ""}
        </Label>
      ) : null}
      <Control
        id={textareaId}
        rows={rows}
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
