"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Card = styled.article`
  display: flex;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 2px 8px rgba(23, 32, 42, 0.04);
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  &:hover {
    border-color: rgba(23, 107, 135, 0.45);
    box-shadow: ${({ theme }) => theme.shadows.card};
    transform: translateY(-2px);
  }
`;

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: #eef2f6;
`;

const Content = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Category = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 700;
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.15rem;
  line-height: 1.3;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: auto;
`;

const Price = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 800;
`;

const ButtonLink = styled(Link)`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  padding: 0.65rem 0.9rem;
  font-weight: 700;
  transition: background 160ms ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export default function ProductCard({ product }) {
  return (
    <Card>
      <ImageWrap>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </ImageWrap>
      <Content>
        <Category>{product.category}</Category>
        <Title>{product.name}</Title>
        <Description>{product.shortDescription}</Description>
        <PriceRow>
          <Price>${product.price}</Price>
          <ButtonLink href={`/products/${product.id}`}>View Product</ButtonLink>
        </PriceRow>
      </Content>
    </Card>
  );
}
