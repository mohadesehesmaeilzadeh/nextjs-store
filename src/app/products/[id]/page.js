import ProductDetailsPage from "../../../components/ProductDetailsPage";
import { products } from "../../../data/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

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
  const product = products.find((item) => item.id === id);

  return <ProductDetailsPage product={product} />;
}
