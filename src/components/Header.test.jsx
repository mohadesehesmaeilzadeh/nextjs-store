import { usePathname, useRouter } from "next/navigation";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import Header from "./Header";

describe("Header", () => {
  it("renders primary navigation links with correct destinations", () => {
    usePathname.mockReturnValue("/contact");

    renderWithProviders(<Header />);

    const nav = screen.getByRole("navigation", { name: /main navigation/i });
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
    expect(within(nav).getByRole("link", { name: /cart \(0\)/i })).toHaveAttribute(
      "href",
      "/cart",
    );
    expect(within(nav).getByRole("link", { name: /login/i })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("shows the current cart count from Redux state", () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        cart: {
          items: [{ id: "1", name: "Wireless Headphones", price: 89, quantity: 2 }],
        },
      },
    });

    expect(screen.getByRole("link", { name: /cart \(2\)/i })).toHaveAttribute(
      "href",
      "/cart",
    );
  });

  it("shows account and logout actions when authenticated", () => {
    renderWithProviders(
      <Header
        initialSession={{
          id: "demo-customer",
          name: "Demo Customer",
          email: "demo@nextstore.test",
        }}
      />,
    );

    const nav = screen.getByRole("navigation", { name: /main navigation/i });
    expect(within(nav).getByRole("link", { name: /account/i })).toHaveAttribute(
      "href",
      "/account",
    );
    expect(within(nav).getByRole("button", { name: /logout/i })).toBeInTheDocument();
    expect(within(nav).queryByRole("link", { name: /login/i })).not.toBeInTheDocument();
  });

  it("calls logout API and redirects to login", async () => {
    const user = userEvent.setup();
    const push = jest.fn();
    const refresh = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    useRouter.mockReturnValue({ push, refresh });

    renderWithProviders(
      <Header
        initialSession={{
          id: "demo-customer",
          name: "Demo Customer",
          email: "demo@nextstore.test",
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /logout/i }));

    expect(global.fetch).toHaveBeenCalledWith("/api/auth/logout", {
      method: "POST",
    });
    expect(push).toHaveBeenCalledWith("/login");
    expect(refresh).toHaveBeenCalled();
  });
});
