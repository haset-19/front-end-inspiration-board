import React from "react";

const Card = ({ id, message, likes_count }) => {
  return (
    <div>
      <h5>hi</h5>
      <h5>{message}</h5>
      <h6>Likes: {likes_count}</h6>
      <button>+1</button>
      <button>Delete</button>
    </div>
  );
};

export default Card;
