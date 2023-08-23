import logo from './logo.svg';
import './App.css';
import QrScanner from './components/scanner/QrScanner';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <QrScanner></QrScanner>
      </header>
  
    </div>
  );
}

export default App;
