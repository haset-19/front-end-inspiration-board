import "./App.css";
import axios from "axios";
import BoardsList from "./components/BoardsList";
import CardsList from "./components/CardsList.js";
// import Card from "./components/Card";
import { useEffect, useState } from "react";
import NewBoardForm from "./components/NewBoardForm";

export const URL_GET_ALL_BOARDS = "process.env.REACT_APP_BACKEND_URL/boards";
export const URL_POST_A_BOARD = "process.env.REACT_APP_BACKEND_URL/boards";
export const URL_GET_CARDS_OF_A_BOARD =
  "process.env.REACT_APP_BACKEND_URL/boards/<board_id>/cards";
export const URL_POST_A_CARD_TO_A_BOARD =
  "process.env.REACT_APP_BACKEND_URL/boards/<board_id>/card";
export const URL_PUT_LIKES_OF_A_CARD =
  "process.env.REACT_APP_BACKEND_URL/cards/<card_id>/like";

const App = () => {
  const [boards, setBoards] = useState([]); //list of boards

  useEffect(() => {
    axios
      .get(URL_GET_ALL_BOARDS)
      .then((res) => {
        const newBoards = res.data;
        setBoards(newBoards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // this is to post/add new boards through the form. it calls the api/endpoint by
  //providing what it needs(title and owner) and comes back with a response
  //from the end point(in the then clause)
  const add_new_board = ({ title, owner }) => {
    axios
      .post(URL_POST_A_BOARD, {
        title,
        owner,
      })
      .then((res) => {
        const newBoard = {
          id: res.data.board.board_id,
          title: res.data.board.title,
          owner: res.data.board.owner,
        };
        setBoards([...boards, newBoard]);
      })
      .catch((err) => console.log(err.response.data));
  };
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios
      .get(URL_GET_CARDS_OF_A_BOARD)
      .then((res) => {
        const newCards = res.data;
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const add_a_card_to_a_board = ({ message }) => {
    axios
      .post(URL_POST_A_CARD_TO_A_BOARD, { message })
      .then((res) => {
        const board_cards = res.data.board_cards;

        setCards(board_cards);
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      <main>
        <div>
          {/* calling all boards */}
          <BoardsList boards={boards} />
          <CardsList cards={cards} />
          {/* <Card /> */}
        </div>

        <div>{/* <NewBoardForm onAddBoardCallback={add_new_board} /> */}</div>
      </main>
    </div>
  );
};

export default App;
