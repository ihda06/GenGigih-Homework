import './App.css';
import Albumcard from './component/albumcard/Albumcard.js';
import data from './single-sample';

function App() {
  

  return (
    <div className="App">
      <h1>Welcome to Spotipi</h1>
      
      <div className='Album-container'>
      <Albumcard 
        albumName={data.album.name}
        songName={data.name}
        url={data.album.images[0].url}
        artistName={data.artists[0].name}
      />
      <Albumcard 
        albumName={data.album.name}
        songName={data.name}
        url={data.album.images[0].url}
        artistName={data.artists[0].name}
      />
      <Albumcard 
        albumName={data.album.name}
        songName={data.name}
        url={data.album.images[0].url}
        artistName={data.artists[0].name}
      />
      <Albumcard 
        albumName={data.album.name}
        songName={data.name}
        url={data.album.images[0].url}
        artistName={data.artists[0].name}
      />
      </div>
    </div>
  );
}

export default App;
