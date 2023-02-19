import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUserAsync = createAsyncThunk(
  "/users/:userId",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      return data;
    } catch (err) {
      return "An error occurred in the fetchSingleUser thunk!", err;
    }
  }
);

export const editSingleUserAsync = createAsyncThunk(
  "/users/:userId/edit",
  async ({ userId, isAdmin }) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}`, {
        isAdmin,
      });
      return data;
    } catch (err) {
      return "An error occurred in the editSingleUser thunk!", err;
    }
  }
);

export const deleteSingleUserAsync = createAsyncThunk(
  "/users/:userId/delete",
  async ({ userId }) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}`);
      return data;
    } catch (err) {
      return "An error occurred in the deleteSingleUser thunk!", err;
    }
  }
);

const singleUserSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editSingleUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteSingleUserAsync.fulfilled, (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    });
  },
});

export const selectSingleUser = (state) => {
  return state.user;
};

export default singleUserSlice.reducer;
