import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartProductAsync = createAsyncThunk(
  "cartProduct",
  async ({ userId, productId }) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}/${productId}`);
      return data;
    } catch (error) {
      console.log("An error occured in the fetchCart thunk!", error);
    }
  }
);

export const updateCartProductAsync = createAsyncThunk(
  "cartProduct/update",
  async ({ userId, productId, quantity }) => {
    try {
      const { data } = await axios.put(`/api/cart/${userId}/${productId}`, {
        quantity,
      });
      return data;
    } catch (error) {
      console.log("An error occured in the updateCartProduct thunk!", error);
    }
  }
);

export const cartProductSlice = createSlice({
  name: "cartProduct",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(updateCartProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCartProduct = (state) => state.cartProduct;

export default cartProductSlice.reducer;
