import './App.css';
import BoardsList from './components/BoardsList'
import CardsList from './components/CardsList.js'
import axios from 'axios';
import { useState, useEffect } from 'react'


// we will make a GET request to get boards when component renders

function App() {
  const [boardsElements, setBoardsElements] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedBoard, setSelectedBoard] = useState({title:"Select a board!"})
  const [allBoards, setAllBoards] = useState("")
  const [allCards, setAllCards] = useState([])

  const getCards = (board_id) => {
    axios
      .get(`http://localhost:5000/boards/${board_id}/cards`)
      .then((response) => {
        const cards = response.data.cards
        console.log(cards)
        setAllCards(cards)
      })
      .catch((error) => {
        setErrorMessage(console.log(error.response.data.message))
      })
  }
  // figure out what is happening here!

  // const handleClick = value => () => console.log(value)
  // {
  //   // console.log(event.target)
  // }
  const handleClick = board => () => {
    // console.log(board)
    setSelectedBoard(board)
    getCards(board.id)
    // console.log(`all cards: ${allCards}`)
  }

  useEffect( () => {
    axios.get("http://localhost:5000/boards")
      .then((response) => {
        const boardsArr = response.data
        setAllBoards(boardsArr)
        const boardElements = boardsArr.map((item) => {
          return <li onClick={handleClick(item)}key={item.id}>
                {item.title}
                </li>
        })
        setBoardsElements(boardElements)
      })
      .catch((error) => {
        setErrorMessage(<section>{error.response.data.message}</section>)
      })
  },[])

  const addLike = (id) => {
      axios
        .put(`http://localhost:5000/cards/${id}/like`)
        .then(() => {
          const newCards = allCards.map((card) => {
            if (card.id === id) {
              return {
                id: card.id,
                board_id: card.board_id,
                message: card.message,
                likes_count: (card.likes_count + 1)
              };
            }
            return card;
          });
          setAllCards(newCards);
      })
  }

  // update db with  request
  // update state
  // const addLike = (id) => {
  //   const newCards = allCards.map((card) => {
  //     if (card.id === id) {
  //       // updateApi(task);
  //       return {
  //         id: card.id,
  //         board_id: card.board_id,
  //         message: card.message,
  //         likes_count: (card.likes_count + 1)
  //       };
  //     }
  //     return card;
  //   });
  //   setAllCards(newCards);
  // }



  return (
    <div className="App">
      <h1>Inspiration Board</h1>

      <section>
        <div className="board-list">
          <h2>Boards</h2>
          <ol>
            {boardsElements}
          </ol>
        </div>

        <div className="selected-board">
          <h2>Selected Board</h2>
          <h4>{selectedBoard.title} - {selectedBoard.owner}</h4>
        </div>
      </section>

      <section>
        <CardsList cards={allCards} addLike={addLike}/>
      </section>
      {errorMessage}
    </div>
  );
}

export default App;
