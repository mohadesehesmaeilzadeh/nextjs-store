"use client";

import styled from "styled-components";
import Typography from "../ui/Typography/Typography";

const Panel = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceWarm};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Items = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const Delivery = styled.div`
  display: grid;
  gap: 0.25rem;
`;

export default function OrderSummary({ delivery, items, total }) {
  return (
    <Panel aria-label="Order summary">
      <Typography variant="h2">Order Summary</Typography>
      <Items>
        {items.map((item) => (
          <Item key={item.id}>
            <div>
              <Typography variant="bodySmall">{item.name}</Typography>
              <Typography variant="caption">Qty {item.quantity}</Typography>
            </div>
            <Typography variant="bodySmall">
              ${item.price * item.quantity}
            </Typography>
          </Item>
        ))}
      </Items>
      <Total>
        <span>Total</span>
        <span>${total}</span>
      </Total>

      {delivery ? (
        <Delivery>
          <Typography variant="h3">Delivery</Typography>
          <Typography variant="bodySmall">{delivery.fullName}</Typography>
          <Typography variant="bodySmall">{delivery.email}</Typography>
          <Typography variant="bodySmall">{delivery.phone}</Typography>
          <Typography variant="bodySmall">{delivery.address}</Typography>
          <Typography variant="bodySmall">
            {delivery.city} {delivery.postalCode}
          </Typography>
        </Delivery>
      ) : null}
    </Panel>
  );
}
