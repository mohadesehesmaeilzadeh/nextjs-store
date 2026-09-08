"use client";

import Link from "next/link";
import styled from "styled-components";
import MobileMenu from "./MobileMenu";

const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
`;

const Bar = styled.div`
  display: flex;
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  min-height: 72px;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: 0 auto;
`;

const Brand = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  font-weight: 800;
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 700px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 700;
  transition: color 160ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Header() {
  return (
    <HeaderWrap>
      <Bar>
        <Brand href="/">NextStore</Brand>
        <DesktopNav aria-label="Main navigation">
          <NavLink href="/">Store</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </DesktopNav>
        <MobileMenu />
      </Bar>
    </HeaderWrap>
  );
}
