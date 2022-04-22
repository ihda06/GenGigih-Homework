
import './App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { add } from './redux/tokenSlice';
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from './pages/landingPage/LandingPage';
import CreatePlaylistPages from './pages/createPlaylistPage/CreatePlaylistPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchPage from './pages/searchPage/SearchPage';

import axios from 'axios';
// import { addUser } from './redux/userSlice';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      'Inter'
    ].join(','),
  }
});



function App() {
  const token = useSelector((state) => state.token.value);
  const user = useSelector((state) => state.userData.userInfo);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState([]);

  const getCurrentUser = async () => {
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

  useEffect(() => {
    if (token !== "") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token])

  useEffect(()=>{
    const getToken = localStorage.getItem("accessToken");
    if(getToken.length>0){
      dispatch(add(getToken))
    }
  })

  useEffect(() => {
    let url = window.location.hash;
    if (url.length > 0) {
      url = url.substring(1).split("&")[0].split("=")[1];
      localStorage.setItem("accessToken", url);
      dispatch(add(url));
    }
  }, [dispatch])




  return (
    <Switch>
      <Route exact path="/">
        {(!isLogin) ? <LandingPage /> : <Redirect to="/createplaylist" />}
      </Route>
      <Route path="/createplaylist">
        {(!isLogin) ?
          <Redirect to="/" />
          :
          <ThemeProvider theme={darkTheme}>
            {/* {console.log(userData)} */}
            <CreatePlaylistPages />
          </ThemeProvider>
        }
      </Route>
      <Route path="/search">
        {(!isLogin) ?
          <Redirect to="/" />
          :
          <ThemeProvider theme={darkTheme}>
            <SearchPage />
          </ThemeProvider>
        }
      </Route>

    </Switch>

  );
}

export default App;
