import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./assets/slice/store.js";
import { fetchPosts } from "./assets/slice/postslice.js";
import { FetchUser } from "./assets/slice/Userslice.js";

store.dispatch(fetchPosts());
store.dispatch(FetchUser());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
