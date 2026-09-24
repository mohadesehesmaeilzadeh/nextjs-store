import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StorefrontError from "../app/error";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import {
  ProductDetailsLoading,
  ProductListingLoading,
  RouteMessage,
} from "./RouteStates";

describe("RouteStates", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders accessible loading states", () => {
    const { rerender } = renderWithProviders(<ProductListingLoading />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading products...");

    rerender(<ProductDetailsLoading />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading product...");
  });

  it("renders a safe error message and retries", async () => {
    const user = userEvent.setup();
    const retry = jest.fn();

    renderWithProviders(
      <RouteMessage
        eyebrow="Storefront error"
        title="We could not load this page."
        description="Please try again."
        onRetry={retry}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "We could not load this page." }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try Again" }));
    expect(retry).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("link", { name: "Back to Store" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the App Router error fallback without exposing the error", async () => {
    const user = userEvent.setup();
    const retry = jest.fn();
    const error = new Error("Sensitive internal failure");
    jest.spyOn(console, "error").mockImplementation(() => {});

    renderWithProviders(<StorefrontError error={error} retry={retry} />);

    expect(
      screen.getByRole("heading", { name: "We could not load this page." }),
    ).toBeInTheDocument();
    expect(screen.queryByText(error.message)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try Again" }));
    expect(retry).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
