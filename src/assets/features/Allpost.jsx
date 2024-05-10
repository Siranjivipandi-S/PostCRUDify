import React from "react";
import { useSelector } from "react-redux";
import { selectPostIds, PostStatus } from "../slice/postslice";
import PostTemplate from "./PostTemplate";
function Allpost() {
  const posts = useSelector(selectPostIds);
  const status = useSelector(PostStatus);
  let render = "";
  if (status == "pending") {
    render = <p>Loading Data</p>;
  } else if (status == "idle") {
    render = posts.map((post) => <PostTemplate key={post} postId={post} />);
  } else if (status == "rejected") {
    render = <p>Error Reload!</p>;
  }
  return (
    <div className="renderitem">
      <div className="Grouppost">{render}</div>
    </div>
  );
}

export default Allpost;
