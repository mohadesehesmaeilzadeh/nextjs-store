import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  it("renders all fields and the submit button", () => {
    renderWithProviders(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it("shows an error when email is invalid", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Mina");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(screen.getByLabelText(/message/i), "Please send details.");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
  });

  it("submits valid values, logs the form, resets fields, and shows success", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Mina");
    await user.type(screen.getByLabelText(/email/i), "mina@example.com");
    await user.type(screen.getByLabelText(/message/i), "I love the store.");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByRole("status")).toHaveTextContent(
      /thanks for your message/i,
    );
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue("");
    expect(consoleSpy).toHaveBeenCalledWith("Contact form submitted:", {
      name: "Mina",
      email: "mina@example.com",
      message: "I love the store.",
    });

    consoleSpy.mockRestore();
  });
});
