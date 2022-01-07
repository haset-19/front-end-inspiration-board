import React from "react";
import Board from "./Board.js";

const BoardsList = (props) => {
  const boardComponents = props.allBoards.map((board) => {
    return (
      <Board
        id={board.id}
        owner={board.owner}
        title={board.title}
        key={board.id}
        handleClick={props.handleClick}
      />
    );
  });
  return <ol id="boards_list">{boardComponents}</ol>;
};

export default BoardsList;
