import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsersAsync = createAsyncThunk("users/fetchAll", async () => {
  try {
    const { data } = await axios.get("/api/users");
    return data;
  } catch (err) {
    console.log("An error occurred in the fetchUsers thunk!", err);
  }
});

export const deleteSingleUserAsync = createAsyncThunk(
  "users/deleteSingleUser",
  async ({ userId }) => {
    try {
      console.log("userId", userId);
      const { data } = await axios.delete(`/api/users/${userId}`);
      return data;
    } catch (err) {
      return "An error occurred in the deleteSingleUser thunk!", err;
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteSingleUserAsync.fulfilled, (state, action) => {
      return state.filter((user) => user.id !== action.payload.id);
    });
  },
});

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
