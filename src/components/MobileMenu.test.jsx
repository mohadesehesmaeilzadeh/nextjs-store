import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import MobileMenu from "./MobileMenu";

describe("MobileMenu", () => {
  it("opens and closes the mobile navigation", async () => {
    const user = userEvent.setup();

    renderWithProviders(<MobileMenu cartCount={3} />);

    const button = screen.getByText("Menu").closest("button");
    const nav = screen.getByText("Store").closest("nav");

    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("link", { name: /cart \(3\)/i, hidden: true }),
    ).toHaveAttribute("href", "/cart");

    await user.click(screen.getByRole("link", { name: /about/i, hidden: true }));
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(nav).toBeInTheDocument();
  });
});
