import React from "react";
import { useParams } from "react-router-dom";
import { selectAllposts } from "../../slice/postslice";
import ReactButton from "../ReactionButton";
import { useSelector } from "react-redux";
import Author from "../Author";
function Userpagelist() {
  const { userId } = useParams();
  const posts = useSelector(selectAllposts);
  const post = posts.filter((item) => item.userId == Number(userId));
  return (
    <div className="items">
      <div className="orderpost">
        {post &&
          post.map((items) => (
            <div className="Userposts" key={items.id}>
              <h3>
                {items.title.slice(0, 1).toUpperCase() + items.title.slice(1)}
              </h3>
              <p>{`${
                items.body.slice(0, 1).toUpperCase() +
                items.body.slice(1).substring(0, 30)
              }...`}</p>
              <Author author={items.userId} />
              <ReactButton posts={items} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Userpagelist;
