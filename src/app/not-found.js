import { RouteMessage } from "../components/RouteStates";

export default function NotFound() {
  return (
    <RouteMessage
      eyebrow="404"
      title="Page not found"
      description="The page you are looking for does not exist or may have moved."
    />
  );
}
