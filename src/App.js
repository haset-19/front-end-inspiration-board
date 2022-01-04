import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <h1>Inspiration Board</h1>

      <section id="boards_container">
        <h2>Boards</h2>
        <ol id="boards_list">
          <li>
            <div>Board 1</div>
          </li>
        </ol>
      </section>

      <section id="selected_board_container">
        <h2>Selected boards</h2>
      </section>

      <section id="new_board_form_container">
        <h2>Create a new board</h2>
      </section>

      <section id="card-list-container">
        <h2>Cards</h2>
      </section>

      <Board />
      {/* <CardsList /> */}
      {/* <NewBoardForm /> */}
      {/* <NewCardForm /> */}
    </div>
  );
}

export default App;
