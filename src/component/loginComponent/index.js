
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../tokenSlice";
import './style.css'

const Login = () => {
    const token = useSelector((state) => state.token.value);
    let isLogin = false;
    if (token !== "") {
        isLogin = true;
    }
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_KEY;
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPE = "playlist-modify-private";
    const dispatch = useDispatch();

    const handleLogin = () => {
        window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    }

    const handleLogout = () => {
        dispatch(remove);
        window.location = REDIRECT_URI;
    }

    return (
        <>
            {
                (!isLogin) ?
                    <div className="Login-button" onClick={handleLogin} >Login to Spotify</div>
                    :
                    <div className="Logout-button" onClick={handleLogout}>
                        <p>
                            Logout
                        </p>
                    </div>
            }
        </>
    );

}

export default Login;