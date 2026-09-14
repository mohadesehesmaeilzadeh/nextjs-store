"use client";

import { useQuery } from "@apollo/client/react";
import styled from "styled-components";
import { GET_NEWS } from "../../graphql/news";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../ui/AsyncState/AsyncState";
import Typography from "../ui/Typography/Typography";
import NewsCard from "./NewsCard";

const Page = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: 3.75rem 0 4.5rem;
`;

const Intro = styled.section`
  max-width: 680px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Eyebrow = styled.p`
  width: fit-content;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.68);
  color: ${({ theme }) => theme.colors.softText};
  padding: 0.4rem 0.85rem;
  font-size: 0.84rem;
  font-weight: 750;
`;

const Title = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Text = styled(Typography)`
  font-size: 1.08rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

function getNewsItems(data) {
  return Array.isArray(data?.news) ? data.news : [];
}

export default function NewsList({ pollInterval = 0 }) {
  const { data, error, loading, refetch } = useQuery(GET_NEWS, {
    pollInterval,
  });
  const newsItems = getNewsItems(data);

  return (
    <Page>
      <Intro>
        <Eyebrow>Store updates</Eyebrow>
        <Title variant="h1">Store News</Title>
        <Text>
          Fresh product notes, launch updates, and behind-the-scenes store
          announcements from the NextStore team.
        </Text>
      </Intro>

      {loading ? <LoadingState message="Loading news..." /> : null}

      {error ? (
        <ErrorState message="Unable to load news." onRetry={() => refetch()} />
      ) : null}

      {!loading && !error && newsItems.length === 0 ? (
        <EmptyState title="No news available." />
      ) : null}

      {!loading && !error && newsItems.length > 0 ? (
        <Grid>
          {newsItems.map((newsItem) => (
            <NewsCard key={newsItem.id} news={newsItem} />
          ))}
        </Grid>
      ) : null}
    </Page>
  );
}
