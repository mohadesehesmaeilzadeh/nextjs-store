import StorePage from "../../components/StorePage";
import { getProducts } from "../../lib/productCatalog";

export default async function Home() {
  const products = await getProducts();

  return <StorePage products={products} />;
}
