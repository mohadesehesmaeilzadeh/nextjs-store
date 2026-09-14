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
    expect(screen.getByText("News").closest("a")).toHaveAttribute("href", "/news");
    expect(screen.getByText("Cart (3)").closest("a")).toHaveAttribute("href", "/cart");
    expect(screen.getByText("Login").closest("a")).toHaveAttribute("href", "/login");

    await user.click(screen.getByRole("link", { name: /about/i, hidden: true }));
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(nav).toBeInTheDocument();
  });

  it("shows account and logout actions for authenticated users", async () => {
    const user = userEvent.setup();
    const onLogout = jest.fn();

    renderWithProviders(
      <MobileMenu cartCount={1} isAuthenticated onLogout={onLogout} />,
    );

    await user.click(screen.getByText("Menu"));

    expect(screen.getByText("Account").closest("a")).toHaveAttribute(
      "href",
      "/account",
    );

    await user.click(screen.getByText("Logout"));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
