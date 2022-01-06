import "./App.css";
import BoardsList from "./components/BoardsList";
import CardsList from "./components/CardsList.js";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBoard, setSelectedBoard] = useState({});
  const [allBoards, setAllBoards] = useState([]);
  const [allCards, setAllCards] = useState([]);

  const getCards = (board_id) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/boards/${board_id}/cards`)
      .then((response) => {
        const cards = response.data.cards;
        console.log(cards);
        setAllCards(cards);
      })
      .catch((error) => {
        setErrorMessage(console.log(error.response.data.message));
      });
  };

  const handleClick = (id, title, owner) => {
    console.log("id:", id);
    setSelectedBoard({ id: id, title: title, owner: owner });

    getCards(id);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/boards`)
      .then((response) => {
        setAllBoards(response.data);
      })
      .catch((error) => {
        setErrorMessage(<section>{error.response.data.message}</section>);
      });
  }, []);

  const addLike = (id) => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/cards/${id}/like`)
      .then(() => {
        const newCards = allCards.map((card) => {
          if (card.id === id) {
            return {
              id: card.id,
              board_id: card.board_id,
              message: card.message,
              likes_count: card.likes_count + 1,
            };
          }
          return card;
        });
        setAllCards(newCards);
      });
  };

  const deleteCard = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/cards/${id}`)
      .then(() => {
        const newCards = allCards.filter((card) => card.id !== id);
        setAllCards(newCards);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const createNewBoard = (newBoard) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/boards`, newBoard)
      .then((response) => {
        let newBoards = [...allBoards];
        newBoard["id"] = response.data.board_id;
        newBoards.push(newBoard);
        setAllBoards(newBoards);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't create a new board.");
      });
  };

  const createNewCard = (newCard) => {
    // console.log(selectedBoard);
    // console.log(selectedBoard.id);
    // console.log(newCard);
    // console.log(newCard.message);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/boards/${selectedBoard.id}/card`,
        newCard
      )
      .then((response) => {
        let cards = [...allCards];
        cards.push(newCard);
        setAllCards(cards);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't create new card");
      });
  };

  return (
    <div className="App">
      <h1>Inspiration Board</h1>

      <section>
        <BoardsList allBoards={allBoards} handleClick={handleClick} />

        <div className="selected-board">
          <h2>Selected Board</h2>
          {!selectedBoard.title && <h4>Select a board!</h4>}
          {selectedBoard.title && (
            <h4>
              {selectedBoard.title} - {selectedBoard.owner}
            </h4>
          )}
        </div>

        <section id="new_board_form_container">
          <h2>Create a new board</h2>
          <NewBoardForm createNewBoard={createNewBoard}></NewBoardForm>
        </section>
      </section>

      <section>
        <CardsList cards={allCards} addLike={addLike} deleteCard={deleteCard} />
      </section>

      <section id="new_card_form_container">
        <h2>Create a new card</h2>
        <NewCardForm createNewCard={createNewCard}></NewCardForm>
      </section>

      {errorMessage}
    </div>
  );
}

export default App;
