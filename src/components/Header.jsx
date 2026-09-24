"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCartCount } from "../store/slices/cartSlice";
import { useAuth } from "./AuthProvider";
import MobileMenu from "./MobileMenu";

const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid rgba(221, 217, 208, 0.9);
  background: rgba(251, 247, 240, 0.92);
  box-shadow: 0 4px 18px rgba(38, 50, 45, 0.035);
  backdrop-filter: blur(16px);
`;

const Bar = styled.div`
  display: flex;
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  min-height: 76px;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: 0 auto;

  @media (max-width: 900px) {
    min-height: 66px;
  }
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: ${({ theme }) => theme.colors.text};
  min-height: 44px;
  font-size: 1.2rem;
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
  gap: 1.2rem;

  @media (max-width: 900px) {
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

const NavButton = styled.button`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  padding: 0;
  font: inherit;
  font-weight: 650;
  transition: color 160ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const cartCount = useSelector(selectCartCount);
  const { logout, session } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isAuthenticated = Boolean(session);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      logout();
    } finally {
      setIsLoggingOut(false);
      router.push("/login");
    }
  }

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
          <NavLink href="/news" $active={pathname === "/news"}>
            News
          </NavLink>
          <NavLink href="/cart" $active={pathname === "/cart"}>
            Cart ({cartCount})
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink href="/account" $active={pathname === "/account"}>
                Account
              </NavLink>
              <NavButton
                type="button"
                disabled={isLoggingOut}
                onClick={handleLogout}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </NavButton>
            </>
          ) : (
            <NavLink href="/login" $active={pathname === "/login"}>
              Login
            </NavLink>
          )}
        </DesktopNav>
        <MobileMenu
          cartCount={cartCount}
          isAuthenticated={isAuthenticated}
          isLoggingOut={isLoggingOut}
          onLogout={handleLogout}
        />
      </Bar>
    </HeaderWrap>
  );
}
