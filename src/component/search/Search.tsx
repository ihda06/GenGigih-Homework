// import { type } from "@testing-library/user-event/dist/type";
import { useState, FC, ChangeEvent, useEffect } from "react";
// import Albumcard from "../albumcard/Albumcard";
// import Login from "../loginComponent/index";
import './Search.css'
import Recent from "../recentSearch/RecentSearch";
import Searchcard from "../searchCard/SearchCard";
import axios from "axios";
import { Track } from "../trackList/TrackList";

type searchProps = {
    recent: Track[];
    // token: string;
    // handleSelectedtrack: (data: Track) => void;
    // handleUnselectedtrack: (data: Track) => void;
}

const Search: FC<searchProps> = (props: searchProps) => {
    return (
        <div className="wrapper">
            <h1>Recent Search</h1>
            <div className="Album-container">
                {props.recent.slice(0, 6).map((item: Track) => (
                    <Recent
                        key={item.id}
                        img={item.album.images[2].url}
                        title={item.name}
                        artist={item.artists[0].name}
                    />
                )
                )
                }
            </div>
        </div>
    )
}

export default Search;
