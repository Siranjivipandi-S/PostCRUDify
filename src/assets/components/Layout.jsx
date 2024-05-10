import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="wrap">
      <Header />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
