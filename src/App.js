import './App.css';
import BoardsList from './components/BoardsList'
import CardsList from './components/CardsList.js'
import axios from 'axios';
import { useState, useEffect } from 'react'


// we will make a GET request to get boards when component renders

function App() {
  const [Boards, setBoards] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  useEffect( () => {
    axios.get("http://localhost:5000/boards")
      .then((response) => {
        const boardsArr = response.data
        const boardElements = boardsArr.map((item) => {
          return <li key={item.id}>{item.title}</li>
        })
        setBoards(boardElements)
      })
      .catch((error) => {
        setErrorMessage(<section>{error.response.data.message}</section>)
      })
  },[])



  return (
    <div className="App">
      <h1>Inspiration Board</h1>

      <section>
        <div className="board-list">
          <h2>Boards</h2>
          <ol>
            {Boards}
          </ol>
        </div>

        <div className="selected-board">
          <h2>Selected Board</h2>
          <h6>Board Name - Owner</h6>
        </div>
      </section>

      <section>
        <CardsList />
      </section>
      {errorMessage}
    </div>
  );
}

export default App;
