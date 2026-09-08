"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import MobileMenu from "./MobileMenu";

const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid rgba(229, 222, 213, 0.86);
  background: rgba(255, 250, 244, 0.9);
  backdrop-filter: blur(14px);
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
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0;

  &::before {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.accent};
    content: "";
  }
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
  border-bottom: 2px solid transparent;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.muted};
  font-weight: 650;
  transition: color 160ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${({ theme, $active }) =>
    $active
      ? `
        border-bottom-color: ${theme.colors.accent};
      `
      : ""}
`;

export default function Header() {
  const pathname = usePathname();

  return (
    <HeaderWrap>
      <Bar>
        <Brand href="/">NextStore</Brand>
        <DesktopNav aria-label="Main navigation">
          <NavLink href="/" $active={pathname === "/"}>
            Store
          </NavLink>
          <NavLink href="/about" $active={pathname === "/about"}>
            About
          </NavLink>
          <NavLink href="/contact" $active={pathname === "/contact"}>
            Contact
          </NavLink>
        </DesktopNav>
        <MobileMenu />
      </Bar>
    </HeaderWrap>
  );
}
