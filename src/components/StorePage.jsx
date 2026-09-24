"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { filterAndSortProducts } from "../lib/productFilters";
import { EmptyState } from "./ui/AsyncState/AsyncState";
import Button from "./ui/Button/Button";
import Typography from "./ui/Typography/Typography";
import ProductCard from "./ProductCard";

const Page = styled.div`
  width: min(100% - 2.5rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: 3.5rem 0 4.5rem;

  @media (max-width: 640px) {
    width: min(100% - 1.25rem, ${({ theme }) => theme.layout.maxWidth});
    padding: 2rem 0 3rem;
  }
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(320px, 0.78fr);
  gap: 3.5rem;
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
  transition:
    border-color 160ms ease,
    color 160ms ease;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HeroVisual = styled.div`
  position: relative;
  min-height: 450px;
  border: 1px solid rgba(229, 222, 213, 0.78);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(255, 250, 244, 0.92)),
    ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: 0 24px 54px rgba(38, 50, 45, 0.11);
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

const FilterPanel = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.88);
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: 640px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const FilterHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  justify-content: space-between;
`;

const FilterTitle = styled(Typography)``;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 1.5fr) repeat(3, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  align-items: end;

  @media (max-width: 940px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: grid;
  min-width: 0;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const Control = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.78rem 0.9rem;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.softText};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(47, 102, 87, 0.09);
  }
`;

const Select = styled.select`
  width: 100%;
  min-width: 0;
  min-height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.78rem 0.9rem;
  font: inherit;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
    box-shadow: 0 0 0 4px rgba(47, 102, 87, 0.09);
  }
`;

const PriceGroup = styled.fieldset`
  display: grid;
  min-width: 0;
  margin: 0;
  border: 0;
  padding: 0;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const PriceLegend = styled.legend`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const PriceFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;

  }
`;

export default function StorePage({ products }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const featured = products[0];
  const secondary = products[2] || products[0];
  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  );
  const visibleProducts = useMemo(
    () =>
      filterAndSortProducts(products, {
        search,
        category,
        minPrice,
        maxPrice,
        sort,
      }),
    [products, search, category, minPrice, maxPrice, sort],
  );
  const hasActiveFilters = Boolean(
    search || category || minPrice || maxPrice || sort,
  );

  function clearFilters() {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
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
          <Count aria-live="polite">
            {visibleProducts.length}{" "}
            {visibleProducts.length === 1 ? "product" : "products"}
          </Count>
        </SectionHeader>

        {products.length > 0 ? (
          <FilterPanel aria-labelledby="filter-title">
            <FilterHeader>
              <FilterTitle id="filter-title" variant="h3">
                Filter products
              </FilterTitle>
              <Button
                type="button"
                variant="secondary"
                disabled={!hasActiveFilters}
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </FilterHeader>
            <FilterGrid>
              <Field>
                <Label htmlFor="product-search">Search</Label>
                <Control
                  id="product-search"
                  type="search"
                  value={search}
                  placeholder="Search by product name"
                  onChange={(event) => setSearch(event.target.value)}
                />
              </Field>

              <Field>
                <Label htmlFor="product-category">Category</Label>
                <Select
                  id="product-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="">All categories</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Field>

              <PriceGroup>
                <PriceLegend>Price range</PriceLegend>
                <PriceFields>
                  <Control
                    aria-label="Minimum price"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={minPrice}
                    placeholder="Min"
                    onChange={(event) => setMinPrice(event.target.value)}
                  />
                  <Control
                    aria-label="Maximum price"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={maxPrice}
                    placeholder="Max"
                    onChange={(event) => setMaxPrice(event.target.value)}
                  />
                </PriceFields>
              </PriceGroup>

              <Field>
                <Label htmlFor="product-sort">Sort by</Label>
                <Select
                  id="product-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                </Select>
              </Field>
            </FilterGrid>
          </FilterPanel>
        ) : null}

        {products.length === 0 ? (
          <EmptyState title="No products are available.">
            Please check back soon for new arrivals.
          </EmptyState>
        ) : null}

        {products.length > 0 && visibleProducts.length === 0 ? (
          <EmptyState
            title="No products match your filters."
            actionLabel="Clear Filters"
            onAction={clearFilters}
          >
            Try a different search, category, or price range.
          </EmptyState>
        ) : null}

        {visibleProducts.length > 0 ? (
          <Grid>
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        ) : null}
      </section>
    </Page>
  );
}
