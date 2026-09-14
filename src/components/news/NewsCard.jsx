"use client";

import styled from "styled-components";
import Typography from "../ui/Typography/Typography";

const Card = styled.article`
  display: flex;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid rgba(229, 222, 213, 0.9);
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.85rem;
  box-shadow: 0 4px 16px rgba(55, 47, 38, 0.045);
`;

const ImageWrap = styled.div`
  aspect-ratio: 5 / 3;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  display: grid;
  gap: 0.45rem;
  padding: 0 0.2rem 0.15rem;
`;

const DateText = styled(Typography)``;

const Title = styled(Typography)``;

const Description = styled(Typography)``;

function formatDate(date) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

export default function NewsCard({ news }) {
  const title = news?.title || "Untitled news";
  const description = news?.description || "No description available.";
  const formattedDate = formatDate(news?.date);

  return (
    <Card>
      {news?.image ? (
        <ImageWrap>
          <Image src={news.image} alt={title} loading="lazy" />
        </ImageWrap>
      ) : null}
      <Content>
        {formattedDate ? (
          <DateText as="time" dateTime={news.date} variant="caption">
            {formattedDate}
          </DateText>
        ) : null}
        <Title variant="h3">{title}</Title>
        <Description variant="bodySmall">{description}</Description>
      </Content>
    </Card>
  );
}
