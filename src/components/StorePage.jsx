"use client";

import styled from "styled-components";
import ProductCard from "./ProductCard";

const Page = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const Hero = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
  max-width: 680px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 4rem;
  line-height: 1.05;

  @media (max-width: 640px) {
    font-size: 2.5rem;
  }
`;

const Intro = styled.p`
  max-width: 560px;
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.15rem;
`;

const HeroLink = styled.a`
  display: inline-flex;
  width: fit-content;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  padding: 0.75rem 1rem;
  font-weight: 800;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.75rem;
`;

const Count = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Empty = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.muted};
`;

export default function StorePage({ products }) {
  return (
    <Page>
      <Hero>
        <Title>NextStore</Title>
        <Intro>Simple products. Clean shopping experience.</Intro>
        <HeroLink href="#products">Explore Products</HeroLink>
      </Hero>

      <section id="products" aria-labelledby="products-title">
        <SectionHeader>
          <SectionTitle id="products-title">Store</SectionTitle>
          <Count>{products.length} products</Count>
        </SectionHeader>

        {products.length > 0 ? (
          <Grid>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        ) : (
          <Empty>No products are available right now.</Empty>
        )}
      </section>
    </Page>
  );
}
