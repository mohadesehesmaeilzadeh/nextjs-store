import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import QuantityControl from "./QuantityControl";

describe("QuantityControl", () => {
  it("calls increase and decrease handlers", async () => {
    const user = userEvent.setup();
    const onDecrease = jest.fn();
    const onIncrease = jest.fn();

    renderWithProviders(
      <QuantityControl
        quantity={2}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
      />,
    );

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    await user.click(screen.getByRole("button", { name: /decrease quantity/i }));

    expect(onIncrease).toHaveBeenCalledTimes(1);
    expect(onDecrease).toHaveBeenCalledTimes(1);
  });

  it("disables decrease at quantity one", () => {
    renderWithProviders(
      <QuantityControl quantity={1} onDecrease={jest.fn()} onIncrease={jest.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: /decrease quantity/i }),
    ).toBeDisabled();
  });
});
