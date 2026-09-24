export function filterAndSortProducts(
  products,
  { search = "", category = "", minPrice = "", maxPrice = "", sort = "" },
) {
  const normalizedSearch = search.trim().toLowerCase();
  const minimum = minPrice === "" ? null : Number(minPrice);
  const maximum = maxPrice === "" ? null : Number(maxPrice);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(normalizedSearch);
    const matchesCategory = !category || product.category === category;
    const matchesMinimum =
      minimum === null || !Number.isFinite(minimum) || product.price >= minimum;
    const matchesMaximum =
      maximum === null || !Number.isFinite(maximum) || product.price <= maximum;

    return (
      matchesSearch && matchesCategory && matchesMinimum && matchesMaximum
    );
  });

  return [...filteredProducts].sort((first, second) => {
    if (sort === "price-asc") {
      return first.price - second.price;
    }

    if (sort === "price-desc") {
      return second.price - first.price;
    }

    if (sort === "name-asc") {
      return first.name.localeCompare(second.name);
    }

    return 0;
  });
}
