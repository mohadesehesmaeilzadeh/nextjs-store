import { usePathname } from "next/navigation";
import { screen, within } from "@testing-library/react";
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
});
