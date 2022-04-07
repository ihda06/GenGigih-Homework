import { useSelector } from "react-redux"
import "./Home.css"
import Login from "../../component/loginComponent"


const Home = () => {
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

export default Home;