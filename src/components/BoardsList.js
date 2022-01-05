// import React from "react";
// // import axios from "axios";

// function BoardsList({ boards }) {
//   return (
//     <div>
//       <h3>Boards</h3>
//       {boards.map((board) => {
//         return <li>{board.title}</li>;
//       })}
//     </div>
//   );
// }

// export default BoardsList;

const BoardsList = (props) => {
  console.log(props);
  console.log("kkkkkkubgtjjdhj");
  return (
    //invoking the props.onboardSelect callback function
    <div onClick={() => props.onBoardSelect(props.board)}>
      {props.board.title}
      {console.log(props.board.title)}
    </div>
  );
};

export default BoardsList;
