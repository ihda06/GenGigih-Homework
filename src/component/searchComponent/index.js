import { useState } from "react";
// import Albumcard from "../albumcard/Albumcard";
// import Login from "../loginComponent/index";
import Recent from "../recentSearch/recent";
import Searchcard from "../searchcard/Searchcard";
const axios = require('axios').default;



const Search = ({token, handleSelectedtrack, handleUnselectedTrack}) => {
    const [keyword, setKeyword] = useState("");
    const [tracks, setTracks] = useState([]);
    const [recent, setRecent] = useState([]);


    const handleInput = (e) => {
        setKeyword(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
                params: {
                    type: 'track',
                    q: keyword,
                    limit: 5
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            setRecent(tracks);
            setTracks(response.data.tracks.items);
        }
        catch (e) {
            alert("Kamu belum login")
            console.error(e)
        }

    }
    return (
        <div className="wrapper">
            <h1>Cant find your track?</h1>
            {/* <h2>Search</h2> */}
            <div>
                <input type="text" onChange={handleInput} />
                <button onClick={handleSubmit}>Search</button>
                <h1>Result : {keyword}</h1>
                <div className="Album-container">
                {/* THE SEARCH CARD COMPONENT IS GRID STYLING */}
                    {
                        tracks.map((item) => (
                            <Searchcard
                                key={item.id}
                                data={item}
                                handleSelectedtrack={handleSelectedtrack}
                                handleUnselectedTrack={handleUnselectedTrack}
                            />
                        ))
                    }
                </div>
                <h1>Recent Search</h1>
                <div className="Album-container">
                    {recent.map((item) => (
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
        </div>
    )
}

export default Search;