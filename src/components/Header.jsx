"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCartCount } from "../store/slices/cartSlice";
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

export default function Header({ initialSession = null }) {
  const pathname = usePathname();
  const router = useRouter();
  const cartCount = useSelector(selectCartCount);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isAuthenticated = Boolean(initialSession);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      setIsLoggingOut(false);
      router.push("/login");
      router.refresh();
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
