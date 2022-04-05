// import logo from './logo.svg';
import './App.css';
import Albumcard from './component/albumcard/Albumcard.js';
import data from './single-sample';
import Login from './component/loginComponent/index'
import Search from './component/searchComponent/index'
import { useState, useEffect } from 'react';
import CreatePlaylist from './component/createplaylist';
import { useSelector, useDispatch } from "react-redux";
import { add } from './tokenSlice';

const axios = require('axios').default;


function App() {
  const token = useSelector((state)=> state.token.value);
  const dispatch = useDispatch()
  const [login, setLogin] = useState(false);
  // const [token, setToken] = useState("");
  const [playlist, setPlaylist] = useState({
    title: "",
    description: "",
    created: false,
    tracks: [],
  })

  const [validation, setValidation] = useState(false);

  const handleText = (e) => {
    const { name, value } = e.target;
    setPlaylist({ ...playlist, [name]: value })
  }

  const handleValidation = (title) => {
    if (title.length < 10) {
      return false
    }
    else {
      return true
    }
  }

  console.log(playlist.description)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getCurrentUser(token);
    console.log(data)

    const response = await createPlaylist(playlist.title, playlist.description, data.id);

    await addItem(response.id, playlist.tracks)

  }

  console.log(playlist.tracks)
  const getCurrentUser = async (token) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }

      })
      return response.data
    }
    catch (e) {
     
      console.error(e)
    }
  }
  const addItem = async(playlist_id, tracks) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
        uris: tracks.map((item)=>item.uri),
      };
      const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, bodyParameters, config)
      console.log(response.data)
      return response.data;
    }
    catch (e) {
     
      console.error(e)
    }

  }
  const createPlaylist = async (title, description, userid) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
        name: title,
        public: false,
        collaborative: false,
        description: description
      };
      const response = await axios.post(`https://api.spotify.com/v1/users/${userid}/playlists`, bodyParameters, config)
      console.log(response)
      return response.data;
    }
    catch (e) {
     
      console.error(e)
    }
  }

  const handleSelectedtrack = (uri) => {
    setPlaylist((prev) => ({ ...playlist, tracks: prev.tracks.concat(uri) }))
  }

  const handleUnselectedTrack = (uri) => {
    const newdata = playlist.tracks.filter((item) => item !== uri);
    setPlaylist({ ...playlist, tracks: newdata });
  }
  // console.log(playlist.tracks);
  console.log("token :" + token);
  // console.log("status login :" + login);
  
  // console.log("status login :" + login);
  useEffect(() => {
    let url = window.location.hash;
    if(url.length > 0 ){
      url = url.substring(1).split("&")[0].split("=")[1];
      dispatch(add(url));
      if(token === ""){
        setLogin(false);
      }
      else{
        setLogin(true);
      }
    }
  }, [])



  return (
    <div className="App">
      <h1>Welcome to Spotify</h1>
      {(!login) ?
        <Login login={login} />
        :
        <>
          <Login 
          login={login}
          />
          <CreatePlaylist
            handleText={handleText}
            newPlaylist={playlist}
            handleSubmit={handleSubmit}
            handleValidation={handleValidation}

          />
          <h2>Select track to add to your playlist</h2>
          <div className='Album-container'>
            {
              data.map((item) => (
                <Albumcard
                  key={item.id}
                  data={item}
                  handleSelectedtrack={handleSelectedtrack}
                  handleUnselectedTrack={handleUnselectedTrack}
                />
              ))
            }
          </div>
          <br />
          <Search
            token={token}
          />
          <br />
        </>
      }


    </div>
  );
}

export default App;
