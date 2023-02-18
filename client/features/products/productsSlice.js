import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchAll",
  async () => {
    try {
      const { data } = await axios.get("/api/products");
      return data;
    } catch (err) {
      return "An error occurred in the fetchProducts thunk!", err;
    }
  }
);

export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async ({ name, price, quantity, description, imageUrl }) => {
    try {
      const { data } = await axios.post("/api/products", {
        name,
        price,
        quantity,
        description,
        imageUrl,
      });
      return data;
    } catch (err) {
      return "An error occurred in the addProduct thunk!", err;
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    try {
      const { data } = await axios.delete(`/api/products/${productId}`);
      return data;
    } catch (err) {
      return "An error occurred in the deleteProduct thunk!", err;
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    });
  },
});

export const productList = (state) => state.products;

export default productsSlice.reducer;
