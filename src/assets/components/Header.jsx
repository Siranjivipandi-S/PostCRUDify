import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="nav">
      <nav>
        <Link to={"/"}>Posts</Link>
        <Link to={"/user"}>Users</Link>
        <Link to={"/posts/addpost"}>Add Post</Link>
      </nav>
    </header>
  );
}

export default Header;
