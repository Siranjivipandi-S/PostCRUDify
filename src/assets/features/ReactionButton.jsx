import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../slice/postslice";

function ReactButton({ posts }) {
  const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
  };
  const dispatch = useDispatch();

  const reactionbtn = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      className="reactBtn"
      onClick={() =>
        dispatch(reactionAdded({ PostId: posts.id, reactionitem: name }))
      }
    >
      {emoji} {posts.reactions[name]}
    </button>
  ));

  return <div className="reactContainer">{reactionbtn}</div>;
}

export default ReactButton;
