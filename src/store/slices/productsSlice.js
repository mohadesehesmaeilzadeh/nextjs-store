import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { products as localProducts } from "../../data/products";
import { fetchUrl } from "../../lib/fetchUrl";

function getMockApiBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_MOCK_API_URL;

  if (!baseUrl || baseUrl.includes("YOUR_PROJECT")) {
    return null;
  }

  return baseUrl.replace(/\/$/, "");
}

function getProductsEndpoint(id) {
  const baseUrl = getMockApiBaseUrl();

  if (!baseUrl) {
    return null;
  }

  const productsUrl = `${baseUrl}/products`;
  return id ? `${productsUrl}/${id}` : productsUrl;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const endpoint = getProductsEndpoint();

    if (!endpoint) {
      return localProducts;
    }

    return fetchUrl(endpoint);
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const endpoint = getProductsEndpoint(id);

    if (!endpoint) {
      const product = localProducts.find((item) => item.id === String(id));

      if (!product) {
        throw new Error("Product not found.");
      }

      return product;
    }

    return fetchUrl(endpoint);
  },
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  selectedItem: null,
  selectedStatus: "idle",
  selectedError: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedItem = null;
      state.selectedStatus = "idle";
      state.selectedError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message?.includes("Product")
          ? action.error.message
          : "Unable to load products.";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.selectedStatus = "loading";
        state.selectedError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedStatus = "succeeded";
        state.selectedItem = action.payload || null;
        state.selectedError = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedStatus = "failed";
        state.selectedItem = null;
        state.selectedError = action.error.message?.includes("not found")
          ? "Product not found."
          : "Unable to load this product.";
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedItem;
export const selectSelectedProductStatus = (state) =>
  state.products.selectedStatus;
export const selectSelectedProductError = (state) =>
  state.products.selectedError;

export default productsSlice.reducer;
