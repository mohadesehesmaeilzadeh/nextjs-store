"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from "../store/slices/productsSlice";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "./ui/AsyncState/AsyncState";
import Button from "./ui/Button/Button";
import Typography from "./ui/Typography/Typography";
import ProductCard from "./ProductCard";

const Page = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: 3.5rem 0 4.5rem;

  @media (max-width: 640px) {
    padding: 2rem 0 3rem;
  }
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(320px, 0.78fr);
  gap: 3rem;
  align-items: center;
  padding: 1.25rem 0 5.25rem;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-bottom: 3.25rem;
  }
`;

const HeroCopy = styled.div`
  display: grid;
  gap: 1.25rem;
`;

const Eyebrow = styled.p`
  width: fit-content;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.68);
  color: ${({ theme }) => theme.colors.softText};
  padding: 0.4rem 0.85rem;
  font-size: 0.84rem;
  font-weight: 750;
`;

const Title = styled(Typography)`
  max-width: 720px;
`;

const Intro = styled(Typography)`
  max-width: 610px;
  font-size: 1.15rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  padding-top: 0.25rem;
`;

const PrimaryLink = styled(Button)``;

const SecondaryLink = styled(Link)`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 750;
`;

const HeroVisual = styled.div`
  position: relative;
  min-height: 440px;
  border: 1px solid rgba(229, 222, 213, 0.78);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(255, 250, 244, 0.92)),
    ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: ${({ theme }) => theme.shadows.card};
  overflow: hidden;

  &::before {
    position: absolute;
    inset: 1.5rem 1.5rem auto auto;
    width: 42%;
    height: 48%;
    border-radius: 999px;
    background: rgba(189, 111, 69, 0.14);
    content: "";
  }

  @media (max-width: 880px) {
    min-height: 360px;
  }

  @media (max-width: 520px) {
    min-height: 310px;
  }
`;

const FeaturedImage = styled.div`
  position: absolute;
  left: 9%;
  top: 13%;
  width: 62%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 22px 44px rgba(55, 47, 38, 0.16);
`;

const StackedImage = styled.div`
  position: absolute;
  right: 8%;
  bottom: 14%;
  width: 46%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: 10px solid ${({ theme }) => theme.colors.surfaceWarm};
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 18px 34px rgba(55, 47, 38, 0.13);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VisualNote = styled.div`
  position: absolute;
  left: 8%;
  bottom: 8%;
  max-width: 220px;
  border: 1px solid rgba(229, 222, 213, 0.78);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.86);
  padding: 0.85rem 1rem;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.92rem;
    line-height: 1.45;
  }

  strong {
    display: block;
    margin-bottom: 0.15rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SectionHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: end;
  margin-bottom: 1.75rem;
  padding-top: 0.25rem;

  @media (max-width: 640px) {
    align-items: flex-start;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SectionCopy = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const SectionTitle = styled(Typography)``;

const SectionIntro = styled(Typography)`
  max-width: 560px;
`;

const Count = styled.p`
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: ${({ theme }) => theme.colors.softText};
  padding: 0.45rem 0.8rem;
  font-size: 0.9rem;
  font-weight: 750;
  white-space: nowrap;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;

  & > article:nth-child(3n + 2) {
    margin-top: 1rem;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    & > article:nth-child(3n + 2) {
      margin-top: 0;
    }

    & > article:nth-child(even) {
      margin-top: 0.85rem;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;

    & > article:nth-child(even) {
      margin-top: 0;
    }
  }
`;

export default function StorePage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const featured = products[0];
  const secondary = products[2] || products[0];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  function retryProducts() {
    dispatch(fetchProducts());
  }

  return (
    <Page>
      <Hero>
        <HeroCopy>
          <Eyebrow>Curated everyday essentials</Eyebrow>
          <Title variant="h1">Quietly useful pieces for modern daily life.</Title>
          <Intro>
            NextStore brings together simple home, tech, and carry goods with a
            calm shopping experience that keeps the focus on the product.
          </Intro>
          <Actions>
            <PrimaryLink forwardedAs="a" href="#products" size="large">
              Explore Products
            </PrimaryLink>
            <SecondaryLink href="/about">About the Store</SecondaryLink>
          </Actions>
        </HeroCopy>

        {featured ? (
          <HeroVisual aria-label="Featured NextStore products">
            <FeaturedImage>
              <ProductImage src={featured.image} alt={featured.name} />
            </FeaturedImage>
            <StackedImage>
              <ProductImage src={secondary.image} alt={secondary.name} />
            </StackedImage>
            <VisualNote>
              <p>
                <strong>New arrivals</strong>
                Soft details, useful shapes, and products that fit naturally at
                home or on the go.
              </p>
            </VisualNote>
          </HeroVisual>
        ) : null}
      </Hero>

      <section id="products" aria-labelledby="products-title">
        <SectionHeader>
          <SectionCopy>
            <Eyebrow as="p">Featured collection</Eyebrow>
            <SectionTitle id="products-title" variant="h2">
              Shop the edit
            </SectionTitle>
            <SectionIntro>
              A compact selection of everyday goods with clean lines, useful
              details, and warm materials.
            </SectionIntro>
          </SectionCopy>
          <Count>{products.length} products</Count>
        </SectionHeader>

        {status === "loading" ? (
          <LoadingState message="Loading products..." />
        ) : null}

        {status === "failed" ? (
          <ErrorState
            message={error || "Unable to load products."}
            onRetry={retryProducts}
          />
        ) : null}

        {status === "succeeded" && products.length === 0 ? (
          <EmptyState title="No products are available.">
            Please check back soon for new arrivals.
          </EmptyState>
        ) : null}

        {products.length > 0 ? (
          <Grid>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        ) : null}
      </section>
    </Page>
  );
}
