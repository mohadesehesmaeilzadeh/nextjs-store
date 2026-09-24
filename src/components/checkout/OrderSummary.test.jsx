import { screen, within } from "@testing-library/react";
import { products } from "../../test-utils/productFixtures";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import OrderSummary from "./OrderSummary";

describe("OrderSummary", () => {
  it("renders item totals and delivery details", () => {
    renderWithProviders(
      <OrderSummary
        delivery={{
          fullName: "Mina Test",
          email: "mina@example.com",
          phone: "5551234567",
          address: "42 Market Street",
          city: "Tehran",
          postalCode: "12345",
        }}
        items={[
          {
            id: products[0].id,
            name: products[0].name,
            price: products[0].price,
            quantity: 2,
          },
        ]}
        total={178}
      />,
    );

    const summary = screen.getByRole("region", { name: /order summary/i });
    expect(within(summary).getByText(products[0].name)).toBeInTheDocument();
    expect(within(summary).getByText(/qty 2/i)).toBeInTheDocument();
    expect(within(summary).getAllByText("$178")).toHaveLength(2);
    expect(within(summary).getByText("Mina Test")).toBeInTheDocument();
  });
});
