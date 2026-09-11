import Button from "./Button";

const meta = {
  title: "Design System/Button",
  component: Button,
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
  args: {
    children: "View Product",
    disabled: false,
    fullWidth: false,
    size: "medium",
    variant: "primary",
  },
};

export default meta;

export const Primary = {};

export const Secondary = {
  args: {
    children: "About the Store",
    variant: "secondary",
  },
};

export const Small = {
  args: {
    children: "Small Button",
    size: "small",
  },
};

export const Large = {
  args: {
    children: "Explore Products",
    size: "large",
  },
};

export const Disabled = {
  args: {
    children: "Unavailable",
    disabled: true,
  },
};

export const Danger = {
  args: {
    children: "Delete",
    variant: "danger",
  },
};
