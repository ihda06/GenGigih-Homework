import { useState } from "react"
import { useSelector } from "react-redux"
import CreatePlaylist from "../../component/CreatePlaylist/CreatePlaylist"
import Login from "../../component/Login/Login"
import './CreatePlaylistPage.css'
import Search from "../../component/Search/Search"
import data from "../../single-sample"
import TrackList from "../../component/TrackList/TrackList"
import Swal from 'sweetalert2'


import axios from 'axios';


const CreatePlaylistPages = () => {
    const token = useSelector((state) => state.token.value);
    const [playlist, setPlaylist] = useState({
        title: "",
        description: "",
        created: false,
        tracks: [],
    })

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await getCurrentUser(token);
        console.log(data)

        const response = await createPlaylist(playlist.title, playlist.description, data.id);

        await addItem(response.id, playlist.tracks)

    }

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
    const addItem = async (playlist_id, tracks) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const bodyParameters = {
                uris: tracks.map((item) => item.uri),
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
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success create playlist',
                timer: 1500
            })
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
    return (
        <div className="App">
            <div className="sidebar">
                <img src={"white-spotify.png"} alt="" />
                <div className="sidebar-content">
                    <Login />
                    <p>Your Playlist</p>
                </div>
            </div>
            <div className="content">

                <CreatePlaylist
                    handleText={handleText}
                    newPlaylist={playlist}
                    handleSubmit={handleSubmit}
                    handleValidation={handleValidation}

                />
                <TrackList
                    list={data}
                    handleSelectedtrack={handleSelectedtrack}
                    handleUnselectedTrack={handleUnselectedTrack}
                />


                <Search
                    token={token}
                    handleSelectedtrack={handleSelectedtrack}
                    handleUnselectedTrack={handleUnselectedTrack}
                />
            </div>
        </div>
    )
}

export default CreatePlaylistPages;