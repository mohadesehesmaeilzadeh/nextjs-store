import { screen, within } from "@testing-library/react";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders brand, copyright, and footer navigation", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText("NextStore")).toBeInTheDocument();
    expect(screen.getByText(/2026 nextstore/i)).toBeInTheDocument();

    const nav = screen.getByRole("navigation", { name: /footer navigation/i });
    expect(within(nav).getByRole("link", { name: /store/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(within(nav).getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(within(nav).getByRole("link", { name: /contact/i })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
