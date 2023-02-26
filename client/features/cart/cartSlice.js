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

export const fetchOrderAsync = createAsyncThunk(
  "cart/fetchOrder",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/orders/${userId}`);
      return data;
    } catch (err) {
      console.log("An error occurred in the fetchOrder thunk!", err);
    }
  }
);

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

export const editCartAsync = createAsyncThunk(
  "cart/editCart",
  async ({ orderId, productId, quantity }) => {
    try {
      const { data } = await axios.put(`/api/cart/${orderId}/${productId}`, {
        quantity,
      });
      return data;
    } catch (err) {
      console.log("An error occurred in the editCart thunk!", err);
    }
  }
);

export const checkoutCartAsync = createAsyncThunk(
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

export const deleteFromCartAsync = createAsyncThunk(
  "cart/deleteFromCart",
  async (productId) => {
    try {
      const { data } = await axios.delete(`/api/cart/${productId}`);
      return data;
    } catch (err) {
      console.log("An error occurred in the deleteFromCart thunk!", err);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    increase: (state, action) => {
      const product = state.filter(
        (product) => product.cart.id === action.payload.id
      );
      state.push(action.payload++);
    },
    decrease(state, action) {
      const product = state.filter(
        (product) => product.cart.id === action.payload.id
      );
      state.cart.product.cart.quantity = action.payload--;
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
