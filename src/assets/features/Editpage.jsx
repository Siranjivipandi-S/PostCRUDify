import React, { useState } from "react";
import { selectPostById } from "../slice/postslice";
import { useDispatch, useSelector } from "react-redux";
import { Userlist } from "../slice/Userslice";
import { useParams, useNavigate } from "react-router-dom";
import { Updatepost, Deletepost } from "../slice/postslice";
function Editpage() {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const findpost = useSelector((state) => selectPostById(state, param.id));
  const fetchuser = useSelector(Userlist);
  const options = fetchuser.map((pos) => (
    <option key={pos.id} value={pos.id}>
      {pos.name}
    </option>
  ));
  const [title, setTitle] = useState(findpost?.title);
  const [content, setContent] = useState(findpost?.body);
  const [user, setUser] = useState(findpost?.userId);
  const save = [title, content, user].every(Boolean);
  const Editpost = () => {
    if (save) {
      try {
        dispatch(
          Updatepost({
            id: findpost.id,
            title,
            body: content,
            userId: user,
            reactions: findpost.reactions,
          })
        ).unwrap();
        navigate(`/post/viewpost/${param.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const Deleteaction = () => {
    if (save) {
      try {
        dispatch(Deletepost({ id: findpost.id })).unwrap();
        setTitle("");
        setContent("");
        setUser("");
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <div className="inputcontainer">
        <h1>Edit Post</h1>
        {findpost && (
          <>
            <div className="row">
              <label>Enter Title:</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="row">
              <label>Enter Content:</label>
              <input
                type="text"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="row">
              <label htmlFor="author">Select Author:</label>
              <select value={user} onChange={(e) => setUser(e.target.value)}>
                <option defaultValue={true}>Select User</option>
                {options}
              </select>
            </div>
            <button disabled={!save} type="submit" onClick={Editpost}>
              Edit Post
            </button>
            <button type="submit" onClick={Deleteaction}>
              Delete Post
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Editpage;
