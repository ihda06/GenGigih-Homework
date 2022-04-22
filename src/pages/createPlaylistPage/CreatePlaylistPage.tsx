import React, { useState } from "react"
import { RootStateOrAny, useDispatch, useSelector, } from "react-redux"

import CreatePlaylist from "../../component/createPlaylist/CreatePlaylist"
import './CreatePlaylistPage.css'
import Search from "../../component/search/Search"
import DataSample from "../../single-sample"
import TrackList, { Track } from "../../component/trackList/TrackList"
import Swal from 'sweetalert2'


import axios from 'axios';
import Sidebar from "../../component/sidebar/Sidebar"
import ResponsiveAppBar from "../../component/appBar/AppBar"
import { Box, TextField, Typography } from "@mui/material"
import { add } from "../../redux/searchResultSlice"


export interface IPlaylist {
    title: string;
    description: string;
    created: boolean;
    tracks: Track[];
}


const CreatePlaylistPages = () => {
    const dispatch = useDispatch();
    const [recent, setRecent] = useState([])
    const result = useSelector((state: RootStateOrAny) => state.searchResult.value);
    const [inputSearch, setInputSearch] = React.useState('')
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

    const handleEnter = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("masuk")
        e.preventDefault()
        setRecent(result)
        await handleSearch()
        // history.push("/search")
    }

    const handleSearch = async () => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
                params: {
                    type: 'track',
                    q: inputSearch,
                    limit: 8
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            console.log(typeof response.data.tracks.items)
            dispatch(add(response.data.tracks.items))
        }
        catch (e) {
            alert("Kamu belum login")
            console.error(e)
        }
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLDivElement>) => {
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
            <Sidebar selectPage="createplaylist" />
            <Box sx={{ width: 100 / 100 }}>
                <ResponsiveAppBar></ResponsiveAppBar>
                <CreatePlaylist
                    handleText={(e: React.ChangeEvent<HTMLInputElement>) => handleText(e)}
                    newPlaylist={playlist}
                    handleSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                    inputText={playlist.title}
                />
                <Box sx={{display:(recent.length>0)?'block':'none'}}>
                    <Search
                        recent={recent}
                    />
                </Box>
                <Box>

                    <Box
                        display='flex'
                        justifyContent="flex-end"
                        sx={{
                            my: 2,
                            mx: 12,
                            // '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                    >
                        <Typography variant="body1" sx={{ py: { sm: 3 / 2, md: 1 }, mr: 2, fontWeight: 900, display: { xs: 'none', sm: 'block' }, fontSize: { sm: 10, md: 15 } }}>Cant find your track?</Typography>
                        <form onSubmit={handleEnter}>
                            <TextField id="outlined-basic" label="Search Track" variant="outlined" size='small' onChange={(e) => setInputSearch(e.target.value)} />
                        </form>
                    </Box>
                    <TrackList
                        list={DataSample}
                        handleSelectedTrack={(data: Track) => handleSelectedtrack(data)}
                        handleUnselectedTrack={(data: Track) => handleUnselectedTrack(data)}
                    />
                </Box>



            </Box>
        </div>
    )
}

export default CreatePlaylistPages;
