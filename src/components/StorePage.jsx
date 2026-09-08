"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
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

const Title = styled.h1`
  max-width: 720px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 4.15rem;
  line-height: 1.02;

  @media (max-width: 640px) {
    font-size: 2.45rem;
    line-height: 1.08;
  }
`;

const Intro = styled.p`
  max-width: 610px;
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.15rem;
  line-height: 1.75;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  padding-top: 0.25rem;
`;

const PrimaryLink = styled.a`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  padding: 0.85rem 1.15rem;
  font-weight: 800;
  box-shadow: 0 10px 20px rgba(49, 95, 82, 0.18);
  transition:
    background 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    box-shadow: 0 14px 26px rgba(49, 95, 82, 0.22);
    transform: translateY(-1px);
  }
`;

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

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  line-height: 1.15;
`;

const SectionIntro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
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

const Empty = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.muted};
`;

export default function StorePage({ products }) {
  const featured = products[0];
  const secondary = products[2] || products[0];

  return (
    <Page>
      <Hero>
        <HeroCopy>
          <Eyebrow>Curated everyday essentials</Eyebrow>
          <Title>Quietly useful pieces for modern daily life.</Title>
          <Intro>
            NextStore brings together simple home, tech, and carry goods with a
            calm shopping experience that keeps the focus on the product.
          </Intro>
          <Actions>
            <PrimaryLink href="#products">Explore Products</PrimaryLink>
            <SecondaryLink href="/about">About the Store</SecondaryLink>
          </Actions>
        </HeroCopy>

        {featured ? (
          <HeroVisual aria-label="Featured NextStore products">
            <FeaturedImage>
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                unoptimized
                sizes="(max-width: 880px) 70vw, 34vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </FeaturedImage>
            <StackedImage>
              <Image
                src={secondary.image}
                alt={secondary.name}
                fill
                unoptimized
                sizes="(max-width: 880px) 45vw, 24vw"
                style={{ objectFit: "cover" }}
              />
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
            <SectionTitle id="products-title">Shop the edit</SectionTitle>
            <SectionIntro>
              A compact selection of everyday goods with clean lines, useful
              details, and warm materials.
            </SectionIntro>
          </SectionCopy>
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
