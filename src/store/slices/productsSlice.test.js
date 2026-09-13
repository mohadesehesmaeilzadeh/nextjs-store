import { configureStore } from "@reduxjs/toolkit";
import { products } from "../../data/products";
import productsReducer, {
  clearSelectedProduct,
  fetchProductById,
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
  selectSelectedProduct,
  selectSelectedProductError,
  selectSelectedProductStatus,
} from "./productsSlice";

function createProductsStore() {
  return configureStore({
    reducer: {
      products: productsReducer,
    },
  });
}

describe("productsSlice", () => {
  const originalMockApiUrl = process.env.NEXT_PUBLIC_MOCK_API_URL;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_MOCK_API_URL;
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_MOCK_API_URL = originalMockApiUrl;
  });

  it("loads local products when no mock API URL is configured", async () => {
    const store = createProductsStore();

    await store.dispatch(fetchProducts());

    expect(selectProductsStatus(store.getState())).toBe("succeeded");
    expect(selectProducts(store.getState())).toEqual(products);
    expect(selectProductsError(store.getState())).toBeNull();
  });

  it("loads a local product by id", async () => {
    const store = createProductsStore();

    await store.dispatch(fetchProductById(products[0].id));

    expect(selectSelectedProductStatus(store.getState())).toBe("succeeded");
    expect(selectSelectedProduct(store.getState())).toEqual(products[0]);
  });

  it("sets a readable error for an invalid product id", async () => {
    const store = createProductsStore();

    await store.dispatch(fetchProductById("999999"));

    expect(selectSelectedProductStatus(store.getState())).toBe("failed");
    expect(selectSelectedProductError(store.getState())).toBe("Product not found.");
  });

  it("clears the selected product state", async () => {
    const store = createProductsStore();

    await store.dispatch(fetchProductById(products[0].id));
    store.dispatch(clearSelectedProduct());

    expect(selectSelectedProduct(store.getState())).toBeNull();
    expect(selectSelectedProductStatus(store.getState())).toBe("idle");
  });
});
