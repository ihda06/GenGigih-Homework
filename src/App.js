// import logo from './logo.svg';
import './App.css';
import Albumcard from './component/albumcard/Albumcard.js';
import data from './single-sample';
import Login from './component/loginComponent/index'
import Search from './component/searchComponent/index'


function App() {
 
  

  return (
    <div className="App">
      <h1>Welcome to Spotipi</h1>
      
      
      <div className='Album-container'>
        {
          data.map((item) => (
            <Albumcard 
              key={item.id}
              albumName={item.album.name}
              songName={item.name}
              url={item.album.images[0].url}
              artistName={item.artists[0].name}
            />
          ))
        }
      </div>
      <br/>
      <Search />
    </div>
  );
}

export default App;
