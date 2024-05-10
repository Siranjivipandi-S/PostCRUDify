import React from "react";
import { Userlist } from "../slice/Userslice";
import { useSelector } from "react-redux";

const Author = ({ author }) => {
  const user = useSelector(Userlist);
  const check = user.find((user) => user.id == author);
  return (
    <div className="author">
      {check ? <div>Posted by {check.name}</div> : null}
    </div>
  );
};

export default Author;
