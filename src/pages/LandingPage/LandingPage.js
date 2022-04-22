// import { useSelector } from "react-redux"
import "./LandingPage.css"
import Login from "../../component/login/Login"


const LandingPage = () => {
    // const login = useSelector((state) => state.isLogin.value);

    return (
        <div className="Home-Page">
            <h1>Welcome to Spotify!</h1>
            <h2>Please Login to Use Our Feature</h2>
            <Login
            />
        </div>
    )
}

export default LandingPage;