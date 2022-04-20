import React, { useState } from "react"
import { RootStateOrAny, useSelector } from "react-redux"
import CreatePlaylist from "../../component/CreatePlaylist/CreatePlaylist"
import './CreatePlaylistPage.css'
import Search from "../../component/Search/Search"
import DataSample from "../../single-sample"
import TrackList, { Track } from "../../component/TrackList/TrackList"
import Swal from 'sweetalert2'


import axios from 'axios';
import Sidebar from "../../component/Sidebar/Sidebar"

export interface IPlaylist{
    title: string;
    description: string;
    created: boolean;
    tracks: Track[];
}


const CreatePlaylistPages = () => {
    const token = useSelector((state: RootStateOrAny) => state.token.value);
    const [playlist, setPlaylist] = useState<IPlaylist>({
        title: "",
        description: "",
        created: false,
        tracks: [],
    })

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPlaylist({ ...playlist, [name]: value })
    }

    const handleValidation = (title: string) => {
        if (title.length < 10) {
            return false
        }
        else {
            return true
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await getCurrentUser(token);
        console.log(data)

        const response = await createPlaylist(playlist.title, playlist.description, data.id);

        await addItem(response.id, playlist.tracks)

    }

    const getCurrentUser = async (token: string) => {
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
    const addItem = async (playlist_id: string, tracks: Track[]) => {
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
    const createPlaylist = async (title: string, description: string, userid: string) => {
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

    const handleSelectedtrack = (data: Track) => {
        setPlaylist((prev) => ({ ...playlist, tracks: prev.tracks.concat(data) }))
    }

    const handleUnselectedTrack = (data: Track) => {
        const newdata = playlist.tracks.filter((item) => item !== data);
        setPlaylist({ ...playlist, tracks: newdata });
    }
    return (
        <div className="App">
            <Sidebar/>
            <div className="content">

                <CreatePlaylist
                    handleText={(e: React.ChangeEvent<HTMLInputElement>)=>handleText(e)}
                    newPlaylist={playlist}
                    handleSubmit={(e: React.FormEvent<HTMLFormElement>)=>handleSubmit(e)}
                    handleValidation={(text: string)=>handleValidation(text)}

                />
                <TrackList
                    list={DataSample}
                    handleSelectedTrack={(data: Track)=>handleSelectedtrack(data)}
                    handleUnselectedTrack={(data: Track)=>handleUnselectedTrack(data)}
                />


                <Search
                    token={token}
                    
                    handleSelectedtrack={(data: Track)=>handleSelectedtrack(data)}
                    handleUnselectedtrack={(data: Track)=>handleUnselectedTrack(data)}
                />
            </div>
        </div>
    )
}

export default CreatePlaylistPages;