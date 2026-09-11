import Textarea from "./Textarea";

const meta = {
  title: "Design System/Textarea",
  component: Textarea,
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
    rows: {
      control: "number",
    },
  },
  args: {
    disabled: false,
    error: "",
    label: "Message",
    name: "message",
    placeholder: "How can we help?",
    required: false,
    rows: 5,
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

export const ErrorState = {
  args: {
    error: "Message is required.",
    required: true,
  },
};

export const Disabled = {
  args: {
    disabled: true,
    placeholder: "Disabled textarea",
  },
};
