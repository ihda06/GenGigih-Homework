// import { type } from "@testing-library/user-event/dist/type";
import { FC } from "react";
// import Albumcard from "../albumcard/Albumcard";
// import Login from "../loginComponent/index";
import './Search.css'
import Recent from "../recentSearch/RecentSearch";

import { Track } from "../trackList/TrackList";

type searchProps = {
    recent: Track[];
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
