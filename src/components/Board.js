import React from "react";

function Board(props) {
  return (
    <section>
      <p>{props.text}</p>
      <button>+1</button>
      <button>Delete</button>
    </section>
  );
}

// const Board = (props) => {
//   return (
//     <div onClick={() => props.onBoardSelect(props.board)}>
//       {props.board.title}
//     </div>
//   );
// };

export default Board;
