import { products } from "../test-utils/productFixtures";
import { filterAndSortProducts } from "./productFilters";

describe("filterAndSortProducts", () => {
  it("combines search, category, and price filters", () => {
    expect(
      filterAndSortProducts(products, {
        search: "speaker",
        category: "Electronics",
        minPrice: "60",
        maxPrice: "70",
      }),
    ).toEqual([products[4]]);
  });

  it("sorts without mutating the source product data", () => {
    const sourceOrder = products.map((product) => product.id);
    const sorted = filterAndSortProducts(products, { sort: "price-asc" });

    expect(sorted.map((product) => product.price)).toEqual([
      28, 34, 46, 54, 64, 72, 89, 118,
    ]);
    expect(products.map((product) => product.id)).toEqual(sourceOrder);
    expect(sorted).not.toBe(products);
  });

  it("sorts product names alphabetically", () => {
    const sorted = filterAndSortProducts(products, { sort: "name-asc" });

    expect(sorted[0].name).toBe("Bluetooth Speaker");
    expect(sorted.at(-1).name).toBe("Wireless Headphones");
  });
});
