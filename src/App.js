// import logo from './logo.svg';
import './App.css';
import Albumcard from './component/albumcard/Albumcard.js';
import data from './single-sample';

function App() {
  

  return (
    <div className="App">
      <h1>Welcome to Spotipi</h1>
      
      <div className='Album-container'>
        {
          data.map((item) => (
            <Albumcard 
              albumName={item.album.name}
              songName={item.name}
              url={item.album.images[0].url}
              artistName={item.artists[0].name}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
