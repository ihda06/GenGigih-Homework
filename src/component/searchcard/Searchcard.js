import { useState } from "react";
import './style.css'

const Searchcard = ({data, handleSelectedtrack, handleUnselectedTrack})=>{
    const songName = data.name;
    const url = data.album.images[0].url;
    const artistName = data.artists[0].name;
    const [selected, setSelected] = useState(false);
    const handleSelect = () =>{
        if(!selected){
            setSelected(true);
            handleSelectedtrack(data);
        }
        else{
            setSelected(false);
            handleUnselectedTrack(data);
        }
    }

    return(
        <div className="search-wrapper">
            <div className="sCard-Images">
                <img src={url} alt="" />
            </div>
            <div className="sCard-Content">
                <p className="song">{songName}</p>
                <p className="artist">{artistName}</p>
                <div className='sCard-button' onClick={handleSelect}>
                {
                    (!selected)? `Select` : `Deselect`
                }
            </div>
            </div>
        </div>
    )
}

export default Searchcard;