import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test-utils/renderWithProviders";
import { EmptyState, ErrorState, LoadingState } from "./AsyncState";

describe("AsyncState", () => {
  it("renders loading copy", () => {
    renderWithProviders(<LoadingState message="Loading products..." />);

    expect(
      screen.getByRole("heading", { name: /loading products/i }),
    ).toBeInTheDocument();
  });

  it("renders an error action and handles retry", async () => {
    const user = userEvent.setup();
    const onRetry = jest.fn();

    renderWithProviders(
      <ErrorState message="Unable to load products." onRetry={onRetry} />,
    );

    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders empty state content", () => {
    renderWithProviders(
      <EmptyState title="Your cart is empty.">
        Add a product before continuing.
      </EmptyState>,
    );

    expect(
      screen.getByRole("heading", { name: /your cart is empty/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/add a product/i)).toBeInTheDocument();
  });
});
