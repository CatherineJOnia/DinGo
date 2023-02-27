import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import socket from "../../app/socket";

export const fetchSingleProductAsync = createAsyncThunk(
  "products/fetchSingleProduct",
  async (productId) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      return data;
    } catch (err) {
      return "An error occurred in the fetchSingleProduct thunk!", err;
    }
  }
);

export const editSingleProduct = createAsyncThunk(
  "products/editSingleProduct",
  async ({ productId, name, description, quantity, price, imageUrl }) => {
    try {
      const { data } = await axios.put(`/api/products/${productId}`, {
        name,
        description,
        quantity,
        price,
        imageUrl,
      });
      socket.emit("/product/edit", data);
      return data;
    } catch (err) {
      return "An error occurred in the editSingleProduct thunk!", err;
    }
  }
);

export const addSingleProduct = createAsyncThunk(
  "products/addSingleProduct",
  async (productId) => {
    try {
      const { data } = await axios.post("/api/cart", { productId });
      socket.emit("/product/create", data);
      return data;
    } catch (err) {
      console.log("An error occurred in the addSingleProduct thunk!", err);
    }
  }
);

const singleProductSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editSingleProduct.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addSingleProduct.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectSingleProduct = (state) => {
  return state.product;
};

export default singleProductSlice.reducer;
