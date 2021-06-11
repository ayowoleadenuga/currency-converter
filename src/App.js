import './App.css';
import Converter from './Components/Converter';

function App() {
  return (
    <div className="App">
      <header className="header">
          Currency Converter
      </header>
      <br />
      <main>
        <Converter />
      </main>
    </div>
  );
}

export default App;
