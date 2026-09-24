import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import AccountPageContent from "./AccountPageContent";

describe("AccountPageContent", () => {
  it("renders protected account details", () => {
    renderWithProviders(<AccountPageContent />, {
      authSession: {
          id: "demo-customer",
          name: "Demo Customer",
          email: "demo@nextstore.test",
      },
    });

    expect(screen.getByRole("heading", { name: /account/i })).toBeInTheDocument();
    expect(screen.getByText("Demo Customer")).toBeInTheDocument();
    expect(screen.getByText("demo@nextstore.test")).toBeInTheDocument();
  });
});
