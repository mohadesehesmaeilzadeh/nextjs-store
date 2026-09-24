"use client";

import { useEffect } from "react";
import { RouteMessage } from "../components/RouteStates";

export default function StorefrontError({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <RouteMessage
      eyebrow="Storefront error"
      title="We could not load this page."
      description="Something unexpected happened. Try again, or return to the store."
      onRetry={retry}
    />
  );
}
