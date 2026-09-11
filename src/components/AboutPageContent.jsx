"use client";

import styled from "styled-components";
import Typography from "./ui/Typography/Typography";

const Page = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: 3.75rem 0 4.5rem;

  @media (max-width: 640px) {
    padding: 2.5rem 0 3rem;
  }
`;

const Intro = styled.section`
  max-width: 780px;
  margin-bottom: 3.5rem;
`;

const Title = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Text = styled(Typography)`
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
  background: rgba(255, 255, 255, 0.72);
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const PointTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PointText = styled(Typography)``;

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
        <Title variant="h1">About NextStore</Title>
        <Text>
          NextStore is a beginner-friendly online store project built to show how
          Next.js pages, routes, components, props, local data, and
          styled-components fit together in a small app.
        </Text>
      </Intro>

      <section aria-labelledby="why-title">
        <Title forwardedAs="h2" id="why-title" variant="h2">
          Why Choose Us
        </Title>
        <Grid>
          {points.map((point) => (
            <Point key={point.title}>
              <PointTitle variant="h3">{point.title}</PointTitle>
              <PointText>{point.text}</PointText>
            </Point>
          ))}
        </Grid>
      </section>
    </Page>
  );
}
