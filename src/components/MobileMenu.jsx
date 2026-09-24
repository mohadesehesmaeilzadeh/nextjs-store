"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const MenuButton = styled.button`
  display: none;
  min-width: 72px;
  min-height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.66);
  color: ${({ theme }) => theme.colors.text};
  padding: 0.55rem 1rem;
  font-weight: 750;
  transition:
    background 160ms ease,
    border-color 160ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.surface};
  }

  @media (max-width: 900px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const Panel = styled.nav`
  display: none;

  @media (max-width: 900px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    gap: 0.25rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    background: rgba(251, 247, 240, 0.98);
    box-shadow: ${({ theme }) => theme.shadows.card};
    padding: ${({ theme }) => theme.spacing.md}
      max(1rem, calc((100% - ${({ theme }) => theme.layout.maxWidth}) / 2));
  }
`;

const MobileLink = styled(Link)`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0.55rem 0.75rem;
  font-weight: 750;
  transition:
    background 160ms ease,
    color 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const MobileButton = styled.button`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0.55rem 0.75rem;
  font: inherit;
  font-weight: 750;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`;

export default function MobileMenu({
  cartCount = 0,
  isAuthenticated = false,
  isLoggingOut = false,
  onLogout,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <MenuButton
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        Menu
      </MenuButton>
      <Panel id="mobile-navigation" aria-label="Mobile navigation" $open={isOpen}>
        <MobileLink href="/" onClick={closeMenu}>
          Store
        </MobileLink>
        <MobileLink href="/about" onClick={closeMenu}>
          About
        </MobileLink>
        <MobileLink href="/contact" onClick={closeMenu}>
          Contact
        </MobileLink>
        <MobileLink href="/news" onClick={closeMenu}>
          News
        </MobileLink>
        <MobileLink href="/cart" onClick={closeMenu}>
          Cart ({cartCount})
        </MobileLink>
        {isAuthenticated ? (
          <>
            <MobileLink href="/account" onClick={closeMenu}>
              Account
            </MobileLink>
            <MobileButton
              type="button"
              disabled={isLoggingOut}
              onClick={() => {
                closeMenu();
                onLogout?.();
              }}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </MobileButton>
          </>
        ) : (
          <MobileLink href="/login" onClick={closeMenu}>
            Login
          </MobileLink>
        )}
      </Panel>
    </>
  );
}
