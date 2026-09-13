import { useRouter } from "next/navigation";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { selectDeliveryInfo } from "../../store/slices/checkoutSlice";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import DeliveryForm from "./DeliveryForm";

describe("DeliveryForm", () => {
  it("shows validation errors when required fields are empty", async () => {
    const user = userEvent.setup();

    renderWithProviders(<DeliveryForm />);

    await user.click(screen.getByRole("button", { name: /continue to payment/i }));

    expect(screen.getAllByText(/this field is required/i)).toHaveLength(6);
  });

  it("shows an email validation error", async () => {
    const user = userEvent.setup();

    renderWithProviders(<DeliveryForm />);

    await user.type(screen.getByLabelText(/full name/i), "Mina");
    await user.type(screen.getByLabelText(/email/i), "bad-email");
    await user.type(screen.getByLabelText(/phone/i), "5551234567");
    await user.type(screen.getByLabelText(/city/i), "Tehran");
    await user.type(screen.getByLabelText(/address/i), "42 Market Street");
    await user.type(screen.getByLabelText(/postal code/i), "12345");
    await user.click(screen.getByRole("button", { name: /continue to payment/i }));

    expect(
      screen.getByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it("saves valid delivery info and routes to payment", async () => {
    const user = userEvent.setup();
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    const { store } = renderWithProviders(<DeliveryForm />);

    await user.type(screen.getByLabelText(/full name/i), "Mina Test");
    await user.type(screen.getByLabelText(/email/i), "mina@example.com");
    await user.type(screen.getByLabelText(/phone/i), "5551234567");
    await user.type(screen.getByLabelText(/city/i), "Tehran");
    await user.type(screen.getByLabelText(/address/i), "42 Market Street");
    await user.type(screen.getByLabelText(/postal code/i), "12345");
    await user.click(screen.getByRole("button", { name: /continue to payment/i }));

    expect(selectDeliveryInfo(store.getState())).toMatchObject({
      fullName: "Mina Test",
      email: "mina@example.com",
      phone: "5551234567",
      city: "Tehran",
      address: "42 Market Street",
      postalCode: "12345",
    });
    expect(push).toHaveBeenCalledWith("/checkout/payment");
  });
});
