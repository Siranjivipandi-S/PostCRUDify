import React from "react";
import { Userlist } from "../../slice/Userslice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Userpage() {
  const user = useSelector(Userlist);
  return (
    <div className="userPage">
      {user && user.length > 0
        ? user.map((item) => (
            <div className="useritem" key={item.id}>
              <Link to={`/user/${item.id}`} id="linkbtn">
                {item.name}
              </Link>
            </div>
          ))
        : null}
    </div>
  );
}

export default Userpage;
