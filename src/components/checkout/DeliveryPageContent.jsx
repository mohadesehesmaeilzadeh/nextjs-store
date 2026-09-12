"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCartItems } from "../../store/slices/cartSlice";
import { EmptyState } from "../ui/AsyncState/AsyncState";
import Button from "../ui/Button/Button";
import Typography from "../ui/Typography/Typography";
import DeliveryForm from "./DeliveryForm";

const Page = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: 3.5rem 0 4.5rem;
`;

const Header = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 720px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Panel = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CartLink = styled(Button)``;

const EmptyAction = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export default function DeliveryPageContent() {
  const items = useSelector(selectCartItems);

  if (items.length === 0) {
    return (
      <Page>
        <EmptyState title="Your cart is empty.">
          Add a product before entering delivery information.
        </EmptyState>
        <EmptyAction>
          <CartLink forwardedAs={Link} href="/" variant="secondary">
            Continue Shopping
          </CartLink>
        </EmptyAction>
      </Page>
    );
  }

  return (
    <Page>
      <Header>
        <Typography variant="h1">Delivery Information</Typography>
        <Typography>
          Tell us where to send your order. All fields are required for this
          demo checkout.
        </Typography>
      </Header>
      <Panel>
        <DeliveryForm />
      </Panel>
    </Page>
  );
}
