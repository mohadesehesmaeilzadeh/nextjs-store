import { notFound } from "next/navigation";
import ProductDetailsPage from "../../../components/ProductDetailsPage";
import { getProductById } from "../../../lib/productCatalog";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  return {
    title: product ? `${product.name} | NextStore` : "Product not found | NextStore",
    description: product
      ? product.shortDescription
      : "The requested product could not be found.",
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsPage product={product} />;
}
