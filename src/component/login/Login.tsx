
import { Typography } from "@mui/material";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { remove } from "../../redux/tokenSlice";
import './Login.css'

const Login = () => {
    const token = useSelector((state: RootStateOrAny) => state.token.value);
    let isLogin = false;
    if (token !== "") {
        isLogin = true;
    }
    const CLIENT_ID = process.env.REACT_APP_VERCEL_SPOTIFY_KEY;
    const REDIRECT_URI = "homework-kappa.vercel.app";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPE = "playlist-modify-private";
    const dispatch = useDispatch();

    const handleLogin = () => {
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    }

    const handleLogout = () => {
        localStorage.setItem("accessToken", '')
        dispatch(remove);
        window.location.href = REDIRECT_URI;
    }

    return (
        <>
            {
                (!isLogin) ?
                    <Typography variant="button" className="Login-button" onClick={handleLogin} >Login to Spotify</Typography>
                    :
                    <Typography variant="button" className="Logout-button" onClick={handleLogout}>
                        Logout
                    </Typography>
            }
        </>
    );

}

export default Login;
