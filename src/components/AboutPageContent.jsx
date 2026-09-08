"use client";

import styled from "styled-components";

const Page = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const Intro = styled.section`
  max-width: 760px;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: 3rem;
  line-height: 1.1;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const Text = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Point = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PointTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: 1.2rem;
`;

const PointText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const points = [
  {
    title: "Quality Products",
    text: "Every item in this sample store is presented with clear details and useful categories.",
  },
  {
    title: "Simple Shopping",
    text: "The layout focuses on easy browsing, readable product cards, and clear navigation.",
  },
  {
    title: "Responsive Experience",
    text: "Pages adapt from desktop grids to compact mobile layouts without changing the core content.",
  },
];

export default function AboutPageContent() {
  return (
    <Page>
      <Intro>
        <Title>About NextStore</Title>
        <Text>
          NextStore is a beginner-friendly online store project built to show how
          Next.js pages, routes, components, props, local data, and
          styled-components fit together in a small app.
        </Text>
      </Intro>

      <section aria-labelledby="why-title">
        <Title as="h2" id="why-title">
          Why Choose Us
        </Title>
        <Grid>
          {points.map((point) => (
            <Point key={point.title}>
              <PointTitle>{point.title}</PointTitle>
              <PointText>{point.text}</PointText>
            </Point>
          ))}
        </Grid>
      </section>
    </Page>
  );
}
