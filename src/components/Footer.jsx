"use client";

import Link from "next/link";
import styled from "styled-components";

const FooterWrap = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const Inner = styled.div`
  display: flex;
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} 0;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const BrandGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Brand = styled.p`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
`;

const Copyright = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const Links = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FooterLink = styled(Link)`
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 700;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Footer() {
  return (
    <FooterWrap>
      <Inner>
        <BrandGroup>
          <Brand>NextStore</Brand>
          <Copyright>&copy; 2026 NextStore</Copyright>
        </BrandGroup>
        <Links aria-label="Footer navigation">
          <FooterLink href="/">Store</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </Links>
      </Inner>
    </FooterWrap>
  );
}
