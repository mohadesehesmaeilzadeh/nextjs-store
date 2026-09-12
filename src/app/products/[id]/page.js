import ProductDetailsPage from "../../../components/ProductDetailsPage";
import { products } from "../../../data/products";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  return {
    title: product ? `${product.name} | NextStore` : "Product not found | NextStore",
    description: product
      ? product.shortDescription
      : "The requested product could not be found.",
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  return <ProductDetailsPage productId={id} />;
}
