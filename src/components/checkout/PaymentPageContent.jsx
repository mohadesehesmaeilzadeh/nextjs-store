"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/slices/cartSlice";
import {
  selectDeliveryInfo,
  selectHasDeliveryInfo,
  selectPaymentStatus,
  setPaymentStatus,
} from "../../store/slices/checkoutSlice";
import { EmptyState } from "../ui/AsyncState/AsyncState";
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

const PaymentPanel = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const LinkButton = styled(Button)``;

const EmptyAction = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export default function PaymentPageContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const delivery = useSelector(selectDeliveryInfo);
  const hasDelivery = useSelector(selectHasDeliveryInfo);
  const paymentStatus = useSelector(selectPaymentStatus);
  const isProcessing = paymentStatus === "processing";

  useEffect(() => {
    return () => {
      if (paymentStatus === "processing") {
        dispatch(setPaymentStatus("idle"));
      }
    };
  }, [dispatch, paymentStatus]);

  function handlePayment() {
    dispatch(setPaymentStatus("processing"));

    window.setTimeout(() => {
      dispatch(setPaymentStatus("succeeded"));
      router.push("/checkout/success");
    }, 900);
  }

  if (items.length === 0) {
    return (
      <Page>
        <EmptyState title="Your cart is empty.">
          Add products before continuing to payment.
        </EmptyState>
        <EmptyAction>
          <LinkButton forwardedAs={Link} href="/" variant="secondary">
            Continue Shopping
          </LinkButton>
        </EmptyAction>
      </Page>
    );
  }

  if (!hasDelivery) {
    return (
      <Page>
        <EmptyState title="Delivery information is missing.">
          Enter delivery information before payment.
        </EmptyState>
        <EmptyAction>
          <LinkButton
            forwardedAs={Link}
            href="/checkout/delivery"
            variant="secondary"
          >
            Back to Delivery
          </LinkButton>
        </EmptyAction>
      </Page>
    );
  }

  return (
    <Page>
      <Header>
        <Typography variant="h1">Checkout</Typography>
        <Typography>
          Review your order. Payment is simulated and always succeeds in this
          demo store.
        </Typography>
      </Header>
      <Layout>
        <PaymentPanel>
          <Typography variant="h2">Payment</Typography>
          <Typography>
            This page does not connect to a real payment provider. Click Pay Now
            to simulate a successful payment.
          </Typography>
          {isProcessing ? (
            <Typography role="status">Processing payment...</Typography>
          ) : null}
          <Button
            type="button"
            size="large"
            disabled={isProcessing}
            onClick={handlePayment}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </PaymentPanel>
        <OrderSummary delivery={delivery} items={items} total={total} />
      </Layout>
    </Page>
  );
}
