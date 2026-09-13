import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test-utils/renderWithProviders";
import Input from "./Input";

describe("Input", () => {
  it("renders an associated label and input", () => {
    renderWithProviders(<Input label="Email" name="email" />);

    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
    expect(screen.getByText("Email")).toHaveAttribute("for", "email");
  });

  it("lets a user type and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    renderWithProviders(
      <Input
        label="Name"
        name="name"
        onChange={onChange}
        placeholder="Your name"
      />,
    );

    const input = screen.getByPlaceholderText(/your name/i);
    await user.type(input, "Mina");

    expect(input).toHaveValue("Mina");
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("receives a controlled value", () => {
    renderWithProviders(
      <Input label="City" name="city" value="Tehran" readOnly />,
    );

    expect(screen.getByLabelText(/city/i)).toHaveValue("Tehran");
  });

  it("supports disabled and required states", () => {
    renderWithProviders(<Input label="Phone" name="phone" disabled required />);

    const input = screen.getByLabelText(/phone/i);
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
  });

  it("displays error text with accessibility attributes", () => {
    renderWithProviders(
      <Input
        error="Email is required."
        label="Email"
        name="email"
        type="email"
      />,
    );

    const input = screen.getByLabelText(/email/i);
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent(/required/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Email is required.");
  });
});
