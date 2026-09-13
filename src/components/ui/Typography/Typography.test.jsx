import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils/renderWithProviders";
import Typography from "./Typography";

describe("Typography", () => {
  it("renders heading variants with semantic heading elements", () => {
    renderWithProviders(
      <>
        <Typography variant="h1">Main title</Typography>
        <Typography variant="h2">Section title</Typography>
        <Typography variant="h3">Card title</Typography>
      </>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /main title/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /section title/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /card title/i }),
    ).toBeInTheDocument();
  });

  it("renders body and caption text with appropriate defaults", () => {
    renderWithProviders(
      <>
        <Typography>Body copy</Typography>
        <Typography variant="caption">Electronics</Typography>
      </>,
    );

    expect(screen.getByText(/body copy/i).tagName).toBe("P");
    expect(screen.getByText(/electronics/i).tagName).toBe("SPAN");
  });

  it("allows the element to be overridden", () => {
    renderWithProviders(
      <Typography as="legend" variant="h3">
        Delivery
      </Typography>,
    );

    expect(screen.getByText(/delivery/i).tagName).toBe("LEGEND");
  });

  it("matches the stable typography snapshot", () => {
    const { container } = renderWithProviders(
      <Typography variant="h2">Shop the edit</Typography>,
    );

    expect(container).toMatchSnapshot();
  });
});
