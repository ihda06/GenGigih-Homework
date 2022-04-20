
import './App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { add } from './tokenSlice';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import CreatePlaylistPages from './pages/CreatePlaylistPage/CreatePlaylistPage';



function App() {
  const token = useSelector((state)=> state.token.value);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    if(token !== ""){
      setIsLogin(true);
    }else{
      setIsLogin(false);
    }
  },[token])

  useEffect(() => {
    let url = window.location.hash;
    if(url.length > 0 ){
      url = url.substring(1).split("&")[0].split("=")[1];
      localStorage.setItem("accessToken", url);
      dispatch(add(url));
    }
  }, [dispatch])



  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { (!isLogin)? <LandingPage/> : <Redirect to="/create-playlist"/>}
        </Route>
        <Route path="/create-playlist">
          { (!isLogin)?  
          <Redirect to="/"/>
          : 
          <CreatePlaylistPages />
          }
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
