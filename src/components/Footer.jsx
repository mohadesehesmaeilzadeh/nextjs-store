"use client";

import Link from "next/link";
import styled from "styled-components";
import Typography from "./ui/Typography/Typography";

const FooterWrap = styled.footer`
  margin-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background:
    linear-gradient(180deg, rgba(255, 250, 244, 0.92), rgba(241, 229, 216, 0.72)),
    ${({ theme }) => theme.colors.surfaceWarm};
`;

const Inner = styled.div`
  display: grid;
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.8fr);
  gap: 2.5rem;
  margin: 0 auto;
  padding: 2.4rem 0;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
`;

const BrandGroup = styled.div`
  display: grid;
  gap: 0.75rem;
  max-width: 460px;
`;

const Brand = styled(Typography)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;

  &::before {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.accent};
    content: "";
  }
`;

const Tagline = styled(Typography)``;

const Copyright = styled(Typography)`
  color: ${({ theme }) => theme.colors.softText};
`;

const FooterNav = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }
`;

const LinkGroup = styled.nav`
  display: grid;
  gap: 0.35rem;
`;

const GroupTitle = styled(Typography)`
  margin-bottom: 0.25rem;
`;

const FooterLink = styled(Link)`
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 650;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PlainText = styled(Typography)``;

export default function Footer() {
  return (
    <FooterWrap>
      <Inner>
        <BrandGroup>
          <Brand forwardedAs="p" variant="h3">
            NextStore
          </Brand>
          <Tagline>
            Everyday products with a softer, more considered shopping
            experience.
          </Tagline>
          <Copyright variant="bodySmall">&copy; 2026 NextStore</Copyright>
        </BrandGroup>
        <FooterNav>
          <LinkGroup aria-label="Footer navigation">
            <GroupTitle variant="caption">Pages</GroupTitle>
            <FooterLink href="/">Store</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </LinkGroup>
          <LinkGroup aria-label="Store details">
            <GroupTitle variant="caption">Store</GroupTitle>
            <PlainText variant="bodySmall">Curated essentials</PlainText>
            <PlainText variant="bodySmall">Local sample data</PlainText>
            <PlainText variant="bodySmall">Real product photos</PlainText>
          </LinkGroup>
        </FooterNav>
      </Inner>
    </FooterWrap>
  );
}
