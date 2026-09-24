import { useRouter } from "next/navigation";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import { AUTH_STORAGE_KEY, demoUser } from "../lib/auth";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    window.localStorage.clear();
  });

  it("renders email and password fields", () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows loading and redirects after successful login", async () => {
    const user = userEvent.setup();
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "demo@nextstore.test");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/");
    });
    expect(JSON.parse(window.localStorage.getItem(AUTH_STORAGE_KEY))).toEqual(
      demoUser,
    );
  });

  it("shows an error for invalid login", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "wrong@example.com");
    await user.type(screen.getByLabelText(/password/i), "short");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/invalid login/i);
  });
});
