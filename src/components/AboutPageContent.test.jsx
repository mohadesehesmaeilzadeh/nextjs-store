import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import AboutPageContent from "./AboutPageContent";

describe("AboutPageContent", () => {
  it("renders the about page heading and key content", () => {
    renderWithProviders(<AboutPageContent />);

    expect(
      screen.getByRole("heading", { level: 1, name: /about nextstore/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /why choose us/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/responsive experience/i)).toBeInTheDocument();
  });
});
