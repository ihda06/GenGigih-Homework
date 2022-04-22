import React, { useState } from "react"
import { RootStateOrAny, useSelector } from "react-redux"
import TrackList, { Track } from "../../component/trackList/TrackList"
// import Swal from 'sweetalert2'


import axios from 'axios';
import Sidebar from "../../component/sidebar/Sidebar"
import ResponsiveAppBar from "../../component/appBar/AppBar"
import { Box, Typography } from "@mui/material"

export interface IPlaylist {
    title: string;
    description: string;
    created: boolean;
    tracks: Track[];
}


const SearchPage = () => {
    // const token = useSelector((state: RootStateOrAny) => state.token.value);
    const list = useSelector((state: RootStateOrAny) => state.searchResult.value);
    const keyword = useSelector((state: RootStateOrAny) => state.searchResult.keyword);
    const [playlist, setPlaylist] = useState<IPlaylist>({
        title: "",
        description: "",
        created: false,
        tracks: [],
    })

    const handleSelectedtrack = (data: Track) => {
        setPlaylist((prev) => ({ ...playlist, tracks: prev.tracks.concat(data) }))
    }

    const handleUnselectedTrack = (data: Track) => {
        const newdata = playlist.tracks.filter((item) => item !== data);
        setPlaylist({ ...playlist, tracks: newdata });
    }

    return (
        <div className="App">
            <Sidebar selectPage="search" />
            <Box sx={{ width: 100 / 100 }}>
                <ResponsiveAppBar selectPage="search"></ResponsiveAppBar>
                <Box sx={{mt:5}}>
                    <Typography variant="h5" sx={{mb:2, fontWeight: 800}}>Result of {keyword}</Typography>
                    <TrackList
                        list={list}
                        handleSelectedTrack={handleSelectedtrack}
                        handleUnselectedTrack={handleUnselectedTrack}
                    />
                </Box>
            </Box>
        </div>
    )
}

export default SearchPage;
