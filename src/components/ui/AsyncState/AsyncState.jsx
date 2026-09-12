"use client";

import styled from "styled-components";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";

const Panel = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: 0.25rem;
`;

function AsyncState({ actionLabel, children, onAction, title }) {
  return (
    <Panel>
      <Typography variant="h3">{title}</Typography>
      {children ? <Typography>{children}</Typography> : null}
      {onAction ? (
        <Actions>
          <Button type="button" variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        </Actions>
      ) : null}
    </Panel>
  );
}

export function LoadingState({ message = "Loading..." }) {
  return <AsyncState title={message} />;
}

export function ErrorState({
  message = "Something went wrong.",
  onRetry,
  retryLabel = "Try Again",
}) {
  return (
    <AsyncState actionLabel={retryLabel} onAction={onRetry} title={message}>
      Please check the connection and try again.
    </AsyncState>
  );
}

export function EmptyState({
  actionLabel,
  children,
  onAction,
  title = "Nothing to show yet.",
}) {
  return (
    <AsyncState actionLabel={actionLabel} onAction={onAction} title={title}>
      {children}
    </AsyncState>
  );
}
