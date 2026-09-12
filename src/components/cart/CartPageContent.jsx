"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../../store/slices/cartSlice";
import { EmptyState } from "../ui/AsyncState/AsyncState";
import Button from "../ui/Button/Button";
import Typography from "../ui/Typography/Typography";
import CartItem from "./CartItem";

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

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Summary = styled.aside`
  position: sticky;
  top: 96px;
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceWarm};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: 900px) {
    position: static;
  }
`;

const SummaryLine = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const CheckoutLink = styled(Button)``;

const ShoppingLink = styled(Button)``;

const EmptyAction = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export default function CartPageContent() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <Page>
        <EmptyState title="Your cart is empty.">
          Add a product before continuing to checkout.
        </EmptyState>
        <EmptyAction>
          <ShoppingLink forwardedAs={Link} href="/" variant="secondary">
            Continue Shopping
          </ShoppingLink>
        </EmptyAction>
      </Page>
    );
  }

  return (
    <Page>
      <Header>
        <Typography variant="h1">Your Cart</Typography>
        <Typography>
          Review your items, adjust quantities, and continue to delivery when
          everything looks right.
        </Typography>
      </Header>

      <Layout>
        <List>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onDecrease={() => dispatch(decreaseQuantity(item.id))}
              onIncrease={() => dispatch(increaseQuantity(item.id))}
              onRemove={() => dispatch(removeFromCart(item.id))}
            />
          ))}
        </List>

        <Summary aria-label="Cart total">
          <Typography variant="h2">Summary</Typography>
          <SummaryLine>
            <span>Subtotal</span>
            <span>${total}</span>
          </SummaryLine>
          <SummaryLine>
            <span>Total</span>
            <span>${total}</span>
          </SummaryLine>
          <CheckoutLink
            forwardedAs={Link}
            href="/checkout/delivery"
            fullWidth
            size="large"
          >
            Continue to Delivery
          </CheckoutLink>
          <ShoppingLink forwardedAs={Link} href="/" fullWidth variant="secondary">
            Continue Shopping
          </ShoppingLink>
        </Summary>
      </Layout>
    </Page>
  );
}
