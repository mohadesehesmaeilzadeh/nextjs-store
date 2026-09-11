"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Button from "./ui/Button/Button";
import Typography from "./ui/Typography/Typography";

const Page = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: 3.75rem 0 4.5rem;

  @media (max-width: 640px) {
    padding: 2.5rem 0 3rem;
  }
`;

const Detail = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.84fr);
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 5 / 4;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid rgba(229, 222, 213, 0.9);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.2), transparent),
    ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const Content = styled.div`
  display: grid;
  gap: 1rem;
  align-content: center;
`;

const Category = styled(Typography)`
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.38rem 0.8rem;
`;

const Title = styled(Typography)``;

const Price = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 1.7rem;
  font-weight: 900;
`;

const Description = styled(Typography)`
  font-size: 1.08rem;
`;

const BackLink = styled(Button)``;

const Empty = styled.section`
  display: grid;
  max-width: 640px;
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceWarm};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

export default function ProductDetailsPage({ product }) {
  if (!product) {
    return (
      <Page>
        <Empty>
          <Title forwardedAs="h1" variant="h2">
            Product not found
          </Title>
          <Description>
            The product you are looking for does not exist or may have been
            removed.
          </Description>
          <BackLink forwardedAs={Link} href="/" variant="secondary">
            Back to Store
          </BackLink>
        </Empty>
      </Page>
    );
  }

  return (
    <Page>
      <Detail>
        <ImageWrap>
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 800px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </ImageWrap>
        <Content>
          <Category variant="caption">{product.category}</Category>
          <Title variant="h1">{product.name}</Title>
          <Price>${product.price}</Price>
          <Description>{product.description}</Description>
          <BackLink forwardedAs={Link} href="/" variant="secondary">
            Back to Store
          </BackLink>
        </Content>
      </Detail>
    </Page>
  );
}
