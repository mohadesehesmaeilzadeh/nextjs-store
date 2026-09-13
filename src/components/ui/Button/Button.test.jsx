import Link from "next/link";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test-utils/renderWithProviders";
import Button from "./Button";

describe("Button", () => {
  it("renders button text and handles clicks", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    renderWithProviders(<Button onClick={onClick}>Save changes</Button>);
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports disabled state without firing clicks", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    renderWithProviders(
      <Button disabled onClick={onClick}>
        Delete
      </Button>,
    );

    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("passes through HTML props and link rendering", () => {
    renderWithProviders(
      <Button as="a" href="/contact" variant="secondary">
        Contact
      </Button>,
    );

    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("marks disabled links as aria-disabled", () => {
    renderWithProviders(
      <Button as="a" href="/checkout" disabled>
        Checkout
      </Button>,
    );

    expect(screen.getByRole("link", { name: /checkout/i })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("matches the stable reusable button snapshot", () => {
    const { container } = renderWithProviders(
      <Button size="small" variant="secondary">
        View
      </Button>,
    );

    expect(container).toMatchSnapshot();
  });
});
