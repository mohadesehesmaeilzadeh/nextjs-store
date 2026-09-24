import { normalizeProduct, normalizeProductList } from "./productNormalizer";

const PRODUCTS_API_URL =
  process.env.PRODUCTS_API_URL || "https://dummyjson.com/products";
const REVALIDATE_SECONDS = 3600;
const PRODUCT_FIELDS = [
  "id",
  "title",
  "price",
  "category",
  "thumbnail",
  "images",
  "description",
].join(",");

function getFetchOptions(tags = []) {
  return {
    next: {
      revalidate: REVALIDATE_SECONDS,
      tags: ["products", ...tags],
    },
  };
}

export async function getProducts() {
  const response = await fetch(
    `${PRODUCTS_API_URL}?limit=12&select=${PRODUCT_FIELDS}`,
    getFetchOptions(),
  );

  if (!response.ok) {
    throw new Error("Unable to load products.");
  }

  return normalizeProductList(await response.json());
}

export async function getProductById(id) {
  const productId = String(id);

  if (!/^\d+$/.test(productId)) {
    return null;
  }

  const response = await fetch(
    `${PRODUCTS_API_URL}/${productId}`,
    getFetchOptions([`product:${productId}`]),
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load this product.");
  }

  return normalizeProduct(await response.json());
}
