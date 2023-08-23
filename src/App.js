import logo from './logo.gif';
import './App.css';
import QrScanner from './components/scanner/QrScanner';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Test Environment
        </p>
        <QrScanner></QrScanner>
      </header>
  
    </div>
  );
}

export default App;
