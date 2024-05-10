import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: [],
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchUser.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(FetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(FetchUser.rejected, (state, action) => {
      state.status = "Failed";
    });
  },
});

const URL = "https://jsonplaceholder.typicode.com/users";
export const FetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get(URL);
  const result = response.data;
  return result;
});

export const Userlist = (state) => state.user.user;
