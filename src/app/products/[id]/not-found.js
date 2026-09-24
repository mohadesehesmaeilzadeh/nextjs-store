import { RouteMessage } from "../../../components/RouteStates";

export default function ProductNotFound() {
  return (
    <RouteMessage
      eyebrow="Product unavailable"
      title="Product not found"
      description="This product does not exist or may have been removed from the store."
    />
  );
}
