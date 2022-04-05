import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { remove } from "../../tokenSlice";
import './style.css'

const Login = ({login})=>{
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_KEY;
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPE = "playlist-modify-private";
    const dispatch = useDispatch();

    const handleLogin = ()=>{
        window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    }
    
    const handleLogout = ()=>{
        dispatch(remove);
        window.location = REDIRECT_URI;
    }

    return(
        <>
        {
            (!login)?
            <div className="Login-button" onClick={handleLogin} >Login to Spotify</div>
            :
            <div className="Logout-button" onClick={handleLogout} >Logout</div>
        }
        </>
    );

}

export default Login;