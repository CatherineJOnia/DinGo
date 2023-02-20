import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const { data } = await axios.get("/api/cart");
    return data;
  } catch (err) {
    console.log("An error occurred in the fetchCart thunk!", err);
  }
});

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId }) => {
    try {
      const { data } = await axios.put(
        `/api/cart/addToCart/${userId}/${productId}`
      );
      return data;
    } catch (err) {
      console.log("An error occurred in the addToCart thunk!", err);
    }
  }
);

export const deleteFromCartAsync = createAsyncThunk(
  "cart/deleteFromCart",
  async (id, product) => {
    try {
      const { data } = await axios.delete(`/api/cart/${id}`, {
        product,
      });
      return data;
    } catch (err) {
      console.log("An error occurred in the deleteFromCart thunk!", err);
    }
  }
);

export const editCartAsync = createAsyncThunk(
  "cart/editCart",
  async ({ id, quantity }) => {
    try {
      const { data } = await axios.put(`/api/cart/${id}`, {
        quantity,
      });
      return data;
    } catch (err) {
      console.log("An error occurred in the editCart thunk!", err);
    }
  }
);

export const fetchOrderAsync = createAsyncThunk(
  "cart/fetchOrder",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/order/${userId}`);
      return data;
    } catch (err) {
      console.log("An error occurred in the fetchOrder thunk!", err);
    }
  }
);

export const createOrderAsync = createAsyncThunk(
  "cart/createOrder",
  async (id, quantity) => {
    try {
      const { data } = await axios.post(`/api/order/${id}`, {
        id,
        quantity,
      });
      return data;
    } catch (err) {
      console.log("An error occurred in the createOrer thunk!", err);
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkout",
  async (userId) => {
    try {
      const { data } = await axios.put(`/api/orders/cart/checkout/${userId}`);
      return data;
    } catch (err) {
      console.log("An error occured in the checkoutCart thunk!", err);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    increase: (state, payload) => {
      const cart = state.filter((item) => item.id === payload.id);
      cart.itemCount = cart.itemCount + 1;
    },
    decrease: (state, payload) => {
      const cart = state.filter((item) => item.id === payload.id);
      cart.itemCount = cart.itemCount - 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(editCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteFromCartAsync.fulfilled, (state, action) => {
      return state.filter((product) => product.productId != action.payload);
    });
    builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { increase, decrease } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
