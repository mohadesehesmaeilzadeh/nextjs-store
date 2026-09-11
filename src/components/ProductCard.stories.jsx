import ProductCard from "./ProductCard";

const sampleProduct = {
  id: "1",
  name: "Wireless Headphones",
  price: 89,
  category: "Electronics",
  image: "/images/products/wireless-headphones.jpg",
  shortDescription: "Comfortable wireless headphones for work and travel.",
};

const meta = {
  title: "Store/ProductCard",
  component: ProductCard,
  args: {
    product: sampleProduct,
  },
};

export default meta;

export const DefaultProduct = {};

export const LongProductName = {
  args: {
    product: {
      ...sampleProduct,
      id: "2",
      name: "Minimal Everyday Wireless Headphones",
      shortDescription:
        "A longer description that still needs to sit comfortably inside the product card.",
    },
  },
};
