import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFeaturedProducts = createAsyncThunk(
  "/products/featuredProducts",
  async () => {
    try {
      const { data } = await axios.get(`/api/featuredProducts`);
      console.log("featuredProducts data", data);
      return data;
    } catch (err) {
      console.log("An error occurred in the fetchFeaturedProducts thunk!", err);
    }
  }
);

const featuredProductsSlice = createSlice({
  name: "featuredProducts",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectFeaturedProducts = (state) => {
  return state.featuredProducts;
};

export default featuredProductsSlice.reducer;
