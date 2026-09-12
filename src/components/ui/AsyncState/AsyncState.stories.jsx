import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "./AsyncState";

const meta = {
  title: "Design System/AsyncState",
  component: LoadingState,
};

export default meta;

export const Loading = {
  render: () => <LoadingState message="Loading products..." />,
};

export const Error = {
  render: () => (
    <ErrorState message="Unable to load products." onRetry={() => {}} />
  ),
};

export const Empty = {
  render: () => (
    <EmptyState title="Your cart is empty.">
      Add a product to continue checkout.
    </EmptyState>
  ),
};
