import React from "react";
import "./UserMessage.css";
function UserMessage(props) {
  console.log(props);
  return (
    <div className="user_container" onClick={() => console.log("Hello")}>
      <div className="user_img mt-2 ml-2">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
          alt="tree"
        />
      </div>
      <div className="user_info mt-2 ml-2">
        <p>
          <b>This is the name</b>
          <p>This the last message</p>
        </p>
        <hr />
      </div>
    </div>
  );
}

export default UserMessage;
