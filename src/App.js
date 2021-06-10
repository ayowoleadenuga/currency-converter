import './App.css';
import Converter from './Components/Converter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Currency Converter
        </h1>
      </header>
      <br />
      <main>
        <Converter />
      </main>
    </div>
  );
}

export default App;
