"use client";

import Link from "next/link";
import styled from "styled-components";
import AddToCartButton from "./cart/AddToCartButton";
import Button from "./ui/Button/Button";
import Typography from "./ui/Typography/Typography";

const Card = styled.article`
  display: flex;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  gap: 1.05rem;
  border: 1px solid rgba(229, 222, 213, 0.9);
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.85rem;
  box-shadow: 0 4px 16px rgba(55, 47, 38, 0.045);
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  &:hover {
    border-color: rgba(189, 111, 69, 0.42);
    box-shadow: ${({ theme }) => theme.shadows.card};
    transform: translateY(-2px);
  }
`;

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 5 / 4;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.sm};
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.2), transparent),
    ${({ $tone }) => $tone};

  &::after {
    position: absolute;
    inset: auto 1rem 0.85rem 1rem;
    height: 1px;
    background: rgba(55, 47, 38, 0.1);
    content: "";
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0 0.2rem 0.15rem;
`;

const Category = styled(Typography)``;

const Title = styled(Typography)``;

const Description = styled(Typography)``;

const Price = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.18rem;
  font-weight: 850;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  margin-top: auto;

  @media (max-width: 440px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-content: flex-end;

  @media (max-width: 440px) {
    justify-content: flex-start;
  }
`;

const ButtonLink = styled(Button)``;

const imageTones = {
  Electronics: "#e9f0f1",
  Home: "#f4ece1",
  Lifestyle: "#eef0e7",
  Accessories: "#f3e5dc",
};

export default function ProductCard({ product }) {
  return (
    <Card>
      <ImageWrap $tone={imageTones[product.category] || "#eef2f0"}>
        <ProductImage src={product.image} alt={product.name} loading="lazy" />
      </ImageWrap>
      <Content>
        <Category variant="caption">{product.category}</Category>
        <Title variant="h3">{product.name}</Title>
        <Description variant="bodySmall">{product.shortDescription}</Description>
        <Actions>
          <Price>${product.price}</Price>
          <ButtonGroup>
            <ButtonLink
              forwardedAs={Link}
              href={`/products/${product.id}`}
              size="small"
              variant="secondary"
            >
              View
            </ButtonLink>
            <AddToCartButton product={product} size="small">
              Add
            </AddToCartButton>
          </ButtonGroup>
        </Actions>
      </Content>
    </Card>
  );
}
