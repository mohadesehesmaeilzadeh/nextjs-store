import Input from "./Input";

const meta = {
  title: "Design System/Input",
  component: Input,
  argTypes: {
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    required: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "text",
    },
  },
  args: {
    disabled: false,
    error: "",
    label: "Email",
    name: "email",
    placeholder: "you@example.com",
    required: false,
    type: "email",
  },
};

export default meta;

export const Default = {
  args: {
    label: "",
    placeholder: "",
  },
};

export const WithLabel = {};

export const WithPlaceholder = {
  args: {
    label: "",
    placeholder: "Search products",
    type: "text",
  },
};

export const Required = {
  args: {
    required: true,
  },
};

export const Disabled = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const ErrorState = {
  args: {
    error: "Please enter a valid email.",
    required: true,
  },
};
