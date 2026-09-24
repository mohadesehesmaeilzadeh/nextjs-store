function formatCategory(category) {
  return String(category || "Other")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function createShortDescription(description, maxLength = 96) {
  const value = String(description || "").trim();

  if (value.length <= maxLength) {
    return value;
  }

  const shortened = value.slice(0, maxLength - 3);
  const lastSpace = shortened.lastIndexOf(" ");

  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : undefined)}...`;
}

export function normalizeProduct(product) {
  if (!product || product.id == null || !product.title) {
    return null;
  }

  const image = product.thumbnail || product.images?.[0];
  const price = Number(product.price);

  if (!image || !Number.isFinite(price)) {
    return null;
  }

  const description = String(product.description || "").trim();

  return {
    id: String(product.id),
    name: String(product.title).trim(),
    price,
    category: formatCategory(product.category),
    image,
    shortDescription: createShortDescription(description),
    description,
  };
}

export function normalizeProductList(payload) {
  if (!Array.isArray(payload?.products)) {
    throw new Error("Invalid products response.");
  }

  return payload.products.map(normalizeProduct).filter(Boolean);
}
