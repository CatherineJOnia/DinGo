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
      console.log("userId, isAdmin", userId, isAdmin);
      const { data } = await axios.put(`/api/users/${userId}`, { isAdmin });
      return data;
    } catch (err) {
      return "An error occurred in the editSingleUser thunk!", err;
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
  },
});

export const selectSingleUser = (state) => {
  return state.user;
};

export default singleUserSlice.reducer;
