import logo from './logo.svg';
import './App.css';
import BoardsList from './components/BoardsList'
import CardsList from './components/CardsList.js'

function App() {
  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      <BoardsList />
      <CardsList />
    </div>
  );
}

export default App;
