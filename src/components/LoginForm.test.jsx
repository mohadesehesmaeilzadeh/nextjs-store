import { useRouter } from "next/navigation";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete global.fetch;
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
    const refresh = jest.fn();
    let resolveLogin;
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolveLogin = () => {
          resolve({
            ok: true,
            json: jest.fn().mockResolvedValue({
              user: { email: "demo@nextstore.test" },
            }),
          });
        };
      });
    });
    useRouter.mockReturnValue({ push, refresh });

    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "demo@nextstore.test");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
    resolveLogin();

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/");
      expect(refresh).toHaveBeenCalled();
    });
    expect(global.fetch).toHaveBeenCalledWith("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "demo@nextstore.test",
        password: "password123",
      }),
    });
  });

  it("shows an error for invalid login", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({
        message:
          "Invalid login. Use demo@nextstore.test and any password with at least 8 characters.",
      }),
    });

    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "wrong@example.com");
    await user.type(screen.getByLabelText(/password/i), "short");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/invalid login/i);
  });
});
