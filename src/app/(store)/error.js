"use client";

import { useEffect } from "react";
import { RouteMessage } from "../../components/RouteStates";

export default function StoreError({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <RouteMessage
      eyebrow="Product error"
      title="We could not load the products."
      description="The catalog is temporarily unavailable. Try again in a moment."
      onRetry={retry}
    />
  );
}
