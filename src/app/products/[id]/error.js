"use client";

import { useEffect } from "react";
import { RouteMessage } from "../../../components/RouteStates";

export default function ProductError({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <RouteMessage
      eyebrow="Product error"
      title="We could not load this product."
      description="The problem may be temporary. Try again, or return to the store."
      onRetry={retry}
    />
  );
}
