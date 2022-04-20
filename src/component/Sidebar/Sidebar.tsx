import Login from '../Login/Login';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <img src={"white-spotify.png"} alt="" />
            <div className="sidebar-content">
                <Login />
                <p>Create Playlist</p>
                <p>Your Playlist</p>
            </div>
        </div>
    )
}

export default Sidebar;