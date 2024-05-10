import React, { useState } from "react";
import { Userlist } from "../slice/Userslice";
import { useSelector, useDispatch } from "react-redux";
import { addNewpost } from "../slice/postslice";
import { useNavigate } from "react-router-dom";
function Addpost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");
  const save = [title, content, user].every(Boolean);
  const users = useSelector(Userlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = users.map((item) => (
    <option key={item.id} value={item.id}>
      {item.username}
    </option>
  ));

  function OnPostAdd(e) {
    e.preventDefault();
    if (save) {
      try {
        dispatch(addNewpost({ title, body: content, userId: user })).unwrap();
        setTitle("");
        setContent("");
        setUser("");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="inputcontainer">
      <h2>Add a New Post</h2>
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
      <button disabled={!save} type="submit" onClick={OnPostAdd}>
        Save Post
      </button>
    </div>
  );
}

export default Addpost;
