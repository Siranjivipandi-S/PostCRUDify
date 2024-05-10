import React from "react";
import { Link } from "react-router-dom";
import Author from "./Author";
import Timeago from "./Timeago";
import ReactButton from "./ReactionButton";
import { selectPostById } from "../slice/postslice";
import { useSelector } from "react-redux";
function PostTemplate({ postId }) {
  const items = useSelector((state) => selectPostById(state, postId));
  return (
    <div className="app">
      <div className="Grouppost">
        <div className="Orderpost" key={items.id}>
          <h3>
            {items.title.slice(0, 1).toUpperCase() + items.title.slice(1)}
          </h3>
          <p>{`${
            items.body.slice(0, 1).toUpperCase() +
            items.body.slice(1).substring(0, 30)
          }...`}</p>
          <div className="flexbox">
            <Link id="editbtn" to={`post/viewpost/${items.id}`}>
              View Post
            </Link>
            <Author author={items.userId} />
          </div>
          <Timeago timestamp={items.date} />
          <ReactButton posts={items} />
        </div>
      </div>
    </div>
  );
}

export default PostTemplate;
