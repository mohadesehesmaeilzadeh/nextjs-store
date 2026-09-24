import { normalizeProduct, normalizeProductList } from "./productNormalizer";

describe("productNormalizer", () => {
  it("maps the external API shape to the storefront product model", () => {
    const description =
      "A long product description that should be shortened without exposing API-specific fields across the UI layer.";

    expect(
      normalizeProduct({
        id: 12,
        title: "  Desk Shelf  ",
        price: "48.75",
        category: "home-decoration",
        thumbnail: "https://cdn.example.test/desk-shelf.webp",
        description,
        stock: 42,
      }),
    ).toEqual({
      id: "12",
      name: "Desk Shelf",
      price: 48.75,
      category: "Home Decoration",
      image: "https://cdn.example.test/desk-shelf.webp",
      shortDescription: expect.stringMatching(/\.\.\.$/),
      description,
    });
  });

  it("filters unusable products and rejects malformed list responses", () => {
    expect(
      normalizeProductList({
        products: [
          {
            id: 1,
            title: "Valid product",
            price: 10,
            category: "decor",
            thumbnail: "https://cdn.example.test/product.webp",
            description: "Useful.",
          },
          { id: 2, title: "Missing image", price: 12 },
        ],
      }),
    ).toHaveLength(1);
    expect(() => normalizeProductList({ items: [] })).toThrow(
      "Invalid products response.",
    );
  });
});
