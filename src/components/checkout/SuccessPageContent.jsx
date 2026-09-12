"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../../store/slices/cartSlice";
import {
  resetCheckout,
  selectDeliveryInfo,
} from "../../store/slices/checkoutSlice";
import Button from "../ui/Button/Button";
import Typography from "../ui/Typography/Typography";
import OrderSummary from "./OrderSummary";

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
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const StoreLink = styled(Button)``;

export default function SuccessPageContent() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const delivery = useSelector(selectDeliveryInfo);
  const [order] = useState(() => ({
    delivery,
    items: cartItems,
    total,
  }));

  useEffect(() => {
    dispatch(clearCart());
    dispatch(resetCheckout());
  }, [dispatch]);

  return (
    <Page>
      <Header>
        <Typography variant="h1">Payment Successful</Typography>
        <Typography>
          Thank you for your order. A confirmation summary is shown below when
          the order was completed in this session.
        </Typography>
      </Header>
      <Layout>
        <Panel>
          <Typography variant="h2">Order Confirmed</Typography>
          <Typography>
            Your payment was processed successfully in the demo checkout.
          </Typography>
          <StoreLink forwardedAs={Link} href="/" size="large">
            Back to Store
          </StoreLink>
        </Panel>
        {order.items.length > 0 ? (
          <OrderSummary
            delivery={order.delivery}
            items={order.items}
            total={order.total}
          />
        ) : null}
      </Layout>
    </Page>
  );
}
