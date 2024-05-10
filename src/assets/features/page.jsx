import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPostById } from "../slice/postslice";
import Author from "./Author";
import ReactButton from "./ReactionButton";
import Timeago from "./Timeago";
function Viewpage() {
  const param = useParams();
  const items = useSelector((state) => selectPostById(state, Number(param.id)));
  return (
    <div>
      <div className="viewcontainer" key={items?.id}>
        <h2>
          {items?.title.slice(0, 1).toUpperCase() + items?.title.slice(1)}
        </h2>
        <p>{`${items?.body.substring(0, 150)}...`}</p>
        {items && (
          <>
            <div className="flex">
              <Link id="editBtn" to={`/post/editpost/${param.id}`}>
                Edit post
              </Link>
              <Author author={items?.userId} />
              <Timeago timestamp={items.date} />
            </div>
            <ReactButton posts={items} />
          </>
        )}
      </div>
    </div>
  );
}

export default Viewpage;
