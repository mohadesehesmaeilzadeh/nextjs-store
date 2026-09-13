import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test-utils/renderWithProviders";
import Textarea from "./Textarea";

describe("Textarea", () => {
  it("renders an associated label and textarea", () => {
    renderWithProviders(<Textarea label="Message" name="message" />);

    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("lets a user type and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    renderWithProviders(
      <Textarea
        label="Message"
        name="message"
        onChange={onChange}
        placeholder="How can we help?"
      />,
    );

    const textarea = screen.getByPlaceholderText(/how can we help/i);
    await user.type(textarea, "I have a product question.");

    expect(textarea).toHaveValue("I have a product question.");
    expect(onChange).toHaveBeenCalled();
  });

  it("receives required and disabled states", () => {
    renderWithProviders(
      <Textarea label="Message" name="message" disabled required />,
    );

    const textarea = screen.getByLabelText(/message/i);
    expect(textarea).toBeDisabled();
    expect(textarea).toBeRequired();
  });

  it("displays error text with accessibility attributes", () => {
    renderWithProviders(
      <Textarea error="Message is required." label="Message" name="message" />,
    );

    const textarea = screen.getByLabelText(/message/i);
    expect(screen.getByRole("alert")).toHaveTextContent(/required/i);
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Message is required.");
  });
});
