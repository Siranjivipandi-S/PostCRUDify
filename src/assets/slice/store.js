import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./postslice";
import { userSlice } from "./Userslice";
const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
