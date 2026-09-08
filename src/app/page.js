import StorePage from "../components/StorePage";
import { products } from "../data/products";

export default function Home() {
  return <StorePage products={products} />;
}
