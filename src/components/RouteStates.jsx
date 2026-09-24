"use client";

import Link from "next/link";
import styled, { keyframes } from "styled-components";
import Button from "./ui/Button/Button";
import Typography from "./ui/Typography/Typography";

const pulse = keyframes`
  0%, 100% {
    opacity: 0.58;
  }

  50% {
    opacity: 1;
  }
`;

const Page = styled.div`
  width: min(100% - 2.5rem, ${({ theme }) => theme.layout.maxWidth});
  min-height: 48vh;
  margin: 0 auto;
  padding: 3.75rem 0 4.5rem;

  @media (max-width: 640px) {
    width: min(100% - 1.25rem, ${({ theme }) => theme.layout.maxWidth});
    padding: 2.5rem 0 3rem;
  }
`;

const MessageLayout = styled(Page)`
  display: grid;
  place-items: center;
`;

const MessagePanel = styled.section`
  display: grid;
  width: min(100%, 680px);
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 3px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: clamp(1.5rem, 5vw, 3rem);
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const Eyebrow = styled(Typography)`
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceWarm};
  padding: 0.38rem 0.8rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.xs};
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;

const Skeleton = styled.div`
  width: ${({ $width = "100%" }) => $width};
  height: ${({ $height }) => $height};
  max-width: 100%;
  border-radius: ${({ theme, $radius }) =>
    $radius || theme.radii.sm};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.backgroundAlt} 0%,
    ${({ theme }) => theme.colors.accentSoft} 50%,
    ${({ theme }) => theme.colors.backgroundAlt} 100%
  );
  animation: ${pulse} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ListingHeader = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: 2rem;
`;

const ListingRegion = styled.div`
  min-height: 24rem;
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SkeletonCard = styled.div`
  display: grid;
  min-width: 0;
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.85rem;
`;

const SkeletonCardImage = styled(Skeleton)`
  aspect-ratio: 5 / 4;
  height: auto;
`;

const DetailLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.84fr);
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const DetailImage = styled(Skeleton)`
  aspect-ratio: 5 / 4;
  height: auto;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const DetailCopy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export function RouteMessage({
  eyebrow,
  title,
  description,
  onRetry,
  actionLabel = "Back to Store",
  actionHref = "/",
}) {
  return (
    <MessageLayout>
      <MessagePanel aria-labelledby="route-state-title">
        {eyebrow ? <Eyebrow variant="caption">{eyebrow}</Eyebrow> : null}
        <Typography id="route-state-title" as="h1" variant="h2">
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Actions>
          {onRetry ? <Button onClick={onRetry}>Try Again</Button> : null}
          <Button
            as={Link}
            href={actionHref}
            variant={onRetry ? "secondary" : "primary"}
          >
            {actionLabel}
          </Button>
        </Actions>
      </MessagePanel>
    </MessageLayout>
  );
}

export function ProductListingLoading() {
  return (
    <ListingRegion role="status" aria-live="polite" aria-busy="true">
      <ScreenReaderOnly>Loading products...</ScreenReaderOnly>
      <ListingHeader aria-hidden="true">
        <Skeleton $height="1.7rem" $width="9rem" />
        <Skeleton $height="2.5rem" $width="20rem" />
        <Skeleton $height="1.2rem" $width="34rem" />
      </ListingHeader>
      <SkeletonGrid aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <SkeletonCard key={index}>
            <SkeletonCardImage />
            <Skeleton $height="0.9rem" $width="7rem" />
            <Skeleton $height="1.5rem" $width="80%" />
            <Skeleton $height="1rem" />
            <Skeleton $height="2.75rem" $width="9rem" $radius="999px" />
          </SkeletonCard>
        ))}
      </SkeletonGrid>
    </ListingRegion>
  );
}

export function ProductDetailsLoading() {
  return (
    <Page role="status" aria-live="polite" aria-busy="true">
      <ScreenReaderOnly>Loading product...</ScreenReaderOnly>
      <DetailLayout aria-hidden="true">
        <DetailImage />
        <DetailCopy>
          <Skeleton $height="1.6rem" $width="7rem" $radius="999px" />
          <Skeleton $height="3.5rem" $width="90%" />
          <Skeleton $height="2rem" $width="6rem" />
          <Skeleton $height="1.1rem" />
          <Skeleton $height="1.1rem" $width="84%" />
          <Skeleton $height="3rem" $width="10rem" $radius="999px" />
        </DetailCopy>
      </DetailLayout>
    </Page>
  );
}
