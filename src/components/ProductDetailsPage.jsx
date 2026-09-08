"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Page = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const Detail = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #eef2f6;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Category = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 3rem;
  line-height: 1.08;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const Price = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 900;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.08rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  width: fit-content;
  min-height: 44px;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Empty = styled.section`
  display: grid;
  max-width: 640px;
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export default function ProductDetailsPage({ product }) {
  if (!product) {
    return (
      <Page>
        <Empty>
          <Title as="h1">Product not found</Title>
          <Description>
            The product you are looking for does not exist or may have been
            removed.
          </Description>
          <BackLink href="/">Back to Store</BackLink>
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
            sizes="(max-width: 800px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </ImageWrap>
        <Content>
          <Category>{product.category}</Category>
          <Title>{product.name}</Title>
          <Price>${product.price}</Price>
          <Description>{product.description}</Description>
          <BackLink href="/">Back to Store</BackLink>
        </Content>
      </Detail>
    </Page>
  );
}
