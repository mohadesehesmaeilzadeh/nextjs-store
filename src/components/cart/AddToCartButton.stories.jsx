import AddToCartButton from "./AddToCartButton";

const sampleProduct = {
  id: "1",
  name: "Wireless Headphones",
  price: 89,
  image: "/images/products/wireless-headphones.jpg",
};

const meta = {
  title: "Store/AddToCartButton",
  component: AddToCartButton,
  args: {
    product: sampleProduct,
  },
};

export default meta;

export const Default = {
  args: {
    children: "Add to Cart",
  },
};

export const Small = {
  args: {
    children: "Add",
    size: "small",
  },
};
