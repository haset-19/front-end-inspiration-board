import React from "react";

function Card(props) {
  return (
    <div>
      <h5>{props.text}</h5>
      <h6>Likes: {props.likes}</h6>
      <button>+1</button>
      <button>Delete</button>
    </div>
  );
}

export default Card;
