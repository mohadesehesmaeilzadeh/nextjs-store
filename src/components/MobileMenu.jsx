"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const MenuButton = styled.button`
  display: none;
  min-height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.55rem 0.85rem;
  font-weight: 700;

  @media (max-width: 700px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const Panel = styled.nav`
  display: none;

  @media (max-width: 700px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
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
  font-weight: 700;
`;

export default function MobileMenu() {
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
      </Panel>
    </>
  );
}
