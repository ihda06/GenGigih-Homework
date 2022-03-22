import logo from './logo.svg';
import './App.css';
import Albumcard from './component/albumcard/Albumcard.js';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Spotipi</h1>
      {/* <header className="App-header">
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
      </header> */}
      <div className='Album-container'>
      {Albumcard}
      {Albumcard}
      {Albumcard}
      {Albumcard}
      </div>
    </div>
  );
}

export default App;
