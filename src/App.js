// import "./App.css";
// import axios from "axios";
// import BoardsList from "./components/BoardsList";
// import CardsList from "./components/CardsList.js";
// // import Card from "./components/Card";
// import { useEffect, useState } from "react";
// import NewBoardForm from "./components/NewBoardForm";

// export const URL_GET_ALL_BOARDS = "process.env.REACT_APP_BACKEND_URL/boards";
// export const URL_POST_A_BOARD = "process.env.REACT_APP_BACKEND_URL/boards";
// export const URL_GET_CARDS_OF_A_BOARD =
//   "process.env.REACT_APP_BACKEND_URL/boards/<board_id>/cards";
// export const URL_POST_A_CARD_TO_A_BOARD =
//   "process.env.REACT_APP_BACKEND_URL/boards/<board_id>/card";
// export const URL_PUT_LIKES_OF_A_CARD =
//   "process.env.REACT_APP_BACKEND_URL/cards/<card_id>/like";

// const App = () => {
//   const [boards, setBoards] = useState([]); //list of boards

//   useEffect(() => {
//     axios
//       .get(URL_GET_ALL_BOARDS)
//       .then((res) => {
//         const newBoards = res.data;
//         setBoards(newBoards);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   // this is to post/add new boards through the form. it calls the api/endpoint by
//   //providing what it needs(title and owner) and comes back with a response
//   //from the end point(in the then clause)
//   const add_new_board = ({ title, owner }) => {
//     axios
//       .post(URL_POST_A_BOARD, {
//         title,
//         owner,
//       })
//       .then((res) => {
//         const newBoard = {
//           id: res.data.board.board_id,
//           title: res.data.board.title,
//           owner: res.data.board.owner,
//         };
//         setBoards([...boards, newBoard]);//this is adding/appending new board to boards list
//       })
//       //or boards.push(response.data.board); instead of making new board, grab the whole board with all
//       //its attributes
//       .catch((err) => console.log(err.response.data));
//   };
//   const [cards, setCards] = useState([]);
//   useEffect(() => {
//     axios
//       .get(URL_GET_CARDS_OF_A_BOARD)
//       .then((res) => {
//         const newCards = res.data;
//         setCards(newCards);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const add_a_card_to_a_board = ({ message }) => {
//     axios
//       .post(URL_POST_A_CARD_TO_A_BOARD, { message })
//       .then((res) => {
//         const board_cards = res.data.board_cards;

//         setCards(board_cards);
//       })
//       .catch((err) => console.log(err.response.data));
//   };

//   return (
//     <div className="App">
//       <h1>Inspiration Board</h1>
//       <main>
//         <div>
//           {/* calling all boards */}
//           <BoardsList boards={boards} />
//           <CardsList cards={cards} />
//           {/* <Card /> */}
//         </div>

//         <div>{/* <NewBoardForm onAddBoardCallback={add_new_board} /> */}</div>
//       </main>
//     </div>
//   );
// };

// export default App;

import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CardsList from "./components/CardsList";
import NewBoardForm from "./components/NewBoardForm";
import BoardsList from "./components/BoardsList";

function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({
    title: "",
    owner: "",
    board_id: null,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/boards`, {})
      .then((response) => {
        setBoardsData(response.data);
      });
  }, []);

  const selectBoard = (board) => {
    setSelectedBoard(board);
  };

  const boardsElements = boardsData.map((board) => {
    return (
      <li>
        {/* the boardlist is going to be called and rendered many times for all boards in the boardsdata */}
        {/* but the callback function selectBoard will run at first linking with each board and sit
        back until one specific bpard is clicked */}
        <BoardsList board={board} onBoardSelect={selectBoard}></BoardsList>
      </li>
    );
  });
  //{title, owner} are keys of an object in key-value pair and will get their values.here they are just parameters
  const createNewBoard = ({ title, owner }) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/boards`, { title, owner })
      .then((response) => {
        console.log("Response:", response.data.board);
        const boards = [...boardsData];
        boards.push(response.data.board);
        setBoardsData(boards);
      })
      .catch((error) => {
        console.log("meeee");
        console.log("Error longggggg:", error);
        alert("Couldn't create a new board.");
      });
  };

  const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
  const toggleNewBoardForm = () => {
    setIsBoardFormVisible(!isBoardFormVisible);
  };

  const deleteAll = () => {
    if (
      window.confirm("Are you really sure? Please be gentle with this demo.")
    ) {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/destroy_all`)
        .then((response) => {
          console.log("response", response.data);
          setBoardsData([response.data.default_board]);
          setSelectedBoard({
            title: "",
            owner: "",
            board_id: null,
          });
        })
        .catch((error) => {
          console.log("Error:", error);
          alert("Something went wrong! :(");
        });
    }
  };

  return (
    <div className="page__container">
      <div className="content__container">
        <h1>Inspiration Board</h1>
        <section className="boards__container">
          <section>
            <h2>Boards</h2>
            <ol className="boards__list">{boardsElements}</ol>
          </section>
          <section>
            <h2>Selected Board</h2>
            <p>
              {selectedBoard.board_id
                ? `${selectedBoard.title} - ${selectedBoard.owner}`
                : "Select a Board from the Board List!"}
            </p>
          </section>
          <section className="new-board-form__container">
            <h2>Create a New Board</h2>
            {isBoardFormVisible ? (
              <NewBoardForm createNewBoard={createNewBoard}></NewBoardForm> //this creaternewboard call back function
            ) : (
              //gets invoked when the form is submitted, but it renders the form at first
              ""
            )}
            <span
              onClick={toggleNewBoardForm}
              className="new-board-form__toggle-btn"
            >
              {isBoardFormVisible
                ? "Hide New Board Form"
                : "Show New Board Form"}
            </span>
          </section>
        </section>
        {selectedBoard.board_id ? (
          <CardsList board={selectedBoard}></CardsList>
        ) : (
          ""
        )}
      </div>
      <footer>
        <span>This is a demo! Please be gentle!</span> Click{" "}
        <span onClick={deleteAll} className="footer__delete-btn">
          here
        </span>{" "}
        to delete all boards and cards!
      </footer>
    </div>
  );
}

export default App;
