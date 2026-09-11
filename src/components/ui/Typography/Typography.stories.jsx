import styled from "styled-components";
import Typography from "./Typography";

const Stack = styled.div`
  display: grid;
  max-width: 760px;
  gap: 1rem;
`;

const meta = {
  title: "Design System/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "body", "bodySmall", "caption"],
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "NextStore typography",
    variant: "body",
  },
};

export default meta;

export const TypographyScale = {
  render: () => (
    <Stack>
      <Typography variant="caption">Caption / Product Category</Typography>
      <Typography variant="h1">
        Quietly useful pieces for modern daily life.
      </Typography>
      <Typography variant="h2">Shop the edit</Typography>
      <Typography variant="h3">Wireless Headphones</Typography>
      <Typography variant="body">
        NextStore brings together simple home, tech, and carry goods with a calm
        shopping experience that keeps the focus on the product.
      </Typography>
      <Typography variant="bodySmall">
        Comfortable wireless headphones for work and travel.
      </Typography>
    </Stack>
  ),
};

export const Heading1 = {
  args: {
    children: "Quietly useful pieces for modern daily life.",
    variant: "h1",
  },
};

export const Body = {
  args: {
    children:
      "A compact selection of everyday goods with clean lines, useful details, and warm materials.",
    variant: "body",
  },
};

export const Caption = {
  args: {
    children: "Accessories",
    variant: "caption",
  },
};
