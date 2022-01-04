import React from "react";
import axios from "axios";

function BoardsList({ boards }) {
  return (
    <div>
      <h3>Boards</h3>
      {boards.map((board) => {
        return <li>{board.title}</li>;
      })}
    </div>
  );
}

export default BoardsList;
