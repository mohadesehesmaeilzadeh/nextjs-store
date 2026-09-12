"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addToCart } from "../../store/slices/cartSlice";
import Button from "../ui/Button/Button";

const LiveMessage = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

export default function AddToCartButton({
  children = "Add to Cart",
  product,
  size = "medium",
}) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleAddToCart() {
    dispatch(addToCart(product));
    setIsAdded(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsAdded(false);
    }, 1600);
  }

  return (
    <>
      <Button
        type="button"
        size={size}
        variant={isAdded ? "secondary" : "primary"}
        onClick={handleAddToCart}
      >
        {isAdded ? "Added to Cart" : children}
      </Button>
      <LiveMessage role="status" aria-live="polite">
        {isAdded ? `${product.name} added to cart.` : ""}
      </LiveMessage>
    </>
  );
}
