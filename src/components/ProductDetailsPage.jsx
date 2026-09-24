"use client";

import Link from "next/link";
import styled from "styled-components";
import AddToCartButton from "./cart/AddToCartButton";
import Button from "./ui/Button/Button";
import Typography from "./ui/Typography/Typography";

const Page = styled.div`
  width: min(100% - 2.5rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: 3.75rem 0 4.5rem;

  @media (max-width: 640px) {
    width: min(100% - 1.25rem, ${({ theme }) => theme.layout.maxWidth});
    padding: 2.5rem 0 3rem;
  }
`;

const Detail = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.84fr);
  gap: 3.5rem;
  align-items: start;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageWrap = styled.div`
  aspect-ratio: 5 / 4;
  overflow: hidden;
  border: 1px solid rgba(229, 222, 213, 0.9);
  border-radius: ${({ theme }) => theme.radii.md};
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.2), transparent),
    ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  display: grid;
  gap: 1.15rem;
  align-content: center;
  padding-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 800px) {
    padding-top: 0;
  }
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

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 440px) {
    display: grid;

    & > * {
      width: 100%;
    }
  }
`;

const BackLink = styled(Button)``;

export default function ProductDetailsPage({ product }) {
  return (
    <Page>
      <Detail>
        <ImageWrap>
          <ProductImage src={product.image} alt={product.name} />
        </ImageWrap>
        <Content>
          <Category variant="caption">{product.category}</Category>
          <Title variant="h1">{product.name}</Title>
          <Price>${product.price}</Price>
          <Description>{product.description}</Description>
          <Actions>
            <AddToCartButton product={product}>
              Add to Cart
            </AddToCartButton>
            <BackLink forwardedAs={Link} href="/" variant="secondary">
              Back to Store
            </BackLink>
          </Actions>
        </Content>
      </Detail>
    </Page>
  );
}
