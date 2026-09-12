"use client";

import styled from "styled-components";
import Button from "../ui/Button/Button";
import Typography from "../ui/Typography/Typography";
import QuantityControl from "./QuantityControl";

const Row = styled.article`
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};

  @media (max-width: 720px) {
    grid-template-columns: 82px minmax(0, 1fr);
  }
`;

const ImageWrap = styled.div`
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Details = styled.div`
  display: grid;
  min-width: 0;
  gap: 0.35rem;
`;

const Name = styled(Typography)``;

const Price = styled(Typography)`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const Actions = styled.div`
  display: grid;
  justify-items: end;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 720px) {
    grid-column: 1 / -1;
    grid-template-columns: 1fr auto;
    align-items: center;
    justify-items: start;
  }

  @media (max-width: 440px) {
    grid-template-columns: 1fr;
  }
`;

const Subtotal = styled(Typography)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-content: flex-end;

  @media (max-width: 720px) {
    justify-content: flex-start;
  }
`;

export default function CartItem({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}) {
  return (
    <Row>
      <ImageWrap>
        <Image src={item.image} alt={item.name} loading="lazy" />
      </ImageWrap>
      <Details>
        <Name variant="h3">{item.name}</Name>
        <Price variant="bodySmall">${item.price} each</Price>
        <Typography variant="bodySmall">
          Item subtotal: ${item.price * item.quantity}
        </Typography>
      </Details>
      <Actions>
        <Subtotal variant="bodySmall">
          ${item.price * item.quantity}
        </Subtotal>
        <ActionButtons>
          <QuantityControl
            quantity={item.quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
          <Button
            type="button"
            size="small"
            variant="danger"
            onClick={onRemove}
          >
            Remove
          </Button>
        </ActionButtons>
      </Actions>
    </Row>
  );
}
