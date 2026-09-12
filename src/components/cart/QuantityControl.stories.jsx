import QuantityControl from "./QuantityControl";

const meta = {
  title: "Store/QuantityControl",
  component: QuantityControl,
};

export default meta;

export const Default = {
  args: {
    quantity: 2,
    onDecrease: () => {},
    onIncrease: () => {},
  },
};

export const Minimum = {
  args: {
    quantity: 1,
    onDecrease: () => {},
    onIncrease: () => {},
  },
};
