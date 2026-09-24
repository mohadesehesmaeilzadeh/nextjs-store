import { getProductById, getProducts } from "./productCatalog";

const originalFetch = global.fetch;

const apiProduct = {
  id: 7,
  title: "Travel Bottle",
  price: 24.5,
  category: "kitchen-accessories",
  thumbnail: "https://cdn.example.test/travel-bottle.webp",
  images: ["https://cdn.example.test/travel-bottle-large.webp"],
  description: "A compact bottle for everyday travel.",
};

describe("productCatalog", () => {
  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("fetches and normalizes the product listing with revalidation", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ products: [apiProduct] }),
    });

    await expect(getProducts()).resolves.toEqual([
      {
        id: "7",
        name: "Travel Bottle",
        price: 24.5,
        category: "Kitchen Accessories",
        image: apiProduct.thumbnail,
        shortDescription: apiProduct.description,
        description: apiProduct.description,
      },
    ]);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://dummyjson.com/products?limit=12"),
      expect.objectContaining({
        next: expect.objectContaining({ revalidate: 3600 }),
      }),
    );
  });

  it("fetches and normalizes a product by id", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(apiProduct),
    });

    await expect(getProductById("7")).resolves.toEqual(
      expect.objectContaining({ id: "7", name: "Travel Bottle" }),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://dummyjson.com/products/7",
      expect.objectContaining({
        next: expect.objectContaining({ tags: ["products", "product:7"] }),
      }),
    );
  });

  it("returns null for invalid and missing product ids", async () => {
    await expect(getProductById("not-an-id")).resolves.toBeNull();

    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });
    await expect(getProductById("999999")).resolves.toBeNull();
  });

  it("throws safe errors when the product API fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });

    await expect(getProducts()).rejects.toThrow("Unable to load products.");
    await expect(getProductById("1")).rejects.toThrow(
      "Unable to load this product.",
    );
  });
});
